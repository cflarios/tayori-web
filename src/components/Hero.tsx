import { useI18n } from '../i18n'
import { useLatestRelease } from '../useLatestRelease'
import { Icon } from '../icons'

export function Hero() {
  const { t } = useI18n()
  const tag = useLatestRelease()

  return (
    <section id="top" className="px-5 pt-[104px] sm:px-10 sm:pt-[148px]">
      <div className="mx-auto max-w-[1120px] sm:text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-white/4 px-3.5 py-1.5 text-[12.5px] font-semibold text-mute">
          <span className="pulse-dot h-[7px] w-[7px] rounded-full bg-green" />
          <span className="sm:hidden">{t.hero.badgeShort}</span>
          <span className="hidden sm:inline">{t.hero.badge}</span>
        </div>

        <h1 className="mt-5 max-w-[900px] font-display text-[38px] font-bold leading-[1.06] tracking-[-0.03em] text-pretty sm:mx-auto sm:mt-6.5 sm:text-[54px] sm:leading-[1.04] lg:text-[68px]">
          {t.hero.title[0]}{' '}
          <span className="text-violet-2 sm:block">{t.hero.title[1]}</span>
        </h1>

        <p className="mt-4.5 max-w-[620px] text-base leading-[1.6] text-mute sm:mx-auto sm:mt-6 sm:text-[18px]">
          {t.hero.sub}
        </p>

        <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:justify-center sm:gap-3">
          <a
            href="/download"
            className="btn btn-primary flex h-[52px] items-center justify-center gap-2.5 rounded-[13px] text-base font-bold sm:h-auto sm:rounded-xl sm:px-6 sm:py-3.5 sm:text-[15px]"
          >
            <Icon.windows className="h-[18px] w-[18px]" />
            {t.hero.ctaDownload}
          </a>
          <a
            href="https://github.com/cflarios/Tayori"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost flex h-[52px] items-center justify-center gap-2.5 rounded-[13px] text-base font-semibold sm:h-auto sm:rounded-xl sm:px-6 sm:py-3.5 sm:text-[15px]"
          >
            {t.hero.ctaGithub}
          </a>
        </div>

        <p className="mt-4 text-[13px] leading-[1.55] text-mute-3 sm:mt-5 sm:text-[13.5px]">
          {tag ? `${tag} · ` : ''}
          {t.hero.note}
        </p>
      </div>
    </section>
  )
}
