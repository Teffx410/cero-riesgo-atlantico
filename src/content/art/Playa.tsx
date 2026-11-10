import type { SceneDef } from '../sceneTypes'
import { INK, Puddle, SKIN, Shadow, Spark } from './common'
import { Bolt, Cloud, LooseEnd, Person } from './scenery'

// Kiosco en la playa. Mar de y = 190 a 262 y arena de 262 a 480.

const backdrop = (
  <g>
    <defs>
      <linearGradient id="p-sky" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#8e9fb3" />
        <stop offset="0.35" stopColor="#b7dcef" />
        <stop offset="1" stopColor="#bfe9ff" />
      </linearGradient>
      <linearGradient id="p-sea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1e8fbf" />
        <stop offset="1" stopColor="#4cc3de" />
      </linearGradient>
      <linearGradient id="p-sand" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ecd398" />
        <stop offset="1" stopColor="#f6e4b4" />
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={800} height={200} fill="url(#p-sky)" />
    {/* Sol */}
    <g>
      <circle cx={700} cy={58} r={40} fill="#fff3b0" opacity={0.5} />
      <circle cx={700} cy={58} r={26} fill="#ffd23d" stroke="#e8a91f" strokeWidth={2} />
    </g>
    <Cloud x={560} y={50} s={0.6} />

    {/* Mar */}
    <rect x={0} y={190} width={800} height={74} fill="url(#p-sea)" />
    <g stroke="#fff" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.7}>
      <path d="M30,214 q10,-6 20,0 q10,6 20,0" />
      <path d="M190,230 q10,-6 20,0 q10,6 20,0" />
      <path d="M640,212 q10,-6 20,0 q10,6 20,0" />
      <path d="M520,240 q10,-6 20,0 q10,6 20,0" />
    </g>
    <path d="M0,262 C80,254 160,270 260,260 S460,252 560,262 S720,270 800,258 L800,272 L0,272 Z" fill="#fff" opacity={0.85} />

    {/* Arena */}
    <path d="M0,266 C80,258 160,274 260,264 S460,256 560,266 S720,274 800,262 L800,480 L0,480 Z" fill="url(#p-sand)" />
    <g fill="#d9bd7f">
      <ellipse cx={60} cy={340} rx={3} ry={1.5} />
      <ellipse cx={180} cy={460} rx={3} ry={1.5} />
      <ellipse cx={420} cy={470} rx={3} ry={1.5} />
      <ellipse cx={600} cy={330} rx={3} ry={1.5} />
      <ellipse cx={720} cy={470} rx={3} ry={1.5} />
    </g>

    {/* Kiosco */}
    <Shadow x={390} y={344} rx={200} ry={10} />
    <rect x={214} y={176} width={12} height={168} fill="#8a5a3a" stroke={INK} strokeWidth={2} />
    <rect x={554} y={176} width={12} height={168} fill="#8a5a3a" stroke={INK} strokeWidth={2} />
    <rect x={226} y={286} width={328} height={56} fill="#c98d52" stroke={INK} strokeWidth={2} />
    <g stroke="#a8743f" strokeWidth={2}>
      <line x1={226} y1={300} x2={554} y2={300} />
      <line x1={226} y1={314} x2={554} y2={314} />
      <line x1={226} y1={328} x2={554} y2={328} />
    </g>
    <rect x={218} y={278} width={344} height={10} rx={2} fill="#e0a86e" stroke={INK} strokeWidth={2} />
    <rect x={330} y={300} width={120} height={30} rx={3} fill="#fff" stroke={INK} strokeWidth={1.5} />
    <text x={390} y={321} fontSize={16} fontWeight="bold" textAnchor="middle" fill="#d6455d" fontFamily="system-ui, sans-serif">
      KIOSCO
    </text>
    {/* Techo de palma */}
    <path d="M170,182 L230,110 L550,110 L612,182 Z" fill="#d9a441" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
    <g stroke="#b5832a" strokeWidth={2}>
      {Array.from({ length: 15 }, (_, i) => (
        <line key={i} x1={238 + i * 22} y1={112} x2={192 + i * 28} y2={180} />
      ))}
    </g>
    <path d="M170,182 Q180,192 190,182 Q200,192 210,182 Q220,192 230,182 Q240,192 250,182 Q260,192 270,182 Q280,192 290,182 Q300,192 310,182 Q320,192 330,182 Q340,192 350,182 Q360,192 370,182 Q380,192 390,182 Q400,192 410,182 Q420,192 430,182 Q440,192 450,182 Q460,192 470,182 Q480,192 490,182 Q500,192 510,182 Q520,192 530,182 Q540,192 550,182 Q560,192 570,182 Q580,192 590,182 Q600,192 612,182" fill="#d9a441" stroke={INK} strokeWidth={2} />
  </g>
)

