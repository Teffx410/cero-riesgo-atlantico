import type { SceneDef } from '../sceneTypes'
import { INK, Puddle, Shadow, Spark } from './common'
import { Bolt, Cloud, LooseEnd, Person, Pole, Tree } from './scenery'

// Finca con una línea eléctrica que cruza el potrero. Pasto desde y = 300.

const backdrop = (
  <g>
    <defs>
      <linearGradient id="f-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#9fd3ec" />
        <stop offset="1" stopColor="#e6f5fb" />
      </linearGradient>
      <linearGradient id="f-grass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7dbb57" />
        <stop offset="1" stopColor="#95cc6c" />
      </linearGradient>
    </defs>
    <rect x={0} y={0} width={800} height={310} fill="url(#f-sky)" />
    <circle cx={470} cy={52} r={22} fill="#ffd23d" stroke="#e8a91f" strokeWidth={2} />
    <Cloud x={300} y={40} s={0.6} />
    {/* Colinas */}
    <ellipse cx={170} cy={318} rx={260} ry={60} fill="#a6d683" stroke="#7fb95c" strokeWidth={2} />
    <ellipse cx={560} cy={322} rx={300} ry={56} fill="#b4de92" stroke="#86bf62" strokeWidth={2} />
    <rect x={0} y={300} width={800} height={180} fill="url(#f-grass)" />
    <g stroke="#6aa848" strokeWidth={2} strokeLinecap="round" opacity={0.7}>
      {[
        [40, 350], [150, 470], [300, 380], [360, 470], [520, 470], [700, 460], [560, 330], [250, 330],
      ].map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x},${y} l-3,-8 M${x},${y} l0,-10 M${x},${y} l3,-8`} />
      ))}
    </g>
    {/* Línea eléctrica */}
    <Pole x={20} top={90} bottom={310} />
    <Pole x={792} top={90} bottom={310} />
    <g fill="none" stroke="#222" strokeWidth={2.5}>
      <path d="M-14,78 Q400,112 758,78" />
      <path d="M20,66 Q400,100 792,66" />
      <path d="M54,78 Q400,116 826,78" />
    </g>
  </g>
)

export const FINCA: SceneDef = {
  id: 'finca',
  title: 'La finca',
  intro: 'Revisa cercas, riego y árboles. Toca los peligros eléctricos; si tocas algo seguro, se quema un fusible.',
  backdrop,
  items: [
    {
      id: 'f-tree',
      x: 160, y: 192, w: 150, h: 194,
      art: (
        <g>
          <Tree x={160} y={292} s={1.2} />
          <circle cx={168} cy={98} r={18} fill="#4aa865" stroke={INK} strokeWidth={2} />
          <circle cx={140} cy={104} r={14} fill="#3f9a5a" stroke={INK} strokeWidth={2} />
          <Spark x={160} y={88} s={0.9} />
          <Spark x={176} y={84} s={0.6} />
        </g>
      ),
      hazard: ['Árbol tocando la línea', 'Las ramas pueden estar energizadas. Solo el operador o personal autorizado interviene.'],
    },
    {
      id: 'f-cow',
      x: 84, y: 410, w: 96, h: 66,
      art: (
        <g>
          <Shadow x={84} y={442} rx={40} ry={5} />
          <path d="M52,404 Q44,414 46,428" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
          {[60, 72, 94, 106].map((x) => (
            <rect key={x} x={x} y={414} width={8} height={26} rx={2} fill="#fff" stroke={INK} strokeWidth={1.8} />
          ))}
          <ellipse cx={82} cy={406} rx={34} ry={18} fill="#fff" stroke={INK} strokeWidth={2} />
          <path d="M66,396 Q74,390 80,398 Q76,408 66,404 Z" fill="#2d2d2d" />
          <path d="M90,410 Q100,404 106,412 Q100,420 92,418 Z" fill="#2d2d2d" />
          <ellipse cx={120} cy={396} rx={12} ry={14} fill="#fff" stroke={INK} strokeWidth={2} />
          <ellipse cx={124} cy={407} rx={10} ry={7} fill="#f4b6b6" stroke={INK} strokeWidth={1.5} />
          <circle cx={121} cy={406} r={1.5} fill={INK} />
          <circle cx={128} cy={406} r={1.5} fill={INK} />
          <circle cx={123} cy={392} r={2} fill={INK} />
          <path d="M112,384 q-4,-8 -10,-6 M126,383 q4,-8 10,-6" stroke="#d9c79a" strokeWidth={3} fill="none" strokeLinecap="round" />
          <ellipse cx={108} cy={390} rx={6} ry={3} fill="#fff" stroke={INK} strokeWidth={1.5} />
        </g>
      ),
      safe: 'Una vaca no es un riesgo eléctrico.',
    },
    {
      id: 'f-hen',
      x: 244, y: 444, w: 48, h: 44,
      art: (
        <g>
          <Shadow x={244} y={462} rx={16} ry={3} />
          <path d="M236,452 L236,462 M248,452 L248,462" stroke="#e8a91f" strokeWidth={2.5} />
          <path d="M228,444 Q222,430 232,432 Q226,442 230,446 Z" fill="#c0563f" stroke={INK} strokeWidth={1.5} />
          <ellipse cx={242} cy={446} rx={15} ry={11} fill="#c98b4f" stroke={INK} strokeWidth={2} />
          <path d="M236,444 Q244,440 250,448" stroke="#a8743f" strokeWidth={2} fill="none" />
          <circle cx={255} cy={434} r={7} fill="#c98b4f" stroke={INK} strokeWidth={1.8} />
          <path d="M252,427 q2,-5 4,0 q2,-5 4,0" fill="#d6455d" stroke="#d6455d" strokeWidth={2} />
          <path d="M261,434 L267,436 L261,438 Z" fill="#ffb000" stroke={INK} strokeWidth={1} />
          <circle cx={257} cy={433} r={1.4} fill={INK} />
        </g>
      ),
      safe: 'Una gallina no es un peligro eléctrico.',
    },
    {
      id: 'f-climb',
      x: 336, y: 204, w: 124, h: 196,
      art: (
        <g>
          <Tree x={336} y={302} s={1.0} fruit="#ffb000" />
          <Person x={352} y={262} h={92} face={-1} shirt="#d6455d" pants="#2c6db5" shorts armL={[-24, -170, -20, -200]} armR={[30, -170, 28, -204]} />
          <path d="M366,150 L374,142 M380,156 L390,150" stroke="#ff5a3d" strokeWidth={2.5} strokeLinecap="round" />
        </g>
      ),
      hazard: ['Persona trepando un árbol junto a la línea', 'La corriente puede pasar por las ramas o saltar al cuerpo. No se sube a árboles cerca de líneas energizadas.'],
    },
    {
      id: 'f-sun',
      x: 420, y: 432, w: 46, h: 72,
      art: (
        <g>
          <path d="M420,468 L420,416" stroke="#3f9a5a" strokeWidth={4} />
          <ellipse cx={410} cy={446} rx={9} ry={4} fill="#4aa865" stroke={INK} strokeWidth={1.2} transform="rotate(-30 410 446)" />
          <ellipse cx={430} cy={452} rx={9} ry={4} fill="#4aa865" stroke={INK} strokeWidth={1.2} transform="rotate(30 430 452)" />
          <g fill="#ffc83d" stroke={INK} strokeWidth={1}>
            {Array.from({ length: 10 }, (_, i) => (
              <ellipse key={i} cx={420} cy={402} rx={4} ry={8} transform={`rotate(${i * 36} 420 412)`} />
            ))}
          </g>
          <circle cx={420} cy={412} r={7} fill="#7a4a22" stroke={INK} strokeWidth={1.5} />
        </g>
      ),
      safe: 'Un girasol no es un peligro eléctrico.',
    },
    {
      id: 'f-fence',
      x: 488, y: 350, w: 160, h: 84,
      art: (
        <g>
          {[420, 466, 512, 558].map((x) => (
            <rect key={x} x={x - 4} y={326} width={8} height={56} rx={2} fill="#8a5a3a" stroke={INK} strokeWidth={1.8} />
          ))}
          <g stroke="#6b6b6b" strokeWidth={1.8}>
            <line x1={412} y1={338} x2={566} y2={338} />
            <line x1={412} y1={354} x2={566} y2={354} />
            <line x1={412} y1={370} x2={566} y2={370} />
          </g>
          <path d="M470,96 C500,180 470,280 500,338" stroke="#222" strokeWidth={3} fill="none" />
          <LooseEnd x={500} y={338} angle={60} />
          <Spark x={508} y={340} s={0.8} />
          <Spark x={540} y={354} s={0.6} />
          <Spark x={444} y={338} s={0.55} />
        </g>
      ),
      hazard: ['Cable caído sobre la cerca de alambre', 'La cerca puede quedar energizada en toda su extensión. Aléjate, aleja a personas y animales y avisa al operador.'],
    },
    {
      id: 'f-tractor',
      x: 612, y: 222, w: 112, h: 172,
      art: (
        <g>
          <Shadow x={612} y={306} rx={50} ry={5} />
          {/* Brazo alto */}
          <path d="M600,246 L628,104" stroke={INK} strokeWidth={9} strokeLinecap="round" />
          <path d="M600,246 L628,104" stroke="#ffc83d" strokeWidth={6} strokeLinecap="round" />
          <rect x={620} y={96} width={18} height={10} rx={2} fill="#ffc83d" stroke={INK} strokeWidth={1.5} />
          <path d="M624,92 L628,84 M638,94 L644,88" stroke="#ff5a3d" strokeWidth={2.5} strokeLinecap="round" />
          {/* Tractor */}
          <rect x={604} y={262} width={52} height={24} rx={4} fill="#1f9d63" stroke={INK} strokeWidth={2} />
          <rect x={574} y={232} width={34} height={46} rx={4} fill="#1f9d63" stroke={INK} strokeWidth={2} />
          <rect x={580} y={238} width={22} height={18} rx={2} fill="#bfe6f7" stroke={INK} strokeWidth={1.5} />
          <rect x={640} y={248} width={5} height={16} fill="#555" />
          <circle cx={588} cy={286} r={22} fill="#2d2d2d" stroke={INK} strokeWidth={2} />
          <circle cx={588} cy={286} r={9} fill="#ffc83d" stroke={INK} strokeWidth={1.5} />
          <circle cx={644} cy={294} r={12} fill="#2d2d2d" stroke={INK} strokeWidth={2} />
          <circle cx={644} cy={294} r={5} fill="#ffc83d" />
        </g>
      ),
      hazard: ['Maquinaria alta bajo la línea', 'La maquinaria o un implemento alto puede tocar la línea. Se mide la altura y se consulta al operador antes de pasar.'],
    },
    {
      id: 'f-storm',
      x: 728, y: 206, w: 104, h: 176,
      art: (
        <g>
          <Cloud x={728} y={150} s={0.9} dark />
          <Bolt x={720} y={162} s={0.9} />
          <g stroke="#7cc4ec" strokeWidth={2} strokeLinecap="round">
            <line x1={694} y1={170} x2={690} y2={182} />
            <line x1={752} y1={168} x2={748} y2={180} />
            <line x1={766} y1={176} x2={762} y2={188} />
          </g>
          <Person x={730} y={300} h={104} face={-1} strawHat shirt="#f2f2f2" pants="#6b4f3a" />
        </g>
      ),
      hazard: ['Persona sola en campo abierto con tormenta', 'El campo abierto y los árboles aislados atraen rayos. Hay que buscar un refugio cerrado o un vehículo.'],
    },
    {
      id: 'f-house',
      x: 742, y: 352, w: 96, h: 76,
      art: (
        <g>
          <Shadow x={742} y={392} rx={50} ry={5} />
          <rect x={704} y={340} width={78} height={50} fill="#f2e1c2" stroke={INK} strokeWidth={2} />
          <polygon points="696,342 743,312 790,342" fill="#c0563f" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <rect x={734} y={358} width={18} height={32} fill="#8a5a32" stroke={INK} strokeWidth={1.5} />
          <rect x={712} y={352} width={16} height={14} fill="#bfe6f7" stroke={INK} strokeWidth={1.5} />
          <rect x={758} y={352} width={16} height={14} fill="#bfe6f7" stroke={INK} strokeWidth={1.5} />
        </g>
      ),
      safe: 'La casa de la finca no es un peligro por sí sola.',
    },
    {
      id: 'f-pump',
      x: 636, y: 424, w: 132, h: 68,
      art: (
        <g>
          <Puddle x={662} y={440} rx={44} ry={10} />
          <Shadow x={604} y={436} rx={26} ry={4} />
          <rect x={584} y={406} width={44} height={28} rx={4} fill="#2c6db5" stroke={INK} strokeWidth={2} />
          <circle cx={596} cy={420} r={9} fill="#5b8fd6" stroke={INK} strokeWidth={1.5} />
          <rect x={608} y={398} width={16} height={10} rx={2} fill="#9aa3ab" stroke={INK} strokeWidth={1.5} />
          <path d="M628,424 L660,424 L660,436" stroke="#8b97a3" strokeWidth={6} fill="none" />
          <path d="M614,398 C612,386 620,382 616,374" stroke="#d6455d" strokeWidth={2.5} fill="none" />
          <path d="M620,398 C624,388 632,388 630,378" stroke="#222" strokeWidth={2.5} fill="none" />
          <LooseEnd x={616} y={374} angle={-100} />
          <LooseEnd x={630} y={378} angle={-70} />
          <Spark x={624} y={368} s={0.6} />
        </g>
      ),
      hazard: ['Bomba de riego con cables al descubierto', 'Cables sin protección cerca del agua pueden dar una descarga. Se desenergiza y lo revisa un técnico.'],
    },
  ],
}
