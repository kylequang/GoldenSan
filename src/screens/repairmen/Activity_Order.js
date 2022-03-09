import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListOrder from './ListOrder';
import { SafeAreaView } from 'react-native-safe-area-context';


const activeTab = createMaterialTopTabNavigator();

function HistoryOrder() {
  return (
    <View>
      <Text>Lịch Sử Đơn Hàng</Text>
    </View>
  )
}
function FixingOrder() {
  return (
    <View>
      <Text>Đơn hàng đang Sửa chữa</Text>
    </View>
  )
}
function Cancel() {
  return (
    <View>
      <Text>Đơn hàng bị hủy</Text>
    </View>
  )
}
export default function Activity_Order() {
  return (
    <SafeAreaView style={{flex:1}}>
      <activeTab.Navigator style={{ marginTop: 20 }}
        initialRouteName='Đơn Hàng'
        screenOptions={{
          // lazy: true,
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: 13 },
          tabBarItemStyle: { width: 100 },
        }}
      >
        <activeTab.Screen name='Đơn Hàng' component={ListOrder} />
        <activeTab.Screen name='Đang Sữa' component={FixingOrder} />
        <activeTab.Screen name='Đã Hủy' component={Cancel} />
        <activeTab.Screen name='Lịch Sử' component={HistoryOrder} />
        <activeTab.Screen name='Lịch Sử1' component={HistoryOrder} />
        <activeTab.Screen name='Lịch Sử2' component={HistoryOrder} />
        <activeTab.Screen name='Lịch Sử3' component={HistoryOrder} />
        <activeTab.Screen name='Lịch Sử4' component={HistoryOrder} />
      </activeTab.Navigator>
    </SafeAreaView>
  )
}