import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { generalStyles } from '../styles/general';
import { checkAnswer, GameState, generateProblem, updateGameState } from '../utils/gameLogic';
import { GameSettings, loadSettings, DEFAULT_SETTINGS } from '../utils/settings';
import NumberPad from './NumberPad';
import ScoreDisplay from './ScoreDisplay';

export default function GameScreen() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [gameState, setGameState] = useState<GameState>({
    currentProblem: generateProblem(DEFAULT_SETTINGS.firstNumberDigits, DEFAULT_SETTINGS.secondNumberDigits),
    score: 0,
    streak: 0,
    totalProblems: 0,
    correctAnswers: 0,
  });

  const [currentInput, setCurrentInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    loadGameSettings();
  }, []);

  // Reload settings when the screen comes into focus (when user switches from Settings tab)
  useFocusEffect(
    React.useCallback(() => {
      loadGameSettings();
    }, [])
  );

  const loadGameSettings = async () => {
    try {
      const loadedSettings = await loadSettings();
      setSettings(loadedSettings);
      
      // Update current problem with new settings
      setGameState(prevState => ({
        ...prevState,
        currentProblem: generateProblem(loadedSettings.firstNumberDigits, loadedSettings.secondNumberDigits)
      }));
    } catch (error) {
      console.log('Failed to load settings:', error);
    }
  };

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

    setGameState(prevState => updateGameState(
      prevState, 
      isCorrect, 
      settings.firstNumberDigits, 
      settings.secondNumberDigits
    ));

    showFeedback(
      isCorrect ? '🎉 Correct!' : `❌ Wrong! ${gameState.currentProblem.answer}`,
      isCorrect
    );

    setCurrentInput('');
  };

  return (
    <View style={generalStyles.container}>
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