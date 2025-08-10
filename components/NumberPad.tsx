import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface NumberPadProps {
  onNumberPress: (num: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  currentInput: string;
}

export default function NumberPad({ onNumberPress, onClear, onSubmit, currentInput }: NumberPadProps) {
  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'], 
    ['7', '8', '9'],
    ['Clear', '0', 'Submit']
  ];

  const renderButton = (value: string, isSpecial = false) => (
    <TouchableOpacity
      key={value}
      style={[styles.button, isSpecial && styles.specialButton]}
      onPress={() => {
        if (value === 'Clear') onClear();
        else if (value === 'Submit') onSubmit();
        else onNumberPress(value);
      }}
    >
      <Text style={[styles.buttonText, isSpecial && styles.specialButtonText]}>
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputDisplay}>
        <Text style={styles.inputText}>{currentInput || '0'}</Text>
      </View>
      
      <View style={styles.numberGrid}>
        {numbers.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((num) => renderButton(num, num === 'Clear' || num === 'Submit'))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  inputDisplay: {
    width: '90%',
    height: 60,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  inputText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  numberGrid: {
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: '30%',
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  specialButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  specialButtonText: {
    fontSize: 16,
  },
});