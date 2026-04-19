import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './screens/Onboarding';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStack } from './navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function App() {
  useFonts({
    'Karla-Regular': require('./assets/fonts/Karla-Regular.ttf'),
    'MarkaziText-Regular': './assets/fonts/MarkaziText-Regular.ttf',
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
