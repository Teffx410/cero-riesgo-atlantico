import { PRETEST, SCENARIOS } from '../content'
import type { Attempt, Question, ScenarioProgress } from '../types'
import Icon from '../components/Icon'

interface Props {
  userName: string
  pre: Attempt | undefined
  post: Attempt
  progress: ScenarioProgress[]
  onBack: () => void
}

export default function Results({ userName, pre, post, progress, onBack }: Props) {
  const pct = (a: Attempt) => Math.round((a.score / a.total) * 100)
  const best = (id: string) => progress.find((p) => p.scenarioId === id)
  const guardian =
    SCENARIOS.every((s) => (best(s.id)?.stars ?? 0) >= 2) && Boolean(best('emergencia')?.completed)
  const totalPoints = progress.reduce((sum, p) => sum + p.points, 0)
  const totalStars = progress.reduce((sum, p) => sum + p.stars, 0)
  const gain = pre ? pct(post) - pct(pre) : null
  const toReview = post.answers
    .filter((a) => !a.correct)
    .map((a) => PRETEST.find((qq) => qq.id === a.questionId))
    .filter((x): x is Question => x !== undefined)

  return (
    <div className="app">
      <div className="no-print">
        <button className="link" onClick={onBack}>← Volver al mapa</button>
        <h2 className="title-row">
          <Icon name="chart" size={26} className="accent" /> Tus resultados
        </h2>
        <div className="row stats">
          <div className="card stat"><strong>{pre ? `${pre.score}/${pre.total}` : '—'}</strong><span>pretest</span></div>
          <div className="card stat"><strong>{post.score}/{post.total}</strong><span>postest</span></div>
          <div className="card stat">
            <strong>{gain === null ? '—' : `${gain >= 0 ? '+' : ''}${gain}`}</strong>
            <span>puntos % de ganancia</span>
          </div>
        </div>
        <p className="muted">{totalPoints} puntos y {totalStars} estrellas en las misiones.</p>
        {toReview.length > 0 && (
          <div className="card">
            <strong>Para repasar</strong>
            {toReview.map((qq) => (
              <p key={qq.id}>
                <em>{qq.text}</em>
                <br />
                {qq.explanation}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="diploma">
        <div className="logo">
          <Icon name={guardian ? 'medal' : 'diploma'} size={56} className="accent" />
        </div>
        <h2>Diploma Brigada Cero Riesgo</h2>
        <p>Se otorga a</p>
        <h1>{userName}</h1>
        <p>por completar el recorrido de seguridad eléctrica en el Atlántico.</p>
        {guardian ? (
          <p className="badge">Insignia: Guardián Eléctrico</p>
        ) : (
          <p className="muted">Consigue al menos 2 estrellas en todos los escenarios para ganar la insignia Guardián Eléctrico.</p>
        )}
        <p className="muted">{new Date(post.createdAt).toLocaleDateString('es-CO')} · Protegemos vidas, construimos futuro.</p>
      </div>
      <button className="btn no-print" onClick={() => window.print()}><Icon name="print" size={18} /> Imprimir o guardar diploma en PDF</button>
    </div>
  )
}
