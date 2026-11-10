import type { SceneDef } from '../sceneTypes'
import { INK, Puddle, SKIN, Shadow, Spark } from './common'
import { Cloud, LooseEnd, Person, Pole } from './scenery'

// Obra en construcción con una red eléctrica encima. Piso de tierra desde y = 300.

const METAL = '#8b97a3'

const backdrop = (
  <g>
    <defs>
      <linearGradient id="o-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9fd3ec" />
        <stop offset="1" stopColor="#e2f2f9" />
      </linearGradient>
      <linearGradient id="o-ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#bfa27a" />
        <stop offset="1" stopColor="#d6bd95" />
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={800} height={300} fill="url(#o-sky)" />
    <Cloud x={330} y={36} s={0.7} />
    <Cloud x={600} y={150} s={0.5} />

    {/* Edificio en obra negra */}
    <g>
      <rect x={54} y={210} width={196} height={90} fill="#c8693f" stroke={INK} strokeWidth={2} />
      <g stroke="#a8532f" strokeWidth={1.5}>
        {[226, 242, 258, 274, 290].map((y) => (
          <line key={y} x1={54} y1={y} x2={250} y2={y} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={66 + i * 20} y1={210 + (i % 2) * 16} x2={66 + i * 20} y2={226 + (i % 2) * 16} />
        ))}
      </g>
      <rect x={160} y={226} width={60} height={50} fill="#5b646b" stroke={INK} strokeWidth={2} />
      <rect x={30} y={120} width={240} height={12} fill="#b9bec3" stroke={INK} strokeWidth={2} />
      <rect x={30} y={198} width={240} height={12} fill="#b9bec3" stroke={INK} strokeWidth={2} />
      {[36, 144, 252].map((x) => (
        <g key={x}>
          <rect x={x} y={132} width={14} height={66} fill="#cdd2d6" stroke={INK} strokeWidth={2} />
          <rect x={x} y={210} width={14} height={90} fill="#cdd2d6" stroke={INK} strokeWidth={2} />
          <path d={`M${x + 3},120 L${x + 3},96 M${x + 11},120 L${x + 11},100`} stroke="#8a4a2a" strokeWidth={2.5} />
        </g>
      ))}
    </g>

    {/* Piso */}
    <rect x={0} y={300} width={800} height={180} fill="url(#o-ground)" />
    <rect x={0} y={298} width={800} height={4} fill="#a88a62" />
    <g fill="#a88a62">
      <circle cx={300} cy={360} r={3} />
      <circle cx={520} cy={460} r={2.5} />
      <circle cx={180} cy={470} r={3} />
      <circle cx={760} cy={470} r={2.5} />
      <circle cx={560} cy={380} r={2} />
    </g>
    <path d="M0,470 C120,452 220,456 300,470" stroke="#b39468" strokeWidth={8} fill="none" opacity={0.6} />

    {/* Red eléctrica */}
    <Pole x={20} top={80} bottom={300} />
    <Pole x={780} top={80} bottom={300} />
    <g fill="none" stroke="#222" strokeWidth={2.5}>
      <path d="M-14,68 Q400,104 746,68" />
      <path d="M20,56 Q400,92 780,56" />
      <path d="M54,68 Q400,108 814,68" />
    </g>
  </g>
)

