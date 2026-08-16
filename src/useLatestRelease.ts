import { useEffect, useState } from 'react'

/**
 * Shared, deduped fetch of the latest release tag for the version badge.
 * Every component that needs it (hero, download, docs) reuses this one promise,
 * so the page makes a single GitHub API call instead of 2–3 — the unauthenticated
 * API is rate-limited to 60/h per IP, and this is the slowest thing on the page.
 * Aborts after 6s so a slow/rate-limited API can't leave a request hanging.
 */
let cached: Promise<string | null> | null = null

function fetchLatestTag(): Promise<string | null> {
  if (!cached) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 6000)
    cached = fetch('https://api.github.com/repos/cflarios/Tayori/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { tag_name?: string } | null) => d?.tag_name ?? null)
      .catch(() => null)
      .finally(() => clearTimeout(timeout))
  }
  return cached
}

export function useLatestRelease() {
  const [tag, setTag] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    fetchLatestTag().then((t) => {
      if (alive && t) setTag(t)
    })
    return () => {
      alive = false
    }
  }, [])

  return tag
}
