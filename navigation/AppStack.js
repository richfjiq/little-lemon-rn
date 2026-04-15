import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import HeaderScreen from '../components/HeaderScreen';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
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
            <HeaderScreen
              logo
              avatar
              backButton
              onBack={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
