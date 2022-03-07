import { StyleSheet } from 'react-native';

import { NavigationContainer, StackActions } from '@react-navigation/native';
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

import { LogBox } from 'react-native';
import AuthScreen from './src/navigation/AuthScreen';
import BottomRepairmen from './src/navigation/repairmen/BottomRepairmen';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rememberLogin, setRememberLogin] = useState(null);

  const getRememberLogin = async () => {
    const rememberLogin = await AsyncStorage.getItem('rememberLogin');
    setRememberLogin(rememberLogin);
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