// Validación del registro antes de enviar a Roble.

export const PASSWORD_MIN = 8
export const PASSWORD_MAX = 64

const SYMBOL_RE = /[!-/:-@[-`{-~]/

export interface Rule {
  label: string
  ok: (p: string) => boolean
}

export const PASSWORD_RULES: Rule[] = [
  { label: `Entre ${PASSWORD_MIN} y ${PASSWORD_MAX} caracteres`, ok: (p) => p.length >= PASSWORD_MIN && p.length <= PASSWORD_MAX },
  { label: 'Una letra mayúscula (A-Z)', ok: (p) => /[A-Z]/.test(p) },
  { label: 'Una letra minúscula (a-z)', ok: (p) => /[a-z]/.test(p) },
  { label: 'Un número (0-9)', ok: (p) => /[0-9]/.test(p) },
  { label: `Un símbolo, por ejemplo ! @ # $ % & * . - _`, ok: (p) => SYMBOL_RE.test(p) },
  // Solo caracteres del teclado básico: sin espacios, tildes, ñ ni emojis.
  { label: 'Sin espacios, tildes, ñ ni emojis', ok: (p) => p.length > 0 && /^[!-~]+$/.test(p) },
]

export const isValidPassword = (p: string) => PASSWORD_RULES.every((r) => r.ok(p))

export const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim())

export const NAME_MAX = 40
