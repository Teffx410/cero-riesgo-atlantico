import {
  RobleApiAuthException,
  RobleApiHttpException,
  RobleApiNetworkException,
  RobleApiTimeoutException,
} from 'roble-client'

/** Error al guardar o leer, con la tabla en la que pasó. */
export class DataError extends Error {
  readonly table: string
  readonly cause: unknown
  constructor(table: string, cause: unknown) {
    super(cause instanceof Error ? cause.message : String(cause))
    this.name = 'DataError'
    this.table = table
    this.cause = cause
  }
}

export interface ErrorInfo {
  /** Explicación para la persona que juega. */
  message: string
  /** Detalle técnico para quien administra Roble. */
  detail: string
  /** La sesión venció: hay que volver a iniciar sesión. */
  sessionExpired: boolean
  /** Vale la pena reintentar más tarde (red caída, servidor ocupado). */
  retryable: boolean
}

/** Traduce un error de Roble a algo que se pueda mostrar y diagnosticar. */
export function describeError(e: unknown): ErrorInfo {
  const table = e instanceof DataError ? e.table : ''
  const err = e instanceof DataError ? e.cause : e
  const raw = err instanceof Error ? err.message : String(err)
  const where = table ? ` (tabla «${table}»)` : ''

  if (err instanceof RobleApiAuthException) {
    return {
      message: 'Tu sesión venció. Inicia sesión otra vez y tu resultado se guardará.',
      detail: `Sesión vencida${where}: ${raw}`,
      sessionExpired: true,
      retryable: true,
    }
  }
  if (err instanceof RobleApiNetworkException || err instanceof RobleApiTimeoutException) {
    return {
      message: 'No hay conexión con el servidor. Tu resultado quedó guardado en este dispositivo y se enviará cuando vuelva la conexión.',
      detail: `Sin conexión${where}: ${raw}`,
      sessionExpired: false,
      retryable: true,
    }
  }
  if (err instanceof RobleApiHttpException) {
    const s = err.statusCode
    if (s === 401) {
      return {
        message: 'Tu sesión venció. Inicia sesión otra vez y tu resultado se guardará.',
        detail: `HTTP 401${where}: ${raw}`,
        sessionExpired: true,
        retryable: true,
      }
    }
    if (s === 403) {
      return {
        message: 'El servidor no dejó guardar: tu cuenta no tiene permiso de escritura en esta tabla.',
        detail: `HTTP 403${where}: ${raw}. En la consola de Roble, dale al rol «user» permiso de crear y leer en la tabla${table ? ` «${table}»` : ''}.`,
        sessionExpired: false,
        retryable: false,
      }
    }
    if (s === 404) {
      return {
        message: 'El servidor no encontró la tabla donde se guardan los resultados.',
        detail: `HTTP 404${where}: ${raw}. Revisa que la tabla exista en la consola de Roble con ese nombre exacto.`,
        sessionExpired: false,
        retryable: false,
      }
    }
    if (s === 400 || s === 422) {
      return {
        message: 'El servidor rechazó los datos del resultado.',
        detail: `HTTP ${s}${where}: ${raw}. Revisa que la tabla tenga estas columnas y tipos — progreso: userId (texto), scenarioId (texto), stars (entero), points (entero), completed (booleano); intentos: userId (texto), kind (texto), score (entero), total (entero), answers (json/jsonb), createdAt (texto o fecha).`,
        sessionExpired: false,
        retryable: false,
      }
    }
    if (s === 429 || s >= 500) {
      return {
        message: 'El servidor está ocupado. Tu resultado quedó guardado en este dispositivo y se enviará después.',
        detail: `HTTP ${s}${where}: ${raw}`,
        sessionExpired: false,
        retryable: true,
      }
    }
    return {
      message: 'No se pudo guardar tu resultado.',
      detail: `HTTP ${s}${where}: ${raw}`,
      sessionExpired: false,
      retryable: true,
    }
  }
  return {
    message: 'No se pudo guardar tu resultado.',
    detail: `${raw}${where}`,
    sessionExpired: false,
    retryable: true,
  }
}
