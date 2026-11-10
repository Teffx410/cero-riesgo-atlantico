import { useState, type FormEvent } from 'react'
import { data } from '../data'
import type { User } from '../types'
import Icon from '../components/Icon'
import { NAME_MAX, PASSWORD_MAX, PASSWORD_RULES, isValidEmail, isValidPassword } from '../data/validation'

interface Props {
  onDone: (user: User) => void
}

function explain(e: unknown, registering: boolean): string {
  const status = (e as { statusCode?: number }).statusCode
  if (status === 401) return 'Correo o contraseña incorrectos.'
  if (status === 409) return 'Ya existe una cuenta con ese correo. Prueba iniciando sesión.'
  if (status === 400) {
    return registering
      ? 'El servidor no aceptó los datos. Revisa el correo y que la contraseña cumpla todos los requisitos.'
      : 'Revisa el correo y la contraseña.'
  }
  if (e instanceof Error && e.message) return e.message
  return 'Ocurrió un error. Intenta de nuevo.'
}

export default function Auth({ onDone }: Props) {
  const [registering, setRegistering] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const emailOk = isValidEmail(email)
  const passwordOk = isValidPassword(password)
  const matchOk = password.length > 0 && password === password2
  const canSubmit = registering ? emailOk && passwordOk && matchOk : emailOk && password.length > 0

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    setError('')
    // Nada se envía a Roble si no pasa la validación.
    if (!emailOk) return setError('Escribe un correo válido, por ejemplo nombre@correo.com.')
    if (registering) {
      if (!passwordOk) return setError('La contraseña no cumple todos los requisitos de la lista.')
      if (!matchOk) return setError('Las dos contraseñas no coinciden.')
    } else if (!password) {
      return setError('Escribe tu contraseña.')
    }
    setBusy(true)
    try {
      const user = registering
        ? await data.signUp(email.trim(), password, name.trim() || email.split('@')[0])
        : await data.signIn(email.trim(), password)
      onDone(user)
    } catch (e) {
      setError(explain(e, registering))
    } finally {
      setBusy(false)
    }
  }

  const toggleMode = () => {
    setRegistering(!registering)
    setError('')
    setPassword('')
    setPassword2('')
  }

  return (
    <div className="app">
      <div className="hero">
        <div className="logo">
          <span className="logo-bolt">
            <Icon name="bolt" size={40} />
          </span>
        </div>
        <h1>Brigada Cero Riesgo</h1>
        <p className="muted">Una descarga no avisa. Tu decisión sí.</p>
      </div>
      <form className="card" onSubmit={submit} noValidate>
        <h3>{registering ? 'Crear cuenta' : 'Entrar'}</h3>
        {registering && (
          <label className="field">
            <span>Nombre o apodo (opcional)</span>
            <input placeholder="Así te verás en el diploma" maxLength={NAME_MAX} value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        )}
        <label className="field">
          <span>Correo</span>
          <input type="email" autoComplete="email" placeholder="nombre@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          {email.length > 0 && !emailOk && <small className="hint bad">Revisa el correo: debe tener la forma nombre@correo.com</small>}
        </label>
        <label className="field">
          <span>Contraseña</span>
          <div className="pass-row">
            <input
              type={show ? 'text' : 'password'}
              autoComplete={registering ? 'new-password' : 'current-password'}
              maxLength={PASSWORD_MAX}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="link" onClick={() => setShow(!show)}>
              {show ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </label>

        {registering && (
          <>
            <ul className="rules" aria-label="Requisitos de la contraseña">
              {PASSWORD_RULES.map((r) => {
                const ok = r.ok(password)
                return (
                  <li key={r.label} className={ok ? 'ok' : ''}>
                    <span className="dot">{ok ? <Icon name="check" size={12} /> : null}</span>
                    {r.label}
                  </li>
                )
              })}
            </ul>
            <label className="field">
              <span>Repite la contraseña</span>
              <input
                type={show ? 'text' : 'password'}
                autoComplete="new-password"
                maxLength={PASSWORD_MAX}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              {password2.length > 0 && !matchOk && <small className="hint bad">Las contraseñas no coinciden.</small>}
            </label>
          </>
        )}

        {error && <div className="feedback bad">{error}</div>}
        <button className="btn" type="submit" disabled={busy || !canSubmit}>
          {busy ? 'Un momento…' : registering ? 'Registrarme' : 'Entrar'}
        </button>
        <button className="link" type="button" onClick={toggleMode}>
          {registering ? 'Ya tengo cuenta' : 'No tengo cuenta, quiero registrarme'}
        </button>
      </form>
    </div>
  )
}
