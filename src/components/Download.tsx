import { useI18n } from '../i18n'
import { useLatestRelease } from '../useLatestRelease'
import { Icon } from '../icons'
import { Link } from '../router'
import { Reveal } from './Reveal'

/** The one closing call to action. Same primary button as the hero, nothing new. */
export function Download() {
  const { t } = useI18n()
  const s = t.cta
  const tag = useLatestRelease()

  return (
    <section id="download" className="px-5 pt-16 sm:px-10 sm:pt-24">
      <Reveal className="mx-auto max-w-[1120px]">
        <div className="overflow-hidden rounded-[20px] border border-[rgba(139,92,246,0.25)] bg-[linear-gradient(160deg,rgba(139,92,246,0.14),rgba(34,211,238,0.06)_60%,transparent)] p-7 text-center sm:rounded-3xl sm:p-14">
          <h2 className="font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-pretty sm:text-[44px]">
            {s.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-base leading-[1.6] text-mute sm:text-[17px]">{s.sub}</p>

          <div className="mt-6 flex flex-col justify-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
            <a
              href="/download"
              className="btn btn-primary flex h-[52px] items-center justify-center gap-2.5 rounded-[13px] text-base font-bold sm:h-auto sm:rounded-xl sm:px-7 sm:py-[15px]"
            >
              <Icon.windows className="h-[19px] w-[19px]" />
              {s.ctaDownload}
            </a>
            <Link
              to="/docs"
              className="btn btn-ghost flex h-[52px] items-center justify-center gap-2.5 rounded-[13px] text-base font-semibold sm:h-auto sm:rounded-xl sm:px-7 sm:py-[15px]"
            >
              {s.ctaDocs}
            </Link>
          </div>

          <p className="mt-6 font-mono text-xs uppercase leading-[1.6] tracking-[0.1em] text-mute-3 sm:mt-6.5">
            {tag ? `${tag} · ` : ''}
            {s.foot}
          </p>
        </div>
      </Reveal>
    </section>
  )
}
