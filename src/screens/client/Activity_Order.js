import { View, Text, Dimensions, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView,Modal,Pressable } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List } from 'react-native-paper';
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getData, getQueryCollection, getUidUser } from '../../service/getData';
import { formatPrice } from '../../service/formatCode';


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
          userLocationUpdateInterval={5000}
        >
          <Marker coordinate={pickupCords} pinColor="green" draggable={true} >
            <Callout>
              <Text>Bạn</Text>
            </Callout>
          </Marker>
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

  const [location, setLocation] = useState([
    {
      pickupCords: {
        'latitude': 16.059809822553397,
        'longitude': 108.24354026119771,
        'latitudeDelta': 0.0042,
        'longitudeDelta': 0.0421
      }
    },
    {
      pickupCords: {
        'latitude': 16.059070171942114,
        'longitude': 108.24175335124662,
        'latitudeDelta': 0.0042,
        'longitudeDelta': 0.0421
      }
    }, {
      pickupCords: {
        'latitude': 16.051921522645138,
        'longitude': 108.23802557056426,
        'latitudeDelta': 0.0042,
        'longitudeDelta': 0.0421
      }
    },
    {
      pickupCords: {
        'latitude': 16.0484728028824,
        'longitude': 108.22690889265418,
        'latitudeDelta': 0.0042,
        'longitudeDelta': 0.0421
      }
    }
  ])



  const renderLocation = ({ item }) => (
    <Marker coordinate={location[0].pickupCords} />
  )
  const mapRef = useRef()
  return (
    <View>
      <MapView initialRegion={location[0].pickupCords} ref={mapRef} style={{
        width: Dimensions.get("window").width,
        height: 500
      }}
        showsTraffic={true}
        userLocationUpdateInterval={5000}
      >

        {/* <Marker coordinate={location[0].pickupCords} />
        <Marker coordinate={location[1].pickupCords} />
        <Marker coordinate={location[2].pickupCords} />
        <Marker coordinate={location[3].pickupCords} /> */}
        {
          location.map((item, id) => (
            <Marker key={id} coordinate={item.pickupCords} image={require('../../../assets/logo/icon_map_repairmen.png')} width={8}
              height={8} />
          ))
        }

        {/* <FlatList data={location} renderItem={renderLocation} keyExtractor={item => item.time} /> */}
      </MapView>
    </View>
  )
}

const ListOrder = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [listOrder, setListOrder] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);


  useEffect(async () => {
    const uid_client = await getUidUser();
    const dataOrder = await getQueryCollection('order', uid_client);
    setListOrder(dataOrder)
  }, [])







  const RenderItem = ({ item }) => {
    const expanded = item.time == selectedId ? true : false;
    return (
      <List.Accordion
        key={item.time}
        title={item.informationClient.name}
        description={
          item.informationClient.sdt + '    ' + item.status
        }
        titleNumberOfLines={15}
        left={() =>
          <Image style={styles.avatar}
            source={{ uri: item.informationClient.photoURL }} />}
        expanded={expanded}
        onPress={() => { selectedId ? setSelectedId(null) : setSelectedId(item.time) }}>

        <View style={{ paddingVertical: 10 }}>
          <Text style={{ fontSize: 18 }}>Thời Gian Sửa Chữa</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.time + ' ' + item.date}  <Text>Tổng: {formatPrice(item.totalPrice)} vnđ</Text></Text>
        </View>



        <View>
          <View style={{ flexDirection: 'row', marginBottom: 2, marginTop: 2 }}>
            <MaterialCommunityIcons name='credit-card' size={25} color='#ffa366' />
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 18 }}>Thông tin cơ bản </Text>
              <Text style={styles.textOrder}>Tuổi: {item.informationClient.age}             <Text>Giới tính: {item.informationClient.sex}</Text></Text>
              <Text style={styles.textOrder}>SDT: {item.informationClient.sdt}</Text>
              <Text style={styles.textOrder}>Địa chỉ: 101B Lê Hữu Trác,Phước Mỹ</Text>
              <Text style={styles.textOrder}>Khoảng cách: {item.distance} km</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <MaterialCommunityIcons name='clipboard-list' size={25} color='#ffa366' />
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 18 }}>Danh sách công việc</Text>
              {
                item.bookService.map(item => (
                  <Text style={styles.textOrder}>{item.nameService}</Text>
                ))
              }
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => {
            alert("Hủy đơn")
          }}>
            <Text style={{ color: 'white' }}>Hủy Đơn</Text>
          </TouchableOpacity>
        </View>
      </List.Accordion>
    )
  }
  return (
    <ScrollView>
      <List.Section title="Lịch Đặt của Bạn ! Đơn Hàng Đang Chờ Tiếp Nhận">
        {
          listOrder && <FlatList data={listOrder} renderItem={RenderItem}
            keyExtractor={item => item.time} />
        }
      </List.Section>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}


export default function Activity_Order() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <activeTab.Navigator style={{ marginTop: 20 }}
        initialRouteName='Đơn Hàng'
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarLabelStyle: { fontSize: 13 },
          tabBarItemStyle: { width: 100 },
        }}
      >
        <activeTab.Screen name='Đơn Hàng' component={ListOrder} />
        {/* <activeTab.Screen name='Đang Sữa' component={FixingOrder} />
        <activeTab.Screen name='Đã Hủy' component={Cancel} />
        <activeTab.Screen name='Lịch Sử' component={HistoryOrder} />
        <activeTab.Screen name='Lịch Sử1' component={HistoryOrder} />
        <activeTab.Screen name='Lịch Sử2' component={HistoryOrder} />
        <activeTab.Screen name='Lịch Sử3' component={HistoryOrder} />
        <activeTab.Screen name='Lịch Sử4' component={HistoryOrder} /> */}
      </activeTab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  button: {
    marginVertical: 10,
    marginLeft: 170,
    height: 45,
    width: '30%',
    padding: 10,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'red',
  },
  avatar: {
    height: 80,
    width: 70,
    resizeMode: 'contain'
  },
  textOrder: {
    marginVertical: 5
  }
})