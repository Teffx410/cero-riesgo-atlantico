import { useState, type FormEvent } from 'react'
import { data } from '../data'
import type { User } from '../types'
import Icon from '../components/Icon'

interface Props {
  onDone: (user: User) => void
}

function explain(e: unknown, registering: boolean): string {
  const status = (e as { statusCode?: number }).statusCode
  if (status === 401) return 'Correo o contraseña incorrectos.'
  if (status === 409) return 'Ya existe una cuenta con ese correo. Prueba iniciando sesión.'
  if (status === 400) {
    return registering
      ? 'No se pudo crear la cuenta. Revisa el correo y que la contraseña tenga mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.'
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
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (ev: FormEvent) => {
    ev.preventDefault()
    setError('')
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
      <form className="card" onSubmit={submit}>
        <h3>{registering ? 'Crear cuenta' : 'Entrar'}</h3>
        {registering && (
          <input placeholder="Tu nombre o apodo" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="feedback bad">{error}</div>}
        <button className="btn" type="submit" disabled={busy}>
          {busy ? 'Un momento…' : registering ? 'Registrarme' : 'Entrar'}
        </button>
        <button className="link" type="button" onClick={() => { setRegistering(!registering); setError('') }}>
          {registering ? 'Ya tengo cuenta' : 'No tengo cuenta, quiero registrarme'}
        </button>
      </form>
    </div>
  )
}
