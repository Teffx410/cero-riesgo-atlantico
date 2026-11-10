import type { Attempt, ScenarioProgress } from '../types'
import type { DataService } from './DataService'

/**
 * Resultados que no se pudieron enviar al servidor. Se guardan en este
 * dispositivo y se reintentan al volver a entrar o al guardar el siguiente.
 */
export type PendingItem =
  | { type: 'progress'; data: ScenarioProgress }
  | { type: 'attempt'; data: Omit<Attempt, 'id'> }

const key = (userId: string) => `cero-riesgo:pendientes:${userId}`

export function getPending(userId: string): PendingItem[] {
  try {
    const raw = localStorage.getItem(key(userId))
    return raw ? (JSON.parse(raw) as PendingItem[]) : []
  } catch {
    return []
  }
}

function setPending(userId: string, items: PendingItem[]) {
  try {
    if (items.length) localStorage.setItem(key(userId), JSON.stringify(items))
    else localStorage.removeItem(key(userId))
  } catch {
    // Sin almacenamiento local (modo privado): no hay dónde guardar.
  }
}

export function addPending(userId: string, item: PendingItem) {
  setPending(userId, [...getPending(userId), item])
}

export function sendItem(data: DataService, item: PendingItem): Promise<void> {
  return item.type === 'progress' ? data.saveScenarioProgress(item.data) : data.saveAttempt(item.data)
}

/** Intenta enviar lo pendiente. Lanza el primer error si algo falló. */
export async function flushPending(data: DataService, userId: string): Promise<void> {
  const items = getPending(userId)
  const left: PendingItem[] = []
  let firstError: unknown = null
  for (const item of items) {
    try {
      await sendItem(data, item)
    } catch (e) {
      left.push(item)
      firstError ??= e
    }
  }
  setPending(userId, left)
  if (firstError) throw firstError
}
