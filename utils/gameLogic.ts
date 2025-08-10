export interface Problem {
  num1: number;
  num2: number;
  answer: number;
  operation: string;
}

export interface GameState {
  currentProblem: Problem;
  score: number;
  streak: number;
  totalProblems: number;
  correctAnswers: number;
}

export function generateProblem(): Problem {
  const num1 = Math.floor(Math.random() * 90) + 10; // 10-99 (2-digit)
  const num2 = Math.floor(Math.random() * 9) + 2;   // 2-9 (1-digit, avoid 0,1)
  
  return {
    num1,
    num2,
    answer: num1 * num2,
    operation: '×'
  };
}

export function checkAnswer(userAnswer: number, correctAnswer: number): boolean {
  return userAnswer === correctAnswer;
}

export function updateGameState(
  currentState: GameState, 
  isCorrect: boolean
): GameState {
  return {
    ...currentState,
    score: currentState.score + (isCorrect ? 10 : 0),
    streak: isCorrect ? currentState.streak + 1 : 0,
    totalProblems: currentState.totalProblems + 1,
    correctAnswers: currentState.correctAnswers + (isCorrect ? 1 : 0),
    currentProblem: generateProblem()
  };
}

export function getAccuracy(state: GameState): number {
  if (state.totalProblems === 0) return 0;
  return Math.round((state.correctAnswers / state.totalProblems) * 100);
}