import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './screens/Onboarding';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStack } from './navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
