import { useI18n } from '../i18n'
import { Reveal } from './Reveal'

export function HowItWorks() {
  const { t } = useI18n()
  const s = t.how

  return (
    <section id="how" className="px-5 pt-16 sm:px-10 sm:pt-24">
      <div className="mx-auto max-w-[1120px]">
        <Reveal className="max-w-[620px]">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-violet-2">{s.kicker}</span>
          <h2 className="mt-4 font-display text-[30px] font-bold leading-[1.1] tracking-[-0.03em] sm:mt-4.5 sm:text-[40px]">
            {s.title}
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3">
          {s.steps.map((step, i) => (
            <Reveal as="div" key={step.n} delay={i * 100}>
              <div className="h-full rounded-[18px] border border-line bg-gradient-to-b from-white/[0.03] to-transparent p-6 transition-colors hover:border-[rgba(139,92,246,0.35)] sm:p-7.5">
                <div className="font-mono text-[30px] font-bold text-violet-2 sm:text-[34px]">{step.n}</div>
                <h3 className="mt-4 font-display text-[19px] font-semibold tracking-[-0.02em] sm:mt-4.5 sm:text-[21px]">
                  {step.t}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.6] text-mute">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