export const OBRA: SceneDef = {
  id: 'obra',
  title: 'La obra',
  intro: 'Prepara la jornada: toca los peligros eléctricos de la obra. Si tocas algo seguro, se quema un fusible.',
  backdrop,
  items: [
    {
      id: 'o-panel',
      x: 100, y: 244, w: 112, h: 152,
      art: (
        <g>
          <rect x={62} y={214} width={46} height={62} rx={3} fill="#7d868d" stroke={INK} strokeWidth={2} />
          <rect x={67} y={220} width={36} height={50} rx={2} fill="#3e464c" />
          {[226, 238, 250].map((y) => (
            <g key={y}>
              <rect x={71} y={y} width={12} height={8} rx={1} fill="#e8e8e8" />
              <rect x={87} y={y} width={12} height={8} rx={1} fill="#e8e8e8" />
            </g>
          ))}
          <path d="M74,270 C70,284 80,290 74,300" stroke="#d6455d" strokeWidth={2.5} fill="none" />
          <path d="M96,270 C100,284 92,292 98,302" stroke="#222" strokeWidth={2.5} fill="none" />
          <polygon points="56,214 62,214 62,276 50,272" fill="#9aa3ab" stroke={INK} strokeWidth={1.5} />
          <Person x={132} y={318} h={150} face={-1} shirt="#7a3b8f" pants="#4b5a6a" armL={[-36, -128, -42, -96]} />
          <Spark x={100} y={240} s={0.7} />
        </g>
      ),
      hazard: ['Persona sin certificación manipulando el tablero', 'Las conexiones del tablero las hace solo personal calificado y certificado.'],
    },
    {
      id: 'o-box',
      x: 102, y: 438, w: 56, h: 50,
      art: (
        <g>
          <Shadow x={102} y={458} rx={28} ry={4} />
          <rect x={80} y={420} width={46} height={38} rx={2} fill="#c8915a" stroke={INK} strokeWidth={2} />
          <polygon points="80,420 90,410 136,410 126,420" fill="#d9a46b" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <polygon points="126,420 136,410 136,448 126,458" fill="#a87443" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <rect x={99} y={420} width={8} height={38} fill="#e8c98e" />
        </g>
      ),
      safe: 'Una caja cerrada no es un riesgo eléctrico.',
    },
    {
      id: 'o-tool',
      x: 226, y: 420, w: 144, h: 58,
      art: (
        <g>
          <Shadow x={196} y={438} rx={30} ry={4} />
          {/* Taladro */}
          <path d="M168,406 L214,406 Q222,406 222,414 L222,420 L196,420 L194,436 L180,436 L178,420 L168,420 Z" fill="#ffc83d" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <rect x={222} y={410} width={18} height={6} rx={1} fill="#8b97a3" stroke={INK} strokeWidth={1.2} />
          <rect x={172} y={410} width={12} height={6} rx={1} fill="#2d3238" />
          <path d="M186,436 C186,452 220,448 244,440" stroke="#222" strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <LooseEnd x={244} y={440} angle={-8} />
          <path d="M266,436 C276,432 288,438 298,432" stroke="#222" strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <Spark x={258} y={432} s={0.75} />
        </g>
      ),
      hazard: ['Herramienta con cable pelado', 'Una herramienta con el cable dañado puede dar una descarga. No se usa hasta repararla o cambiarla.'],
    },
    {
      id: 'o-scaffold',
      x: 360, y: 220, w: 124, h: 232,
      art: (
        <g>
          <Shadow x={360} y={334} rx={60} ry={5} />
          <g stroke={INK} strokeWidth={7} strokeLinecap="round">
            <line x1={312} y1={332} x2={312} y2={118} />
            <line x1={408} y1={332} x2={408} y2={118} />
          </g>
          <g stroke={METAL} strokeWidth={4.5} strokeLinecap="round">
            <line x1={312} y1={332} x2={312} y2={118} />
            <line x1={408} y1={332} x2={408} y2={118} />
            <line x1={312} y1={260} x2={408} y2={260} />
            <line x1={312} y1={190} x2={408} y2={190} />
            <line x1={312} y1={330} x2={408} y2={262} strokeWidth={3} />
            <line x1={408} y1={258} x2={312} y2={192} strokeWidth={3} />
            <line x1={312} y1={188} x2={408} y2={124} strokeWidth={3} />
          </g>
          <rect x={302} y={112} width={116} height={9} rx={2} fill="#c98b4f" stroke={INK} strokeWidth={2} />
          <rect x={302} y={184} width={116} height={9} rx={2} fill="#c98b4f" stroke={INK} strokeWidth={2} />
          <rect x={302} y={254} width={116} height={9} rx={2} fill="#c98b4f" stroke={INK} strokeWidth={2} />
          <path d="M350,104 L356,96 M366,104 L372,94" stroke="#ff5a3d" strokeWidth={2.5} strokeLinecap="round" />
        </g>
      ),
      hazard: ['Andamio metálico junto a la red', 'El metal conduce la electricidad. Hay que coordinar con el operador de red antes de trabajar cerca de una línea.'],
    },
    {
      id: 'o-helmet',
      x: 351, y: 442, w: 56, h: 56,
      art: (
        <g>
          <Shadow x={351} y={468} rx={26} ry={4} />
          <rect x={330} y={440} width={42} height={26} fill="#c98b4f" stroke={INK} strokeWidth={2} />
          <line x1={330} y1={453} x2={372} y2={453} stroke="#a8743f" strokeWidth={2} />
          <path d="M334,440 Q334,418 351,417 Q368,418 368,440 Z" fill="#ffc83d" stroke={INK} strokeWidth={2} />
          <rect x={328} y={437} width={46} height={6} rx={3} fill="#ffc83d" stroke={INK} strokeWidth={2} />
          <path d="M351,418 L351,437" stroke={INK} strokeWidth={1.2} opacity={0.4} />
        </g>
      ),
      safe: 'Un casco puesto en su lugar no es un peligro.',
    },
    {
      id: 'o-cone',
      x: 440, y: 444, w: 50, h: 56,
      art: (
        <g>
          <Shadow x={440} y={468} rx={24} ry={4} />
          <rect x={418} y={460} width={44} height={8} rx={2} fill="#ff6a2d" stroke={INK} strokeWidth={2} />
          <path d="M432,460 L438,420 L442,420 L448,460 Z" fill="#ff8a3d" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <path d="M435,444 L445,444 L446,452 L434,452 Z" fill="#fff" />
          <path d="M437,430 L443,430 L444,436 L436,436 Z" fill="#fff" />
        </g>
      ),
      safe: 'Una señal de obra no es un peligro eléctrico.',
    },
    {
      id: 'o-ladder',
      x: 472, y: 222, w: 66, h: 222,
      art: (
        <g>
          <Shadow x={460} y={334} rx={20} ry={4} />
          <g stroke={INK} strokeWidth={7} strokeLinecap="round">
            <line x1={448} y1={332} x2={476} y2={116} />
            <line x1={474} y1={334} x2={500} y2={118} />
          </g>
          <g stroke="#b8c2c8" strokeWidth={4.5} strokeLinecap="round">
            <line x1={448} y1={332} x2={476} y2={116} />
            <line x1={474} y1={334} x2={500} y2={118} />
          </g>
          <g stroke="#b8c2c8" strokeWidth={3.5}>
            {[0.12, 0.26, 0.4, 0.54, 0.68, 0.82, 0.94].map((t) => (
              <line key={t} x1={448 + 28 * t} y1={332 - 216 * t} x2={474 + 26 * t} y2={334 - 216 * t} />
            ))}
          </g>
          <path d="M478,106 L484,98 M494,106 L500,96" stroke="#ff5a3d" strokeWidth={2.5} strokeLinecap="round" />
        </g>
      ),
      hazard: ['Escalera metálica cerca de la red', 'Las escaleras metálicas conducen la electricidad. Se usan de fibra de vidrio y siempre lejos de la red.'],
    },
    {
      id: 'o-pipe',
      x: 612, y: 218, w: 160, h: 236,
      art: (
        <g>
          <Person x={600} y={334} h={170} face={1} vest helmet="#ffc83d" shirt="#2c6db5" pants="#3c4a57" armL={[-6, -112, 14, -106]} armR={[38, -122, 30, -140]} />
          <g strokeLinecap="round">
            <line x1={582} y1={300} x2={676} y2={112} stroke={INK} strokeWidth={10} />
            <line x1={582} y1={300} x2={676} y2={112} stroke="#aab4bb" strokeWidth={7} />
          </g>
          <circle cx={612} cy={242} r={5} fill={SKIN} stroke={INK} strokeWidth={1.5} />
          <circle cx={626} cy={213} r={5} fill={SKIN} stroke={INK} strokeWidth={1.5} />
          <path d="M676,102 L682,94 M690,108 L698,100" stroke="#ff5a3d" strokeWidth={2.5} strokeLinecap="round" />
        </g>
      ),
      hazard: ['Tubo largo cerca de la línea', 'Un material largo puede tocar o acercarse a la línea. Se mueve con distancia segura y coordinando con el operador.'],
    },
    {
      id: 'o-brick',
      x: 736, y: 334, w: 64, h: 48,
      art: (
        <g>
          <Shadow x={736} y={354} rx={32} ry={4} />
          <rect x={708} y={346} width={56} height={8} fill="#a8743f" stroke={INK} strokeWidth={1.5} />
          {[
            [710, 334], [728, 334], [746, 334],
            [719, 322], [737, 322],
            [728, 310],
          ].map(([x, y]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={18} height={12} fill="#c8693f" stroke={INK} strokeWidth={1.5} />
          ))}
        </g>
      ),
      safe: 'Un ladrillo no es un riesgo eléctrico.',
    },
    {
      id: 'o-puddle',
      x: 680, y: 420, w: 164, h: 58,
      art: (
        <g>
          <Puddle x={684} y={426} rx={62} ry={13} />
          <path d="M600,404 C630,396 650,430 680,424 S720,414 742,428" stroke="#222" strokeWidth={4} fill="none" strokeLinecap="round" />
          <rect x={740} y={420} width={22} height={16} rx={3} fill="#ff8a3d" stroke={INK} strokeWidth={1.5} />
          <rect x={745} y={425} width={4} height={6} fill="#333" />
          <rect x={753} y={425} width={4} height={6} fill="#333" />
          <g stroke="#ffd23d" strokeWidth={2} fill="none" opacity={0.75}>
            <ellipse cx={680} cy={426} rx={20} ry={5} />
          </g>
        </g>
      ),
      hazard: ['Extensión tirada en un charco', 'El agua y los cables dañados son una mala combinación: pueden dar una descarga. Se eleva o se reubica.'],
    },
  ],
}
