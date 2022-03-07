import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RoleStack from '../../src/navigation/RoleStack';
const Stack = createNativeStackNavigator();

export default function AuthScreen() {
    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="checkRole" component={ RoleStack } options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}