import {LogBox } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import RepairmenLoading from './src/components/animation/RepairmenLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from './src/navigation/AuthScreen';
import RoleStack from './src/navigation/RoleStack';

LogBox.ignoreAllLogs();


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
    <NavigationContainer  >
      {
        loading ? (<RepairmenLoading />) : rememberLogin === null ? (<AuthScreen />) : (<RoleStack />)
      }
    </NavigationContainer>
  );
}
