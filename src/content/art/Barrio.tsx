import type { SceneDef } from '../sceneTypes'
import { INK, Puddle, Shadow, Spark } from './common'
import { Cloud, House, LooseEnd, Pole, Tree, Window } from './scenery'

// Calle después de la lluvia. Andén de y = 300 a 340 y calle de 344 a 480.

const W1 = 'M60,58 Q340,90 560,58'
const W2 = 'M90,46 Q340,78 590,46'
const W3 = 'M120,58 Q340,92 620,58'

const backdrop = (
  <g>
    <defs>
      <linearGradient id="b-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#a9d6ea" />
        <stop offset="1" stopColor="#e4f3f9" />
      </linearGradient>
      <linearGradient id="b-road" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#555c66" />
        <stop offset="1" stopColor="#68707b" />
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={800} height={300} fill="url(#b-sky)" />
    <Cloud x={250} y={40} s={0.8} />
    <Cloud x={700} y={110} s={0.6} />

    {/* Casas */}
    <House x={150} w={180} top={150} wall="#f6c453" roof="#c0563f" />
    <Window x={172} y={182} w={50} h={44} />
    <rect x={262} y={218} width={42} height={82} rx={2} fill="#8a5a32" stroke={INK} strokeWidth={2} />
    <circle cx={296} cy={262} r={3} fill="#f0dca8" />
    <House x={352} w={108} top={206} wall="#a9c6f0" roof="#5a6fb0" />
    <Window x={372} y={228} w={34} h={30} />
    <House x={610} w={180} top={172} wall="#8ec5a8" roof="#a7482f" />
    <Window x={630} y={200} w={46} h={40} />
    <rect x={688} y={230} width={34} height={70} rx={2} fill="#2f8f9d" stroke={INK} strokeWidth={2} />

    {/* Andén y calle */}
    <rect x={0} y={300} width={800} height={40} fill="#d8d2c4" />
    <g stroke="#c2baa8" strokeWidth={1.5}>
      {Array.from({ length: 20 }, (_, i) => (
        <line key={i} x1={i * 42} y1={300} x2={i * 42 - 6} y2={338} />
      ))}
    </g>
    <rect x={0} y={336} width={800} height={9} fill="#b8b0a0" stroke={INK} strokeWidth={1.5} />
    <rect x={0} y={345} width={800} height={135} fill="url(#b-road)" />
    <g fill="#f5d84c">
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={i * 96 + 10} y={428} width={52} height={6} rx={2} />
      ))}
    </g>
    <g stroke="#8b939e" strokeWidth={3} strokeLinecap="round" opacity={0.6}>
      <line x1={40} y1={372} x2={90} y2={372} />
      <line x1={480} y1={396} x2={520} y2={396} />
      <line x1={600} y1={462} x2={660} y2={462} />
    </g>
    <Puddle x={150} y={455} rx={44} ry={9} />

    {/* Poste del fondo y red */}
    <Pole x={590} top={70} bottom={322} />
    <g fill="none" stroke="#222" strokeWidth={2.5}>
      <path d="M0,62 Q30,62 60,58" />
      <path d="M0,50 Q50,50 90,46" />
      <path d="M0,62 Q70,62 120,58" />
      <path d={W1} />
      <path d={W2} />
      <path d={W3} />
      <path d="M560,58 Q690,80 800,70" />
      <path d="M590,46 Q700,66 800,58" />
      <path d="M620,58 Q720,78 800,74" />
    </g>
  </g>
)

