// Piezas de ilustración reutilizables (estilo vector plano con contorno).

export const INK = '#23343b'
export const SKIN = '#c68a5e'
export const SKIN_LIGHT = '#e0a77a'
export const WATER = '#8fd0f2'
export const WATER_EDGE = '#3f9fd6'
export const COPPER = '#d9822b'

interface OutletProps {
  x: number
  y: number
  s?: number
  burnt?: boolean
}

/** Tomacorriente de pared (vista frontal). */
export function Outlet({ x, y, s = 1, burnt = false }: OutletProps) {
  const plate = burnt ? '#5a4b44' : '#f7f4ec'
  const inner = burnt ? '#3b302b' : '#ebe5d6'
  const hole = burnt ? '#0d0b0a' : '#3a3a3a'
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <rect x={-16} y={-21} width={32} height={42} rx={6} fill={plate} stroke={INK} strokeWidth={2} />
      <rect x={-11} y={-15} width={22} height={30} rx={5} fill={inner} stroke={burnt ? '#1e1916' : '#cfc7b3'} strokeWidth={1.5} />
      <rect x={-7} y={-9} width={3.5} height={9} rx={1} fill={hole} />
      <rect x={3.5} y={-9} width={3.5} height={9} rx={1} fill={hole} />
      <path d="M-3,9 a3,3 0 0 1 6,0 v2 h-6 Z" fill={hole} />
      {burnt && (
        <>
          <path d="M-12,-4 C-6,-16 6,-18 12,-6 C8,-12 -2,-10 -12,-4 Z" fill="#000" opacity={0.55} />
          <path d="M-9,14 C-4,6 4,6 9,14" stroke="#000" strokeWidth={2} fill="none" opacity={0.5} />
        </>
      )}
    </g>
  )
}

/** Gota de agua con forma de lágrima. */
export function Drop({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x},${y}) scale(${s})`}
      d="M0,-6 C4,0 4.5,2 4.5,3 C4.5,5.5 2.5,7 0,7 C-2.5,7 -4.5,5.5 -4.5,3 C-4.5,2 -4,0 0,-6 Z"
      fill={WATER}
      stroke={WATER_EDGE}
      strokeWidth={1.2}
    />
  )
}

/** Charco en el piso, en perspectiva. */
export function Puddle({ x, y, rx, ry }: { x: number; y: number; rx: number; ry: number }) {
  return (
    <g>
      <path
        d={`M${x - rx},${y} C${x - rx},${y - ry * 1.3} ${x - rx * 0.2},${y - ry * 1.1} ${x + rx * 0.2},${y - ry}
           C${x + rx * 0.7},${y - ry * 1.2} ${x + rx},${y - ry * 0.6} ${x + rx},${y}
           C${x + rx},${y + ry * 0.9} ${x + rx * 0.3},${y + ry * 1.1} ${x - rx * 0.1},${y + ry}
           C${x - rx * 0.6},${y + ry * 1.2} ${x - rx},${y + ry * 0.8} ${x - rx},${y} Z`}
        fill={WATER}
        stroke={WATER_EDGE}
        strokeWidth={1.5}
        opacity={0.95}
      />
      <ellipse cx={x - rx * 0.35} cy={y - ry * 0.25} rx={rx * 0.28} ry={ry * 0.22} fill="#fff" opacity={0.7} />
      <ellipse cx={x + rx * 0.3} cy={y + ry * 0.25} rx={rx * 0.12} ry={ry * 0.15} fill="#fff" opacity={0.5} />
    </g>
  )
}

/** Sombra suave en el piso. */
export function Shadow({ x, y, rx, ry = 6 }: { x: number; y: number; rx: number; ry?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#3b2a18" opacity={0.16} />
}

/** Chispa pequeña (estrella de cuatro puntas). */
export function Spark({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x},${y}) scale(${s})`}
      d="M0,-9 L2,-2 L9,0 L2,2 L0,9 L-2,2 L-9,0 L-2,-2 Z"
      fill="#ffd23d"
      stroke="#e08a00"
      strokeWidth={1}
    />
  )
}

/** Línea de calor ondulada. */
export function Heat({ x, y, color = '#ff5a3d' }: { x: number; y: number; color?: string }) {
  return (
    <path
      d={`M${x},${y} q4,-5 0,-10 q-4,-5 0,-10`}
      stroke={color}
      strokeWidth={2.2}
      fill="none"
      strokeLinecap="round"
      opacity={0.85}
    />
  )
}

/** Brazo con contorno: trazo grueso de tinta y encima el color. */
export function Limb({ d, color, w = 8 }: { d: string; color: string; w?: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={INK} strokeWidth={w + 3} />
      <path d={d} stroke={color} strokeWidth={w} />
    </g>
  )
}

const TEAL = '#2f8f9d'
const TEAL_LIGHT = '#3ba5b3'
const TEAL_DARK = '#1f6670'
const HANDLE = '#f0dca8'

/** Gabinete de cocina con puertas. */
export function Cabinet({ x, y, w, h, doors }: { x: number; y: number; w: number; h: number; doors: number }) {
  const gap = 6
  const dw = (w - gap * (doors + 1)) / doors
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={TEAL} stroke={INK} strokeWidth={2} />
      {Array.from({ length: doors }, (_, i) => {
        const dx = x + gap + i * (dw + gap)
        const hx = i % 2 === 0 ? dx + dw - 10 : dx + 6
        return (
          <g key={i}>
            <rect x={dx} y={y + gap} width={dw} height={h - gap * 2} rx={3} fill={TEAL_LIGHT} stroke={TEAL_DARK} strokeWidth={1.5} />
            <rect x={hx} y={y + h / 2 - 9} width={4} height={18} rx={2} fill={HANDLE} stroke={INK} strokeWidth={1} />
          </g>
        )
      })}
    </g>
  )
}
