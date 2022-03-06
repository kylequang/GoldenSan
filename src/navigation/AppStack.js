import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
const AppStacks = createStackNavigator();
export default function AppStack() {
  return (
    <NavigationContainer>
    <AppStacks.Navigator>
      <AppStacks.Screen
        name="MainApp"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
    </AppStacks.Navigator>
  </NavigationContainer>
  )
}