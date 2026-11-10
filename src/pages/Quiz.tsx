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
  const [picked, setPicked] = useState<number | null>(null)
  const [startedAt, setStartedAt] = useState(() => Date.now())

  const isMission = mode === 'mission'
  const question = questions[idx]
  const order = orders[idx]
  const shown = order.map((i) => question.options[i])
  const correctShown = order.indexOf(question.correctIndex)
  const isLast = idx + 1 >= questions.length
  const burned = isMission && fuses <= 0

  const pick = (d: number) => {
    if (picked !== null) return
    const original = order[d]
    const correct = original === question.correctIndex
    const secs = (Date.now() - startedAt) / 1000
    setPicked(d)
    setAnswers([...answers, { questionId: question.id, chosenIndex: original, correct, origin }])
    if (isMission) {
      if (correct) setPoints(points + 100 + Math.max(0, Math.round((15 - secs) * 3)))
      else setFuses(fuses - 1)
    }
  }

  const next = () => {
    if (isLast || burned) {
      const correct = answers.filter((a) => a.correct).length
      onFinish({ answers, correct, wrong: answers.length - correct, points, passed: !burned })
      return
    }
    setIdx(idx + 1)
    setPicked(null)
    setStartedAt(Date.now())
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
      {idx === 0 && picked === null && <p className="muted">{mission}</p>}
      <p className="muted">
        Pregunta {idx + 1} de {questions.length}
        {isMission ? ` · ${points} pts` : ''}
      </p>
      <div className="card">
        <div className="tag">
          <Icon name={TYPE_LABEL[question.type][0]} size={16} /> {TYPE_LABEL[question.type][1]}
        </div>
        <h3>{question.text}</h3>
        {shown.map((text, d) => {
          let cls = 'opt'
          if (picked !== null) {
            if (isMission && d === correctShown) cls += ' ok'
            else if (d === picked) cls += isMission ? ' bad' : ' picked'
          }
          return (
            <button key={d} className={cls} disabled={picked !== null} onClick={() => pick(d)}>
              {text}
            </button>
          )
        })}
        {picked !== null && isMission && (
          <div className={'feedback ' + (picked === correctShown ? 'ok' : 'bad')}>
            <strong>{picked === correctShown ? '¡Bien!' : '¡Se quema un fusible!'}</strong>
            <p>{question.explanation}</p>
          </div>
        )}
        {picked !== null && (
          <button className="btn" onClick={next}>
            {isLast || burned ? 'Ver resultado' : 'Siguiente'}
          </button>
        )}
      </div>
    </div>
  )
}
