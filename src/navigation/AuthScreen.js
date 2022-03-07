import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/auth/LoginScreen';
import BottomTab from './client/BottomTab';
import BottomRepairmen from './repairmen/BottomRepairmen';

const Stack = createNativeStackNavigator();

export default function AuthScreen() {
    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}