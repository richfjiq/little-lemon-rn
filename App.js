import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './screens/Onboarding';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Onboarding />
    </SafeAreaProvider>
  );
}
