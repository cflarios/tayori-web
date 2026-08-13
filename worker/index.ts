/**
 * Tayori landing — Cloudflare Worker.
 *
 * Everything is served as a static asset except `/download*`, which redirects
 * to the newest Windows portable `.exe` attached to the latest GitHub release.
 * Resolving it at request time means the button never goes stale when a new
 * version ships. The GitHub API answer is cached at the edge so we don't burn
 * the unauthenticated rate limit (60 req/h per egress IP).
 */

interface Env {
  ASSETS: Fetcher
}

const REPO = 'cflarios/Tayori'
const RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`
const CACHE_SECONDS = 600 // 10 min

async function resolveLatestExe(): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
    headers: {
      'User-Agent': 'tayori-web',
      Accept: 'application/vnd.github+json',
    },
    cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true },
  })

  if (!res.ok) return RELEASES_PAGE

  const data = (await res.json()) as {
    assets?: { name: string; browser_download_url: string }[]
  }
  const asset =
    data.assets?.find((a) => a.name.toLowerCase().endsWith('-portable.exe')) ??
    data.assets?.find((a) => a.name.toLowerCase().endsWith('.exe'))

  return asset?.browser_download_url ?? RELEASES_PAGE
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/download' || url.pathname.startsWith('/download/')) {
      const cache = caches.default
      const cacheKey = new Request(new URL('/download', url.origin).toString(), request)

      const cached = await cache.match(cacheKey)
      if (cached) return cached

      const target = await resolveLatestExe()
      const response = new Response(null, {
        status: 302,
        headers: {
          Location: target,
          'Cache-Control': `public, max-age=${CACHE_SECONDS}`,
        },
      })

      ctx.waitUntil(cache.put(cacheKey, response.clone()))
      return response
    }

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
