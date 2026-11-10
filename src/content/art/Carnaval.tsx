import type { SceneDef } from '../sceneTypes'
import { INK, Puddle, Shadow, Spark } from './common'
import { Bunting, LooseEnd, Person } from './scenery'

// Tarima de carnaval de noche. Plaza desde y = 330.

const STARS = [
  [40, 40], [130, 70], [210, 30], [300, 60], [380, 24], [470, 70], [560, 36], [640, 80], [780, 120], [30, 180], [760, 30],
]

const backdrop = (
  <g>
    <defs>
      <linearGradient id="k-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#181a42" />
        <stop offset="1" stopColor="#3d3f80" />
      </linearGradient>
      <linearGradient id="k-floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#575b7a" />
        <stop offset="1" stopColor="#6d7194" />
      </linearGradient>
      <radialGradient id="k-glow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffe28a" stopOpacity="0.55" />
        <stop offset="1" stopColor="#ffe28a" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect x={0} y={0} width={800} height={330} fill="url(#k-sky)" />
    <g fill="#fff">
      {STARS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={1.8} opacity={0.85} />
      ))}
    </g>
    {/* Luna */}
    <circle cx={718} cy={62} r={26} fill="#fff6c9" />
    <circle cx={730} cy={54} r={22} fill="#20234d" />

    {/* Siluetas de casas al fondo */}
    <path d="M0,330 L0,250 L40,250 L40,230 L90,230 L90,262 L130,262 L130,330 Z" fill="#2a2c5e" />
    <path d="M640,330 L640,262 L690,262 L690,236 L740,236 L740,256 L800,256 L800,330 Z" fill="#2a2c5e" />

    {/* Plaza */}
    <rect x={0} y={330} width={800} height={150} fill="url(#k-floor)" />
    <g stroke="#4c5070" strokeWidth={1.5} opacity={0.8}>
      {[352, 380, 416, 460].map((y) => (
        <line key={y} x1={0} y1={y} x2={800} y2={y} />
      ))}
    </g>
    <ellipse cx={405} cy={330} rx={300} ry={40} fill="url(#k-glow)" />

    {/* Tarima */}
    <rect x={212} y={186} width={386} height={100} fill="#4b2a6b" stroke={INK} strokeWidth={2} />
    <text x={405} y={244} fontSize={28} fontWeight={900} textAnchor="middle" fill="#ffc83d" stroke="#7a3b8f" strokeWidth={1.5} fontFamily="system-ui, sans-serif" letterSpacing={3}>
      CARNAVAL
    </text>
    <rect x={190} y={284} width={430} height={46} fill="#7a3b8f" stroke={INK} strokeWidth={2} />
    <rect x={190} y={284} width={430} height={8} fill="#c06ad6" stroke={INK} strokeWidth={1.5} />
    <g fill="#ffc83d">
      {Array.from({ length: 14 }, (_, i) => (
        <polygon key={i} points={`${200 + i * 30},300 ${212 + i * 30},300 ${206 + i * 30},322`} />
      ))}
    </g>
    {/* Toldo de la tarima */}
    <path d="M170,190 L210,120 L600,120 L640,190 Z" fill="#f2a33a" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    <g fill="#d6455d">
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d={`M${218 + i * 50},120 L${244 + i * 50},120 L${236 + i * 56},190 L${206 + i * 56},190 Z`} />
      ))}
    </g>
    <path d="M170,190 L210,120 L600,120 L640,190 Z" fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    <rect x={208} y={190} width={8} height={96} fill="#8b949b" stroke={INK} strokeWidth={1.5} />
    <rect x={594} y={190} width={8} height={96} fill="#8b949b" stroke={INK} strokeWidth={1.5} />

    {/* Guirnaldas */}
    <Bunting x1={0} x2={170} y={100} sag={10} />
    <Bunting x1={640} x2={800} y={150} sag={10} />
  </g>
)

