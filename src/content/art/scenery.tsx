// Personas y elementos de exteriores reutilizables, en el mismo estilo que la cocina.
import { COPPER, INK, Limb, SKIN } from './common'

// ---------------------------------------------------------------------------
// Personas
// ---------------------------------------------------------------------------

/** Codo x, y y mano x, y en coordenadas locales de la persona. */
export type Arm = [number, number, number, number]

interface PersonProps {
  x: number
  /** y de los pies */
  y: number
  /** altura en px (196 = adulto de referencia) */
  h?: number
  skin?: string
  shirt?: string
  pants?: string
  hair?: string
  /** hacia dónde mira: -1 izquierda, 0 frente, 1 derecha */
  face?: -1 | 0 | 1
  armL?: Arm
  armR?: Arm
  helmet?: string
  vest?: boolean
  strawHat?: boolean
  shorts?: boolean
  kid?: boolean
  ponytail?: boolean
  /** Sin piernas visibles (por ejemplo, dentro del agua) */
  noLegs?: boolean
}

/**
 * Persona de pie en estilo plano. En coordenadas locales los pies están en
 * (0, 0), los hombros en (±18, -142) y la cabeza en (0, -178).
 */
export function Person({
  x,
  y,
  h = 196,
  skin = SKIN,
  shirt = '#0e9fb5',
  pants = '#34495e',
  hair = '#2b1d16',
  face = 0,
  armL = [-26, -118, -27, -90],
  armR = [26, -118, 27, -90],
  helmet,
  vest,
  strawHat,
  shorts,
  kid,
  ponytail,
  noLegs,
}: PersonProps) {
  const s = h / 196
  const head = kid ? 1.3 : 1
  const ex = face * 5
  const limb = (sx: number, a: Arm) => `M${sx},-142 Q${a[0]},${a[1]} ${a[2]},${a[3]}`
  const sleeve = vest ? '#ff8a3d' : shirt
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      {!noLegs && (
        <>
          <ellipse cx={0} cy={0} rx={34} ry={6} fill="#3b2a18" opacity={0.16} />
          {shorts ? (
            <>
              <path d="M-17,-40 L-18,-6 L-7,-6 L-4,-40 Z" fill={skin} stroke={INK} strokeWidth={2} />
              <path d="M4,-40 L7,-6 L18,-6 L17,-40 Z" fill={skin} stroke={INK} strokeWidth={2} />
              <path d="M-24,-76 L24,-76 L22,-38 L2,-38 L0,-56 L-2,-38 L-22,-38 Z" fill={pants} stroke={INK} strokeWidth={2} />
            </>
          ) : (
            <>
              <path d="M-18,-76 L-20,-6 L-6,-6 L0,-70 Z" fill={pants} stroke={INK} strokeWidth={2} />
              <path d="M0,-70 L6,-6 L20,-6 L18,-76 Z" fill={pants} stroke={INK} strokeWidth={2} />
            </>
          )}
          <rect x={-26} y={-9} width={22} height={9} rx={4} fill="#222" />
          <rect x={4} y={-9} width={22} height={9} rx={4} fill="#222" />
        </>
      )}
      {/* Torso */}
      <path d="M-22,-148 Q0,-159 22,-148 L25,-72 L-25,-72 Z" fill={shirt} stroke={INK} strokeWidth={2} />
      {vest && (
        <g>
          <path d="M-21,-146 L-7,-150 L-5,-74 L-24,-74 Z" fill="#ff8a3d" stroke={INK} strokeWidth={1.5} />
          <path d="M21,-146 L7,-150 L5,-74 L24,-74 Z" fill="#ff8a3d" stroke={INK} strokeWidth={1.5} />
          <path d="M-23,-104 L-6,-104 M6,-104 L23,-104 M-24,-90 L-5,-90 M5,-90 L24,-90" stroke="#f4f4f4" strokeWidth={4} />
        </g>
      )}
      {/* Brazos */}
      <Limb d={limb(-18, armL)} color={skin} w={8} />
      <Limb d={limb(18, armR)} color={skin} w={8} />
      <circle cx={armL[2]} cy={armL[3]} r={5.5} fill={skin} stroke={INK} strokeWidth={1.5} />
      <circle cx={armR[2]} cy={armR[3]} r={5.5} fill={skin} stroke={INK} strokeWidth={1.5} />
      <ellipse cx={-19} cy={-140} rx={7} ry={10} fill={sleeve} stroke={INK} strokeWidth={1.5} />
      <ellipse cx={19} cy={-140} rx={7} ry={10} fill={sleeve} stroke={INK} strokeWidth={1.5} />
      {/* Cabeza */}
      <g transform={`translate(0,-160) scale(${head}) translate(0,160)`}>
        <rect x={-6} y={-166} width={12} height={12} fill={skin} />
        {ponytail && <ellipse cx={face === 1 ? -16 : 16} cy={-170} rx={7} ry={13} fill={hair} stroke={INK} strokeWidth={1.5} />}
        <circle cx={0} cy={-178} r={18} fill={skin} stroke={INK} strokeWidth={2} />
        {face !== 0 && <circle cx={-face * 12} cy={-175} r={4} fill={skin} stroke={INK} strokeWidth={1.5} />}
        {!helmet && !strawHat && (
          <path d="M-18,-178 Q-19,-199 1,-200 Q21,-199 19,-180 Q12,-190 -3,-188 Q-12,-187 -18,-178 Z" fill={hair} stroke={INK} strokeWidth={1.5} />
        )}
        <circle cx={ex - 4.5} cy={-177} r={2.2} fill={INK} />
        <circle cx={ex + 4.5} cy={-177} r={2.2} fill={INK} />
        <path d={`M${ex - 4},-169 Q${ex},-165 ${ex + 4},-169`} stroke={INK} strokeWidth={1.8} fill="none" strokeLinecap="round" />
        {kid && <circle cx={ex - 9} cy={-170} r={3} fill="#f08a8a" opacity={0.55} />}
        {helmet && (
          <g>
            <path d="M-20,-184 Q-20,-206 0,-207 Q20,-206 20,-184 Z" fill={helmet} stroke={INK} strokeWidth={2} />
            <rect x={-25} y={-187} width={50} height={6} rx={3} fill={helmet} stroke={INK} strokeWidth={2} />
          </g>
        )}
        {strawHat && (
          <g>
            <ellipse cx={0} cy={-189} rx={32} ry={6} fill="#e8c66a" stroke={INK} strokeWidth={2} />
            <path d="M-15,-190 Q-15,-210 0,-210 Q15,-210 15,-190 Z" fill="#f0d27e" stroke={INK} strokeWidth={2} />
            <rect x={-15} y={-196} width={30} height={4} fill="#3a2a1a" />
          </g>
        )}
      </g>
    </g>
  )
}

