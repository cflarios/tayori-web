import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../i18n'
import { useLatestRelease } from '../useLatestRelease'
import { Icon } from '../icons'
import { DOCS, GROUPS } from './content'

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          // topmost visible section wins
          const top = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
          setActive(top.target.id)
        }
      },
      { rootMargin: '-88px 0px -68% 0px', threshold: 0 },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

export function DocsPage() {
  const { lang } = useI18n()
  const tag = useLatestRelease()
  const [mobileOpen, setMobileOpen] = useState(false)

  const ids = useMemo(() => DOCS.map((d) => d.id), [])
  const active = useScrollSpy(ids)

  const grouped = GROUPS.map((g) => ({ group: g, items: DOCS.filter((d) => d.group === g.id) }))

  const SidebarLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex flex-col gap-6">
      {grouped.map(({ group, items }) => (
        <div key={group.id}>
          <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-mute-2)]">
            {group.label[lang]}
          </div>
          <ul className="flex flex-col gap-0.5">
            {items.map((d) => (
              <li key={d.id}>
                <a
                  href={`#${d.id}`}
                  onClick={onClick}
                  className={`block rounded-lg px-3 py-1.5 text-[13.5px] transition-colors ${
                    active === d.id
                      ? 'bg-white/6 font-medium text-white'
                      : 'text-[var(--color-mute)] hover:bg-white/[0.03] hover:text-white'
                  }`}
                >
                  {d.title[lang]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] grad-text">
            <Icon.book className="h-4 w-4" />
            {lang === 'es' ? 'Documentación' : 'Documentation'}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {lang === 'es' ? 'Todo lo que hace Tayori' : 'Everything Tayori does'}
          </h1>
          <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-[var(--color-mute)]">
            {lang === 'es'
              ? 'Cómo funciona cada característica y cómo configurarla.'
              : 'How every feature works and how to set it up.'}
            {tag && (
              <span className="ml-2 rounded-md bg-white/6 px-1.5 py-0.5 font-mono text-xs text-[var(--color-mute)]">
                {tag}
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-10 lg:grid-cols-[236px_minmax(0,1fr)]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8 pr-2">
            <SidebarLinks />
          </div>
        </aside>

        {/* Mobile contents */}
        <div className="lg:hidden">
          <details
            open={mobileOpen}
            onToggle={(e) => setMobileOpen((e.target as HTMLDetailsElement).open)}
            className="glass rounded-xl"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
              {lang === 'es' ? 'Contenido' : 'On this page'}
              <span className={`transition-transform ${mobileOpen ? 'rotate-180' : ''}`}>⌄</span>
            </summary>
            <div className="border-t border-[var(--color-line)] p-3">
              <SidebarLinks onClick={() => setMobileOpen(false)} />
            </div>
          </details>
        </div>

        {/* Content */}
        <div className="min-w-0">
          <div className="doc-prose max-w-3xl">
            {DOCS.map((d) => (
              <section key={d.id} id={d.id} className="scroll-mt-24 pb-14">
                <h2 className="group flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
                  {d.title[lang]}
                  <a
                    href={`#${d.id}`}
                    aria-label="Link to section"
                    className="doc-plain text-[var(--color-mute-2)] opacity-0 transition-opacity hover:text-cyan-300 group-hover:opacity-100"
                  >
                    #
                  </a>
                </h2>
                <div className="mt-4">{d.body(lang)}</div>
              </section>
            ))}

            {/* Footer of docs: back to top + repo */}
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[var(--color-line)] pt-8 text-sm text-[var(--color-mute)]">
              <a href="#top" className="doc-plain inline-flex items-center gap-1.5 hover:text-white">
                ↑ {lang === 'es' ? 'Volver arriba' : 'Back to top'}
              </a>
              <span className="text-[var(--color-mute-2)]">·</span>
              <a
                href="https://github.com/cflarios/Tayori"
                target="_blank"
                rel="noopener noreferrer"
                className="doc-plain inline-flex items-center gap-1.5 hover:text-white"
              >
                <Icon.github className="h-4 w-4" />
                {lang === 'es' ? 'Ver el repositorio' : 'View the repository'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
