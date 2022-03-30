import React, { useState, useEffect } from 'react';
import { LogBox } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import IndexRepairmen from '../../screens/repairmen/IndexRepairmen';
import Activity_Order from '../../screens/repairmen/Activity_Order';
import MapRepairmen from '../../screens/repairmen/MapRepairmen';
import NotificationApp from '../../screens/repairmen/NotificationApp';
import Profile from '../../screens/repairmen/Profile';
import Loading from '../../components/animation/Loading';
import { getCurrentUser, getUidUser,getAnDocument } from '../../service/getData';
const Tab = createBottomTabNavigator();

export default function BottomRepairmen() {
    const [dataUser, setDataUser] = useState({});
    const [listWork, setListWork] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(async () => {
        LogBox.ignoreLogs(['Setting a timer']);
        const data = await getCurrentUser('repairmen');
        const uid = await getUidUser();
        const getListWork = await getAnDocument('listWork', uid)
        setDataUser(data);
        setListWork(getListWork);
        setTimeout(() => {
            console.log(dataUser);
            if (dataUser!=null) {
                console.log(dataUser);
                setLoading(false)
            }
        }, 4000)

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
                    else if (route.name === 'Hồ Sơ')
                        iconName = focused ? 'account' : 'account';
                    else if (route.name === 'Hoạt Động')
                        iconName = focused ? 'clock' : 'clock';
                    else if (route.name === 'Bản Đồ')
                        iconName = focused ? 'map-marker' : 'map-marker';
                    else if (route.name === 'Thông Báo')
                        iconName = focused ? 'bell' : 'bell';
                    return (
                        <MaterialCommunityIcons name={iconName} size={25} color={color} />
                    );
                },
                tabBarActiveTintColor: '#ff6600',
                tabBarInactiveTintColor: 'gray',
                headerTitleAlign: 'center',
                tabBarLabelStyle: {
                    marginBottom: 2,
                    fontSize: 13
                }
            })}
        >
            <Tab.Screen name="Trang Chủ" component={IndexRepairmen} initialParams={{ dataUser: dataUser, listWork: listWork }} />
            <Tab.Screen name="Hoạt Động" component={Activity_Order} />
            <Tab.Screen name='Thông Báo' component={NotificationApp} />
            <Tab.Screen name='Bản Đồ' component={MapRepairmen} />
            <Tab.Screen name="Hồ Sơ" component={Profile} />
        </Tab.Navigator>
    );
}