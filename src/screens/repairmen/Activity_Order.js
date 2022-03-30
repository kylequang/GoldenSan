import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { SafeAreaView } from 'react-native-safe-area-context';

import ListOrder from './order/ListOrder';
import WaitingDo from './order/WaitingDo';
import OrderSuccess from './order/OrderSuccess';
import CancelOrder from './order/CancelOrder';
import DoingOrder from './order/DoingOrder';

const OrderTab = createMaterialTopTabNavigator();

export default function Activity_Order() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OrderTab.Navigator style={{ marginTop: 20 }}
        initialRouteName='Chờ Xác Nhận'
        //initialRouteName='Chờ Sửa'
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#ff944d' },
        }}
      >
        <OrderTab.Screen name='Chờ Xác Nhận' component={ListOrder} />
        <OrderTab.Screen name='Chờ Sửa' component={WaitingDo} />
        <OrderTab.Screen name='Đang Sửa' component={DoingOrder} />
        <OrderTab.Screen name='Thành Công' component={OrderSuccess} />
        <OrderTab.Screen name='Bị Hủy' component={CancelOrder} />
      </OrderTab.Navigator>
    </SafeAreaView>
  )
}