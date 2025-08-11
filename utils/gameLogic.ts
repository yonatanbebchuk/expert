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

export function generateProblem(firstDigits = 2, secondDigits = 1): Problem {
  const num1 = generateNumber(firstDigits);
  const num2 = generateNumber(secondDigits);
  
  return {
    num1,
    num2,
    answer: num1 * num2,
    operation: '×'
  };
}

function generateNumber(digits: number): number {
  switch (digits) {
    case 1:
      return Math.floor(Math.random() * 8) + 2; // 2-9 (avoid 0,1)
    case 2:
      return Math.floor(Math.random() * 90) + 10; // 10-99
    case 3:
      return Math.floor(Math.random() * 900) + 100; // 100-999
    default:
      return Math.floor(Math.random() * 90) + 10; // Default to 2-digit
  }
}

export function checkAnswer(userAnswer: number, correctAnswer: number): boolean {
  return userAnswer === correctAnswer;
}

export function updateGameState(
  currentState: GameState, 
  isCorrect: boolean,
  firstDigits = 2,
  secondDigits = 1
): GameState {
  return {
    ...currentState,
    score: currentState.score + (isCorrect ? 10 : 0),
    streak: isCorrect ? currentState.streak + 1 : 0,
    totalProblems: currentState.totalProblems + 1,
    correctAnswers: currentState.correctAnswers + (isCorrect ? 1 : 0),
    currentProblem: generateProblem(firstDigits, secondDigits)
  };
}

export function getAccuracy(state: GameState): number {
  if (state.totalProblems === 0) return 0;
  return Math.round((state.correctAnswers / state.totalProblems) * 100);
}