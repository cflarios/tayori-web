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
      <path d="M6 8a6 6 0 0 1 12 0c0 3-2 4-2 7a4 4 0 0 1-8 0M9 8a3 3 0 0 1 6 0" />
    </svg>
  ),
  wave: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 12h2M7 8v8M11 5v14M15 8v8M19 11v2" />
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
  /** Teleprompter: four lines of unequal length, the active one long. */
  lines: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 6h10M4 10h16M4 14h16M4 18h8" />
    </svg>
  ),
  phone: (p: P) => (
    <svg {...base(p)}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  ),
  /** A monitor on a stand — used for "your screen" and the sharing banners. */
  monitor: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 6h18v11H3zM8 21h8M12 17v4" />
    </svg>
  ),
  shield: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3l8 3v6c0 5-3.4 8.3-8 9-4.6-.7-8-4-8-9V6l8-3Z" />
    </svg>
  ),
  eyeOff: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 3l18 18M10.6 5.1A9.7 9.7 0 0 1 12 5c5 0 9 4.5 9 7a11 11 0 0 1-2.4 3.6M6.3 6.4C3.9 8 2 10.4 2 12c0 2.5 4 7 10 7 1.6 0 3-.3 4.3-.8" />
    </svg>
  ),
  volume: (p: P) => (
    <svg {...base(p)}>
      <path d="M11 5 6 9H3v6h3l5 4V5ZM16 9.5a4 4 0 0 1 0 5M19 7a7.5 7.5 0 0 1 0 10" />
    </svg>
  ),
  check: (p: P) => (
    <svg {...base({ strokeWidth: 2, ...p })}>
      <path d="M4 12.5 9 17.5 20 6.5" />
    </svg>
  ),
  menu: (p: P) => (
    <svg {...base({ strokeWidth: 1.8, ...p })}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p: P) => (
    <svg {...base({ strokeWidth: 1.8, ...p })}>
      <path d="M6 6l12 12M18 6L6 18" />
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
  windows: (p: P) => (
    <svg {...base({ ...p, fill: 'currentColor', stroke: 'none' })}>
      <path d="M3 5.6 10 4.6v6.6H3V5.6ZM11.2 4.4 21 3v8.2h-9.8V4.4ZM3 12.8h7v6.6l-7-1V12.8ZM11.2 12.8H21V21l-9.8-1.4v-6.8Z" />
    </svg>
  ),
} as const

export type IconName = keyof typeof Icon
