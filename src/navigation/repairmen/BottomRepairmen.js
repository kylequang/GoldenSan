import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IndexRepairmen from '../../screens/repairmen/IndexRepairmen';
import Activity_Order from '../../screens/repairmen/Activity_Order';
import More from '../../screens/repairmen/More';
import Contact from '../../screens/Contact';
import Report from '../../screens/repairmen/Report';
import MapRepairmen from '../../screens/repairmen/MapRepairmen';
import ScanLocation from '../../screens/repairmen/ScanLocation';
import NotificationApp from '../../screens/repairmen/NotificationApp';
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
                        iconName = focused ? 'account' : 'account';
                    else if (route.name === 'Hoạt Động')
                        iconName = focused ? 'clock' : 'clock';
                    else if (route.name === 'Bản Đồ')
                        iconName = focused ? 'map-marker' : 'map-marker';
                    else if (route.name === 'Thông Báo')
                        iconName = focused ? 'bell' : 'bell';
                    return (
                        <MaterialCommunityIcons name={iconName} size={27} color={color} />
                    );
                },
                tabBarActiveTintColor: '#ff6600',
                tabBarInactiveTintColor: 'gray',
                headerTitleAlign: 'center',
                tabBarLabelStyle: {
                    marginBottom: 2,
                    fontSize: 12
                }
            })}
        >
            <Tab.Screen name="Trang Chủ" component={IndexRepairmen} />
            <Tab.Screen name="Hoạt Động" component={Activity_Order} />
            <Tab.Screen name='Thông Báo' component={NotificationApp} />
            <Tab.Screen name='Bản Đồ' component={MapRepairmen} />
            <Tab.Screen name="Hồ Sơ" component={More} />
        </Tab.Navigator>
    );
}