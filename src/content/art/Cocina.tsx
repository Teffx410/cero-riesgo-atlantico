import type { SceneDef } from '../sceneTypes'
import { Cabinet, COPPER, Drop, Heat, INK, Limb, Outlet, Puddle, SKIN, Shadow, Spark } from './common'

// Lienzo de 800 x 480. La pared llega hasta y = 330 y el piso va de 330 a 480.
const TEAL = '#2f8f9d'
const TEAL_DARK = '#1f6670'
const WATER_STREAM = '#7cc4ec'

function floorLines() {
  // Líneas de baldosa en perspectiva hacia un punto de fuga en (400, 120).
  const vertical = []
  for (let x0 = -300; x0 <= 1100; x0 += 100) {
    const x1 = 400 + (x0 - 400) * ((480 - 120) / (330 - 120))
    vertical.push(<line key={'v' + x0} x1={x0} y1={330} x2={x1} y2={480} />)
  }
  const horizontal = [350, 376, 410, 452].map((y) => <line key={'h' + y} x1={0} y1={y} x2={800} y2={y} />)
  return (
    <g stroke="#c49b70" strokeWidth={1.5} opacity={0.7}>
      {vertical}
      {horizontal}
    </g>
  )
}

const backdrop = (
  <g>
    <defs>
      <linearGradient id="k-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fdf4e1" />
        <stop offset="1" stopColor="#f5e2c0" />
      </linearGradient>
      <linearGradient id="k-floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#d2ab80" />
        <stop offset="1" stopColor="#e3c197" />
      </linearGradient>
      <linearGradient id="k-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d9f2fb" />
        <stop offset="1" stopColor="#9fd6ee" />
      </linearGradient>
    </defs>

    {/* Pared y piso */}
    <rect x={0} y={0} width={800} height={330} fill="url(#k-wall)" />
    <rect x={0} y={0} width={800} height={10} fill="#ead4ae" />
    <rect x={0} y={330} width={800} height={150} fill="url(#k-floor)" />
    {floorLines()}
    <rect x={0} y={320} width={800} height={12} fill="#c99f72" stroke={INK} strokeWidth={1.5} />

    {/* Tapete */}
    <g>
      <rect x={300} y={440} width={220} height={30} rx={6} fill="#d6455d" stroke={INK} strokeWidth={2} />
      <rect x={312} y={447} width={196} height={16} rx={3} fill="none" stroke="#f6c1ca" strokeWidth={2} strokeDasharray="8 6" />
    </g>

    {/* Ventana */}
    <g>
      <rect x={128} y={46} width={94} height={112} rx={4} fill="#fff" stroke={INK} strokeWidth={2} />
      <rect x={136} y={54} width={78} height={96} fill="url(#k-glass)" stroke="#c9b08a" strokeWidth={1.5} />
      <circle cx={196} cy={74} r={10} fill="#ffe28a" opacity={0.9} />
      <path d="M150,148 Q160,120 176,128 Q190,112 214,128 L214,150 L136,150 Z" fill="#9ad37a" opacity={0.85} />
      <line x1={175} y1={54} x2={175} y2={150} stroke="#fff" strokeWidth={4} />
      <line x1={136} y1={102} x2={214} y2={102} stroke="#fff" strokeWidth={4} />
      <path d="M144,92 L160,62 M150,96 L168,64" stroke="#fff" strokeWidth={3} opacity={0.6} strokeLinecap="round" />
      <rect x={122} y={156} width={106} height={7} rx={2} fill="#fff" stroke={INK} strokeWidth={1.5} />
    </g>

    {/* Gabinetes altos */}
    <Cabinet x={20} y={28} w={96} h={118} doors={2} />
    <Cabinet x={234} y={28} w={104} h={118} doors={2} />
    <rect x={20} y={146} width={96} height={5} fill={TEAL_DARK} opacity={0.6} />
    <rect x={234} y={146} width={104} height={5} fill={TEAL_DARK} opacity={0.6} />

    {/* Salpicadero de baldosas */}
    <g>
      <rect x={20} y={166} width={326} height={84} fill="#eaf5f3" />
      <g stroke="#cfe3df" strokeWidth={1.5}>
        {[186, 206, 226].map((y) => (
          <line key={y} x1={20} y1={y} x2={346} y2={y} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={i} x1={40 + i * 20} y1={166} x2={40 + i * 20} y2={250} />
        ))}
      </g>
    </g>

    {/* Mesón y gabinetes bajos */}
    <Cabinet x={20} y={258} w={326} h={64} doors={3} />
    <rect x={20} y={318} width={326} height={12} fill={TEAL_DARK} stroke={INK} strokeWidth={1.5} />
    <rect x={12} y={246} width={342} height={13} rx={3} fill="#f4f4ef" stroke={INK} strokeWidth={2} />
    <rect x={14} y={256} width={338} height={3} fill="#c9c9c2" />

    {/* Lavaplatos y grifo */}
    <g>
      <rect x={140} y={243} width={70} height={5} rx={2} fill="#aab6bd" stroke={INK} strokeWidth={1.2} />
      <path d="M168,244 L168,214 Q168,204 180,204 Q192,204 192,214 L192,222" fill="none" stroke={INK} strokeWidth={8} strokeLinecap="round" />
      <path d="M168,244 L168,214 Q168,204 180,204 Q192,204 192,214 L192,222" fill="none" stroke="#b8c4cb" strokeWidth={5} strokeLinecap="round" />
      <rect x={162} y={236} width={12} height={8} rx={2} fill="#b8c4cb" stroke={INK} strokeWidth={1.2} />
      <path d="M192,226 L192,242" stroke={WATER_STREAM} strokeWidth={3} strokeLinecap="round" opacity={0.9} />
    </g>

    {/* Tomacorriente del mesón (donde enchufa la persona) */}
    <Outlet x={331} y={225} s={0.62} />

    {/* Toma de la regleta (pared, detrás de la regleta) */}
    <Outlet x={622} y={300} s={0.55} />
  </g>
)

