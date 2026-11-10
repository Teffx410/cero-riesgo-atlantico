import { ALL_SCENARIOS } from '../content'
import type { ScenarioProgress } from '../types'
import Icon, { Fuse, ScenarioBadge, Stars } from '../components/Icon'
import Footer from '../components/Footer'

interface Props {
  userName: string
  progress: ScenarioProgress[]
  hasPostest: boolean
  notice: string
  onPlay: (id: string) => void
  onPostest: () => void
  onResults: () => void
  onSignOut: () => void
}

export default function Home({ userName, progress, hasPostest, notice, onPlay, onPostest, onResults, onSignOut }: Props) {
  const done = (id: string) => progress.some((p) => p.scenarioId === id && p.completed)
  const starsOf = (id: string) => progress.find((p) => p.scenarioId === id)?.stars ?? 0
  const totalPoints = progress.reduce((sum, p) => sum + p.points, 0)
  const totalStars = progress.reduce((sum, p) => sum + p.stars, 0)

  return (
    <>
    <div className="app">
      <div className="row between">
        <h2 className="title-row">
          <Icon name="helmet" size={26} className="accent" /> Hola, {userName}
        </h2>
        <button className="link" onClick={onSignOut}>Salir</button>
      </div>
      <div className="row stats">
        <div className="card stat"><strong>{totalPoints}</strong><span>puntos</span></div>
        <div className="card stat"><strong>{totalStars}</strong><span>estrellas</span></div>
        <div className="card stat"><strong className="title-row">3 <Fuse ok /></strong><span>fusibles por misión</span></div>
      </div>
      {notice && <div className="feedback ok">{notice}</div>}

      {ALL_SCENARIOS.map((s, i) => {
        const locked = i > 0 && !done(ALL_SCENARIOS[i - 1].id)
        const finished = done(s.id)
        return (
          <div key={s.id} className={'card scenario' + (locked ? ' locked' : '')}>
            <div className="row between">
              <div className="row" style={{ flexWrap: 'nowrap', alignItems: 'flex-start' }}>
                <ScenarioBadge id={locked ? 'lock' : s.id} />
                <div>
                  <strong>{s.title}</strong>
                  <p className="muted">{locked ? 'Completa el escenario anterior para desbloquear' : s.mission}</p>
                </div>
              </div>
              {finished && <Stars n={starsOf(s.id)} />}
            </div>
            {!locked && (
              <button className="btn" onClick={() => onPlay(s.id)}>
                {finished ? 'Jugar de nuevo' : 'Jugar'}
              </button>
            )}
          </div>
        )
      })}

      <div className={'card scenario' + (done('emergencia') ? '' : ' locked')}>
        <strong className="title-row">
          <ScenarioBadge id="test" size={32} /> Postest final
        </strong>
        <p className="muted">
          {done('emergencia')
            ? 'Repite el diagnóstico para ver cuánto aprendiste.'
            : 'Se desbloquea al completar la misión final.'}
        </p>
        {done('emergencia') && !hasPostest && <button className="btn" onClick={onPostest}>Hacer el postest</button>}
        {hasPostest && <button className="btn" onClick={onResults}>Ver mis resultados y diploma</button>}
      </div>
    </div>
    <Footer />
    </>
  )
}
