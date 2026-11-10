import { StrictMode } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import SceneView from './pages/SceneView'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import { SCENES } from './content/scenes'
import { CASA } from './content/escenarios1'

// Solo en desarrollo: vistas de prueba sin iniciar sesión. Aquí NO se guardan puntajes.
//   ?escena=casa          una escena de "encuentra el peligro" (agrega &coords para ver coordenadas)
//   ?pantalla=inicio      el mapa de escenarios con progreso de ejemplo
//   ?pantalla=preguntas   las preguntas de La cocina
const params = import.meta.env.DEV ? new URLSearchParams(window.location.search) : null
const reload = () => window.location.reload()

function devPreview(): ReactNode {
  if (!params) return null
  const scene = SCENES[params.get('escena') ?? '']
  if (scene) return <SceneView scene={scene} onFinish={reload} onExit={reload} />
  const screen = params.get('pantalla')
  if (screen === 'inicio') {
    const progress = [
      { userId: 'demo', scenarioId: 'casa', stars: 3, points: 640, completed: true },
      { userId: 'demo', scenarioId: 'barrio', stars: 2, points: 480, completed: true },
    ]
    return (
      <Home userName="Demo" progress={progress} hasPostest={false} notice="" onPlay={reload} onPostest={reload} onResults={reload} onSignOut={reload} />
    )
  }
  if (screen === 'preguntas') {
    return (
      <Quiz title={CASA.title} badge={CASA.id} mission={CASA.mission} questions={CASA.questions} mode="mission" origin="demo" onFinish={reload} onExit={reload} />
    )
  }
  return null
}

const preview = devPreview()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {preview ? (
      <>
        <div className="preview-banner">
          <strong>Modo prueba:</strong> aquí no se guardan puntajes. Para jugar de verdad abre <a href="/">la página principal</a>.
        </div>
        {preview}
      </>
    ) : (
      <App />
    )}
  </StrictMode>,
)
