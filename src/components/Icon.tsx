// Íconos dibujados en SVG (en lugar de emojis). Usan el color del texto (currentColor).

const PATHS = {
  casa: (
    <>
      <path d="M4 11h16v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
      <path d="M2 12h2M20 12h2M8 11V9h8v2" />
      <path d="M9 6q1-1.5 0-3M12 6q1-1.5 0-3M15 6q1-1.5 0-3" />
    </>
  ),
  barrio: (
    <>
      <path d="M3 11l7-6 7 6v9H3z" />
      <path d="M8 20v-5h4v5" />
      <path d="M17 9h4v11h-4" />
    </>
  ),
  playa: (
    <>
      <path d="M12 21V10" />
      <path d="M12 10C9 5 4 6 3 9c3-1 6 0 9 1zM12 10c3-5 8-4 9-1-3-1-6 0-9 1zM12 10c-1-4 1-7 4-7-2 2-3 4-4 7z" />
      <path d="M3 21q3-2 6 0t6 0 6 0" />
    </>
  ),
  obra: (
    <>
      <path d="M5 16a7 7 0 0 1 14 0" />
      <path d="M3 16h18v2H3z" />
      <path d="M10 9V6h4v3" />
    </>
  ),
  finca: (
    <>
      <path d="M4 20V10l8-6 8 6v10z" />
      <path d="M9 20v-6h6v6M9 14l6 6M15 14l-6 6" />
    </>
  ),
  carnaval: (
    <>
      <path d="M3 9q9-4 18 0 0 6-5 7-2-2-4-2t-4 2Q3 15 3 9z" />
      <path d="M7 10.5h3M14 10.5h3" />
      <path d="M8 6q-1-3 1-4M16 6q1-3-1-4" />
    </>
  ),
  emergencia: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M7 12h10" />
    </>
  ),
  test: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M8 10h8M8 14h8M8 18h5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  bolt: <path d="M13 2L5 14h6l-1 8 8-12h-6z" />,
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="M15 15l5 5" />
    </>
  ),
  decision: (
    <>
      <path d="M12 21V3" />
      <path d="M12 5h7l2 2-2 2h-7M12 11H5l-2 2 2 2h7" />
    </>
  ),
  mito: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7" />
      <path d="M12 17h.01" />
    </>
  ),
  chart: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" />,
  print: (
    <>
      <path d="M7 9V3h10v6" />
      <rect x="3" y="9" width="18" height="8" rx="2" />
      <path d="M7 14h10v7H7z" />
    </>
  ),
  medal: (
    <>
      <path d="M8 3l4 6 4-6" />
      <circle cx="12" cy="15" r="6" />
      <path d="M12 12l1 2h2l-1.5 1.5.5 2-2-1-2 1 .5-2L9 14h2z" />
    </>
  ),
  diploma: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M7 8h10M7 11h6" />
      <circle cx="16" cy="17" r="3" />
      <path d="M14.5 19.5L14 22l2-1 2 1-.5-2.5" />
    </>
  ),
  check: <path d="M5 12l5 5 9-10" />,
  helmet: (
    <>
      <path d="M5 16a7 7 0 0 1 14 0" />
      <path d="M3 16h18v2H3z" />
    </>
  ),
} as const

export type IconName = keyof typeof PATHS

export default function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={'icon ' + (className ?? '')}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}

const BADGE_COLORS: Record<string, string> = {
  casa: '#ff8a3d',
  barrio: '#0e9fb5',
  playa: '#1f9fd6',
  obra: '#e8a91f',
  finca: '#1f9d63',
  carnaval: '#7a3b8f',
  emergencia: '#d6455d',
  test: '#1d4ed8',
  lock: '#9aa7ae',
}

/** Ícono de escenario dentro de un cuadro de color. */
export function ScenarioBadge({ id, size = 40 }: { id: string; size?: number }) {
  const name = (id in PATHS ? id : 'test') as IconName
  return (
    <span className="scenario-badge" style={{ background: BADGE_COLORS[id] ?? BADGE_COLORS.test, width: size, height: size }}>
      <Icon name={name} size={size * 0.6} />
    </span>
  )
}

/** Tres estrellas, llenas según `n`. */
export function Stars({ n, size = 20 }: { n: number; size?: number }) {
  return (
    <span className="stars" aria-label={`${n} de 3 estrellas`}>
      {[0, 1, 2].map((i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
          <path
            d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.8z"
            fill={i < n ? '#ffc83d' : '#e6eef1'}
            stroke={i < n ? '#e08a00' : '#b9c7cd'}
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  )
}

/** Fusible de vidrio: entero o quemado. */
export function Fuse({ ok }: { ok: boolean }) {
  return (
    <svg viewBox="0 0 48 20" width={44} height={18} aria-hidden="true">
      <rect x={1} y={3} width={10} height={14} rx={2} fill="#b8c2c8" stroke="#23343b" strokeWidth={1.5} />
      <rect x={37} y={3} width={10} height={14} rx={2} fill="#b8c2c8" stroke="#23343b" strokeWidth={1.5} />
      <rect x={11} y={4} width={26} height={12} rx={2} fill={ok ? '#e6f7fb' : '#4a3f3a'} stroke="#23343b" strokeWidth={1.5} />
      {ok ? (
        <path d="M11,10 C17,5 21,15 24,10 S31,5 37,10" stroke="#ff8a3d" strokeWidth={1.8} fill="none" />
      ) : (
        <path d="M11,10 L19,8 M29,12 L37,10" stroke="#222" strokeWidth={1.8} fill="none" />
      )}
    </svg>
  )
}