// ---------------------------------------------------------------------------
// Exteriores
// ---------------------------------------------------------------------------

/** Poste de madera con cruceta. `top` es la y de la cruceta. */
export function Pole({ x, top, bottom }: { x: number; top: number; bottom: number }) {
  return (
    <g>
      <rect x={x - 6} y={top - 14} width={12} height={bottom - top + 14} rx={2} fill="#7a5a40" stroke={INK} strokeWidth={2} />
      <rect x={x - 38} y={top - 4} width={76} height={8} rx={2} fill="#6b4f3a" stroke={INK} strokeWidth={2} />
      <g fill="#cfe3ea" stroke={INK} strokeWidth={1.2}>
        <rect x={x - 34} y={top - 12} width={7} height={9} rx={2} />
        <rect x={x - 3.5} y={top - 24} width={7} height={9} rx={2} />
        <rect x={x + 27} y={top - 12} width={7} height={9} rx={2} />
      </g>
    </g>
  )
}

/** Árbol frondoso de copa redonda; (x, y) es la base del tronco. */
export function Tree({ x, y, s = 1, fruit }: { x: number; y: number; s?: number; fruit?: string }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <ellipse cx={0} cy={0} rx={40} ry={7} fill="#3b2a18" opacity={0.15} />
      <path d="M-9,0 L-7,-72 L7,-72 L9,0 Z" fill="#8a5a32" stroke={INK} strokeWidth={2} />
      <circle cx={-30} cy={-100} r={30} fill="#3f9a5a" stroke={INK} strokeWidth={2} />
      <circle cx={30} cy={-102} r={30} fill="#3f9a5a" stroke={INK} strokeWidth={2} />
      <circle cx={0} cy={-128} r={38} fill="#4aa865" stroke={INK} strokeWidth={2} />
      <circle cx={-6} cy={-96} r={26} fill="#4aa865" />
      <circle cx={10} cy={-100} r={22} fill="#4aa865" />
      <path d="M-20,-140 Q-8,-152 8,-146" stroke="#7fd08f" strokeWidth={5} fill="none" strokeLinecap="round" />
      {fruit && (
        <g fill={fruit} stroke={INK} strokeWidth={1.2}>
          <ellipse cx={-30} cy={-96} rx={6} ry={7} />
          <ellipse cx={22} cy={-112} rx={6} ry={7} />
          <ellipse cx={-4} cy={-134} rx={6} ry={7} />
          <ellipse cx={34} cy={-90} rx={6} ry={7} />
        </g>
      )}
    </g>
  )
}

