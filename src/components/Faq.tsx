import { useI18n } from '../i18n'
import { Reveal } from './Reveal'

export function Faq() {
  const { t } = useI18n()
  const s = t.faq

  return (
    <section id="faq" className="px-5 pt-16 sm:px-10 sm:pt-24">
      <div className="mx-auto max-w-[760px]">
        <Reveal className="sm:text-center">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-violet-2">{s.kicker}</span>
          <h2 className="mt-4 font-display text-[30px] font-bold leading-[1.1] tracking-[-0.03em] sm:mt-4.5 sm:text-[40px]">
            {s.title}
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-8 border-t border-line-2 sm:mt-10">
          {s.items.map((item) => (
            <details key={item.q} className="group border-b border-line-2">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-[15px] font-bold text-fg transition-colors group-hover:text-violet-3 sm:text-base">
                  {item.q}
                </span>
                <span className="relative h-[18px] w-[18px] shrink-0 text-mute-2 transition-transform duration-300 group-open:rotate-45">
                  <span className="absolute left-1/2 top-1/2 h-[13px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[13px] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-current" />
                </span>
              </summary>
              <p className="pb-6 pr-0 text-[15px] leading-[1.7] text-mute sm:pr-10">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
