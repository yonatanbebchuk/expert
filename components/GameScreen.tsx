import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { generateProblem, checkAnswer, updateGameState, GameState } from '../utils/gameLogic';
import NumberPad from './NumberPad';
import ScoreDisplay from './ScoreDisplay';

export default function GameScreen() {
  const [gameState, setGameState] = useState<GameState>({
    currentProblem: generateProblem(),
    score: 0,
    streak: 0,
    totalProblems: 0,
    correctAnswers: 0,
  });
  
  const [currentInput, setCurrentInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackOpacity] = useState(new Animated.Value(0));

  const showFeedback = (message: string, isCorrect: boolean) => {
    setFeedback(message);
    
    Animated.sequence([
      Animated.timing(feedbackOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(feedbackOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setFeedback(null);
    });
  };

  const handleNumberPress = (num: string) => {
    if (currentInput.length < 6) {
      setCurrentInput(prev => prev + num);
    }
  };

  const handleClear = () => {
    setCurrentInput('');
  };

  const handleSubmit = () => {
    if (currentInput === '') return;
    
    const userAnswer = parseInt(currentInput);
    const isCorrect = checkAnswer(userAnswer, gameState.currentProblem.answer);
    
    setGameState(prevState => updateGameState(prevState, isCorrect));
    
    showFeedback(
      isCorrect ? '🎉 Correct!' : `❌ Wrong! ${gameState.currentProblem.answer}`,
      isCorrect
    );
    
    setCurrentInput('');
  };

  return (
    <View style={styles.container}>
      <ScoreDisplay gameState={gameState} />
      
      <View style={styles.problemContainer}>
        <Text style={styles.problemText}>
          {gameState.currentProblem.num1} {gameState.currentProblem.operation} {gameState.currentProblem.num2} = ?
        </Text>
      </View>

      {feedback && (
        <Animated.View style={[styles.feedbackContainer, { opacity: feedbackOpacity }]}>
          <Text style={[styles.feedbackText, feedback.includes('🎉') && styles.correctFeedback]}>
            {feedback}
          </Text>
        </Animated.View>
      )}

      <NumberPad
        onNumberPress={handleNumberPress}
        onClear={handleClear}
        onSubmit={handleSubmit}
        currentInput={currentInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  problemContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: '80%',
    alignItems: 'center',
  },
  problemText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  feedbackContainer: {
    position: 'absolute',
    top: '45%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 1000,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textAlign: 'center',
  },
  correctFeedback: {
    color: '#4ECDC4',
  },
});