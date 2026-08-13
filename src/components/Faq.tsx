import { useI18n } from '../i18n'
import { Reveal } from './Reveal'

export function Faq() {
  const { t } = useI18n()
  const s = t.faq

  return (
    <section id="faq" className="relative py-24 hairline">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] grad-text">{s.kicker}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{s.title}</h2>
        </Reveal>

        <Reveal delay={100} className="mt-12 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
          {s.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15px] font-semibold text-white transition-colors hover:text-cyan-200 [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="relative h-5 w-5 shrink-0 text-[var(--color-mute)] transition-transform duration-300 group-open:rotate-45">
                  <span className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
                </span>
              </summary>
              <p className="pb-5 pr-9 text-[15px] leading-relaxed text-[var(--color-mute)]">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
