import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Index from '../../screens/client/IndexClient';
import Activity_Order from '../../screens/client/Activity_Order';
import Notification from '../../screens/client/Notification';
import Contact from '../../screens/Contact';
import NotificationApp from '../../screens/client/NotificationApp';
import Profile from '../../screens/client/Profile';
import Loading from '../../components/animation/Loading';
const Tab = createBottomTabNavigator();



import { getData } from '../../service/getData';
export default function BottomTab() {
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    useEffect(async () => {
        LogBox.ignoreLogs(['Setting a timer']);
        setCategory(await getData('category'));
        if (category) {
            setLoading(false)
        }
    }, [])
    if (loading) return <Loading />

    return (
        <Tab.Navigator
            initialRouteName="Trang Chủ"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    if (route.name === "Trang Chủ")
                        iconName = focused ? 'home' : 'home';
                    else if (route.name === 'Hoạt Động')
                        iconName = focused ? 'clock' : 'clock';
                    else if (route.name === 'Hồ Sơ')
                        iconName = focused ? 'account' : 'account';
                    else if (route.name === 'Thông Báo')
                        iconName = focused ? 'bell' : 'bell';

                    else if (route.name === 'Liên Hệ')
                        iconName = focused ? 'phone-classic' : 'phone-classic'
                    return (
                        <MaterialCommunityIcons name={iconName} size={25} color={color} />
                    );
                },
                tabBarActiveTintColor: '#ff6600',
                tabBarInactiveTintColor: 'gray',
                headerTitleAlign: 'center',
                tabBarLabelStyle: {
                    fontSize: 13,
                },
            })}
        >
            <Tab.Screen name="Trang Chủ" component={Index} initialParams={{ category: category }} />
            <Tab.Screen name="Hoạt Động" component={Activity_Order} />
            <Tab.Screen name="Thông Báo" component={NotificationApp} />
            <Tab.Screen name="Liên Hệ" component={Contact} />
            <Tab.Screen name="Hồ Sơ" component={Profile} />
        </Tab.Navigator>
    );
}