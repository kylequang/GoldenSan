import { StyleSheet ,LogBox } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/LoginScreen';
import RepairmenLoading from './src/components/animation/RepairmenLoading';
import AuthScreen from './src/navigation/AuthScreen';
import BottomRepairmen from './src/navigation/repairmen/BottomRepairmen';


LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rememberLogin, setRememberLogin] = useState(null);

  // const getRememberLogin = async () => {
  //   const rememberLogin = await AsyncStorage.getItem('rememberLogin');
  //   setRememberLogin(rememberLogin);
  // }
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 4000)
  //   getRememberLogin();
  // }, []);
  return (
    <NavigationContainer  >
      {/* {
        loading ? (<RepairmenLoading />) : rememberLogin === null ? (<AuthScreen />) : (<RoleStack />)
      } */}
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='test' component={BottomRepairmen}/>
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