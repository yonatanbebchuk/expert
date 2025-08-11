import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { generalStyles } from '../styles/general';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={generalStyles.container}>
        <Link href="/" style={generalStyles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}
