import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListOrder from './order/ListOrder';
import DoingOrder from './order/DoingOrder';
import CancelOrder from './order/CancelOrder';
import OrderSuccess from './order/OrderSuccess'
import WaitingDo from './order/WaitingDo';
const OrderTab = createMaterialTopTabNavigator();

export default function Activity_Order() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OrderTab.Navigator style={{ marginTop: 20 }}
        initialRouteName='Đơn Hàng'
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#ff944d' },
        }}
      >
        <OrderTab.Screen name='Chờ Xác Nhận' component={ListOrder} />
        <OrderTab.Screen name='Chờ Sửa' component={WaitingDo} />
        <OrderTab.Screen name='Đang Sửa' component={DoingOrder} />
        <OrderTab.Screen name='Thành công' component={OrderSuccess} />
        <OrderTab.Screen name='Bị hủy' component={CancelOrder} />
      </OrderTab.Navigator>
    </SafeAreaView>
  )
}
