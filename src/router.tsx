import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react'

/**
 * Tiny pathname router — the site has two pages (landing + docs), so a full
 * router library would be overkill. Cloudflare serves index.html for any
 * non-asset path (SPA fallback), and this decides what to render.
 */
type RouteValue = { path: string; navigate: (to: string) => void }
const RouteContext = createContext<RouteValue>({ path: '/', navigate: () => {} })

function scrollToHash(hash: string, smooth: boolean) {
  const run = () => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
  }
  // Two frames so a freshly-mounted page has laid out before we scroll.
  requestAnimationFrame(() => requestAnimationFrame(run))
}

export function RouteProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin)
    const samePage = url.pathname === window.location.pathname
    if (!samePage) {
      window.history.pushState({}, '', url.pathname + url.hash)
      setPath(url.pathname)
    } else if (url.hash) {
      window.history.replaceState({}, '', url.pathname + url.hash)
    }
    scrollToHash(url.hash, samePage)
  }

  return <RouteContext.Provider value={{ path, navigate }}>{children}</RouteContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoute() {
  return useContext(RouteContext)
}

/** Internal link that routes without a full page reload. */
export function Link({
  to,
  onNavigate,
  children,
  ...rest
}: { to: string; onNavigate?: () => void } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { navigate } = useRoute()
  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        onNavigate?.()
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