/** Nube. `dark` para nube de tormenta. */
export function Cloud({ x, y, s = 1, dark = false }: { x: number; y: number; s?: number; dark?: boolean }) {
  const fill = dark ? '#6b7280' : '#ffffff'
  const edge = dark ? '#3f4652' : '#d6e6ee'
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path
        d="M-50,14 Q-62,14 -62,2 Q-62,-12 -46,-12 Q-44,-32 -22,-32 Q-12,-46 6,-42 Q24,-48 32,-30 Q54,-32 56,-12 Q66,-8 64,4 Q62,14 50,14 Z"
        fill={fill}
        stroke={edge}
        strokeWidth={2.5}
      />
      {dark && <path d="M-40,4 Q-10,10 40,4" stroke="#545b66" strokeWidth={4} fill="none" strokeLinecap="round" />}
    </g>
  )
}

/** Rayo; (x, y) es la punta de arriba. */
export function Bolt({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x},${y}) scale(${s})`}
      d="M4,0 L-10,26 L0,26 L-6,48 L14,16 L3,16 L10,0 Z"
      fill="#ffd23d"
      stroke="#d48a00"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  )
}

/** Punta de cable pelada (cobre a la vista). */
export function LooseEnd({ x, y, angle = 0 }: { x: number; y: number; angle?: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`} fill="none" strokeLinecap="round">
      <path d="M0,0 L10,0" stroke={COPPER} strokeWidth={3} />
      <path d="M10,0 l6,-4 M10,0 l7,1 M10,0 l5,5" stroke={COPPER} strokeWidth={1.6} />
    </g>
  )
}

/** Guirnalda de banderines entre dos puntos. */
export function Bunting({ x1, x2, y, sag = 20 }: { x1: number; x2: number; y: number; sag?: number }) {
  const colors = ['#d6455d', '#ffc83d', '#0e9fb5', '#1f9d63', '#ff8a3d', '#7a3b8f']
  const n = Math.floor((x2 - x1) / 26)
  const flags = []
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n
    const fx = x1 + (x2 - x1) * t
    const fy = y + sag * 4 * t * (1 - t)
    flags.push(
      <path key={i} d={`M${fx - 9},${fy} L${fx + 9},${fy} L${fx},${fy + 18} Z`} fill={colors[i % colors.length]} stroke={INK} strokeWidth={1.2} />,
    )
  }
  return (
    <g>
      <path d={`M${x1},${y} Q${(x1 + x2) / 2},${y + sag * 2} ${x2},${y}`} stroke="#444" strokeWidth={1.5} fill="none" />
      {flags}
    </g>
  )
}

/** Casa de barrio con techo a dos aguas; la pared llega hasta y = 300. */
export function House({ x, w, top, wall, roof }: { x: number; w: number; top: number; wall: string; roof: string }) {
  return (
    <g>
      <rect x={x} y={top} width={w} height={300 - top} fill={wall} stroke={INK} strokeWidth={2} />
      <rect x={x} y={top} width={w} height={8} fill="#000" opacity={0.08} />
      <polygon points={`${x - 12},${top + 2} ${x + w / 2},${top - 50} ${x + w + 12},${top + 2}`} fill={roof} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      <path d={`M${x + 10},${top - 6} L${x + w / 2},${top - 40}`} stroke="#fff" strokeWidth={3} opacity={0.25} strokeLinecap="round" />
    </g>
  )
}

/** Ventana con marco blanco. */
export function Window({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#bfe6f7" stroke={INK} strokeWidth={2} />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke="#fff" strokeWidth={3} />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke="#fff" strokeWidth={3} />
      <rect x={x - 4} y={y + h} width={w + 8} height={5} fill="#fff" stroke={INK} strokeWidth={1.5} />
    </g>
  )
}
