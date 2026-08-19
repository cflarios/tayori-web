import { useI18n } from '../i18n'
import { Icon } from '../icons'
import { Reveal } from './Reveal'

/**
 * The honest ledger: what the capture-exclusion flag hides, and — right next to
 * it, same weight — what it does nothing about.
 */
export function Ledger() {
  const { t } = useI18n()
  const s = t.ledger

  return (
    <section id="ledger" className="px-5 pt-16 sm:px-10 sm:pt-24">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-violet-2">{s.kicker}</span>
            <h2 className="mt-4 font-display text-[30px] font-bold leading-[1.1] tracking-[-0.03em] text-pretty sm:mt-4.5 sm:text-[40px]">
              {s.title}
            </h2>
            <p className="mt-4 text-base leading-[1.6] text-mute sm:mt-4.5 sm:text-[17px]">{s.body}</p>
          </Reveal>

          <Reveal delay={120} className="grid gap-4 sm:grid-cols-2">
            <div className="tile p-5 sm:p-6.5">
              <div className="flex items-center gap-2.5 text-mint">
                <Icon.eyeOff className="h-5 w-5" strokeWidth={1.7} />
                <span className="font-display text-[17px] font-semibold">{s.hiddenTitle}</span>
              </div>
              <ul className="mt-4.5 flex flex-col gap-3">
                {s.hidden.map((h) => (
                  <li key={h} className="flex gap-2.5 text-[14.5px] leading-[1.5] text-fg-2">
                    <Icon.check className="mt-[3px] h-[15px] w-[15px] shrink-0 text-green" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="tile p-5 sm:p-6.5">
              <div className="flex items-center gap-2.5 text-amber">
                <Icon.shield className="h-5 w-5" strokeWidth={1.7} />
                <span className="font-display text-[17px] font-semibold">{s.cantTitle}</span>
              </div>
              <ul className="mt-4.5 flex flex-col gap-3">
                {s.cant.map((c) => (
                  <li key={c} className="flex gap-2.5 text-[14.5px] leading-[1.5] text-mute">
                    <span className="mt-px w-[15px] shrink-0 text-center text-amber/85">×</span>
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4.5 border-t border-line pt-3.5 text-[13px] leading-[1.6] text-mute-3">{s.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
