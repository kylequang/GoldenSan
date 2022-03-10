import { View, Text, Dimensions, } from 'react-native'
import React, { useState, useRef } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListOrder from './ListOrder';
import { SafeAreaView } from 'react-native-safe-area-context';

import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';

const activeTab = createMaterialTopTabNavigator();
const GOOGLE_MAPS_APIKEY = 'AIzaSyADmgzD_ESR2S1ZZ3ShM6cmbB9X55UUuT0';

function HistoryOrder() {
  return (
    <View>
      <Text>Lịch Sử Đơn Hàng</Text>
    </View>
  )
}
function FixingOrder() {

  const [location, setLocation] = useState({
    pickupCords: {
      latitude: 16.059809822553397,
      longitude: 108.24354026119771,
      latitudeDelta: 0.0042,
      longitudeDelta: 0.0421
    },
    dropLocationCords: {
      latitude: 16.059070171942114,
      longitude: 108.24175335124662,
      latitudeDelta: 0.0042,
      longitudeDelta: 0.0421
    },
    test1: {
      latitude: 16.051921522645138,
      longitude: 108.23802557056426,
      latitudeDelta: 0.0042,
      longitudeDelta: 0.0421
    },
    test2: {
      latitude: 16.0484728028824,
      longitude: 108.22690889265418,
      latitudeDelta: 0.0042,
      longitudeDelta: 0.0421
    }
  })

  const mapRef = useRef()
  const { pickupCords, dropLocationCords, test1, test2 } = location;
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);

  return (
    <View style={{
      flex: 1
    }}>
      <View>
        <MapView initialRegion={pickupCords} ref={mapRef} style={{
          width: Dimensions.get("window").width,
          height: 500
        }}
          showsUserLocation={true}

          showsTraffic={true}
          // mapType='mutedStandard'
          userLocationUpdateInterval={5000}
        >
          <Marker coordinate={pickupCords} pinColor="green" draggable={true} >
            <Callout>
              <Text>Bạn</Text>
            </Callout>
          </Marker>

          {/* <Marker coordinate={dropLocationCords} /> */}
          <Marker coordinate={test2} />
          <MapViewDirections
            mode="DRIVING"
            origin={pickupCords}

            precision='high'
            // destination={dropLocationCords}
            destination={test2}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={7}
            strokeColor="blue"
            optimizeWaypoints={true}

            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              setDistance(result.distance);
              setTime(result.duration);
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              mapRef.current.fitToCoordinates(result.coordinate, {
                edgePadding: {
                  right: 5,
                  left: 5,
                  bottom: 10,
                  top: 10
                }
              })
            }
            }
          />
          <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
            {distance ? <View><Text>Quãng Đường: {distance} km</Text></View> : <View><Text>Không có</Text></View>}

          </View>
          <View style={{ position: 'absolute', bottom: 20, right: 0 }}>
            {time ? <View><Text>Thời Gian Dự Kiến: {time} min</Text></View> : <View><Text>Không có</Text></View>}
          </View>
        </MapView>
      </View>

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
    <SafeAreaView style={{ flex: 1 }}>
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