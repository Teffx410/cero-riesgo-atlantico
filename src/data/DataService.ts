import type { Attempt, ScenarioProgress, User } from '../types'

export interface DataService {
  signUp(email: string, password: string, name: string): Promise<User>
  signIn(email: string, password: string): Promise<User>
  signOut(): Promise<void>
  getCurrentUser(): Promise<User | null>
  saveAttempt(attempt: Omit<Attempt, 'id'>): Promise<void>
  getAttempts(userId: string): Promise<Attempt[]>
  saveScenarioProgress(progress: ScenarioProgress): Promise<void>
  getScenarioProgress(userId: string): Promise<ScenarioProgress[]>
}
