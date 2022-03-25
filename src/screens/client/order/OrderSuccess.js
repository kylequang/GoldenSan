import { View, Text, FlatList, StyleSheet, Image,} from 'react-native'
import React, { useState, useEffect } from 'react'
import { List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getUidUser } from '../../../service/getData';
import { formatPrice } from '../../../service/formatCode';
import { getRealtimeQueryACollection } from '../../../service/getData';
import ActivityIndicatorLoading from '../../../components/animation/ActivityIndicatorLoading';

export default function OrderSuccess({ navigation }) {

  const [selectedId, setSelectedId] = useState(null);
  const [listOrder, setListOrder] = useState([]); // list order of client
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const uid = await getUidUser();
      const data = getRealtimeQueryACollection(setData, 'orderSuccess', 'uid_client', uid);
      setListOrder(data)
      setLoading(false);
      console.log("Render again orderSuccess");
    });
    return unsubscribe;
  }, [navigation]);
  function setData(data) {
    setListOrder(data);
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
        <View style={{ marginBottom: 50 }}>
          <View style={{ flexDirection: 'row', marginBottom: 2, marginTop: 2 }}>
            <MaterialCommunityIcons name='credit-card' size={25} color='#ffa366' />
            <View style={{ marginLeft: 5, marginRight: 15, }}>
              <Text style={{ fontSize: 18 }}>Thông tin bản thân </Text>
              <Text style={styles.textOrder}>Giới tính: {item.order.informationClient.sex}  {item.order.informationClient.age} tuổi</Text>
              <Text style={styles.textOrder}>Địa chỉ: {item.order.address}</Text>
              <Text style={styles.textOrder}>Khoảng cách: {item.order.distance} km</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 2, marginTop: 2 }}>
            <MaterialCommunityIcons name='credit-card' size={25} color='#ffa366' />
            <View style={{ marginLeft: 5 }}>
              <Text style={{ fontSize: 18 }}>Thông tin thợ </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.avatar}
                  source={{ uri: item.order.informationRepairmen.photoURL }} />
                <View style={{ marginLeft: 5 }}>
                  <Text style={styles.textOrder}>{item.order.informationRepairmen.name} {item.order.informationRepairmen.age} tuổi</Text>
                  <Text style={styles.textOrder}>Giới tính: {item.order.informationRepairmen.sex}</Text>
                  <Text style={styles.textOrder}>SDT: {item.order.informationRepairmen.sdt}</Text>
                </View>
              </View>
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
      </List.Accordion>
    )
  }
  if (loading) return <ActivityIndicatorLoading color="blue" />
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