import { useCallback, useEffect, useState } from 'react'
import { data } from './data'
import { describeError } from './data/errors'
import type { ErrorInfo } from './data/errors'
import { addPending, flushPending, getPending, sendItem } from './data/pending'
import type { PendingItem } from './data/pending'
import { ALL_SCENARIOS, FUSES, PRETEST, starsFor } from './content'
import { SCENES } from './content/scenes'
import type { Attempt, Scenario, ScenarioProgress, User } from './types'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import type { QuizResult } from './pages/Quiz'
import SceneView from './pages/SceneView'
import type { HuntResult } from './pages/SceneView'
import Results from './pages/Results'
import { ScenarioBadge, Stars } from './components/Icon'

type Screen =
  | 'loading' | 'auth' | 'error' | 'pretest' | 'home' | 'scenario'
  | 'postest' | 'saving' | 'saveError' | 'missionResult' | 'results'

interface Job {
  kind: 'pretest' | 'postest' | 'mission'
  result: QuizResult
  scenario?: Scenario
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('loading')
  const [user, setUser] = useState<User | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [progress, setProgress] = useState<ScenarioProgress[]>([])
  const [activeId, setActiveId] = useState('')
  const [quizKey, setQuizKey] = useState(0)
  const [notice, setNotice] = useState('')
  const [job, setJob] = useState<Job | null>(null)
  const [lastMission, setLastMission] = useState<Job | null>(null)
  const [hunt, setHunt] = useState<HuntResult | null>(null)
  const [saveError, setSaveError] = useState<ErrorInfo | null>(null)

  const fetchAll = useCallback(async (u: User) => {
    const [a, p] = await Promise.all([data.getAttempts(u.id), data.getScenarioProgress(u.id)])
    // Lo que quedó pendiente en este dispositivo también cuenta para avanzar.
    const pending = getPending(u.id)
    const all = [
      ...a,
      ...pending.flatMap((x, i) => (x.type === 'attempt' ? [{ ...x.data, id: 'local-' + i }] : [])),
    ]
    const merged = new Map(p.map((x) => [x.scenarioId, x]))
    for (const x of pending) {
      if (x.type !== 'progress') continue
      const cur = merged.get(x.data.scenarioId)
      merged.set(x.data.scenarioId, {
        ...x.data,
        stars: Math.max(cur?.stars ?? 0, x.data.stars),
        points: Math.max(cur?.points ?? 0, x.data.points),
        completed: Boolean(cur?.completed) || x.data.completed,
      })
    }
    // Solo cuentan los intentos completos (los de prueba con pocas respuestas se ignoran)
    const valid = all.filter((x) => x.answers.length >= PRETEST.length)
    setAttempts(valid)
    setProgress([...merged.values()])
    return valid
  }, [])

  const enter = useCallback(
    async (u: User) => {
      setUser(u)
      setScreen('loading')
      try {
        // Primero se envía lo que haya quedado pendiente de otras partidas.
        await flushPending(data, u.id).catch(() => undefined)
        const valid = await fetchAll(u)
        setScreen(valid.some((x) => x.kind === 'pretest') ? 'home' : 'pretest')
      } catch {
        setScreen('error')
      }
    },
    [fetchAll],
  )

  useEffect(() => {
    data
      .getCurrentUser()
      .then((u) => {
        if (u) void enter(u)
        else setScreen('auth')
      })
      .catch(() => setScreen('auth'))
  }, [enter])

  const toItem = (j: Job, u: User): PendingItem | null => {
    if (j.kind === 'mission') {
      if (!j.result.passed || !j.scenario) return null
      return {
        type: 'progress',
        data: {
          userId: u.id,
          scenarioId: j.scenario.id,
          stars: starsFor(j.result.wrong),
          points: j.result.points,
          completed: true,
        },
      }
    }
    return {
      type: 'attempt',
      data: {
        userId: u.id,
        kind: j.kind,
        score: j.result.correct,
        total: PRETEST.length,
        answers: j.result.answers,
        createdAt: new Date().toISOString(),
      },
    }
  }

