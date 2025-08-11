import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GameSettings {
  firstNumberDigits: number;  // 1-3 digits for first number
  secondNumberDigits: number; // 1-2 digits for second number
}

export const DEFAULT_SETTINGS: GameSettings = {
  firstNumberDigits: 2,  // Default: 2-digit × 1-digit
  secondNumberDigits: 1,
};

const SETTINGS_KEY = '@math_master_settings';

export async function loadSettings(): Promise<GameSettings> {
  try {
    const stored = await AsyncStorage.getItem(SETTINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (error) {
    console.log('Failed to load settings:', error);
  }
  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: GameSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.log('Failed to save settings:', error);
  }
}

export function getNumberRange(digits: number): { min: number; max: number } {
  switch (digits) {
    case 1:
      return { min: 2, max: 9 };   // Avoid 0 and 1 for better practice
    case 2:
      return { min: 10, max: 99 };
    case 3:
      return { min: 100, max: 999 };
    default:
      return { min: 10, max: 99 }; // Default to 2-digit
  }
}

export function getDifficultyLabel(firstDigits: number, secondDigits: number): string {
  const labels = {
    '1,1': 'Beginner (1×1)',
    '2,1': 'Easy (2×1)',
    '2,2': 'Medium (2×2)', 
    '3,1': 'Hard (3×1)',
    '3,2': 'Expert (3×2)',
  };
  
  const key = `${firstDigits},${secondDigits}` as keyof typeof labels;
  return labels[key] || `Custom (${firstDigits}×${secondDigits})`;
}