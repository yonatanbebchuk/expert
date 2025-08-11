import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GameSettings, getDifficultyLabel } from '../utils/settings';

interface SettingsSelectorProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

export default function SettingsSelector({ settings, onSettingsChange }: SettingsSelectorProps) {
  const digitOptions = [1, 2, 3];

  const renderDigitSelector = (
    label: string,
    currentValue: number,
    onChange: (value: number) => void,
    maxValue = 3
  ) => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorLabel}>{label}</Text>
      <View style={styles.optionsRow}>
        {digitOptions.slice(0, maxValue).map(digit => (
          <TouchableOpacity
            key={digit}
            style={[
              styles.optionButton,
              currentValue === digit && styles.selectedOption
            ]}
            onPress={() => onChange(digit)}
          >
            <Text style={[
              styles.optionText,
              currentValue === digit && styles.selectedOptionText
            ]}>
              {digit}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const updateFirstDigits = (value: number) => {
    onSettingsChange({ ...settings, firstNumberDigits: value });
  };

  const updateSecondDigits = (value: number) => {
    onSettingsChange({ ...settings, secondNumberDigits: value });
  };

  const generatePreview = () => {
    const firstDigits = settings.firstNumberDigits;
    const secondDigits = settings.secondNumberDigits;
    
    const firstExample = firstDigits === 1 ? '7' : 
                        firstDigits === 2 ? '45' : '234';
    const secondExample = secondDigits === 1 ? '6' : '23';
    
    return `${firstExample} × ${secondExample} = ?`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Problem Difficulty</Text>
      
      {renderDigitSelector(
        'First Number (digits)',
        settings.firstNumberDigits,
        updateFirstDigits
      )}
      
      {renderDigitSelector(
        'Second Number (digits)',
        settings.secondNumberDigits,
        updateSecondDigits,
        2 // Max 2 digits for second number
      )}
      
      <View style={styles.previewContainer}>
        <Text style={styles.previewLabel}>Preview:</Text>
        <Text style={styles.previewText}>{generatePreview()}</Text>
        <Text style={styles.difficultyText}>
          {getDifficultyLabel(settings.firstNumberDigits, settings.secondNumberDigits)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectorContainer: {
    marginBottom: 20,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#bdc3c7',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
    borderColor: '#0056CC',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
  },
  selectedOptionText: {
    color: 'white',
  },
  previewContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  previewText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  difficultyText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});