export const CARNAVAL: SceneDef = {
  id: 'carnaval',
  title: 'Carnaval y fiestas',
  intro: 'Revisa la tarima y el toldo. Toca los peligros eléctricos; si tocas algo seguro, se quema un fusible.',
  backdrop,
  items: [
    {
      id: 'k-balloon',
      x: 82, y: 156, w: 70, h: 110,
      art: (
        <g>
          <path d="M70,140 C74,170 80,190 84,210 M94,134 C90,170 86,190 84,210 M80,118 C82,160 84,190 84,210" stroke="#ddd" strokeWidth={1.2} fill="none" />
          <ellipse cx={68} cy={128} rx={15} ry={18} fill="#d6455d" stroke={INK} strokeWidth={1.8} />
          <ellipse cx={96} cy={122} rx={15} ry={18} fill="#ffc83d" stroke={INK} strokeWidth={1.8} />
          <ellipse cx={82} cy={104} rx={15} ry={18} fill="#0e9fb5" stroke={INK} strokeWidth={1.8} />
          <ellipse cx={63} cy={122} rx={4} ry={6} fill="#fff" opacity={0.5} />
          <ellipse cx={77} cy={98} rx={4} ry={6} fill="#fff" opacity={0.5} />
        </g>
      ),
      safe: 'Un globo no es un peligro eléctrico.',
    },
    {
      id: 'k-box',
      x: 150, y: 278, w: 72, h: 104,
      art: (
        <g>
          <rect x={146} y={300} width={8} height={32} fill="#8b949b" stroke={INK} strokeWidth={1.5} />
          <rect x={128} y={240} width={44} height={62} rx={3} fill="#7d868d" stroke={INK} strokeWidth={2} />
          <rect x={133} y={246} width={34} height={50} rx={2} fill="#3e464c" />
          {[252, 264, 276].map((y) => (
            <g key={y}>
              <rect x={137} y={y} width={11} height={8} rx={1} fill="#e8e8e8" />
              <rect x={152} y={y} width={11} height={8} rx={1} fill="#e8e8e8" />
            </g>
          ))}
          <polygon points="172,240 188,246 188,296 172,302" fill="#9aa3ab" stroke={INK} strokeWidth={1.5} />
          <path d="M140,296 C136,312 146,318 140,330" stroke="#d6455d" strokeWidth={2.5} fill="none" />
          <LooseEnd x={140} y={330} angle={100} />
          <Spark x={150} y={290} s={0.7} />
        </g>
      ),
      hazard: ['Tablero abierto y sin protección', 'Con el tablero abierto cualquiera puede tocar los cables. Debe estar cerrado, protegido y revisado por personal certificado.'],
    },
    {
      id: 'k-lights',
      x: 405, y: 206, w: 270, h: 46,
      art: (
        <g>
          <path d="M276,190 C340,210 470,210 534,190" stroke="#ddd" strokeWidth={2} fill="none" />
          {[
            [292, 194, '#ff5a5a'],
            [322, 199, '#ffc83d'],
            [352, 202, '#4fd1e8'],
            [384, 204, '#7ce07c'],
            [416, 204, '#ff8ad4'],
            [448, 202, '#ffc83d'],
            [478, 199, '#4fd1e8'],
          ].map(([x, y, c]) => (
            <g key={x as number}>
              <circle cx={x as number} cy={(y as number) + 9} r={10} fill={c as string} opacity={0.35} />
              <rect x={(x as number) - 2.5} y={y as number} width={5} height={5} fill="#555" />
              <ellipse cx={x as number} cy={(y as number) + 9} rx={5} ry={6} fill={c as string} stroke={INK} strokeWidth={1.2} />
            </g>
          ))}
          {/* Bombillo roto y cable al aire */}
          <rect x={505} y={196} width={5} height={5} fill="#555" />
          <path d="M504,201 L506,209 L509,203 L512,209" stroke="#9aa3ab" strokeWidth={1.5} fill="none" />
          <path d="M534,192 C540,200 546,206 544,216" stroke="#ddd" strokeWidth={2} fill="none" />
          <LooseEnd x={544} y={216} angle={80} />
          <Spark x={544} y={232} s={0.7} />
        </g>
      ),
      hazard: ['Luces dañadas con cable al aire', 'Las luces con cables rotos pueden dar descargas o incendio. Se reemplazan, no se tapan con cinta.'],
    },
    {
      id: 'k-drum',
      x: 262, y: 266, w: 54, h: 54,
      art: (
        <g>
          <rect x={244} y={252} width={36} height={32} fill="#a8743f" stroke={INK} strokeWidth={2} />
          <path d="M244,256 L252,280 L260,256 L268,280 L276,256 L280,264" stroke="#f0dca8" strokeWidth={2} fill="none" />
          <ellipse cx={262} cy={252} rx={18} ry={5} fill="#f4e6c4" stroke={INK} strokeWidth={2} />
          <ellipse cx={262} cy={284} rx={18} ry={5} fill="#8a5a32" stroke={INK} strokeWidth={2} />
        </g>
      ),
      safe: 'Un tambor no es un riesgo eléctrico.',
    },
    {
      id: 'k-horn',
      x: 402, y: 272, w: 64, h: 34,
      art: (
        <g>
          <path d="M376,274 L410,272 L430,262 L430,284 L410,276 Z" fill="#ffc83d" stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
          <circle cx={392} cy={270} r={3} fill="#e8a91f" stroke={INK} strokeWidth={1} />
          <circle cx={400} cy={270} r={3} fill="#e8a91f" stroke={INK} strokeWidth={1} />
          <rect x={372} y={272} width={6} height={4} fill="#e8a91f" stroke={INK} strokeWidth={1} />
        </g>
      ),
      safe: 'Una trompeta no es un riesgo eléctrico.',
    },
    {
      id: 'k-mask',
      x: 532, y: 262, w: 60, h: 50,
      art: (
        <g>
          <path d="M518,248 Q510,232 516,222 M532,246 Q532,226 540,218 M546,250 Q556,236 554,224" stroke="#1f9d63" strokeWidth={4} fill="none" strokeLinecap="round" />
          <path d="M510,256 Q532,244 554,256 Q556,272 540,278 Q532,270 524,278 Q508,272 510,256 Z" fill="#d6455d" stroke={INK} strokeWidth={2} />
          <ellipse cx={522} cy={262} rx={6} ry={4} fill="#20234d" />
          <ellipse cx={542} cy={262} rx={6} ry={4} fill="#20234d" />
          <path d="M512,258 Q532,250 552,258" stroke="#ffc83d" strokeWidth={2} fill="none" />
        </g>
      ),
      safe: 'Una máscara de carnaval no es un riesgo eléctrico.',
    },
    {
      id: 'k-kids',
      x: 92, y: 400, w: 112, h: 104,
      art: (
        <g>
          <path d="M36,444 C70,436 110,456 150,440 S190,430 196,420" stroke="#222" strokeWidth={4} fill="none" strokeLinecap="round" />
          <Person x={70} y={446} h={88} kid face={1} shirt="#ffc83d" pants="#2c6db5" shorts armR={[34, -150, 46, -178]} />
          <Person x={118} y={452} h={78} kid face={-1} shirt="#ff8ad4" pants="#7a3b8f" shorts ponytail armL={[-34, -150, -46, -176]} />
        </g>
      ),
      hazard: ['Niños jugando junto a los cables', 'Se separa a las personas de la instalación: se acordona la zona y se avisa al organizador.'],
    },
    {
      id: 'k-chain',
      x: 270, y: 398, w: 170, h: 60,
      art: (
        <g>
          <Shadow x={270} y={414} rx={84} ry={6} />
          <rect x={194} y={396} width={60} height={14} rx={4} fill="#f2f2f2" stroke={INK} strokeWidth={2} />
          <rect x={288} y={396} width={60} height={14} rx={4} fill="#f2f2f2" stroke={INK} strokeWidth={2} />
          {[202, 216, 230, 296, 310, 324].map((x) => (
            <rect key={x} x={x} y={400} width={8} height={6} rx={1} fill="#333" />
          ))}
          <rect x={228} y={388} width={12} height={10} rx={2} fill="#333" />
          <path d="M254,403 L288,403" stroke="#222" strokeWidth={4} />
          <rect x={200} y={388} width={10} height={10} rx={2} fill="#333" />
          <rect x={214} y={388} width={10} height={10} rx={2} fill="#333" />
          <rect x={308} y={388} width={10} height={10} rx={2} fill="#333" />
          <rect x={322} y={388} width={10} height={10} rx={2} fill="#333" />
          <path d="M205,388 C198,370 206,354 200,336 M219,388 C220,370 228,354 232,332 M313,388 C306,368 296,356 290,334 M327,388 C336,370 350,360 356,340" stroke="#222" strokeWidth={2.5} fill="none" />
          <path d="M348,403 C364,404 372,396 378,384" stroke="#222" strokeWidth={4} fill="none" />
          <path d="M232,384 q3,-5 0,-10 q-3,-5 0,-10 M318,384 q3,-5 0,-10 q-3,-5 0,-10" stroke="#ff5a3d" strokeWidth={2} fill="none" strokeLinecap="round" />
        </g>
      ),
      hazard: ['Extensiones conectadas en cadena', 'Las extensiones en cadena se sobrecargan y se calientan. La tarima necesita una instalación hecha por personal certificado.'],
    },
    {
      id: 'k-puddle',
      x: 472, y: 410, w: 150, h: 60,
      art: (
        <g>
          <Puddle x={474} y={418} rx={64} ry={13} />
          <path d="M404,396 C430,420 460,410 480,420 S520,430 540,404" stroke="#222" strokeWidth={4} fill="none" strokeLinecap="round" />
          <path d="M416,430 C440,418 470,432 500,426" stroke="#d6455d" strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <g stroke="#ffd23d" strokeWidth={2} fill="none" opacity={0.75}>
            <ellipse cx={476} cy={420} rx={22} ry={5} />
          </g>
        </g>
      ),
      hazard: ['Cables por el piso en un charco', 'Los cables en el piso se pisan y se dañan, y con humedad pueden dar una descarga. Se elevan y se protegen.'],
    },
    {
      id: 'k-tent',
      x: 702, y: 284, w: 150, h: 184,
      art: (
        <g>
          <Shadow x={702} y={372} rx={70} ry={6} />
          <polygon points="636,250 702,206 768,250" fill="#0e9fb5" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <polygon points="636,250 702,206 702,250" fill="#3fbcd0" />
          <path d="M636,250 L768,250" stroke={INK} strokeWidth={2} />
          <path d="M636,250 Q650,262 664,250 Q678,262 692,250 Q706,262 720,250 Q734,262 748,250 Q760,262 768,250" fill="#0e9fb5" stroke={INK} strokeWidth={2} />
          <g stroke={INK} strokeWidth={7} strokeLinecap="round">
            <line x1={642} y1={252} x2={642} y2={370} />
            <line x1={762} y1={252} x2={762} y2={370} />
          </g>
          <g stroke="#b8c2c8" strokeWidth={4.5} strokeLinecap="round">
            <line x1={642} y1={252} x2={642} y2={370} />
            <line x1={762} y1={252} x2={762} y2={370} />
          </g>
          <rect x={668} y={318} width={70} height={10} rx={2} fill="#c98b4f" stroke={INK} strokeWidth={1.5} />
          <path d="M600,360 C620,330 630,300 640,286 C646,280 650,270 646,256" stroke="#222" strokeWidth={3.5} fill="none" />
          <path d="M636,292 L646,300" stroke="#d9822b" strokeWidth={3} strokeLinecap="round" />
          <Spark x={644} y={290} s={0.9} />
          <Spark x={652} y={306} s={0.55} />
        </g>
      ),
      hazard: ['Toldo metálico con cables rozando la estructura', 'Un cable con el aislante dañado puede energizar toda la estructura metálica. Los cables van aislados y protegidos.'],
    },
  ],
}
