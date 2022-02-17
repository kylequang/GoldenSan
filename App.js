import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/auth/LoginScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import PhoneNumber from './src/screens/auth/PhoneNumber';
import Information from './src/screens/auth/Information';
import Loading from './src/components/animation/Loading';
import RepainerLoading from './src/components/animation/RepainerLoading';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        {/* <Stack.Screen
          initialRouteName='loading'
          name="loading"
          component={Loading}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          initialRouteName='loading'
          name="loading"
          component={RepainerLoading}
          options={{ headerShown: false }}
        />
        <Stack.Screen

          name="sendOTP"
          component={PhoneNumber}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="toHome"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="inputInfo"
          component={Information}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
