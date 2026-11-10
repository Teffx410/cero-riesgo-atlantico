import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { FUSES } from '../content'
import type { Part, SceneDef, SceneItem } from '../content/scenes'
import { Fuse } from '../components/Icon'

export interface HuntResult {
  found: number
  wrong: number
  points: number
  burned: boolean
}

function Draw({ part }: { part: Part }) {
  switch (part.p) {
    case 'e':
      return (
        <text x={part.x} y={part.y} fontSize={part.s} textAnchor="middle" dominantBaseline="central">
          {part.g}
        </text>
      )
    case 'path':
      return (
        <path d={part.d} stroke={part.stroke} strokeWidth={part.w} fill={part.fill} strokeLinecap="round" strokeLinejoin="round" />
      )
    case 'rect':
      return (
        <rect x={part.x} y={part.y} width={part.w} height={part.h} rx={part.r} fill={part.fill} stroke={part.stroke} strokeWidth={2} />
      )
    case 'ell':
      return <ellipse cx={part.x} cy={part.y} rx={part.rx} ry={part.ry} fill={part.fill} opacity={part.o} />
    case 'poly':
      return <polygon points={part.pts} fill={part.fill} />
    case 'outlet':
      return (
        <g transform={`translate(${part.x},${part.y})`}>
          <rect x={-17} y={-17} width={34} height={34} rx={6} fill={part.burnt ? '#4a3f3a' : '#f3efe2'} stroke="#9b9686" strokeWidth={2} />
          {part.burnt && <ellipse cx={0} cy={-4} rx={13} ry={16} fill="#111" opacity={0.7} />}
          <rect x={-8} y={-9} width={4} height={10} rx={1} fill={part.burnt ? '#000' : '#444'} />
          <rect x={4} y={-9} width={4} height={10} rx={1} fill={part.burnt ? '#000' : '#444'} />
          <circle cx={0} cy={9} r={3} fill={part.burnt ? '#000' : '#444'} />
        </g>
      )
    default:
      return null
  }
}

function Ring({ item, color, dashed, fill }: { item: SceneItem; color: string; dashed?: boolean; fill?: string }) {
  return (
    <ellipse
      cx={item.x}
      cy={item.y}
      rx={item.w / 2 + 6}
      ry={item.h / 2 + 6}
      fill={fill ?? 'none'}
      stroke={color}
      strokeWidth={4}
      strokeDasharray={dashed ? '10 6' : undefined}
      pointerEvents="none"
    />
  )
}

function Badge({ item, color, label }: { item: SceneItem; color: string; label: string }) {
  const cx = Math.min(item.x + item.w / 2, 784)
  const cy = Math.max(item.y - item.h / 2, 16)
  return (
    <g pointerEvents="none">
      <circle cx={cx} cy={cy} r={14} fill={color} stroke="#fff" strokeWidth={2.5} />
      <text x={cx} y={cy + 1} fontSize={16} fontWeight="bold" fill="#fff" textAnchor="middle" dominantBaseline="central">
        {label}
      </text>
    </g>
  )
}

interface Props {
  scene: SceneDef
  onFinish: (r: HuntResult) => void
  onExit: () => void
}

const SHOW_COORDS = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('coords')

