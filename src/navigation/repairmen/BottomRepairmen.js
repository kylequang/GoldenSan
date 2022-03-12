import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IndexRepairmen from '../../screens/repairmen/IndexRepairmen';
import Activity_Order from '../../screens/repairmen/Activity_Order';
import More from '../../screens/repairmen/More';
import Contact from '../../screens/Contact';
import Report from '../../screens/repairmen/Report';
import MapRepairmen from '../../screens/repairmen/MapRepairmen';
const Tab = createBottomTabNavigator();

export default function BottomRepairmen() {
    return (
        <Tab.Navigator
            initialRouteName="Trang Chủ"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    if (route.name === "Trang Chủ")
                        iconName = focused ? 'home' : 'home';
                    else if (route.name === 'Hồ Sơ')
                        iconName = focused ? 'cog-refresh' : 'cog-refresh';
                    else if (route.name === 'Hoạt Động')
                        iconName = focused ? 'clock' : 'clock';
                    else if (route.name === 'Liên Hệ')
                        iconName = focused ? 'phone-classic' : 'phone-classic';
                    else if (route.name === 'Báo Cáo')
                        iconName = focused ? 'chart-bar' : 'chart-bar';
                    else if (route.name === 'Bản Đồ')
                        iconName = focused ? 'map-marker' : 'map-marker';
                    return (
                        <MaterialCommunityIcons name={iconName} size={30} color={color} />
                    );
                },
                tabBarActiveTintColor: '#ff6600',
                tabBarInactiveTintColor: 'gray',
                headerTitleAlign: 'center',
                // tabBarShowLabel:false
                tabBarLabelStyle: {
                    marginBottom: 2,
                    fontSize: 12
                }
            })}
        >
            <Tab.Screen name="Trang Chủ" component={IndexRepairmen} />
            <Tab.Screen name="Hoạt Động" component={Activity_Order} />
            <Tab.Screen name="Báo Cáo" component={Report} />
            <Tab.Screen name='Liên Hệ' component={Contact} />
            <Tab.Screen name='Bản Đồ' component={MapRepairmen} />
            <Tab.Screen name="Hồ Sơ" component={More} />
        </Tab.Navigator>
    );
}