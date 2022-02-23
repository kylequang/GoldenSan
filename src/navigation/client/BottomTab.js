import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Index from '../../screens/client/IndexClient';
import Manage from '../../screens/client/Manage';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (
        <Tab.Navigator
            initialRouteName="Trang Chủ"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    if (route.name === "Trang Chủ")
                        iconName = focused ? 'home' : 'home';
                    else if(route.name === 'Hồ Sơ')
                    iconName = focused ? 'account' : 'account';
                    else if(route.name === 'Thông Báo')
                    iconName = focused?'ring':'ring';
                    return (
                        <MaterialCommunityIcons name={iconName} size={30} color={color} />
                    );
                },
                tabBarActiveTintColor: '#ff6600',
                tabBarInactiveTintColor: 'gray',
                headerTitleAlign: 'center',
                tabBarLabelStyle: {
                    fontSize: 15,
                },
            })}
        >
            <Tab.Screen name="Trang Chủ" component={Index} />
            <Tab.Screen name="Thông Báo" component={Index} />
            <Tab.Screen
                name="Hồ Sơ"
                component={Manage}
                options={{
                    title: 'Hồ Sơ',
                }}
            />
        </Tab.Navigator>
    );
}