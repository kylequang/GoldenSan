import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState,  useEffect } from 'react'
import { List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {  getQueryCollection, getUidUser } from '../../../service/getData';
import { formatPrice } from '../../../service/formatCode';

export default function ListOrder() {

    const [selectedId, setSelectedId] = useState(null);
    const [listOrder, setListOrder] = useState([]); // list order of client
    useEffect(async () => {
        const uid_client = await getUidUser();
        const dataOrder = await getQueryCollection('order', uid_client);
        setListOrder(dataOrder)
    }, [])
    const renderItem = ({ item }) => {
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
                                item.bookService.map((item, index) => (
                                    <Text key={index} style={styles.textOrder}>{item.nameService}</Text>
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
                    listOrder && <FlatList data={listOrder} renderItem={renderItem}
                        keyExtractor={item => item.time} />
                }
            </List.Section>
        </ScrollView>
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