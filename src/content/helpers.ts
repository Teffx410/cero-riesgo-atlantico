import type { Question, QuestionType } from '../types'

export function q(
  id: string,
  scenarioId: string,
  type: QuestionType,
  text: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): Question {
  return { id, scenarioId, type, text, options, correctIndex, explanation }
}
