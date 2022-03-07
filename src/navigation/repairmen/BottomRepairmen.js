import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IndexRepairmen from '../../screens/repairmen/IndexRepairmen';
import Activity_Order from '../../screens/repairmen/Activity_Order';

const Tab = createBottomTabNavigator();

export default function BottomRepairmen() {
    return (
        <Tab.Navigator
            initialRouteName="Home_Repairmen"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    if (route.name === "Home_Repairmen")
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
            <Tab.Screen name="Home_Repairmen" component={IndexRepairmen} />
            <Tab.Screen
                name="Activity_Order"
                component={Activity_Order}
                options={{
                    title: 'Hoạt Động',
                }}
            />
        </Tab.Navigator>
    );
}