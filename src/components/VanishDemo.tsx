import { useState } from 'react'
import { useI18n } from '../i18n'
import { Icon } from '../icons'
import { Mascot } from './Mascot'
import { Reveal } from './Reveal'

/** Fake shared "code editor" content — a few tinted rows that read as code. */
const CODE_ROWS: { indent: number; segs: [number, string][] }[] = [
  { indent: 0, segs: [[42, 'bg-violet-400/70'], [70, 'bg-white/15']] },
  { indent: 1, segs: [[30, 'bg-cyan-300/60'], [54, 'bg-white/12'], [26, 'bg-fuchsia-400/50']] },
  { indent: 1, segs: [[60, 'bg-white/12'], [34, 'bg-emerald-300/50']] },
  { indent: 2, segs: [[24, 'bg-cyan-300/60'], [80, 'bg-white/12']] },
  { indent: 2, segs: [[48, 'bg-white/12'], [40, 'bg-violet-400/60']] },
  { indent: 1, segs: [[36, 'bg-fuchsia-400/50'], [58, 'bg-white/12']] },
  { indent: 0, segs: [[50, 'bg-white/12'], [30, 'bg-cyan-300/50']] },
]

function MiniOverlay({ hint, hidden }: { hint: string; hidden: boolean }) {
  const { lang } = useI18n()
  const lines = lang === 'es' ? ['Primero los números: RPS y pico.', 'Cache de lectura + cola de escrituras.'] : ['Numbers first: RPS and peak.', 'Read-through cache + queue writes.']

  return (
    <div
      className={`absolute right-2.5 top-2.5 w-[62%] max-w-[210px] transition-all duration-500 ${
        hidden ? 'pointer-events-none -translate-y-1 scale-90 opacity-0 blur-[3px]' : 'opacity-100'
      }`}
    >
      <Mascot className="absolute -left-4 -top-4 h-9 w-9 drop-shadow-[0_4px_12px_rgba(139,92,246,0.4)]" />
      <div className="glass rounded-lg p-2.5 shadow-xl shadow-black/40">
        <div className="mb-1.5 flex items-center gap-1 text-[8px] font-semibold uppercase tracking-wider">
          <span className="grad-text">✦ {hint}</span>
        </div>
        <ul className="space-y-1">
          {lines.map((l) => (
            <li key={l} className="flex gap-1.5 text-[10px] leading-snug text-[#e6e5f2]">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Screen({
  label,
  variant,
  sharing,
  overlayHidden,
}: {
  label: string
  variant: 'mine' | 'theirs'
  sharing: boolean
  overlayHidden: boolean
}) {
  const { t } = useI18n()
  const live = variant === 'theirs' && sharing

  return (
    <div className="flex-1">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#dcdbe8]">
        {variant === 'mine' ? <Icon.eyeOff className="h-4 w-4 text-violet-300" /> : <Icon.globe className="h-4 w-4 text-cyan-300" />}
        {label}
      </div>

      <div
        className={`relative overflow-hidden rounded-xl border bg-[#0a0a12] transition-colors duration-500 ${
          live ? 'border-rose-500/50 shadow-[0_0_0_1px_rgba(244,63,94,0.25),0_20px_50px_-20px_rgba(244,63,94,0.35)]' : 'border-[var(--color-line)]'
        }`}
      >
        {/* window title bar */}
        <div className="flex items-center gap-2 border-b border-[var(--color-line)] bg-white/[0.02] px-3 py-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </span>
          <span className="ml-1 font-mono text-[11px] text-[var(--color-mute-2)]">{t.vanish.caption}</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-semibold">
            {variant === 'theirs' &&
              (sharing ? (
                <span className="flex items-center gap-1 rounded-full bg-rose-500/15 px-2 py-0.5 text-rose-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
                  {t.vanish.live}
                </span>
              ) : (
                <span className="rounded-full bg-white/6 px-2 py-0.5 text-[var(--color-mute-2)]">{t.vanish.mirror}</span>
              ))}
          </span>
        </div>

        {/* editor body */}
        <div className="relative h-[196px] p-3.5">
          <div className="space-y-2.5">
            {CODE_ROWS.map((row, i) => (
              <div key={i} className="flex items-center gap-1.5" style={{ paddingLeft: row.indent * 16 }}>
                {row.segs.map(([w, color], j) => (
                  <span key={j} className={`h-2 rounded-full ${color}`} style={{ width: w }} />
                ))}
              </div>
            ))}
          </div>

          {/* self-cam tile */}
          <div className="absolute bottom-3 right-3 flex h-14 w-20 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-indigo-500/25 to-cyan-500/15">
            <span className="text-[10px] font-medium text-[var(--color-mute)]">▶ cam</span>
          </div>

          {/* the Tayori overlay */}
          <MiniOverlay hint={t.vanish.overlayHint} hidden={overlayHidden} />
        </div>
      </div>
    </div>
  )
}

export function VanishDemo() {
  const { t } = useI18n()
  const [sharing, setSharing] = useState(false)

  return (
    <section id="vanish" className="relative py-24 hairline">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] grad-text">{t.vanish.kicker}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t.vanish.title}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-mute)]">{t.vanish.sub}</p>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex justify-center">
          <button
            onClick={() => setSharing((v) => !v)}
            aria-pressed={sharing}
            className={`inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white transition-all ${
              sharing
                ? 'border border-rose-500/50 bg-rose-500/15 hover:bg-rose-500/25'
                : 'btn-glow'
            }`}
          >
            <span className={`h-2.5 w-2.5 rounded-full ${sharing ? 'animate-pulse bg-rose-400' : 'bg-white/80'}`} />
            {sharing ? t.vanish.stop : t.vanish.share}
          </button>
        </Reveal>

        <Reveal delay={160} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start">
          <Screen label={t.vanish.yours} variant="mine" sharing={sharing} overlayHidden={false} />
          <Screen label={t.vanish.theirs} variant="theirs" sharing={sharing} overlayHidden={sharing} />
        </Reveal>

        <Reveal delay={220} className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-[var(--color-mute-2)]">{t.vanish.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
