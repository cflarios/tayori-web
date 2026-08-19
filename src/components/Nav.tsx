import { useEffect, useState } from 'react'
import { useI18n, type Lang } from '../i18n'
import { Icon } from '../icons'
import { Mascot } from './Mascot'
import { Link, useRoute } from '../router'

function LangToggle() {
  const { lang, setLang } = useI18n()
  const opt = (l: Lang, label: string) => (
    <button
      onClick={() => setLang(l)}
      className={`rounded-[7px] px-2.5 py-1.5 text-xs font-bold transition-colors ${
        lang === l ? 'bg-white/10 text-white' : 'text-mute-3 hover:text-fg'
      }`}
      aria-pressed={lang === l}
    >
      {label}
    </button>
  )
  return (
    <div className="flex items-center gap-0.5 rounded-[9px] border border-line-2 p-0.5">
      {opt('en', 'EN')}
      {opt('es', 'ES')}
    </div>
  )
}

export function Nav() {
  const { t } = useI18n()
  const { path } = useRoute()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the phone menu on Escape, and whenever the viewport grows past the
  // breakpoint where the links are visible anyway.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 768px)')
    const onWide = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onWide)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onWide)
    }
  }, [open])

  const onDocs = path.startsWith('/docs')
  const links = [
    { t: t.nav.product, to: '/#product' },
    { t: t.nav.privacy, to: '/#privacy' },
    { t: t.nav.faq, to: '/#faq' },
    { t: t.nav.docs, to: '/docs', active: onDocs },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-line bg-ink/95 sm:bg-ink/80 sm:backdrop-blur-lg'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-10">
        <Link to="/" className="flex items-center gap-2.5" title="頼りになった · your reliable one">
          <Mascot className="h-[30px] w-[30px] shrink-0" />
          <span className="font-display text-[19px] font-bold tracking-[-0.03em]">Tayori</span>
        </Link>

        <div className="hidden items-center gap-[30px] text-sm font-medium text-mute-2 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={`transition-colors hover:text-white ${l.active ? 'text-white' : ''}`}>
              {l.t}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <a
            href="/download"
            className="btn btn-primary inline-flex h-11 items-center gap-1.5 rounded-[10px] px-4 text-sm font-semibold sm:h-auto sm:py-2.5"
          >
            <Icon.windows className="h-4 w-4 sm:hidden" />
            {t.nav.download}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={open}
            className="btn btn-ghost inline-flex h-11 w-11 items-center justify-center rounded-[11px] md:hidden"
          >
            {open ? <Icon.close className="h-5 w-5" /> : <Icon.menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink px-5 pb-5 pt-2 md:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onNavigate={() => setOpen(false)}
                className={`flex min-h-[52px] items-center border-b border-line text-[15px] font-semibold transition-colors hover:text-white ${
                  l.active ? 'text-white' : 'text-mute'
                }`}
              >
                {l.t}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <LangToggle />
            <a
              href="https://github.com/cflarios/Tayori"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost inline-flex h-11 items-center gap-2 rounded-[11px] px-4 text-sm font-semibold"
            >
              <Icon.github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
