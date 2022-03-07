import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/LoginScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import PhoneNumber from './src/screens/auth/PhoneNumber';
import Information from './src/screens/auth/Information';
import Loading from './src/components/animation/Loading';
import RepairmenLoading from './src/components/animation/RepairmenLoading';
import Fixer from './src/screens/home/Fixer';
import Adv from './src/components/animation/Adv';
import Index from './src/screens/client/IndexClient';
import DetailCategory from './src/screens/client/DetailCategory';
import BottomTab from './src/navigation/client/BottomTab';
import Manage from './src/screens/client/Manage';
import HeaderUser from './src/components/HeaderUser';
import ListRepairmen from './src/screens/client/ListRepairmen';
import DetailRepairmen from './src/screens/client/DetailRepairmen';
import { useEffect, useState } from 'react';
import LoginFB from './src/screens/auth/LoginFB';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Phone from './src/screens/auth/Phone';
import BookOrder from './src/screens/client/BookOrder';
import UploadImg from './src/screens/auth/UploadImg';
import TakeCamera from './src/screens/auth/TakeCamera';
import RoleStack from './src/navigation/RoleStack';

function truncate(str, n) {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
}
import { LogBox } from 'react-native';
import AuthScreen from './src/navigation/AuthScreen';

LogBox.ignoreAllLogs();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rememberLogin, setRememberLogin] = useState(null);

  const getRememberLogin = async () => {
    try {
      const rememberLogin = await AsyncStorage.getItem('rememberLogin');
      setRememberLogin(rememberLogin);
    } catch {
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000)
    getRememberLogin();
  }, []);
  return (
    <NavigationContainer >
      {
        loading ? (<RepairmenLoading />) : rememberLogin === null ? (<AuthScreen />) : (<RoleStack />)
      }
      {/* <Stack.Navigator >
        <Stack.Screen
          name="camera"
          component={TakeCamera}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="upload"
          component={UploadImg}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="auth"
          component={PhoneNumber}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home_user"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home_repairmen"
          component={Information}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="inputInfo"
          component={Information}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="listRepairmen"
          component={ListRepairmen}
          options={({ route }) => ({
            title: truncate(route.params.name, 25),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="detailRepairmen"
          component={DetailRepairmen}
          options={({ route }) => ({
            title: truncate(route.params.name, 25),
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          name="bookOrder"
          component={BookOrder}
          options={() => ({
            title: 'Đặt Lịch Sữa Chữa',
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator> */}
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