  const goAfterSave = (j: Job) => {
    setJob(null)
    setSaveError(null)
    if (j.kind === 'pretest') {
      setNotice(`Pretest guardado: ${j.result.correct} de ${PRETEST.length}. ¡Ahora recorre el Atlántico!`)
      setScreen('home')
    } else if (j.kind === 'postest') {
      setScreen('results')
    } else {
      setLastMission(j)
      setScreen('missionResult')
    }
  }

  const persist = async (j: Job) => {
    if (!user) return
    setJob(j)
    setScreen('saving')
    const item = toItem(j, user)
    if (item) {
      try {
        await sendItem(data, item)
        // Si el guardado funcionó, se aprovecha para enviar lo pendiente.
        await flushPending(data, user.id).catch(() => undefined)
      } catch (e) {
        const info = describeError(e)
        // Se guarda en el dispositivo para no perder el puntaje.
        if (info.retryable) addPending(user.id, item)
        await fetchAll(user).catch(() => undefined)
        setSaveError(info)
        setScreen('saveError')
        return
      }
    }
    // Recargar es aparte: si falla, el resultado ya quedó guardado.
    await fetchAll(user).catch(() => undefined)
    goAfterSave(j)
  }

  const signOut = async () => {
    await data.signOut()
    setUser(null)
    setAttempts([])
    setProgress([])
    setNotice('')
    setHunt(null)
    setScreen('auth')
  }

  if (screen === 'loading') return <div className="app center">Cargando…</div>
  if (screen === 'saving') return <div className="app center">Guardando tu resultado…</div>

  if (screen === 'auth') return <Auth onDone={(u) => void enter(u)} />

  if (screen === 'error') {
    return (
      <div className="app center">
        <p>No se pudieron cargar tus datos. Revisa tu conexión.</p>
        <button className="btn" onClick={() => user && void enter(user)}>Reintentar</button>
      </div>
    )
  }

  if (screen === 'saveError') {
    const info = saveError
    return (
      <div className="app center">
        <h2>No se pudo guardar en el servidor</h2>
        <p>{info?.message ?? 'Revisa tu conexión e intenta de nuevo.'}</p>
        {info && (
          <details className="detail">
            <summary>Detalle técnico</summary>
            <code>{info.detail}</code>
          </details>
        )}
        <div className="row" style={{ justifyContent: 'center', marginTop: 12 }}>
          {info?.sessionExpired ? (
            <button className="btn" onClick={() => void signOut()}>Iniciar sesión</button>
          ) : (
            <button
              className="btn"
              onClick={() => {
                if (!job || !user) return
                // Si quedó en la cola local, se quita para no duplicarlo al reintentar.
                const pending = getPending(user.id)
                if (!pending.length) return void persist(job)
                setScreen('saving')
                flushPending(data, user.id)
                  .then(() => fetchAll(user).catch(() => undefined))
                  .then(
                    () => goAfterSave(job),
                    (e: unknown) => {
                      setSaveError(describeError(e))
                      setScreen('saveError')
                    },
                  )
              }}
            >
              Reintentar guardado
            </button>
          )}
          {info?.retryable && !info.sessionExpired && job && (
            <button className="btn secondary" onClick={() => goAfterSave(job)}>Seguir jugando</button>
          )}
        </div>
      </div>
    )
  }

  if (screen === 'pretest') {
    return (
      <Quiz
        key={quizKey}
        title="Pretest"
        badge="test"
        mission="Responde con lo que sabes hoy. No te diremos las respuestas todavía: al final repetirás este test para medir cuánto aprendiste."
        questions={PRETEST}
        mode="test"
        origin="pretest"
        onFinish={(r) => void persist({ kind: 'pretest', result: r })}
        onExit={() => void signOut()}
      />
    )
  }

