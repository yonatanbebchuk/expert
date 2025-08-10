import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameState, getAccuracy } from '../utils/gameLogic';

interface ScoreDisplayProps {
  gameState: GameState;
}

export default function ScoreDisplay({ gameState }: ScoreDisplayProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{gameState.score}</Text>
        <Text style={styles.statLabel}>Score</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={[styles.statValue, styles.streakText]}>🔥 {gameState.streak}</Text>
        <Text style={styles.statLabel}>Streak</Text>
      </View>
      
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{getAccuracy(gameState)}%</Text>
        <Text style={styles.statLabel}>Accuracy</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  streakText: {
    color: '#FF6B35',
  },
});