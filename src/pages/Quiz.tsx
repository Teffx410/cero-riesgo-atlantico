import { useMemo, useState } from 'react'
import { FUSES } from '../content'
import type { AnswerRecord, Question } from '../types'
import Icon, { Fuse, ScenarioBadge } from '../components/Icon'
import type { IconName } from '../components/Icon'

export interface QuizResult {
  answers: AnswerRecord[]
  correct: number
  wrong: number
  points: number
  passed: boolean
}

interface Props {
  title: string
  /** id del escenario (o 'test') para el ícono */
  badge: string
  mission: string
  questions: Question[]
  mode: 'test' | 'mission'
  origin: string
  onFinish: (result: QuizResult) => void
  onExit: () => void
  startFuses?: number
}

const TYPE_LABEL: Record<Question['type'], [IconName, string]> = {
  peligro: ['search', 'Encuentra el peligro'],
  decision: ['decision', '¿Qué haces?'],
  mito: ['mito', 'Mito o realidad'],
}

function shuffled(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

export default function Quiz({ title, badge, mission, questions, mode, origin, onFinish, onExit, startFuses }: Props) {
  const orders = useMemo(() => questions.map((qs) => shuffled(qs.options.length)), [questions])
  const [idx, setIdx] = useState(0)
  const [fuses, setFuses] = useState(startFuses ?? FUSES)
  const [points, setPoints] = useState(0)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  // `selected`: opción marcada (se puede cambiar). `confirmed`: respuesta enviada (ya no cambia).
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [startedAt, setStartedAt] = useState(() => Date.now())

  const isMission = mode === 'mission'
  const question = questions[idx]
  const order = orders[idx]
  const shown = order.map((i) => question.options[i])
  const correctShown = order.indexOf(question.correctIndex)
  const isLast = idx + 1 >= questions.length
  const burned = isMission && fuses <= 0

  const finish = (all: AnswerRecord[], pts: number, isBurned: boolean) => {
    const correct = all.filter((a) => a.correct).length
    onFinish({ answers: all, correct, wrong: all.length - correct, points: pts, passed: !isBurned })
  }

  const goNext = () => {
    setIdx(idx + 1)
    setSelected(null)
    setConfirmed(false)
    setStartedAt(Date.now())
  }

  const confirm = (now: number) => {
    if (selected === null || confirmed) return
    const original = order[selected]
    const correct = original === question.correctIndex
    const secs = (now - startedAt) / 1000
    const all = [...answers, { questionId: question.id, chosenIndex: original, correct, origin }]
    setAnswers(all)
    if (isMission) {
      setConfirmed(true)
      if (correct) setPoints(points + 100 + Math.max(0, Math.round((15 - secs) * 3)))
      else setFuses(fuses - 1)
      return
    }
    // En el pretest y el postest no se muestra la respuesta: se pasa directo a la siguiente.
    if (isLast) finish(all, points, false)
    else goNext()
  }

  const next = () => {
    if (isLast || burned) finish(answers, points, burned)
    else goNext()
  }

  return (
    <div className="app">
      <div className="row between">
        <button className="link" onClick={onExit}>← Salir</button>
        {isMission && (
          <div className="fuses" aria-label={`Fusibles: ${fuses} de ${FUSES}`}>
            {Array.from({ length: FUSES }, (_, i) => (
              <Fuse key={i} ok={i < fuses} />
            ))}
          </div>
        )}
      </div>
      <h2 className="title-row">
        <ScenarioBadge id={badge} size={34} />
        {title}
      </h2>
      {idx === 0 && selected === null && <p className="muted">{mission}</p>}
      <p className="muted">
        Pregunta {idx + 1} de {questions.length}
        {isMission ? ` · ${points} pts` : ''}
      </p>
      <div className="card">
        <div className="tag">
          <Icon name={TYPE_LABEL[question.type][0]} size={16} /> {TYPE_LABEL[question.type][1]}
        </div>
        <h3>{question.text}</h3>
        {!confirmed && <p className="muted">Elige una opción. Puedes cambiarla antes de confirmar.</p>}
        {shown.map((text, d) => {
          let cls = 'opt'
          if (confirmed) {
            if (d === correctShown) cls += ' ok'
            else if (d === selected) cls += ' bad'
          } else if (d === selected) {
            cls += ' picked'
          }
          return (
            <button key={d} className={cls} disabled={confirmed} aria-pressed={d === selected} onClick={() => setSelected(d)}>
              {text}
            </button>
          )
        })}
        {confirmed && (
          <div className={'feedback ' + (selected === correctShown ? 'ok' : 'bad')}>
            <strong>{selected === correctShown ? '¡Bien!' : '¡Se quema un fusible!'}</strong>
            <p>{question.explanation}</p>
          </div>
        )}
        {confirmed ? (
          <button className="btn" onClick={next}>
            {isLast || burned ? 'Ver resultado' : 'Siguiente'}
          </button>
        ) : (
          <button className="btn" disabled={selected === null} onClick={(e) => confirm(e.timeStamp + performance.timeOrigin)}>
            {isMission ? 'Confirmar respuesta' : isLast ? 'Confirmar y terminar' : 'Confirmar y seguir'}
          </button>
        )}
      </div>
    </div>
  )
}