  if (screen === 'postest') {
    return (
      <Quiz
        key={quizKey}
        title="Postest"
        badge="test"
        mission="Última prueba: demuestra lo que aprendiste."
        questions={PRETEST}
        mode="test"
        origin="postest"
        onFinish={(r) => void persist({ kind: 'postest', result: r })}
        onExit={() => setScreen('home')}
      />
    )
  }

  if (screen === 'scenario') {
    const s = ALL_SCENARIOS.find((x) => x.id === activeId)
    if (s) {
      const scene = SCENES[s.id]

      // Fase 1: encontrar los peligros en la imagen
      if (scene && !hunt) {
        return (
          <SceneView
            key={quizKey}
            scene={scene}
            onExit={() => setScreen('home')}
            onFinish={(h) => {
              if (h.burned) {
                void persist({
                  kind: 'mission',
                  scenario: s,
                  result: { answers: [], correct: h.found, wrong: h.wrong, points: h.points, passed: false },
                })
              } else {
                setHunt(h)
              }
            }}
          />
        )
      }

      // Fase 2: preguntas de decisión y mito o realidad
      const questions = scene ? s.questions.filter((x) => x.type !== 'peligro') : s.questions
      return (
        <Quiz
          key={quizKey + '-quiz'}
          title={s.title}
          badge={s.id}
          mission={hunt ? 'Ahora decide qué hacer en cada situación.' : s.mission}
          questions={questions}
          mode="mission"
          origin={s.id}
          startFuses={hunt ? FUSES - hunt.wrong : undefined}
          onFinish={(r) => {
            const merged: QuizResult = hunt
              ? {
                  ...r,
                  wrong: r.wrong + hunt.wrong,
                  correct: r.correct + hunt.found,
                  points: r.points + hunt.points,
                }
              : r
            setHunt(null)
            void persist({ kind: 'mission', result: merged, scenario: s })
          }}
          onExit={() => {
            setHunt(null)
            setScreen('home')
          }}
        />
      )
    }
  }

  if (screen === 'missionResult' && lastMission && lastMission.scenario) {
    const { result, scenario } = lastMission
    const stars = starsFor(result.wrong)
    return (
      <div className="app center">
        <ScenarioBadge id={scenario.id} size={64} />
        <h2>{result.passed ? '¡Misión cumplida!' : 'Se quemaron los fusibles'}</h2>
        <p>{scenario.title}</p>
        {result.passed ? (
          <>
            <Stars n={stars} size={44} />
            <p>{result.points} puntos</p>
            {scenario.id === 'emergencia' && <p>Ya puedes hacer el postest desde el mapa.</p>}
          </>
        ) : (
          <p>Repasa las explicaciones y vuelve a intentarlo: así se aprende.</p>
        )}
        <div className="row">
          <button className="btn secondary" onClick={() => setScreen('home')}>Volver al mapa</button>
          <button
            className="btn"
            onClick={() => {
              setHunt(null)
              setQuizKey((k) => k + 1)
              setScreen('scenario')
            }}
          >
            {result.passed ? 'Mejorar mi resultado' : 'Reintentar'}
          </button>
        </div>
      </div>
    )
  }

  if (screen === 'results' && user) {
    const post = [...attempts].reverse().find((a) => a.kind === 'postest')
    const pre = [...attempts].reverse().find((a) => a.kind === 'pretest')
    if (post) {
      return (
        <Results userName={user.username} pre={pre} post={post} progress={progress} onBack={() => setScreen('home')} />
      )
    }
  }

  if (user) {
    return (
      <Home
        userName={user.username}
        progress={progress}
        hasPostest={attempts.some((a) => a.kind === 'postest')}
        notice={notice}
        onPlay={(id) => {
          setActiveId(id)
          setHunt(null)
          setQuizKey((k) => k + 1)
          setNotice('')
          setScreen('scenario')
        }}
        onPostest={() => {
          setQuizKey((k) => k + 1)
          setScreen('postest')
        }}
        onResults={() => setScreen('results')}
        onSignOut={() => void signOut()}
      />
    )
  }

  return <div className="app center">Cargando…</div>
}