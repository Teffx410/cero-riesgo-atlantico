import type { SceneDef } from './sceneTypes'
import { CASA } from './art/Cocina'
import { BARRIO } from './art/Barrio'
import { PLAYA } from './art/Playa'
import { OBRA } from './art/Obra'
import { FINCA } from './art/Finca'
import { CARNAVAL } from './art/Carnaval'

export type { Part, SceneDef, SceneItem } from './sceneTypes'

// Escenas de "encuentra el peligro". La clave es el id del escenario.
export const SCENES: Record<string, SceneDef> = {
  casa: CASA,
  barrio: BARRIO,
  playa: PLAYA,
  obra: OBRA,
  finca: FINCA,
  carnaval: CARNAVAL,
}
