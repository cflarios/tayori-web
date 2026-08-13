import { useEffect, useState } from 'react'
import { useI18n, type Lang } from '../i18n'
import { Icon } from '../icons'
import { Mascot } from './Mascot'

const GITHUB = 'https://github.com/cflarios/Tayori'

function LangToggle() {
  const { lang, setLang } = useI18n()
  const opt = (l: Lang, label: string) => (
    <button
      onClick={() => setLang(l)}
      className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
        lang === l ? 'bg-white/12 text-white' : 'text-[var(--color-mute-2)] hover:text-white'
      }`}
      aria-pressed={lang === l}
    >
      {label}
    </button>
  )
  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-[var(--color-line)] p-0.5">
      {opt('en', 'EN')}
      {opt('es', 'ES')}
    </div>
  )
}

export function Nav() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { t: t.nav.features, href: '#features' },
    { t: t.nav.how, href: '#how' },
    { t: t.nav.privacy, href: '#privacy' },
    { t: t.nav.faq, href: '#faq' },
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transform-gpu transition-colors duration-300 ${
        scrolled
          ? 'bg-[var(--color-ink)]/95 border-b border-[var(--color-line)] sm:bg-[var(--color-ink)]/80 sm:backdrop-blur-lg'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 font-bold tracking-tight" title="頼りになった · your reliable one">
          <Mascot className="h-8 w-8 shrink-0" />
          <span className="text-[17px]">Tayori</span>
          <span className="hidden sm:inline text-sm font-medium text-[var(--color-mute-2)]">頼り</span>
        </a>

        <div className="hidden md:flex items-center gap-7 text-sm text-[var(--color-mute)]">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.t}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <LangToggle />
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-line)] text-[var(--color-mute)] hover:text-white hover:border-white/25 transition-colors"
          >
            <Icon.github className="h-4.5 w-4.5" />
          </a>
          <a
            href="/download"
            className="btn-glow inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-white"
          >
            <Icon.download className="h-4 w-4" />
            <span className="hidden xs:inline">{t.nav.download}</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
