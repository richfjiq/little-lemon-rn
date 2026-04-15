import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import HeaderScreen from '../components/HeaderScreen';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: () => <HeaderScreen logo />,
        }}
        component={Onboarding}
        name="Onboarding"
      />
    </Stack.Navigator>
  );
};
