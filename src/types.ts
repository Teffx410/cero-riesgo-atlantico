export type QuestionType = 'peligro' | 'decision' | 'mito'

export interface Question {
  id: string
  scenarioId: string // 'pretest' | 'casa' | 'barrio' | ...
  type: QuestionType
  text: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface User {
  id: string
  username: string
}

export interface AnswerRecord {
  questionId: string
  chosenIndex: number
  correct: boolean
  origin: string // escenario o 'chat'
}

export interface Attempt {
  id: string
  userId: string
  kind: 'pretest' | 'postest'
  score: number
  total: number
  answers: AnswerRecord[]
  createdAt: string
}

export interface ScenarioProgress {
  userId: string
  scenarioId: string
  stars: number // 0 a 3
  points: number
  completed: boolean
}

export interface Scenario {
  id: string
  order: number
  title: string
  mission: string
  questions: Question[]
}
