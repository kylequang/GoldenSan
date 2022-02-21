import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/LoginScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import PhoneNumber from './src/screens/auth/PhoneNumber';
import Information from './src/screens/auth/Information';
import Loading from './src/components/animation/Loading';
import RepainerLoading from './src/components/animation/RepainerLoading';
import Fixer from './src/screens/home/Fixer';
import Adv from './src/components/animation/Adv';
import Index from './src/screens/client/IndexClient';
import DetailCategory from './src/screens/client/DetailCategory';
import BottomTab from './src/navigation/client/BottomTab';
import Manage from './src/screens/client/Manage';
import HeaderUser from './src/components/HeaderUser';
import ListRepaimen from './src/screens/client/ListRepaimen';
import DetailRepaimen from './src/screens/client/DetailRepaimen';
import { useEffect, useState } from 'react';
const Stack = createNativeStackNavigator();

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
}

export default function App() {
  const [time,setTime]=useState(true);
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          initialRouteName='test'
          name="test"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="detailCategory"
          component={DetailCategory}
          options={({ route }) => ({
            title:route.params.name,
            headerTitleAlign: 'center',
          })
          }
        />
        <Stack.Screen
          name="listRepaimen"
          component={ListRepaimen}
          options={({ route }) => ({
            title: truncate(route.params.name, 25),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="detailRepaimen"
          component={DetailRepaimen}
          options={({ route }) => ({
            title: truncate(route.params.name, 25),
            headerTitleAlign: 'center',
          })}
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