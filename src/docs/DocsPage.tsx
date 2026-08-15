import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react'
import { useI18n } from '../i18n'
import { useLatestRelease } from '../useLatestRelease'
import { Icon } from '../icons'
import { Link, useRoute } from '../router'
import { DOCS, GROUPS, buildDocsIndex } from './content'

/* Highlight the query inside a text snippet. */
function highlight(text: string, query: string): ReactNode {
  const i = text.toLowerCase().indexOf(query.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded bg-cyan-400/25 px-0.5 text-cyan-100">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  )
}

function snippet(text: string, query: string): string {
  const i = text.toLowerCase().indexOf(query.toLowerCase())
  if (i < 0) return text.slice(0, 100) + (text.length > 100 ? '…' : '')
  const start = Math.max(0, i - 45)
  const raw = text.slice(start, i + query.length + 55)
  return (start > 0 ? '…' : '') + raw + (i + query.length + 55 < text.length ? '…' : '')
}

/* -------------------------------------------------------------------- search */

function DocsSearch({ onNavigate }: { onNavigate?: () => void }) {
  const { lang } = useI18n()
  const { navigate } = useRoute()
  const index = useMemo(() => buildDocsIndex(lang), [lang])
  const groupLabel = (id: string) => GROUPS.find((g) => g.id === id)?.label[lang] ?? ''

  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (query.length < 2) return []
    return index
      .map((e) => {
        const inTitle = e.title.toLowerCase().includes(query)
        const inBody = e.text.toLowerCase().includes(query)
        return inTitle || inBody ? { e, score: inTitle ? 0 : 1 } : null
      })
      .filter((x): x is { e: (typeof index)[number]; score: number } => x !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 8)
  }, [q, index])

  useEffect(() => setActive(0), [q])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = /input|textarea/i.test(document.activeElement?.tagName ?? '')
      if ((e.key === '/' && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (id: string) => {
    navigate(`/docs/${id}`)
    setQ('')
    setOpen(false)
    inputRef.current?.blur()
    onNavigate?.()
  }

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
      return
    }
    if (results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const r = results[active]
      if (r) go(r.e.id)
    }
  }

  const query = q.trim()

  return (
    <div ref={boxRef} className="relative">
      <div className="relative">
        <Icon.search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-mute-2)]" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={lang === 'es' ? 'Buscar…' : 'Search…'}
          aria-label={lang === 'es' ? 'Buscar en la documentación' : 'Search the docs'}
          className="w-full rounded-lg border border-[var(--color-line)] bg-white/[0.03] py-2 pl-9 pr-8 text-sm text-white placeholder:text-[var(--color-mute-2)] outline-none transition-colors focus:border-violet-400/50 focus:bg-white/[0.05]"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-[var(--color-line)] bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-mute-2)] sm:block">
          /
        </kbd>
      </div>

      {open && query.length >= 2 && (
        <div className="absolute left-0 right-0 z-30 mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-1.5 shadow-2xl shadow-black/60">
          {results.length === 0 ? (
            <div className="px-3 py-4 text-center text-sm text-[var(--color-mute-2)]">
              {lang === 'es' ? 'Sin resultados' : 'No results'}
            </div>
          ) : (
            results.map((r, i) => (
              <button
                key={r.e.id}
                onClick={() => go(r.e.id)}
                onMouseEnter={() => setActive(i)}
                className={`block w-full rounded-lg px-3 py-2 text-left transition-colors ${
                  active === i ? 'bg-white/8' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[13.5px] font-semibold text-white">{highlight(r.e.title, query)}</span>
                  <span className="shrink-0 text-[10px] uppercase tracking-wider text-[var(--color-mute-2)]">
                    {groupLabel(r.e.group)}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-[var(--color-mute)]">
                  {highlight(snippet(r.e.text, query), query)}
                </p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------- sidebar */

function SidebarNav({ currentId, onNavigate }: { currentId: string; onNavigate?: () => void }) {
  const { lang } = useI18n()
  const grouped = GROUPS.map((g) => ({ g, items: DOCS.filter((d) => d.group === g.id) }))
  return (
    <nav className="flex flex-col gap-6">
      {grouped.map(({ g, items }) => (
        <div key={g.id}>
          <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-mute-2)]">
            {g.label[lang]}
          </div>
          <ul className="flex flex-col gap-0.5">
            {items.map((d) => (
              <li key={d.id}>
                <Link
                  to={`/docs/${d.id}`}
                  onNavigate={onNavigate}
                  className={`block rounded-lg px-3 py-1.5 text-[13.5px] transition-colors ${
                    currentId === d.id
                      ? 'bg-violet-500/12 font-medium text-white ring-1 ring-inset ring-violet-400/20'
                      : 'text-[var(--color-mute)] hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  {d.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

/* ----------------------------------------------------- "on this page" (h3 TOC) */

function slugify(text: string): string {
  return (
    text
      .normalize('NFD')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 40) || 'section'
  )
}

/** Reads the current page's <h3> subheadings, gives them stable ids, and tracks
 *  which one is in view. Reruns when the page or language changes. */
function useToc(key: string) {
  const [items, setItems] = useState<{ id: string; text: string }[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const hs = Array.from(document.querySelectorAll<HTMLHeadingElement>('article .doc-prose h3'))
    const used = new Set<string>()
    const list = hs.map((h) => {
      let id = slugify(h.textContent ?? '')
      let n = 1
      while (used.has(id)) id = `${slugify(h.textContent ?? '')}-${n++}`
      used.add(id)
      h.id = id
      return { id, text: h.textContent ?? '' }
    })
    setItems(list)
    setActive(list[0]?.id ?? '')

    if (hs.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) {
          const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
          setActive(top.target.id)
        }
      },
      { rootMargin: '-88px 0px -70% 0px', threshold: 0 },
    )
    hs.forEach((h) => obs.observe(h))
    return () => obs.disconnect()
  }, [key])

  return { items, active }
}

/* ---------------------------------------------------------------- prev / next */

function PrevNextLink({ to, dir, title }: { to: string; dir: 'prev' | 'next'; title: string }) {
  const { lang } = useI18n()
  const label = dir === 'prev' ? (lang === 'es' ? 'Anterior' : 'Previous') : lang === 'es' ? 'Siguiente' : 'Next'
  return (
    <Link
      to={to}
      className={`glass glass-hover flex flex-col gap-1 rounded-xl p-4 ${dir === 'next' ? 'items-end text-right' : ''}`}
    >
      <span className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-mute-2)]">
        {dir === 'prev' && <Icon.arrow className="h-3.5 w-3.5 rotate-180" />}
        {label}
        {dir === 'next' && <Icon.arrow className="h-3.5 w-3.5" />}
      </span>
      <span className="text-[15px] font-semibold text-white">{title}</span>
    </Link>
  )
}

/* ---------------------------------------------------------------------- page */

export function DocsPage() {
  const { lang } = useI18n()
  const { path } = useRoute()
  const tag = useLatestRelease()
  const [menuOpen, setMenuOpen] = useState(false)

  const slug = path.replace(/^\/docs\/?/, '')
  const idx = DOCS.findIndex((d) => d.id === slug)
  const currentIndex = idx >= 0 ? idx : 0
  const current = DOCS[currentIndex]
  const prev = DOCS[currentIndex - 1]
  const next = DOCS[currentIndex + 1]
  const group = GROUPS.find((g) => g.id === current.group)

  const toc = useToc(`${current.id}|${lang}`)
  const showToc = toc.items.length >= 2

  return (
    <div className="pt-16">
      <div
        className={`mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-10 lg:grid-cols-[264px_minmax(0,1fr)] ${
          showToc ? 'xl:grid-cols-[264px_minmax(0,1fr)_200px]' : ''
        }`}
      >
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex max-h-[calc(100vh-7rem)] flex-col gap-5 overflow-y-auto pb-8 pr-2">
            <DocsSearch />
            <SidebarNav currentId={current.id} />
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          {/* Mobile search + contents */}
          <div className="mb-8 flex flex-col gap-3 lg:hidden">
            <DocsSearch />
            <details
              open={menuOpen}
              onToggle={(e) => setMenuOpen((e.target as HTMLDetailsElement).open)}
              className="glass rounded-xl"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
                {lang === 'es' ? 'Todas las secciones' : 'All sections'}
                <span className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`}>⌄</span>
              </summary>
              <div className="border-t border-[var(--color-line)] p-3">
                <SidebarNav currentId={current.id} onNavigate={() => setMenuOpen(false)} />
              </div>
            </details>
          </div>

          <article className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-mute-2)]">
              <Link to="/docs" className="hover:text-white">
                {lang === 'es' ? 'Documentación' : 'Documentation'}
              </Link>
              <span>/</span>
              <span className="text-[var(--color-mute)]">{group?.label[lang]}</span>
              {tag && <span className="ml-auto rounded-md bg-white/6 px-1.5 py-0.5 font-mono text-[11px]">{tag}</span>}
            </div>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[2.1rem]">{current.title[lang]}</h1>

            <div className="doc-prose mt-6">{current.body(lang)}</div>

            <div className="mt-14 grid gap-4 border-t border-[var(--color-line)] pt-8 sm:grid-cols-2">
              {prev ? <PrevNextLink to={`/docs/${prev.id}`} dir="prev" title={prev.title[lang]} /> : <span />}
              {next && <PrevNextLink to={`/docs/${next.id}`} dir="next" title={next.title[lang]} />}
            </div>
          </article>
        </div>

        {/* Right-hand "on this page" TOC — only on wide screens and long pages */}
        {showToc && (
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-mute-2)]">
                {lang === 'es' ? 'En esta página' : 'On this page'}
              </div>
              <ul className="flex flex-col border-l border-[var(--color-line)]">
                {toc.items.map((it) => (
                  <li key={it.id}>
                    <a
                      href={`#${it.id}`}
                      className={`-ml-px block border-l py-1.5 pl-4 text-[13px] leading-snug transition-colors ${
                        toc.active === it.id
                          ? 'border-cyan-400 text-white'
                          : 'border-transparent text-[var(--color-mute)] hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {it.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
