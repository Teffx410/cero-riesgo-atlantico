import { CASA, BARRIO, PLAYA } from './escenarios1'
import { OBRA, FINCA, CARNAVAL } from './escenarios2'
import { EMERGENCIA } from './final'
import { PRETEST } from './pretest'

export { PRETEST, EMERGENCIA }

export const SCENARIOS = [CASA, BARRIO, PLAYA, OBRA, FINCA, CARNAVAL]
export const ALL_SCENARIOS = [...SCENARIOS, EMERGENCIA]

export const FUSES = 3

// Estrellas según los errores cometidos en el escenario
export function starsFor(wrong: number): number {
  if (wrong === 0) return 3
  if (wrong === 1) return 2
  return 1
}