export const BARRIO: SceneDef = {
  id: 'barrio',
  title: 'El barrio',
  intro: 'Recorre la calle después de la lluvia y toca los peligros eléctricos. Si tocas algo que no es peligroso, se quema un fusible.',
  backdrop,
  items: [
    {
      id: 'b-trash',
      x: 30, y: 308, w: 46, h: 54,
      art: (
        <g>
          <Shadow x={30} y={331} rx={20} ry={4} />
          <path d="M15,292 L45,292 L42,330 L18,330 Z" fill="#1f9d63" stroke={INK} strokeWidth={2} />
          <path d="M23,298 L24,324 M30,298 L30,324 M37,298 L36,324" stroke="#167a4c" strokeWidth={2} />
          <rect x={11} y={285} width={38} height={8} rx={3} fill="#25b071" stroke={INK} strokeWidth={2} />
          <rect x={25} y={280} width={10} height={5} rx={2} fill="#167a4c" />
        </g>
      ),
      safe: 'Una caneca de basura no es un peligro eléctrico.',
    },
    {
      id: 'b-pole',
      x: 90, y: 200, w: 70, h: 270,
      art: (
        <g>
          <circle cx={120} cy={56} r={22} fill="#ffd23d" opacity={0.35} />
          <Pole x={90} top={70} bottom={334} />
          <rect x={98} y={96} width={26} height={40} rx={6} fill="#9aa7ae" stroke={INK} strokeWidth={2} />
          <line x1={98} y1={108} x2={124} y2={108} stroke="#7b8791" strokeWidth={2} />
          <Spark x={121} y={50} s={1.1} />
          <Spark x={132} y={64} s={0.7} />
          <Spark x={110} y={42} s={0.6} />
          <g stroke="#8d8d8d" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.7}>
            <path d="M126,40 q-6,-7 0,-14 q6,-7 0,-14" />
          </g>
        </g>
      ),
      hazard: ['Poste con chispas', 'Una falla en el poste puede energizar el suelo cercano. Aléjate y avisa al operador de red o al 123.'],
    },
    {
      id: 'b-hang',
      x: 235, y: 120, w: 150, h: 92,
      art: (
        <g fill="none" strokeLinecap="round">
          <path d="M170,68 C190,130 250,160 304,176" stroke="#333" strokeWidth={2} />
          <path d="M186,70 C210,120 260,150 308,172" stroke="#6b4f3a" strokeWidth={2} />
          <path d="M200,72 C230,110 270,140 312,170" stroke="#333" strokeWidth={2} />
          <path d="M166,66 q4,8 8,2 M182,68 q4,8 8,2 M196,70 q4,8 8,2" stroke="#d9822b" strokeWidth={2.5} />
          <rect x={300} y={166} width={18} height={14} rx={3} fill="#222" stroke={INK} strokeWidth={1.5} />
          <path d="M302,170 L316,176" stroke="#555" strokeWidth={2} />
        </g>
      ),
      hazard: ['Conexión ilegal ("colgado")', 'Los cables colgados a la red no tienen protecciones: causan descargas, incendios y accidentes, incluso a quien no los hizo.'],
    },
    {
      id: 'b-kite',
      x: 440, y: 110, w: 80, h: 96,
      art: (
        <g>
          <path d="M440,70 C436,64 446,62 444,72" stroke="#555" strokeWidth={1.5} fill="none" />
          <polygon points="440,64 460,86 440,114 420,86" fill="#d6455d" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <polygon points="440,64 460,86 440,86" fill="#ffc83d" />
          <polygon points="420,86 440,86 440,114" fill="#ffc83d" />
          <path d="M440,64 L440,114 M420,86 L460,86" stroke={INK} strokeWidth={1.5} />
          <path d="M440,114 C432,128 450,138 442,154" stroke="#555" strokeWidth={1.5} fill="none" />
          <path d="M434,126 l6,4 l-6,4 Z M446,140 l6,4 l-6,4 Z" fill="#0e9fb5" stroke={INK} strokeWidth={1} />
        </g>
      ),
      hazard: ['Cometa enredada en el cable', 'No la halas ni subas a soltarla: aléjate y avisa al operador de red.'],
    },
    {
      id: 'b-tree',
      x: 522, y: 230, w: 100, h: 144,
      art: <Tree x={522} y={302} s={0.9} />,
      safe: 'Un árbol que no toca ningún cable no es un riesgo eléctrico.',
    },
    {
      id: 'b-box',
      x: 745, y: 252, w: 66, h: 72,
      art: (
        <g>
          <rect x={722} y={222} width={46} height={62} rx={3} fill="#9aa3ab" stroke={INK} strokeWidth={2} />
          <rect x={728} y={228} width={34} height={50} rx={2} fill="#4b535a" />
          <circle cx={745} cy={242} r={9} fill="#f4f4ef" stroke={INK} strokeWidth={1.5} />
          <path d="M745,242 L750,238" stroke={INK} strokeWidth={1.5} />
          <path d="M734,262 C732,276 738,284 732,294" stroke="#d6455d" strokeWidth={3} fill="none" />
          <path d="M752,262 C756,276 750,284 756,296" stroke="#1f9d63" strokeWidth={3} fill="none" />
          <LooseEnd x={732} y={294} angle={100} />
          <LooseEnd x={756} y={296} angle={80} />
          <polygon points="768,222 790,228 790,280 768,284" fill="#b2bac1" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        </g>
      ),
      hazard: ['Caja de medidores abierta', 'Con los cables al aire cualquiera puede tocarlos. Debe estar cerrada y revisada por personal autorizado.'],
    },
    {
      id: 'b-puddle',
      x: 360, y: 393, w: 176, h: 66,
      art: (
        <g>
          <Puddle x={370} y={402} rx={66} ry={13} />
          <path d="M290,330 C300,360 330,380 360,392 S410,404 420,398" stroke="#222" strokeWidth={4} fill="none" strokeLinecap="round" />
          <LooseEnd x={420} y={398} angle={-10} />
          <Spark x={436} y={392} s={0.8} />
          <Spark x={428} y={408} s={0.55} />
          <g stroke="#ffd23d" strokeWidth={2} fill="none" opacity={0.8}>
            <ellipse cx={400} cy={402} rx={20} ry={5} />
            <ellipse cx={400} cy={402} rx={34} ry={8} opacity={0.6} />
          </g>
        </g>
      ),
      hazard: ['Cable caído junto a un charco', 'Puede estar energizado y el agua amplía el peligro. No te acerques, aleja a los demás y avisa al operador de red o al 123.'],
    },
    {
      id: 'b-dog',
      x: 532, y: 446, w: 66, h: 50,
      art: (
        <g>
          <Shadow x={530} y={462} rx={26} ry={4} />
          <path d="M510,436 Q500,426 504,418" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d="M510,436 Q500,426 504,418" stroke="#c98b4f" strokeWidth={3} fill="none" strokeLinecap="round" />
          <g stroke={INK} strokeWidth={5} strokeLinecap="round">
            <line x1={516} y1={444} x2={515} y2={460} />
            <line x1={526} y1={446} x2={527} y2={460} />
            <line x1={538} y1={446} x2={537} y2={460} />
            <line x1={546} y1={444} x2={548} y2={460} />
          </g>
          <g stroke="#c98b4f" strokeWidth={3} strokeLinecap="round">
            <line x1={516} y1={444} x2={515} y2={459} />
            <line x1={526} y1={446} x2={527} y2={459} />
            <line x1={538} y1={446} x2={537} y2={459} />
            <line x1={546} y1={444} x2={548} y2={459} />
          </g>
          <ellipse cx={531} cy={438} rx={22} ry={11} fill="#c98b4f" stroke={INK} strokeWidth={2} />
          <ellipse cx={528} cy={434} rx={9} ry={5} fill="#e0a86e" />
          <circle cx={553} cy={426} r={10} fill="#c98b4f" stroke={INK} strokeWidth={2} />
          <ellipse cx={562} cy={430} rx={6} ry={4} fill="#e0a86e" stroke={INK} strokeWidth={1.5} />
          <circle cx={567} cy={429} r={2} fill={INK} />
          <circle cx={555} cy={423} r={1.8} fill={INK} />
          <path d="M546,418 Q540,428 546,434 Q550,426 546,418 Z" fill="#8a5a32" stroke={INK} strokeWidth={1.5} />
        </g>
      ),
      safe: 'Un perro no es un peligro eléctrico.',
    },
    {
      id: 'b-car',
      x: 672, y: 394, w: 144, h: 92,
      art: (
        <g>
          <path d="M620,58 C652,150 692,250 686,344" stroke="#222" strokeWidth={3} fill="none" />
          <Shadow x={676} y={424} rx={72} ry={7} />
          <path
            d="M610,412 L612,386 Q616,372 638,368 L654,350 Q660,342 672,342 L706,342 Q716,342 722,350 L738,368 Q752,372 748,388 L746,412 Z"
            fill="#d6455d"
            stroke={INK}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <path d="M660,352 L705,352 L718,368 L648,368 Z" fill="#bfe6f7" stroke={INK} strokeWidth={1.5} />
          <line x1={684} y1={352} x2={684} y2={368} stroke={INK} strokeWidth={2} />
          <path d="M614,390 L746,390" stroke="#b5374c" strokeWidth={2} />
          <rect x={738} y={378} width={9} height={7} rx={2} fill="#fff4b0" stroke={INK} strokeWidth={1} />
          <rect x={612} y={378} width={7} height={7} rx={2} fill="#ff8a3d" stroke={INK} strokeWidth={1} />
          <circle cx={638} cy={412} r={13} fill="#222" stroke={INK} strokeWidth={2} />
          <circle cx={638} cy={412} r={5} fill="#aab4bb" />
          <circle cx={718} cy={412} r={13} fill="#222" stroke={INK} strokeWidth={2} />
          <circle cx={718} cy={412} r={5} fill="#aab4bb" />
          <LooseEnd x={686} y={344} angle={70} />
          <Spark x={694} y={338} s={0.8} />
          <Spark x={676} y={336} s={0.55} />
        </g>
      ),
      hazard: ['Cable caído sobre un carro', 'Tocar el carro o el cable puede energizarte. Que las personas se queden dentro, mantente lejos y llama al 123.'],
    },
    {
      id: 'b-bike',
      x: 770, y: 456, w: 50, h: 44,
      art: (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <Shadow x={766} y={474} rx={26} ry={3} />
          <circle cx={749} cy={460} r={13} stroke={INK} strokeWidth={3} />
          <circle cx={783} cy={460} r={13} stroke={INK} strokeWidth={3} />
          <path d="M749,460 L762,440 L778,440 L783,460 M762,440 L768,460 L749,460 M768,460 L778,440" stroke="#0e9fb5" strokeWidth={3} />
          <path d="M760,436 L768,436 M778,440 L780,432 L786,430" stroke={INK} strokeWidth={3} />
        </g>
      ),
      safe: 'Una bicicleta no es un riesgo eléctrico.',
    },
  ],
}
