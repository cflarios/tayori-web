import { useI18n } from '../i18n'

/** A stylized reproduction of Tayori's floating overlay, for the hero. */
export function OverlayMock() {
  const { lang } = useI18n()

  const copy =
    lang === 'es'
      ? {
          listening: 'Escuchando',
          them: 'Ellos',
          you: 'Tú',
          transcript: '“¿Cómo manejarías un pico de tráfico 10× en el checkout?”',
          suggestion: 'Sugerencia',
          bullets: [
            'Primero los números: RPS actual y pico esperado.',
            'Cache de lectura + cola para escrituras.',
            'Autoescalado horizontal con límites de coste.',
            'Feature flag para degradar con elegancia.',
          ],
          hidden: 'Oculto al compartir pantalla',
        }
      : {
          listening: 'Listening',
          them: 'Them',
          you: 'You',
          transcript: '“How would you handle a 10× traffic spike at checkout?”',
          suggestion: 'Suggestion',
          bullets: [
            'Numbers first: current RPS and expected peak.',
            'Read-through cache + queue the writes.',
            'Horizontal autoscaling with cost caps.',
            'Feature flag to degrade gracefully.',
          ],
          hidden: 'Hidden while sharing screen',
        }

  return (
    <div className="floaty w-full max-w-[400px] select-none" aria-hidden="true">
      <div className="glass rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
        {/* Title bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[var(--color-line)]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-semibold text-emerald-300">{copy.listening}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-[var(--color-mute-2)]">
            <span className="rounded-md bg-white/6 px-1.5 py-0.5 text-cyan-300">{copy.them}</span>
            <span className="rounded-md bg-white/6 px-1.5 py-0.5">{copy.you}</span>
            <span className="ml-1 flex gap-0.5">⋯</span>
          </div>
        </div>

        {/* Transcript */}
        <div className="px-3.5 pt-3">
          <p className="text-[13px] leading-relaxed text-[var(--color-mute)]">
            <span className="mr-1.5 inline-block rounded bg-cyan-400/15 px-1 text-[10px] font-semibold text-cyan-300 align-middle">
              {copy.them}
            </span>
            {copy.transcript}
          </p>
        </div>

        {/* Suggestion */}
        <div className="mt-3 px-3.5 pb-3.5">
          <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-mute-2)]">
            <span className="grad-text">✦ {copy.suggestion}</span>
            <span className="text-[var(--color-mute-2)]/60">‹ 2/5 ›</span>
          </div>
          <ul className="space-y-1.5">
            {copy.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-[13px] leading-snug text-[#e6e5f2]">
                <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating "hidden" chip */}
      <div className="mx-auto mt-3 w-fit rounded-full border border-[var(--color-line)] bg-[var(--color-ink-2)]/80 px-3 py-1.5 text-[11px] font-medium text-[var(--color-mute)] backdrop-blur">
        <span className="mr-1.5 text-cyan-300">◐</span>
        {copy.hidden}
      </div>
    </div>
  )
}
