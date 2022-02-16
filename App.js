import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/auth/LoginScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import PhoneNumber from './src/screens/auth/PhoneNumber';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="toHome"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sendOTP"
          component={PhoneNumber}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
