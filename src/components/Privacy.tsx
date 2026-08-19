import { useI18n } from '../i18n'
import { Icon } from '../icons'
import { Reveal } from './Reveal'

export function Privacy() {
  const { t } = useI18n()
  const s = t.privacy

  return (
    <section id="privacy" className="px-5 pt-16 sm:px-10 sm:pt-24">
      <div className="mx-auto max-w-[1120px]">
        <Reveal>
          <div className="rounded-[20px] border border-line-2 bg-panel p-6 sm:rounded-3xl sm:p-12">
            <div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-mint">{s.kicker}</span>
                <h2 className="mt-4 font-display text-[28px] font-bold leading-[1.12] tracking-[-0.03em] text-pretty sm:mt-4.5 sm:text-[36px]">
                  {s.title}
                </h2>
                <p className="mt-4 text-[15px] leading-[1.6] text-mute sm:mt-4.5 sm:text-base">{s.sub}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {s.cards.map((c) => (
                  <div key={c.t} className="rounded-[14px] border border-line bg-well p-5 sm:p-5.5">
                    <div className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-[rgba(52,211,153,0.1)] text-mint shadow-[inset_0_0_0_1px_rgba(52,211,153,0.2)]">
                      <Icon.shield className="h-[17px] w-[17px]" strokeWidth={1.7} />
                    </div>
                    <h3 className="mt-3.5 font-display text-base font-semibold tracking-[-0.02em]">{c.t}</h3>
                    <p className="mt-2 text-[13.5px] leading-[1.6] text-mute">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
