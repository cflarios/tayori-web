import { useEffect, useId, useState } from 'react'

/**
 * Tayori's mascot — a headphoned ghost. Mirrors the animated SVG shipped in the
 * app repo (docs/mascot.svg): it bobs gently, blinks, and its sparkle twinkles
 * and slowly turns. Gradient ids are per-instance so several mascots can share a
 * page, and the SMIL animations pause under prefers-reduced-motion.
 */
export function Mascot({ className = '' }: { className?: string }) {
  const uid = useId().replace(/:/g, '')
  const body = `body-${uid}`
  const gear = `gear-${uid}`
  const glow = `glow-${uid}`

  const [animate, setAnimate] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setAnimate(!mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Tayori mascot">
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#f4f1ff" />
          <stop offset="0.6" stopColor="#dcd6ff" />
          <stop offset="1" stopColor="#c3e9f6" />
        </linearGradient>
        <linearGradient id={gear} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="0.5" stopColor="#818cf8" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id={glow} cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft halo, left still so the ghost reads as floating above it. */}
      <circle cx="24" cy="24" r="22" fill={`url(#${glow})`} />

      {/* Everything else bobs gently, like a ghost hovering. */}
      <g>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -1.6; 0 0"
            keyTimes="0; 0.5; 1"
            dur="3.2s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
          />
        )}

        <path
          d="M10 39 L10 21 C10 13.3 16.3 7 24 7 C31.7 7 38 13.3 38 21 L38 39 Q34.5 43.5 31 39 Q27.5 43.5 24 39 Q20.5 43.5 17 39 Q13.5 43.5 10 39 Z"
          fill={`url(#${body})`}
          stroke={`url(#${gear})`}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        <path d="M8.5 21 A15.5 15.5 0 0 1 39.5 21" fill="none" stroke={`url(#${gear})`} strokeWidth="2.4" strokeLinecap="round" />
        <rect x="5.4" y="18.5" width="5.6" height="9" rx="2.8" fill={`url(#${gear})`} />
        <rect x="37" y="18.5" width="5.6" height="9" rx="2.8" fill={`url(#${gear})`} />

        <ellipse cx="14.5" cy="27" rx="2.1" ry="1.25" fill="#f9a8d4" opacity="0.75" />
        <ellipse cx="33.5" cy="27" rx="2.1" ry="1.25" fill="#f9a8d4" opacity="0.75" />

        {/* Eyes: a quick blink near the end of each cycle. */}
        <ellipse cx="17.6" cy="22.2" rx="2.7" ry="3.6" fill="#2a2340">
          {animate && (
            <animate attributeName="ry" values="3.6;3.6;0.5;3.6;3.6" keyTimes="0;0.9;0.94;0.98;1" dur="4.6s" repeatCount="indefinite" />
          )}
        </ellipse>
        <ellipse cx="30.4" cy="22.2" rx="2.7" ry="3.6" fill="#2a2340">
          {animate && (
            <animate attributeName="ry" values="3.6;3.6;0.5;3.6;3.6" keyTimes="0;0.9;0.94;0.98;1" dur="4.6s" repeatCount="indefinite" />
          )}
        </ellipse>
        <g>
          {animate && (
            <animate attributeName="opacity" values="1;1;0;1;1" keyTimes="0;0.9;0.94;0.98;1" dur="4.6s" repeatCount="indefinite" />
          )}
          <circle cx="16.6" cy="20.6" r="1.1" fill="#fff" />
          <circle cx="18.5" cy="23.4" r="0.6" fill="#fff" />
          <circle cx="29.4" cy="20.6" r="1.1" fill="#fff" />
          <circle cx="31.3" cy="23.4" r="0.6" fill="#fff" />
        </g>

        <path d="M22.2 26.6 Q24 28.4 25.8 26.6" fill="none" stroke="#2a2340" strokeWidth="1.2" strokeLinecap="round" />

        {/* Sparkle: twinkles and slowly turns. */}
        <path d="M40 9 l0.9 2.1 2.1 0.9 -2.1 0.9 -0.9 2.1 -0.9 -2.1 -2.1 -0.9 2.1 -0.9 Z" fill="#67e8f9" opacity="0.9">
          {animate && (
            <>
              <animate attributeName="opacity" values="0.9;0.35;1;0.9" keyTimes="0;0.4;0.7;1" dur="2.6s" repeatCount="indefinite" />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 42.1 11.1"
                to="360 42.1 11.1"
                dur="9s"
                repeatCount="indefinite"
              />
            </>
          )}
        </path>
      </g>
    </svg>
  )
}
