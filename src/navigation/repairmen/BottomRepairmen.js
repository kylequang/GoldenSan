import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IndexRepairmen from '../../screens/repairmen/IndexRepairmen';
import Activity_Order from '../../screens/repairmen/Activity_Order';
import More from '../../screens/repairmen/More';

const Tab = createBottomTabNavigator();

export default function BottomRepairmen() {
    return (
        <Tab.Navigator
            initialRouteName="Home_Repairmen"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    if (route.name === "Trang Chủ")
                        iconName = focused ? 'home' : 'home';
                    else if(route.name === 'Hồ Sơ')
                    iconName = focused ? 'account' : 'account';
                    else if(route.name === 'Hoạt Động')
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
            <Tab.Screen name="Trang Chủ" component={IndexRepairmen} />
         
            <Tab.Screen
                name="Hoạt Động"
                component={Activity_Order}
                options={{
                    title: 'Hoạt Động',
                }}
            />
               <Tab.Screen name="Hồ Sơ" component={More} />
        </Tab.Navigator>
    );
}