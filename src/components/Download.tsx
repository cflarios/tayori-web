import { useI18n } from '../i18n'
import { useLatestRelease } from '../useLatestRelease'
import { Icon } from '../icons'
import { Reveal } from './Reveal'

export function Download() {
  const { t } = useI18n()
  const s = t.download
  const tag = useLatestRelease()

  return (
    <section id="download" className="relative py-24 hairline">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-violet-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] grad-text">{s.kicker}</span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{s.title}</h2>
                <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[var(--color-mute)]">{s.sub}</p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="/download"
                    className="btn-glow inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-base font-semibold text-white"
                  >
                    <Icon.windows className="h-5 w-5" />
                    {s.cta}
                  </a>
                  <span className="text-sm text-[var(--color-mute-2)]">
                    {tag ? `${tag} · ` : ''}
                    {s.version} · ~98 MB
                  </span>
                </div>

                <p className="mt-6 text-sm text-[var(--color-mute-2)]">
                  {s.alt}{' '}
                  <a
                    href="https://github.com/cflarios/Tayori/blob/main/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-cyan-300 underline-offset-4 hover:underline"
                  >
                    {s.altCta}
                  </a>
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)]/60 p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-mute-2)]">
                  {s.reqTitle}
                </h3>
                <ul className="space-y-3">
                  {s.req.map((r) => (
                    <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-[#e6e5f2]">
                      <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
