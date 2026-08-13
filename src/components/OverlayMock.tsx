import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'

function useMockCopy() {
  const { lang } = useI18n()
  return lang === 'es'
    ? {
        listening: 'Escuchando',
        them: 'Ellos',
        you: 'Tú',
        transcript: '¿Cómo manejarías un pico de tráfico 10× en el checkout?',
        suggestion: 'Sugerencia',
        thinking: 'Pensando…',
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
        transcript: 'How would you handle a 10× traffic spike at checkout?',
        suggestion: 'Suggestion',
        thinking: 'Thinking…',
        bullets: [
          'Numbers first: current RPS and expected peak.',
          'Read-through cache + queue the writes.',
          'Horizontal autoscaling with cost caps.',
          'Feature flag to degrade gracefully.',
        ],
        hidden: 'Hidden while sharing screen',
      }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

type Phase = 'idle' | 'thinking' | 'answer'

/**
 * A stylized reproduction of Tayori's floating overlay.
 * `animated` runs a looping listen → transcribe → answer sequence.
 */
export function OverlayMock({ animated = false }: { animated?: boolean }) {
  const { lang } = useI18n()
  const copy = useMockCopy()

  const [chars, setChars] = useState(animated ? 0 : copy.transcript.length)
  const [phase, setPhase] = useState<Phase>(animated ? 'idle' : 'answer')
  const [bullets, setBullets] = useState(animated ? 0 : copy.bullets.length)
  const copyRef = useRef(copy)
  copyRef.current = copy

  useEffect(() => {
    if (!animated) {
      setChars(copy.transcript.length)
      setPhase('answer')
      setBullets(copy.bullets.length)
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setChars(copy.transcript.length)
      setPhase('answer')
      setBullets(copy.bullets.length)
      return
    }

    let cancelled = false
    async function run() {
      while (!cancelled) {
        const c = copyRef.current
        setChars(0)
        setPhase('idle')
        setBullets(0)
        await sleep(900)
        for (let i = 1; i <= c.transcript.length; i++) {
          if (cancelled) return
          setChars(i)
          await sleep(26)
        }
        await sleep(550)
        if (cancelled) return
        setPhase('thinking')
        await sleep(1000)
        if (cancelled) return
        setPhase('answer')
        for (let i = 1; i <= c.bullets.length; i++) {
          if (cancelled) return
          setBullets(i)
          await sleep(620)
        }
        await sleep(2800)
      }
    }
    run()
    return () => {
      cancelled = true
    }
    // Restart the loop when the language switches.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animated, lang])

  const typed = copy.transcript.slice(0, chars)
  const typing = animated && phase === 'idle' && chars < copy.transcript.length
  const showSuggestion = phase !== 'idle'

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
            <span className="ml-1">⋯</span>
          </div>
        </div>

        {/* Transcript */}
        <div className="px-3.5 pt-3 min-h-[2.75rem]">
          <p className="text-[13px] leading-relaxed text-[var(--color-mute)]">
            <span className="mr-1.5 inline-block rounded bg-cyan-400/15 px-1 text-[10px] font-semibold text-cyan-300 align-middle">
              {copy.them}
            </span>
            “{typed}
            {typing && <span className="inline-block w-[2px] h-[0.9em] -mb-0.5 ml-0.5 bg-cyan-300 animate-pulse" />}
            {!typing && '”'}
          </p>
        </div>

        {/* Suggestion */}
        <div className="mt-3 px-3.5 pb-3.5 min-h-[7.5rem]">
          <div
            className={`mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-mute-2)] transition-opacity duration-300 ${
              showSuggestion ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="grad-text">✦ {copy.suggestion}</span>
            <span className="text-[var(--color-mute-2)]/60">‹ 2/5 ›</span>
          </div>

          {phase === 'thinking' ? (
            <div className="flex items-center gap-1.5 text-[13px] text-[var(--color-mute)]">
              {copy.thinking}
              <span className="flex gap-0.5">
                <span className="h-1 w-1 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.2s]" />
                <span className="h-1 w-1 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.1s]" />
                <span className="h-1 w-1 rounded-full bg-violet-400 animate-bounce" />
              </span>
            </div>
          ) : (
            <ul className="space-y-1.5">
              {copy.bullets.slice(0, bullets).map((b, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-[13px] leading-snug text-[#e6e5f2] motion-safe:animate-[fadeUp_.35s_ease]"
                >
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                  {b}
                </li>
              ))}
            </ul>
          )}
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
