import { useI18n } from '../i18n'
import { Icon, type IconName } from '../icons'
import { Reveal } from './Reveal'

function Kicker({ children }: { children: string }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.2em] grad-text">{children}</span>
  )
}

/* ------------------------------------------------------------------ Invisible */

export function Invisible() {
  const { t } = useI18n()
  const s = t.invisible

  return (
    <section id="invisible" className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Kicker>{s.kicker}</Kicker>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{s.title}</h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-[var(--color-mute)]">{s.body}</p>
          </Reveal>

          <Reveal delay={120} className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2 text-emerald-300">
                <Icon.eyeOff className="h-5 w-5" />
                <span className="text-sm font-semibold">{s.hiddenTitle}</span>
              </div>
              <ul className="space-y-2.5">
                {s.hidden.map((h) => (
                  <li key={h} className="flex gap-2 text-sm leading-snug text-[#e6e5f2]">
                    <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2 text-amber-300">
                <Icon.shield className="h-5 w-5" />
                <span className="text-sm font-semibold">{s.honestTitle}</span>
              </div>
              <ul className="space-y-2.5">
                {s.honest.map((h) => (
                  <li key={h} className="flex gap-2 text-sm leading-snug text-[var(--color-mute)]">
                    <span className="mt-0.5 h-4 w-4 shrink-0 text-center text-amber-400/80">×</span>
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-[var(--color-line)] pt-3 text-xs leading-relaxed text-[var(--color-mute-2)]">
                {s.honestNote}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- Features */

export function Features() {
  const { t } = useI18n()
  const s = t.features

  return (
    <section id="features" className="relative py-24 hairline">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker>{s.kicker}</Kicker>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{s.title}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-mute)]">{s.sub}</p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item, i) => {
            const Ico = Icon[item.icon as IconName]
            return (
              <Reveal as="div" key={item.t} delay={(i % 3) * 80}>
                <div className="glass glass-hover h-full rounded-2xl p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/10 text-violet-300 ring-1 ring-white/10">
                    <Ico className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-white">{item.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-mute)]">{item.d}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- How it works */

export function HowItWorks() {
  const { t } = useI18n()
  const s = t.how

  return (
    <section id="how" className="relative py-24 hairline">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <Kicker>{s.kicker}</Kicker>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{s.title}</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {s.steps.map((step, i) => (
            <Reveal as="div" key={step.n} delay={i * 100}>
              <div className="relative h-full rounded-2xl border border-[var(--color-line)] bg-white/[0.02] p-7">
                <div className="grad-text font-mono text-4xl font-bold opacity-90">{step.n}</div>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-mute)]">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------- Privacy */

export function Privacy() {
  const { t } = useI18n()
  const s = t.privacy

  return (
    <section id="privacy" className="relative py-24 hairline">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Kicker>{s.kicker}</Kicker>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{s.title}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-[var(--color-mute)]">{s.sub}</p>
          </Reveal>

          <Reveal delay={120} className="grid gap-4 sm:grid-cols-2">
            {s.cards.map((c) => (
              <div key={c.t} className="glass rounded-2xl p-5">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-400/20">
                  <Icon.shield className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-sm font-semibold text-white">{c.t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-mute)]">{c.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ Providers */

const PROVIDERS = ['Claude', 'Gemini', 'ChatGPT', 'DeepSeek', 'Ollama', 'Whisper']

export function Providers() {
  const { t } = useI18n()
  const s = t.providers

  return (
    <section className="relative py-16 hairline">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <Kicker>{s.kicker}</Kicker>
          <h2 className="mt-3 text-xl font-semibold text-[var(--color-mute)]">{s.title}</h2>
        </Reveal>
      </div>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee-track flex w-max gap-4">
          {[...PROVIDERS, ...PROVIDERS, ...PROVIDERS, ...PROVIDERS].map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-xl border border-[var(--color-line)] bg-white/[0.03] px-6 py-3 text-[15px] font-semibold text-[#dcdbe8]"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
