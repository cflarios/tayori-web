import { useI18n } from '../i18n'
import { useLatestRelease } from '../useLatestRelease'
import { Icon } from '../icons'
import { OverlayMock } from './OverlayMock'

export function Hero() {
  const { t } = useI18n()
  const tag = useLatestRelease()

  return (
    <section id="top" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-white/4 px-3 py-1 text-xs font-medium text-[var(--color-mute)]">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
              {t.hero.badge}
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              <span className="block">{t.hero.title[0]}</span>
              <span className="grad-text block">{t.hero.title[1]}</span>
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--color-mute)]">{t.hero.sub}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/download"
                className="btn-glow inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold text-white"
              >
                <Icon.windows className="h-5 w-5" />
                {t.hero.ctaDownload}
              </a>
              <a
                href="https://github.com/cflarios/Tayori"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white/4 px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/8"
              >
                <Icon.github className="h-5 w-5" />
                {t.hero.ctaGithub}
              </a>
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm text-[var(--color-mute-2)]">
              <Icon.check className="h-4 w-4 text-emerald-400" />
              {t.hero.note}
              {tag && <span className="ml-1 rounded-md bg-white/6 px-1.5 py-0.5 font-mono text-xs text-[var(--color-mute)]">{tag}</span>}
            </p>
          </div>

          {/* Right: overlay mock */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-violet-600/20 blur-3xl" />
            <OverlayMock />
          </div>
        </div>
      </div>
    </section>
  )
}
