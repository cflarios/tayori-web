import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = (props: P) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

export const Icon = {
  ears: (p: P) => (
    <svg {...base(p)}>
      <path d="M6 8a6 6 0 0 1 12 0c0 3-2 4-2 7a4 4 0 0 1-8 0" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  ),
  wave: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 12h2M7 8v8M11 5v14M15 8v8M19 11v2M21 12h0" />
    </svg>
  ),
  spark: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  ),
  globe: (p: P) => (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  ),
  code: (p: P) => (
    <svg {...base(p)}>
      <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" />
    </svg>
  ),
  layers: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3l9 5-9 5-9-5 9-5Z" />
      <path d="M3 13l9 5 9-5M3 16l9 5 9-5" opacity="0.55" />
    </svg>
  ),
  book: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 5a2 2 0 0 1 2-2h11v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M9 3v14" opacity="0.5" />
    </svg>
  ),
  read: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 6h10M4 10h16M4 14h16M4 18h8" />
      <rect x="2" y="9" width="20" height="6" rx="1.5" opacity="0.4" />
    </svg>
  ),
  phone: (p: P) => (
    <svg {...base(p)}>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  ),
  shield: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  eyeOff: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.4 5.2A9.5 9.5 0 0 1 12 5c5 0 9 4.5 9 7 0 1-.7 2.4-2 3.7M6.3 6.5C3.9 8 2 10.4 2 12c0 2.5 4 7 10 7 1.3 0 2.5-.2 3.6-.6" />
    </svg>
  ),
  github: (p: P) => (
    <svg {...base(p)}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6 3.3 4.9 3.6 4.9 3.6a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 10c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  ),
  download: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3v12M7 11l5 4 5-4M4 20h16" />
    </svg>
  ),
  arrow: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  search: (p: P) => (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  screen: (p: P) => (
    <svg {...base(p)}>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  volume: (p: P) => (
    <svg {...base(p)}>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M16 9a4 4 0 0 1 0 6" />
      <path d="M19 6.5a8 8 0 0 1 0 11" />
    </svg>
  ),
  pencil: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17z" />
      <path d="M13.5 6.5l3 3" />
    </svg>
  ),
  check: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 12l5 5L20 6" />
    </svg>
  ),
  windows: (p: P) => (
    <svg {...base({ ...p, fill: 'currentColor', stroke: 'none' })}>
      <path d="M3 5.5 10.5 4.4V11.4H3V5.5ZM10.5 12.6V19.6L3 18.5V12.6H10.5ZM11.7 4.2 21 3V11.4H11.7V4.2ZM21 12.6V21L11.7 19.8V12.6H21Z" />
    </svg>
  ),
  logo: (p: P) => (
    <svg {...base({ ...p, strokeWidth: 1.8 })}>
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="0.5" stopColor="#67e8f9" />
          <stop offset="1" stopColor="#f0abfc" />
        </linearGradient>
      </defs>
      <path d="M4 6h16M12 6v13" stroke="url(#tg)" />
      <path d="M7.5 15c1.2 1.6 3 2.5 4.5 2.5s3.3-.9 4.5-2.5" stroke="url(#tg)" opacity="0.75" />
    </svg>
  ),
} as const

export type IconName = keyof typeof Icon
