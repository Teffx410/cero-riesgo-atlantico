import type { AnswerRecord, Attempt, ScenarioProgress, User } from '../types'
import type { DataService } from './DataService'
import { roble } from './roble'
import { DataError } from './errors'

/** Ejecuta una operación y, si falla, anota en qué tabla pasó. */
async function on<T>(table: string, op: () => Promise<T>): Promise<T> {
  try {
    return await op()
  } catch (e) {
    console.error(`[Roble] Falló la operación en «${table}»`, e)
    throw new DataError(table, e)
  }
}

interface IntentoRow {
  _id: string
  userId: string
  kind: 'pretest' | 'postest'
  score: number
  total: number
  answers: AnswerRecord[]
  createdAt: string
}

interface ProgresoRow {
  userId: string
  scenarioId: string
  stars: number
  points: number
  completed: boolean
}

interface Perfil {
  userId: string
  email: string
  name?: string | null
}

function toUser(p: Perfil): User {
  return { id: p.userId, username: p.name || p.email }
}

export class RobleDataService implements DataService {
  async signUp(email: string, password: string, name: string): Promise<User> {
    await roble.register({ email, password, name })
    return this.signIn(email, password)
  }

  async signIn(email: string, password: string): Promise<User> {
    const perfil = (await roble.login({ email, password })) as unknown as Perfil
    return toUser(perfil)
  }

  async signOut(): Promise<void> {
    await roble.logout()
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      if (!roble.isLoggedIn) {
        const ok = await roble.restoreSession()
        if (!ok) return null
      }
      const perfil = (await roble.currentUser()) as unknown as Perfil
      return toUser(perfil)
    } catch {
      return null
    }
  }

  async saveAttempt(attempt: Omit<Attempt, 'id'>): Promise<void> {
    await on('intentos', () =>
      roble.create('intentos', {
        userId: attempt.userId,
        kind: attempt.kind,
        score: Math.round(attempt.score),
        total: Math.round(attempt.total),
        answers: attempt.answers,
        createdAt: attempt.createdAt,
      }),
    )
  }

  async getAttempts(userId: string): Promise<Attempt[]> {
    const rows = (await on('intentos', () => roble.read('intentos', { userId }))) as unknown as IntentoRow[]
    return rows
      .map((r) => ({
        id: r._id,
        userId: r.userId,
        kind: r.kind,
        score: Number(r.score),
        total: Number(r.total),
        answers: r.answers ?? [],
        createdAt: r.createdAt,
      }))
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  }

  async saveScenarioProgress(progress: ScenarioProgress): Promise<void> {
    await on('progreso', () =>
      roble.create('progreso', {
        userId: progress.userId,
        scenarioId: progress.scenarioId,
        stars: Math.round(progress.stars),
        points: Math.max(0, Math.round(progress.points)),
        completed: progress.completed,
      }),
    )
  }

  async getScenarioProgress(userId: string): Promise<ScenarioProgress[]> {
    const rows = (await on('progreso', () => roble.read('progreso', { userId }))) as unknown as ProgresoRow[]
    const best = new Map<string, ScenarioProgress>()
    for (const r of rows) {
      const cur = best.get(r.scenarioId)
      const next: ScenarioProgress = {
        userId: r.userId,
        scenarioId: r.scenarioId,
        stars: Number(r.stars),
        points: Number(r.points),
        completed: Boolean(r.completed) || Boolean(cur?.completed),
      }
      if (!cur) {
        best.set(r.scenarioId, next)
      } else {
        best.set(r.scenarioId, {
          ...next,
          stars: Math.max(cur.stars, next.stars),
          points: Math.max(cur.points, next.points),
        })
      }
    }
    return [...best.values()]
  }
}
