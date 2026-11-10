import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Icon from './Icon'

const INSTAGRAM_URL = 'https://www.instagram.com/tics.industrial/'
const INSTAGRAM_USER = '@tics.industrial'
const YEAR = new Date().getFullYear()

type Panel = 'about' | 'faq' | 'contact' | null

const FAQ: [string, string][] = [
  ['¿Qué es Brigada Cero Riesgo?', 'Un juego web gratuito que enseña seguridad eléctrica con situaciones del Atlántico: la cocina, el barrio, la playa, la obra, la finca y el carnaval.'],
  ['¿Tengo que instalar algo?', 'No. Funciona en el navegador del celular o del computador, con el enlace o el código QR.'],
  ['¿Cuánto cuesta?', 'Nada. El juego es gratuito.'],
  ['¿Para qué son el pretest y el postest?', 'El pretest mide lo que sabes al empezar y el postest lo que aprendiste al final. Así sabemos si el juego sirve.'],
  ['¿Qué pasa si me equivoco?', 'Se quema un fusible y el juego te explica por qué era peligroso. Si se queman los 3, repasas y vuelves a intentarlo.'],
  ['¿Qué datos guardan?', 'Solo tu correo, tu nombre o apodo y tus resultados. Los resultados individuales son privados; solo se publican datos agregados.'],
  ['¿El juego reemplaza a un electricista?', 'No. Te enseña a reconocer el peligro. Las reparaciones e instalaciones las hace siempre un electricista certificado.'],
  ['¿Qué hago ante una emergencia eléctrica?', 'No toques a la persona ni el cable, corta la energía solo si es seguro y llama al 123.'],
]

const CONTENT: Record<Exclude<Panel, null>, { title: string; body: ReactNode }> = {
  about: {
    title: 'Quiénes somos',
    body: (
      <>
        <p>
          Somos un grupo de estudiantes de la Universidad del Norte que creó <strong>Cero Riesgo Atlántico</strong>, una
          estrategia para reducir los accidentes eléctricos en el departamento.
        </p>
        <p>
          El Atlántico está entre los departamentos con más muertes por accidentes de origen eléctrico en Colombia, y muchos
          de esos accidentes se pueden prevenir con conocimiento y buenos hábitos.
        </p>
        <p>Nuestros ejes:</p>
        <ul className="plain-list">
          <li>Identifico los riesgos eléctricos.</li>
          <li>Aplico las medidas de prevención.</li>
          <li>Actúo con responsabilidad.</li>
        </ul>
        <p className="muted">Protegemos vidas, construimos futuro.</p>
      </>
    ),
  },
  faq: {
    title: 'Preguntas frecuentes',
    body: (
      <div className="faq">
        {FAQ.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    ),
  },
  contact: {
    title: 'Contáctanos',
    body: (
      <>
        <p>Escríbenos por Instagram para dudas, sugerencias o para llevar el juego a tu colegio, barrio o empresa.</p>
        <a className="btn insta-btn" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <InstagramIcon /> {INSTAGRAM_USER}
        </a>
        <p className="muted" style={{ marginTop: 12 }}>
          En una emergencia eléctrica llama al <strong>123</strong>.
        </p>
      </>
    ),
  },
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  const [panel, setPanel] = useState<Panel>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (panel && !d.open) d.showModal()
    if (!panel && d.open) d.close()
  }, [panel])

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            <Icon name="bolt" size={16} />
          </span>
          <span>
            <strong>Cero Riesgo Atlántico</strong>
            <small>Protegemos vidas, construimos futuro.</small>
          </span>
        </div>
        <nav className="footer-links" aria-label="Información">
          <button type="button" onClick={() => setPanel('about')}>Quiénes somos</button>
          <button type="button" onClick={() => setPanel('faq')}>Preguntas frecuentes</button>
          <button type="button" onClick={() => setPanel('contact')}>Contáctanos</button>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${INSTAGRAM_USER}`}>
            <InstagramIcon /> {INSTAGRAM_USER}
          </a>
        </nav>
      </div>
      <p className="footer-copy">© {YEAR} Cero Riesgo Atlántico · Universidad del Norte</p>

      <dialog ref={dialog} className="info-dialog" onClose={() => setPanel(null)} onClick={(e) => e.target === e.currentTarget && setPanel(null)}>
        {panel && (
          <div className="info-body">
            <div className="row between">
              <h3>{CONTENT[panel].title}</h3>
              <button type="button" className="link" onClick={() => setPanel(null)} aria-label="Cerrar">
                Cerrar
              </button>
            </div>
            {CONTENT[panel].body}
          </div>
        )}
      </dialog>
    </footer>
  )
}
