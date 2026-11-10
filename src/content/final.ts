import type { Scenario } from '../types'
import { q } from './helpers'

export const EMERGENCIA: Scenario = {
  id: "emergencia", order: 7, title: "Misión final: emergencia",
  mission: "Una persona recibió una descarga. Actúa en el orden correcto.",
  questions: [
    q("emer-1", "emergencia", "decision", "Una persona recibió una descarga y sigue en contacto con el aparato. ¿Qué haces primero?",
      ["La agarro de las manos para jalarla", "No la toco mientras siga energizada y evalúo cómo cortar la energía", "Le echo agua"], 1,
      "Si la tocas mientras está energizada, la corriente también pasa por ti."),
    q("emer-2", "emergencia", "decision", "¿Cómo cortas la energía de forma segura?",
      ["Bajando el breaker o desconectando solo si es seguro y estoy en lugar seco", "Sacando el enchufe con las manos mojadas", "Cortando el cable con una cizalla"], 0,
      "Cortar la fuente es lo primero, pero solo si no te pones en peligro."),
    q("emer-3", "emergencia", "decision", "Ya cortaste la energía de forma segura. ¿Qué haces ahora?",
      ["Espero a ver si se recupera sola", "Llamo al 123 de inmediato", "Le doy agua para que reaccione"], 1,
      "Toda descarga debe ser valorada por personal de salud, aunque la persona parezca estar bien."),
    q("emer-4", "emergencia", "decision", "La persona no responde. ¿Qué haces?",
      ["Aplico primeros auxilios solo si tengo formación, y sigo las indicaciones del 123", "La sacudo con fuerza", "La dejo sola mientras busco a alguien"], 0,
      "Los primeros auxilios requieren formación. Si no la tienes, sigue las instrucciones de la línea de emergencia."),
    q("emer-5", "emergencia", "decision", "La descarga fue por un cable de la red caído en la calle. ¿Qué haces?",
      ["Me acerco para ayudarla rápido", "Me mantengo lejos, alejo a otros y llamo al 123 y al operador para que corten la energía", "Tiro agua al cable"], 1,
      "No te acerques a un cable caído: solo el operador puede cortar la energía de la red."),
  ],
}
