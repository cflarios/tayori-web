import { useI18n } from '../i18n'
import { Icon } from '../icons'
import { Mascot } from './Mascot'
import { Reveal } from './Reveal'

/** A participant video tile in the mock call. */
function Tile({ name, initial, active }: { name: string; initial: string; active?: boolean }) {
  return (
    <div className="relative aspect-[4/3] flex-1 overflow-hidden rounded-lg border border-white/8 bg-gradient-to-br from-white/[0.05] to-white/[0.015]">
      {active && (
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
      )}
      <div className="absolute inset-0 grid place-items-center">
        <div
          className={`grid h-12 w-12 place-items-center rounded-full text-base font-bold text-white ${
            active ? 'bg-gradient-to-br from-violet-500 to-cyan-500' : 'bg-white/10 text-white/70'
          }`}
        >
          {initial}
        </div>
      </div>
      <span className="absolute bottom-2 left-2.5 text-[11px] font-medium text-white/75">{name}</span>
    </div>
  )
}

/** The Tayori overlay, floating over the call — shown only on "your screen". */
function FloatingOverlay() {
  const { lang, t } = useI18n()
  const copy =
    lang === 'es'
      ? {
          listening: 'Escuchando',
          them: 'Alex',
          transcript: '“Háblame de un proyecto que hayas liderado.”',
          bullets: ['Migración de facturación a uso — lideré el alcance…', 'Despliegue en tres fases, sin caídas.'],
        }
      : {
          listening: 'Listening',
          them: 'Alex',
          transcript: '“Tell me about a project you led end to end.”',
          bullets: ['Billing migration to usage-based — I owned scoping…', 'Three-phase rollout, zero downtime.'],
        }

  return (
    <div className="absolute left-1/2 top-11 z-10 w-[88%] max-w-[300px] -translate-x-1/2">
      <Mascot className="absolute -left-3.5 -top-4 h-8 w-8 drop-shadow-[0_4px_12px_rgba(139,92,246,0.4)]" />
      <div className="glass rounded-xl p-3 shadow-2xl shadow-black/50">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {copy.listening}
          </span>
          <span className="text-[9px] text-[var(--color-mute-2)]">⋯</span>
        </div>
        <p className="text-[11px] leading-snug text-[var(--color-mute)]">
          <span className="mr-1 rounded bg-cyan-400/15 px-1 text-[9px] font-semibold text-cyan-300">{copy.them}</span>
          {copy.transcript}
        </p>
        <div className="mt-2 mb-1 text-[9px] font-semibold uppercase tracking-wider grad-text">✦ {t.vanish.overlayHint}</div>
        <ul className="space-y-1">
          {copy.bullets.map((b) => (
            <li key={b} className="flex gap-1.5 text-[10.5px] leading-snug text-[#e6e5f2]">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function CallPanel({
  label,
  sub,
  icon,
  withOverlay,
}: {
  label: string
  sub: string
  icon: 'you' | 'them'
  withOverlay?: boolean
}) {
  const { t } = useI18n()
  const Ico = icon === 'you' ? Icon.eyeOff : Icon.globe
  return (
    <div className="flex-1">
      <div className="mb-2.5 flex items-baseline gap-2">
        <Ico className={`h-4 w-4 ${icon === 'you' ? 'text-violet-300' : 'text-cyan-300'}`} />
        <span className="text-sm font-semibold text-white">{label}</span>
        <span className="text-xs text-[var(--color-mute-2)]">— {sub}</span>
      </div>
      <div
        className={`relative overflow-hidden rounded-xl border bg-[#0a0a12] p-3 ${
          withOverlay ? 'border-violet-500/30' : 'border-[var(--color-line)]'
        }`}
      >
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/15">
          <Icon.screen className="h-3.5 w-3.5" />
          {t.vanish.sharing}
        </div>
        <div className="flex gap-3">
          <Tile name={t.vanish.other} initial={t.vanish.other[0]} active />
          <Tile name={t.vanish.you} initial={t.vanish.you[0]} />
        </div>
        {withOverlay && <FloatingOverlay />}
      </div>
    </div>
  )
}

export function VanishDemo() {
  const { t } = useI18n()

  return (
    <section id="vanish" className="relative py-24 hairline">
      <div className="mx-auto max-w-5xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] grad-text">{t.vanish.kicker}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{t.vanish.title}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-mute)]">{t.vanish.sub}</p>
        </Reveal>

        <Reveal delay={120} className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-start">
          <CallPanel label={t.vanish.yours} sub={t.vanish.yoursSub} icon="you" withOverlay />
          <CallPanel label={t.vanish.theirs} sub={t.vanish.theirsSub} icon="them" />
        </Reveal>

        <Reveal delay={200} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {t.vanish.benefits.map((b) => (
            <span key={b} className="flex items-center gap-2 text-sm font-medium text-[#dcdbe8]">
              <Icon.check className="h-4 w-4 text-emerald-400" />
              {b}
            </span>
          ))}
        </Reveal>

        <Reveal delay={260} className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-[var(--color-mute-2)]">{t.vanish.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