export default function SceneView({ scene, onFinish, onExit }: Props) {
  const hazards = scene.items.filter((i) => i.hazard)
  const [found, setFound] = useState<string[]>([])
  const [wrong, setWrong] = useState(0)
  const [hints, setHints] = useState(0)
  const [hint, setHint] = useState('')
  const [flash, setFlash] = useState('')
  const [coords, setCoords] = useState('')
  const [msg, setMsg] = useState<{ ok: boolean; title: string; text: string } | null>(null)

  const fuses = FUSES - wrong
  const burned = fuses <= 0
  const done = found.length === hazards.length
  const finished = burned || done
  const points = Math.max(0, found.length * 100 - hints * 30)

  useEffect(() => {
    if (!flash) return
    const t = setTimeout(() => setFlash(''), 900)
    return () => clearTimeout(t)
  }, [flash])

  const click = (item: SceneItem) => {
    // Al terminar, tocar un peligro muestra su explicación.
    if (finished) {
      if (item.hazard) setMsg({ ok: found.includes(item.id), title: item.hazard[0], text: item.hazard[1] })
      return
    }
    if (found.includes(item.id)) {
      if (item.hazard) setMsg({ ok: true, title: item.hazard[0], text: item.hazard[1] })
      return
    }
    setHint('')
    if (item.hazard) {
      setFound([...found, item.id])
      setMsg({ ok: true, title: item.hazard[0], text: item.hazard[1] })
    } else {
      setWrong(wrong + 1)
      setFlash(item.id)
      setMsg({ ok: false, title: 'Ahí no hay peligro eléctrico', text: item.safe ?? 'Eso no es un peligro eléctrico.' })
    }
  }

  const giveHint = () => {
    const pending = hazards.filter((h) => !found.includes(h.id))
    if (finished || pending.length === 0) return
    setHints(hints + 1)
    setHint(pending[Math.floor(Math.random() * pending.length)].id)
  }

  const showCoords = (e: MouseEvent<SVGSVGElement>) => {
    if (!SHOW_COORDS) return
    const svg = e.currentTarget
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const p = pt.matrixTransform(svg.getScreenCTM()?.inverse())
    setCoords(`x: ${Math.round(p.x)}, y: ${Math.round(p.y)}`)
  }

  return (
    <div className="app wide">
      <div className="row between">
        <button className="link" onClick={onExit}>← Salir</button>
        <div className="fuses" aria-label={`Fusibles: ${fuses} de ${FUSES}`}>
          {Array.from({ length: FUSES }, (_, i) => (
            <Fuse key={i} ok={i < fuses} />
          ))}
        </div>
      </div>
      <h2>{scene.title}</h2>
      <p className="muted">{scene.intro}</p>
      <p>
        <strong>Peligros encontrados: {found.length} de {hazards.length}</strong>
      </p>

      <div className="scene">
        <svg viewBox="0 0 800 480" role="img" aria-label={scene.title} onClick={showCoords}>
          {scene.bgImage && <image href={scene.bgImage} x={0} y={0} width={800} height={480} preserveAspectRatio="xMidYMid slice" />}
          {scene.backdrop}
          {scene.bg?.map((p, i) => <Draw key={i} part={p} />)}

          {scene.items.map((item) => (
            <g key={item.id} className={finished ? 'item' : 'item hot'} onClick={() => click(item)}>
              {item.art}
              {item.parts && (
                <g transform={`translate(${item.x},${item.y})`}>
                  {item.parts.map((p, i) => (
                    <Draw key={i} part={p} />
                  ))}
                </g>
              )}
              <rect x={item.x - item.w / 2} y={item.y - item.h / 2} width={item.w} height={item.h} fill="transparent" />
            </g>
          ))}

          {/* Marcas encima de todo */}
          {scene.items.map((item) => {
            const n = found.indexOf(item.id) + 1
            if (n > 0)
              return (
                <g key={'m' + item.id}>
                  <Ring item={item} color="#1f9d63" fill="rgba(31,157,99,0.12)" />
                  <Badge item={item} color="#1f9d63" label={String(n)} />
                </g>
              )
            if (finished && item.hazard)
              return (
                <g key={'m' + item.id} className="pulse">
                  <Ring item={item} color="#ff8a3d" dashed fill="rgba(255,138,61,0.12)" />
                  <Badge item={item} color="#ff8a3d" label="!" />
                </g>
              )
            if (flash === item.id)
              return (
                <g key={'m' + item.id}>
                  <Ring item={item} color="#d6455d" fill="rgba(214,69,93,0.12)" />
                  <Badge item={item} color="#d6455d" label="✕" />
                </g>
              )
            if (hint === item.id)
              return (
                <g key={'m' + item.id} className="pulse">
                  <Ring item={item} color="#ff8a3d" dashed />
                </g>
              )
            return null
          })}
          {SHOW_COORDS && coords && (
            <text x={10} y={470} fontSize={16} fill="#000" stroke="#fff" strokeWidth={3} paintOrder="stroke">
              {coords}
            </text>
          )}
        </svg>
      </div>

      {msg && (
        <div className={'feedback ' + (msg.ok ? 'ok' : 'bad')}>
          <strong>{msg.title}</strong>
          <p>{msg.text}</p>
        </div>
      )}
      {done && (
        <div className="feedback ok">
          <strong>¡Encontraste todos los peligros!</strong>
        </div>
      )}
      {burned && (
        <div className="feedback bad">
          <strong>Se quemaron los 3 fusibles</strong>
          <p>En naranja están los peligros que te faltaron. Tócalos para ver por qué son peligrosos.</p>
        </div>
      )}

      <div className="row" style={{ marginTop: 12 }}>
        {!finished && (
          <button className="btn secondary" onClick={giveHint}>
            Pista (−30 pts)
          </button>
        )}
        {finished && (
          <button className="btn" onClick={() => onFinish({ found: found.length, wrong, points, burned })}>
            {burned ? 'Ver resultado' : 'Continuar'}
          </button>
        )}
      </div>
    </div>
  )
}
