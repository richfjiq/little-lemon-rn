import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import HeaderScreen from '../components/HeaderScreen';
import Profile from '../screens/Profile';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthentication = async () => {
    try {
      const value = await AsyncStorage.getItem('@Email');
      if (value !== null) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('----- checkAuthentication error ------', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color="white" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'Home' : 'Onboarding'}
      screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
    >
      <Stack.Screen
        options={{
          header: () => <HeaderScreen logo />,
        }}
        component={Onboarding}
        name="Onboarding"
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          header: () => (
            <HeaderScreen logo avatar backButton onBack={navigation.goBack} />
          ),
        })}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => <HeaderScreen logo avatar />,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#495E57',
  },
});