export const PLAYA: SceneDef = {
  id: 'playa',
  title: 'La playa',
  intro: 'Inspecciona el kiosco y la playa. Toca los peligros eléctricos; si tocas algo seguro, se quema un fusible.',
  backdrop,
  items: [
    {
      id: 'p-storm',
      x: 110, y: 160, w: 130, h: 200,
      art: (
        <g>
          <Cloud x={110} y={62} s={1.1} dark />
          <Cloud x={60} y={44} s={0.7} dark />
          <Bolt x={110} y={76} s={1.1} />
          {/* Bañista en el agua */}
          <Person x={112} y={282} h={110} face={0} shirt={SKIN} noLegs armL={[-40, -170, -34, -196]} armR={[40, -170, 34, -196]} />
          <ellipse cx={112} cy={240} rx={34} ry={7} fill="#3fb6d6" stroke="#fff" strokeWidth={2.5} />
          <path d="M70,250 q8,-4 16,0 M138,252 q8,-4 16,0" stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" />
        </g>
      ),
      hazard: ['Persona en el agua con tormenta', 'El agua conduce la electricidad y los rayos pueden caer lejos de la lluvia. Hay que salir del agua y refugiarse en un lugar cerrado.'],
    },
    {
      id: 'p-bucket',
      x: 46, y: 444, w: 50, h: 50,
      art: (
        <g>
          <Shadow x={46} y={466} rx={20} ry={4} />
          <path d="M30,432 L62,432 L58,464 L34,464 Z" fill="#ff8a3d" stroke={INK} strokeWidth={2} />
          <path d="M30,432 Q46,412 62,432" stroke={INK} strokeWidth={2} fill="none" />
          <rect x={28} y={428} width={36} height={6} rx={2} fill="#ffa766" stroke={INK} strokeWidth={1.5} />
          <path d="M68,462 L80,450 L84,454 L72,466 Z" fill="#0e9fb5" stroke={INK} strokeWidth={1.5} />
        </g>
      ),
      safe: 'Un balde no es un peligro eléctrico.',
    },
    {
      id: 'p-umbrella',
      x: 124, y: 378, w: 100, h: 110,
      art: (
        <g>
          <Shadow x={130} y={432} rx={46} ry={6} />
          <line x1={124} y1={338} x2={130} y2={432} stroke="#8a5a32" strokeWidth={4} />
          <path d="M74,350 Q120,300 176,330 Z" fill="#d6455d" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <path d="M98,338 Q122,306 140,322 L124,338 Z" fill="#fff" />
          <path d="M140,322 Q160,320 176,330 L150,334 Z" fill="#fff" />
          <path d="M74,350 Q120,300 176,330" stroke={INK} strokeWidth={2} fill="none" />
          <path d="M84,420 L176,420 L170,432 L90,432 Z" fill="#0e9fb5" stroke={INK} strokeWidth={1.5} />
        </g>
      ),
      safe: 'Una sombrilla no es un peligro eléctrico.',
    },
    {
      id: 'p-lights',
      x: 390, y: 204, w: 230, h: 44,
      art: (
        <g>
          <path d="M280,190 C330,214 450,214 500,190" stroke="#333" strokeWidth={2.5} fill="none" />
          {[
            [296, 199],
            [326, 207],
            [356, 211],
            [424, 211],
            [454, 207],
            [484, 199],
          ].map(([x, y]) => (
            <g key={x}>
              <circle cx={x} cy={y + 8} r={9} fill="#fff3b0" opacity={0.6} />
              <rect x={x - 2.5} y={y} width={5} height={5} fill="#555" />
              <ellipse cx={x} cy={y + 9} rx={5} ry={6} fill="#ffe28a" stroke={INK} strokeWidth={1.2} />
            </g>
          ))}
          {/* Empalme con cinta */}
          <rect x={380} y={207} width={22} height={12} rx={3} fill="#1a1a1a" stroke={INK} strokeWidth={1.2} transform="rotate(-4 391 213)" />
          <path d="M378,209 L404,214 M380,216 L402,219" stroke="#444" strokeWidth={1.2} />
          <LooseEnd x={402} y={218} angle={30} />
        </g>
      ),
      hazard: ['Luces con empalme de cinta', 'Los empalmes improvisados se calientan o se sueltan. Deben hacerse con materiales adecuados y por personal certificado.'],
    },
    {
      id: 'p-drink',
      x: 330, y: 262, w: 46, h: 40,
      art: (
        <g>
          <path d="M320,248 L340,248 L336,276 L324,276 Z" fill="#ff8a3d" opacity={0.85} stroke={INK} strokeWidth={1.5} />
          <path d="M321,256 L339,256" stroke="#ffd23d" strokeWidth={3} />
          <line x1={334} y1={240} x2={330} y2={262} stroke="#d6455d" strokeWidth={2.5} />
          <circle cx={322} cy={248} r={5} fill="#7ccf5a" stroke={INK} strokeWidth={1.2} />
        </g>
      ),
      safe: 'Una bebida no es un riesgo eléctrico.',
    },
    {
      id: 'p-ext',
      x: 300, y: 418, w: 170, h: 54,
      art: (
        <g>
          <ellipse cx={300} cy={424} rx={82} ry={16} fill="#c9ad72" opacity={0.85} />
          <ellipse cx={280} cy={420} rx={40} ry={7} fill="#b89a5e" opacity={0.7} />
          <path d="M240,340 C236,380 230,400 260,414 S330,426 350,412 S372,404 380,414" stroke="#222" strokeWidth={4} fill="none" strokeLinecap="round" />
          <rect x={374} y={406} width={22} height={16} rx={3} fill="#f2f2f2" stroke={INK} strokeWidth={1.5} />
          <rect x={379} y={411} width={4} height={6} fill="#333" />
          <rect x={387} y={411} width={4} height={6} fill="#333" />
          <circle cx={262} cy={418} r={2} fill="#7cc4ec" />
          <circle cx={320} cy={428} r={2} fill="#7cc4ec" />
        </g>
      ),
      hazard: ['Extensión sobre arena húmeda', 'La humedad y la arena dañan el aislante. Una instalación así la debe hacer personal certificado.'],
    },
    {
      id: 'p-fridge',
      x: 470, y: 374, w: 96, h: 122,
      art: (
        <g>
          <Puddle x={474} y={422} rx={44} ry={10} />
          <rect x={442} y={322} width={58} height={96} rx={8} fill="#eef3f6" stroke={INK} strokeWidth={2} />
          <rect x={448} y={330} width={46} height={36} rx={3} fill="#bfe6f7" stroke={INK} strokeWidth={1.5} />
          <rect x={452} y={340} width={8} height={22} rx={2} fill="#d6455d" />
          <rect x={464} y={344} width={8} height={18} rx={2} fill="#ffc83d" />
          <rect x={476} y={340} width={8} height={22} rx={2} fill="#1f9d63" />
          <rect x={448} y={372} width={46} height={10} rx={2} fill="#0e9fb5" />
          <path d="M500,400 C512,406 508,418 518,424" stroke="#333" strokeWidth={3.5} fill="none" />
          <LooseEnd x={518} y={424} angle={20} />
          <Spark x={532} y={424} s={0.6} />
        </g>
      ),
      hazard: ['Nevera en piso mojado con cable dañado', 'Tocar un equipo energizado en piso mojado puede dar una descarga grave. No lo toques y avisa al encargado.'],
    },
    {
      id: 'p-shell',
      x: 572, y: 454, w: 44, h: 40,
      art: (
        <g>
          <path d="M556,462 Q572,432 588,462 Z" fill="#f6b8c4" stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
          <path d="M572,440 L566,462 M572,440 L572,462 M572,440 L578,462 M572,440 L561,460 M572,440 L583,460" stroke="#d47f92" strokeWidth={1.2} />
        </g>
      ),
      safe: 'Una concha no es un riesgo eléctrico.',
    },
    {
      id: 'p-speaker',
      x: 650, y: 402, w: 112, h: 84,
      art: (
        <g>
          <Puddle x={672} y={430} rx={40} ry={9} />
          <Shadow x={630} y={420} rx={26} ry={5} />
          <rect x={608} y={364} width={42} height={58} rx={5} fill="#2d3238" stroke={INK} strokeWidth={2} />
          <circle cx={629} cy={402} r={12} fill="#555c63" stroke="#111" strokeWidth={2} />
          <circle cx={629} cy={402} r={4} fill="#222" />
          <circle cx={629} cy={377} r={6} fill="#555c63" stroke="#111" strokeWidth={1.5} />
          <path d="M650,410 C666,420 680,418 690,428 S706,436 712,432" stroke="#222" strokeWidth={3.5} fill="none" strokeLinecap="round" />
          <g stroke="#0e9fb5" strokeWidth={2} fill="none" strokeLinecap="round">
            <path d="M598,384 q-6,8 0,16" />
            <path d="M592,378 q-10,14 0,28" />
          </g>
        </g>
      ),
      hazard: ['Parlante con cable por un charco', 'Un cable en un charco puede dar descarga. Se reubica y lo revisa personal certificado.'],
    },
    {
      id: 'p-palm',
      x: 738, y: 232, w: 104, h: 210,
      art: (
        <g>
          <Shadow x={740} y={340} rx={30} ry={5} />
          <path d="M730,340 C734,280 742,220 760,160 L772,164 C756,224 748,282 746,340 Z" fill="#a8743f" stroke={INK} strokeWidth={2} />
          <g stroke="#8a5a32" strokeWidth={2}>
            <line x1={732} y1={312} x2={746} y2={312} />
            <line x1={735} y1={280} x2={749} y2={281} />
            <line x1={740} y1={248} x2={754} y2={250} />
            <line x1={747} y1={216} x2={761} y2={219} />
            <line x1={755} y1={186} x2={768} y2={190} />
          </g>
          <g fill="#3f9a5a" stroke={INK} strokeWidth={2} strokeLinejoin="round">
            <path d="M766,160 C740,140 710,146 690,170 C716,158 740,160 766,164 Z" />
            <path d="M766,160 C790,136 800,140 800,150 C790,150 780,156 768,166 Z" />
            <path d="M766,160 C756,128 770,112 790,110 C778,124 774,140 770,162 Z" />
            <path d="M766,160 C740,120 716,122 704,130 C730,134 746,146 764,164 Z" />
            <path d="M766,160 C786,170 794,190 790,210 C782,190 776,180 764,166 Z" />
          </g>
          <circle cx={760} cy={168} r={6} fill="#6b4f3a" stroke={INK} strokeWidth={1.2} />
          <circle cx={770} cy={170} r={6} fill="#6b4f3a" stroke={INK} strokeWidth={1.2} />
          {/* Cable amarrado al tronco */}
          <path d="M600,150 C660,170 700,214 744,240" stroke="#222" strokeWidth={3} fill="none" />
          <path d="M736,236 L756,244 M735,244 L755,250" stroke="#d9822b" strokeWidth={3} strokeLinecap="round" />
          <path d="M744,250 C742,280 720,300 712,330" stroke="#222" strokeWidth={3} fill="none" />
        </g>
      ),
      hazard: ['Cable amarrado a una palma', 'Los cables no se amarran a los árboles: se mueven con el viento, se pelan y pueden energizar la palma.'],
    },
  ],
}
