
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAnDocument, getRealtimeQueryACollection, getUidUser } from '../../../service/getData';
import { formatPrice } from '../../../service/formatCode';
import ActivityIndicatorLoading from '../../../components/animation/ActivityIndicatorLoading';
import { deleteDocument } from '../../../service/deleteData';
import { pushData, schedulePushNotification } from '../../../service/pushData';
import { updateNotification } from '../../../service/updateData';


import call from 'react-native-phone-call';

export default function WaitingDo({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [listOrder, setListOrder] = useState([]); // list order of client
  const [getAgain, setGetAgain] = useState(false);
  const [uid, setUid] = useState();
  useEffect(async () => {
    console.log("Render list order getAgain");
    const id = await getUidUser();
    setUid(id)
    const data = getRealtimeQueryACollection(setData, 'orderWaiting', 'uid_repairmen', id);
    setListOrder(data);
    setLoading(false)
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("render again", getAgain);
      const data = getRealtimeQueryACollection(setData, 'orderWaiting', 'uid_repairmen', id);
      setListOrder(data);
      setLoading(false)
    });
    return unsubscribe;
  }, [navigation, getAgain]);

  function setData(data) {
    setListOrder(data);
  }

  const triggerCall = (phoneNumber) => {
    const args = {
      number: phoneNumber,
      prompt: true,
    };
    // Make a call
    call(args).catch(console.error);
  };
  const watchOnGoogleMap = () => {
    alert('hi')
  }

  const renderItem = ({ item }) => {
    const expanded = item.id == selectedId ? true : false;
    return (
      <List.Accordion
        key={item.id}
        title={item.order.informationClient.name}
        description={item.order.informationClient.sdt + '    ' + item.order.status + "\n" +
          "Tổng đơn hàng: " + formatPrice(item.order.totalPrice) + " vnđ"}
        titleNumberOfLines={15}
        left={() => <Image style={styles.avatar} source={{ uri: item.order.informationClient.photoURL }} />}
        expanded={expanded}
        onPress={() => { selectedId ? setSelectedId(null) : setSelectedId(item.id) }}>
        <View style={{ paddingVertical: 10 }}>
          <Text style={{ fontSize: 16 }}>Thời gian sửa chữa: {item.order.time + ' ' + item.order.date}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Tổng: {formatPrice(item.order.totalPrice)} vnđ</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', marginBottom: 2, marginTop: 2 }}>
            <MaterialCommunityIcons name='credit-card' size={25} color='#ffa366' />
            <View style={{ marginLeft: 5, marginRight: 15, }}>
              <Text style={{ fontSize: 18 }}>Thông tin người dùng </Text>
              <Text style={styles.textOrder}>Giới tính: {item.order.informationClient.sex}  {item.order.informationClient.age} tuổi</Text>
              <Text style={styles.textOrder}>Địa chỉ: {item.order.address}</Text>
              <Text style={styles.textOrder}>Khoảng cách: {item.order.distance} km</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <MaterialCommunityIcons name='clipboard-list' size={25} color='#ffa366' />
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 18 }}>Danh sách công việc</Text>
              {
                item.order.bookService.map((item, index) => (
                  <View style={{ flexDirection: 'row' }} key={index}>
                    <Text style={styles.textOrder}>{item.nameService}</Text>
                    <Text style={styles.textOrder}>---</Text>
                    <Text style={styles.textOrder}>{formatPrice(item.price)}đ</Text>
                  </View>
                ))
              }
              <Text>Phí dịch vụ ({item.order.distance}km): {formatPrice(item.order.shipPrice)}đ</Text>
            </View>
          </View>
          <Text>Ngày đặt: {item.order.createDay}</Text>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => triggerCall(item.order.informationClient.sdt)}>
            <MaterialCommunityIcons name='phone' size={30} color='#ff6600' />
          </TouchableOpacity>
          {/* <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => 
          navigation.navigate('watchOnGoogleMap',{repairmenLocation:item.order., clientLocation:item.order.toAddress})}>
            <MaterialCommunityIcons name='map-marker' size={30} color='#ff6600' />
          </TouchableOpacity> */}
          <TouchableOpacity style={[styles.button, { backgroundColor: 'green' }]} onPress={() => Confirm(item, uid)} >
            <Text style={{ color: 'white' }}>Bắt đầu </Text>
          </TouchableOpacity>
        </View>
      </List.Accordion>
    )
  }
  if (loading) return <ActivityIndicatorLoading color="Blue" />
  return (
    <List.Section>
      {
        listOrder && <FlatList data={listOrder} renderItem={renderItem} keyExtractor={item => item.time} />
      }
    </List.Section>
  )
}

const styles = StyleSheet.create({

  button: {
    marginVertical: 10,
    marginLeft: 50,
    height: 40,
    width: '30%',
    padding: 10,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 15,
  },
  avatar: {
    height: 80,
    width: 70,
    resizeMode: 'contain'
  },
  textOrder: {
    marginVertical: 5,
    marginRight: 15,
  }
})