export const CASA: SceneDef = {
  id: 'casa',
  title: 'La cocina',
  intro: 'Toca los peligros eléctricos que veas en la cocina. Si tocas algo que no es peligroso, se quema un fusible.',
  backdrop,
  items: [
    {
      id: 'c-plant',
      x: 55, y: 210, w: 52, h: 76,
      art: (
        <g>
          <path d="M55,222 C44,206 38,192 42,176 C52,188 57,204 55,222 Z" fill="#3f9a5a" stroke={INK} strokeWidth={1.5} />
          <path d="M55,222 C64,204 72,194 82,188 C80,204 68,216 55,222 Z" fill="#5bb872" stroke={INK} strokeWidth={1.5} />
          <path d="M55,222 C50,208 54,190 62,178 C66,194 62,210 55,222 Z" fill="#4aa865" stroke={INK} strokeWidth={1.5} />
          <path d="M55,222 C44,216 34,210 28,200 C40,200 50,208 55,222 Z" fill="#5bb872" stroke={INK} strokeWidth={1.5} />
          <rect x={39} y={219} width={32} height={7} rx={2} fill="#e68b5b" stroke={INK} strokeWidth={1.5} />
          <path d="M42,226 L68,226 L64,247 L46,247 Z" fill="#d8774a" stroke={INK} strokeWidth={1.5} />
        </g>
      ),
      safe: 'Una planta no es un riesgo eléctrico.',
    },
    {
      id: 'c-chair',
      x: 95, y: 416, w: 74, h: 84,
      art: (
        <g>
          <Shadow x={95} y={452} rx={32} ry={5} />
          <g stroke="#8a5a32" strokeWidth={5} strokeLinecap="round">
            <line x1={76} y1={390} x2={68} y2={450} />
            <line x1={114} y1={390} x2={122} y2={450} />
            <line x1={88} y1={392} x2={86} y2={444} />
            <line x1={102} y1={392} x2={104} y2={444} />
            <line x1={73} y1={426} x2={117} y2={426} strokeWidth={4} />
          </g>
          <ellipse cx={95} cy={386} rx={31} ry={9} fill="#c98b4f" stroke={INK} strokeWidth={2} />
          <ellipse cx={90} cy={384} rx={16} ry={3} fill="#e0a86e" />
        </g>
      ),
      safe: 'Una silla no es un peligro eléctrico.',
    },
    {
      id: 'c-wet',
      x: 272, y: 262, w: 112, h: 210,
      art: (
        <g>
          {/* Licuadora y su cable hacia la mano */}
          <path d="M216,206 L218,234 L234,234 L236,206 Z" fill="#dff1f7" stroke={INK} strokeWidth={1.5} />
          <path d="M219,222 L233,222 L234,234 L218,234 Z" fill="#ff8a3d" opacity={0.75} />
          <rect x={215} y={201} width={22} height={6} rx={2} fill="#444" />
          <rect x={213} y={233} width={26} height={14} rx={3} fill="#d6455d" stroke={INK} strokeWidth={1.5} />
          <circle cx={226} cy={240} r={2.5} fill="#fff" />
          <path d="M238,243 C262,252 292,242 309,229" fill="none" stroke="#333" strokeWidth={2.5} />

          <Shadow x={262} y={364} rx={36} ry={6} />
          {/* Piernas y zapatos */}
          <path d="M244,286 L242,356 L256,356 L262,292 Z" fill="#34495e" stroke={INK} strokeWidth={2} />
          <path d="M262,292 L268,356 L282,356 L280,286 Z" fill="#2c3e50" stroke={INK} strokeWidth={2} />
          <rect x={236} y={353} width={22} height={9} rx={4} fill="#222" />
          <rect x={266} y={353} width={22} height={9} rx={4} fill="#222" />
          {/* Brazo izquierdo (cuelga, mojado) */}
          <Limb d="M243,218 Q232,244 236,270" color={SKIN} w={8} />
          {/* Torso y delantal */}
          <path d="M240,214 Q262,203 284,214 L287,290 L237,290 Z" fill="#ff8a3d" stroke={INK} strokeWidth={2} />
          <path d="M247,226 L277,226 L282,302 L242,302 Z" fill="#ffffff" stroke={INK} strokeWidth={2} />
          <path d="M249,226 L255,210 M275,226 L269,210" stroke={INK} strokeWidth={2} />
          <rect x={252} y={262} width={20} height={14} rx={2} fill="#f1f1f1" stroke={INK} strokeWidth={1.2} />
          {/* Mangas */}
          <path d="M240,214 Q232,222 232,236 L244,238 Z" fill="#ff8a3d" stroke={INK} strokeWidth={2} />
          {/* Brazo derecho estirado hacia el tomacorriente */}
          <Limb d="M286,220 Q298,238 307,226" color={SKIN} w={8} />
          <path d="M284,214 Q294,218 296,230 L285,234 Z" fill="#ff8a3d" stroke={INK} strokeWidth={2} />
          {/* Cabeza */}
          <rect x={256} y={196} width={12} height={10} fill={SKIN} />
          <circle cx={262} cy={184} r={18} fill={SKIN} stroke={INK} strokeWidth={2} />
          <circle cx={250} cy={187} r={4} fill={SKIN} stroke={INK} strokeWidth={1.5} />
          <path d="M244,184 Q243,163 263,162 Q283,162 281,182 Q274,171 259,173 Q251,175 247,186 Z" fill="#2b1d16" stroke={INK} strokeWidth={1.5} />
          <circle cx={267} cy={185} r={2.2} fill={INK} />
          <circle cx={276} cy={185} r={2.2} fill={INK} />
          <path d="M267,193 Q271,197 276,192" stroke={INK} strokeWidth={1.8} fill="none" strokeLinecap="round" />
          {/* Manos mojadas y enchufe */}
          <circle cx={236} cy={272} r={5.5} fill={SKIN} stroke={INK} strokeWidth={1.5} />
          <circle cx={307} cy={225} r={5.5} fill={SKIN} stroke={INK} strokeWidth={1.5} />
          <rect x={310} y={219} width={9} height={12} rx={2} fill="#f0f0f0" stroke={INK} strokeWidth={1.5} />
          <line x1={319} y1={222} x2={323} y2={222} stroke="#a9a9a9" strokeWidth={2} />
          <line x1={319} y1={228} x2={323} y2={228} stroke="#a9a9a9" strokeWidth={2} />
          <Drop x={305} y={240} s={0.9} />
          <Drop x={300} y={254} s={0.75} />
          <Drop x={237} y={286} s={0.9} />
          <Drop x={233} y={300} s={0.7} />
        </g>
      ),
      hazard: ['Manos mojadas al enchufar', 'El agua conduce la electricidad. Hay que secarse bien las manos antes de tocar un enchufe.'],
    },
    {
      id: 'c-clock',
      x: 395, y: 86, w: 60, h: 60,
      art: (
        <g>
          <circle cx={395} cy={86} r={25} fill="#fff" stroke={INK} strokeWidth={4} />
          <g stroke={INK} strokeWidth={2} strokeLinecap="round">
            <line x1={395} y1={65} x2={395} y2={70} />
            <line x1={395} y1={102} x2={395} y2={107} />
            <line x1={374} y1={86} x2={379} y2={86} />
            <line x1={411} y1={86} x2={416} y2={86} />
          </g>
          <line x1={395} y1={86} x2={395} y2={71} stroke={INK} strokeWidth={3} strokeLinecap="round" />
          <line x1={395} y1={86} x2={406} y2={92} stroke="#d6455d" strokeWidth={3} strokeLinecap="round" />
          <circle cx={395} cy={86} r={3} fill={INK} />
        </g>
      ),
      safe: 'El reloj funciona con una pila pequeña: no hay riesgo.',
    },
    {
      id: 'c-bulb',
      x: 540, y: 62, w: 64, h: 116,
      art: (
        <g>
          <circle cx={540} cy={100} r={30} fill="#fff3b0" opacity={0.45} />
          <line x1={540} y1={0} x2={540} y2={66} stroke="#444" strokeWidth={2} />
          <circle cx={540} cy={98} r={8.5} fill="#ffe28a" stroke={INK} strokeWidth={1.5} />
          <path d="M524,66 L556,66 L567,91 L513,91 Z" fill={TEAL} stroke={INK} strokeWidth={2} />
          <rect x={534} y={60} width={12} height={8} rx={2} fill="#555" />
        </g>
      ),
      safe: 'Una lámpara bien instalada y sin cables a la vista no es un peligro.',
    },
    {
      id: 'c-outlet',
      x: 470, y: 196, w: 54, h: 74,
      art: (
        <g>
          <ellipse cx={470} cy={186} rx={18} ry={26} fill="#3a2f2a" opacity={0.3} />
          <ellipse cx={470} cy={192} rx={12} ry={16} fill="#3a2f2a" opacity={0.35} />
          <Outlet x={470} y={206} s={0.82} burnt />
          <g stroke="#8d8d8d" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.75}>
            <path d="M465,180 q-6,-7 0,-14 q6,-7 0,-14" />
            <path d="M477,184 q-5,-6 0,-12 q5,-6 0,-12" />
          </g>
        </g>
      ),
      hazard: ['Tomacorriente quemado', 'Está negro por sobrecalentamiento. No se usa y lo revisa un electricista certificado.'],
    },
    {
      id: 'c-kid',
      x: 396, y: 354, w: 112, h: 112,
      art: (
        <g>
          <Outlet x={366} y={302} s={0.6} />
          <Shadow x={414} y={404} rx={36} ry={6} />
          {/* Piernas estiradas */}
          <rect x={392} y={388} width={48} height={13} rx={6} fill="#2c6db5" stroke={INK} strokeWidth={2} />
          <ellipse cx={443} cy={393} rx={6} ry={8} fill={SKIN} stroke={INK} strokeWidth={1.5} />
          {/* Brazo hacia el tomacorriente */}
          <Limb d="M400,358 Q386,340 376,312" color={SKIN} w={7} />
          {/* Cuerpo */}
          <path d="M396,352 Q410,343 424,352 L428,393 L392,393 Z" fill="#ffc83d" stroke={INK} strokeWidth={2} />
          <path d="M398,370 L426,370" stroke="#e8a91f" strokeWidth={3} />
          <Limb d="M421,358 Q432,372 426,386" color={SKIN} w={7} />
          {/* Cabeza */}
          <circle cx={410} cy={334} r={17} fill={SKIN} stroke={INK} strokeWidth={2} />
          <path d="M394,330 Q396,314 412,316 Q426,318 426,330 Q418,322 408,324 Q400,326 394,330 Z" fill="#2b1d16" stroke={INK} strokeWidth={1.5} />
          <circle cx={402} cy={336} r={2} fill={INK} />
          <circle cx={411} cy={336} r={2} fill={INK} />
          <circle cx={400} cy={343} r={3} fill="#f08a8a" opacity={0.6} />
          <path d="M403,344 Q406,346 409,344" stroke={INK} strokeWidth={1.5} fill="none" strokeLinecap="round" />
          <circle cx={375} cy={310} r={4.5} fill={SKIN} stroke={INK} strokeWidth={1.5} />
        </g>
      ),
      hazard: ['Tomacorriente sin protección al alcance de un niño', 'Los niños meten los dedos u objetos. Se cubren con protectores y se les enseña a no tocarlos.'],
    },
    {
      id: 'c-puddle',
      x: 504, y: 344, w: 96, h: 90,
      art: (
        <g>
          <Outlet x={505} y={302} s={0.6} />
          <Drop x={498} y={322} s={0.7} />
          <Drop x={512} y={328} s={0.6} />
          <Puddle x={500} y={372} rx={46} ry={11} />
          <g transform="translate(540,372) rotate(-78)">
            <path d="M-7,-10 L7,-10 L5,10 L-5,10 Z" fill="#fff" stroke={INK} strokeWidth={1.5} />
            <rect x={-7} y={-12} width={14} height={3} fill="#d6e9f2" stroke={INK} strokeWidth={1} />
          </g>
        </g>
      ),
      hazard: ['Agua cerca de un tomacorriente', 'El agua y la electricidad no se mezclan. Hay que secar el piso y revisar el tomacorriente antes de usarlo.'],
    },
    {
      id: 'c-strip',
      x: 612, y: 300, w: 116, h: 156,
      art: (
        <g>
          {/* Aire acondicionado en la pared y su cable */}
          <rect x={572} y={46} width={98} height={42} rx={9} fill="#f7f9fa" stroke={INK} strokeWidth={2} />
          <path d="M582,76 L660,76" stroke="#c3ccd2" strokeWidth={3} strokeLinecap="round" />
          <path d="M582,82 L660,82" stroke="#c3ccd2" strokeWidth={2} strokeLinecap="round" />
          <circle cx={656} cy={58} r={2.5} fill="#3fd17a" />
          <path d="M664,88 L664,330 Q664,346 652,350" fill="none" stroke="#333" strokeWidth={3} />
          {/* Cable de la regleta a la pared */}
          <path d="M622,308 L622,354" stroke="#333" strokeWidth={3} />
          {/* Ventilador de pie */}
          <Shadow x={580} y={355} rx={22} ry={4} />
          <ellipse cx={580} cy={351} rx={18} ry={5} fill="#9aa7ae" stroke={INK} strokeWidth={1.5} />
          <rect x={577} y={272} width={6} height={80} fill="#b8c2c8" stroke={INK} strokeWidth={1.5} />
          <circle cx={580} cy={252} r={26} fill="#e8f1f5" stroke={INK} strokeWidth={2} />
          <g fill="#8fd0f2" stroke={INK} strokeWidth={1.2}>
            <ellipse cx={580} cy={240} rx={6} ry={12} />
            <ellipse cx={580} cy={240} rx={6} ry={12} transform="rotate(120 580 252)" />
            <ellipse cx={580} cy={240} rx={6} ry={12} transform="rotate(240 580 252)" />
          </g>
          <circle cx={580} cy={252} r={5} fill={TEAL} stroke={INK} strokeWidth={1.2} />
          <g stroke="#c3ccd2" strokeWidth={1}>
            <line x1={556} y1={252} x2={604} y2={252} />
            <line x1={580} y1={228} x2={580} y2={276} />
          </g>
          <circle cx={580} cy={252} r={26} fill="none" stroke={INK} strokeWidth={2} />
          <path d="M590,352 Q598,360 604,354" fill="none" stroke="#333" strokeWidth={3} />
          {/* Regleta sobrecargada */}
          <ellipse cx={628} cy={362} rx={48} ry={12} fill="#ff5a3d" opacity={0.18} />
          <rect x={590} y={355} width={76} height={14} rx={4} fill="#f2f2f2" stroke={INK} strokeWidth={2} />
          {[598, 614, 630, 646].map((x) => (
            <rect key={x} x={x} y={359} width={8} height={6} rx={1} fill="#333" />
          ))}
          <rect x={597} y={348} width={10} height={10} rx={2} fill="#333" />
          <rect x={613} y={348} width={10} height={10} rx={2} fill="#333" />
          <rect x={629} y={348} width={10} height={10} rx={2} fill="#333" />
          <rect x={645} y={348} width={10} height={10} rx={2} fill="#333" />
          <Heat x={606} y={344} />
          <Heat x={624} y={342} />
          <Heat x={642} y={344} />
        </g>
      ),
      hazard: ['Regleta sobrecargada', 'El ventilador, el aire acondicionado y la nevera no se conectan a la misma regleta: la sobrecarga calienta los cables y puede causar un incendio.'],
    },
    {
      id: 'c-fridge',
      x: 734, y: 243, w: 108, h: 210,
      art: (
        <g>
          <Shadow x={734} y={348} rx={58} ry={6} />
          <rect x={682} y={140} width={104} height={206} rx={10} fill="#eef3f6" stroke={INK} strokeWidth={2} />
          <rect x={770} y={143} width={13} height={200} rx={6} fill="#dbe4ea" />
          <line x1={682} y1={206} x2={786} y2={206} stroke={INK} strokeWidth={2} />
          <rect x={696} y={160} width={7} height={32} rx={3} fill="#b8c2c8" stroke={INK} strokeWidth={1.2} />
          <rect x={696} y={220} width={7} height={52} rx={3} fill="#b8c2c8" stroke={INK} strokeWidth={1.2} />
          <rect x={728} y={228} width={30} height={24} rx={2} fill="#fff" stroke="#c3ccd2" strokeWidth={1.5} transform="rotate(-4 743 240)" />
          <circle cx={737} cy={236} r={4} fill="#ffc83d" />
          <path d="M732,248 L740,242 L746,247 L754,240" stroke="#3f9a5a" strokeWidth={2} fill="none" />
          <circle cx={724} cy={176} r={5} fill="#d6455d" stroke={INK} strokeWidth={1} />
          <circle cx={746} cy={170} r={5} fill="#ffc83d" stroke={INK} strokeWidth={1} />
        </g>
      ),
      safe: 'La nevera en sí no es el problema: fíjate en su cable.',
    },
    {
      id: 'c-cable',
      x: 706, y: 401, w: 116, h: 46,
      art: (
        <g fill="none" strokeLinecap="round">
          <path d="M690,344 C702,372 746,382 738,402" stroke="#333" strokeWidth={4} />
          <path d="M716,415 C694,418 666,398 642,362 L636,356" stroke="#333" strokeWidth={4} />
          <path d="M738,402 C734,410 728,414 716,415" stroke={COPPER} strokeWidth={2.5} />
          <path d="M736,404 C731,411 725,414 718,413" stroke="#f0a95a" strokeWidth={1.2} />
          <path d="M738,402 l5,-3 M738,402 l6,2 M716,415 l-4,-4 M716,415 l-5,3" stroke="#333" strokeWidth={2} />
          <Spark x={727} y={399} s={0.8} />
          <Spark x={712} y={426} s={0.55} />
        </g>
      ),
      hazard: ['Cable pelado de la nevera', 'El cobre a la vista puede dar una descarga o un cortocircuito. Se deja de usar y se reemplaza.'],
    },
  ],
}
