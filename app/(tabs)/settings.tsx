import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SettingsSelector from '../../components/SettingsSelector';
import { generalStyles } from '../../styles/general';
import { DEFAULT_SETTINGS, GameSettings, loadSettings, saveSettings } from '../../utils/settings';

export default function SettingsScreen() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInitialSettings();
  }, []);

  const loadInitialSettings = async () => {
    try {
      const loadedSettings = await loadSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.log('Failed to load settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsChange = async (newSettings: GameSettings) => {
    setSettings(newSettings);
    try {
      await saveSettings(newSettings);
    } catch (error) {
      console.log('Failed to save settings:', error);
      Alert.alert('Error', 'Failed to save settings. Please try again.');
    }
  };

  const handleReset = async () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset to default settings?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await handleSettingsChange(DEFAULT_SETTINGS);
          }
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={generalStyles.container}>
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <View style={generalStyles.container}>
      <Text style={styles.headerText}>Settings</Text>
      
      <SettingsSelector
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />
      
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset to Default</Text>
      </TouchableOpacity>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Settings are saved automatically and will apply to new games.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
  },
});
