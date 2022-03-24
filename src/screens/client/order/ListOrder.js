import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAnDocument, getRealtimeQueryACollection, getUidUser } from '../../../service/getData';
import { formatPrice } from '../../../service/formatCode';
import ActivityIndicatorLoading from '../../../components/animation/ActivityIndicatorLoading';
import { deleteDocument } from '../../../service/deleteData';
import { pushData, schedulePushNotification } from '../../../service/pushData';
import {  updateNotification } from '../../../service/updateData';
import Nodata from '../../../components/Nodata/Nodata';

import Moment from 'moment';

export default function ListOrder() {
    
        console.log(Moment('2022/3/24 10:23').fromNow())
        
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [listOrder, setListOrder] = useState([]); // list order of client

    useEffect(async () => {
        const uid = await getUidUser();
        getRealtimeQueryACollection(setData, 'order', 'uid_client', uid);
        setLoading(false)
    }, [])
    function setData(data) {
        setListOrder(data);
    }


    const CancelOrder = async (item) => {
        const uid = await getUidUser();
        await pushData('orderCancel', item); // push to cancel order
        await deleteDocument('order', item.id);// delete from list order;
        getRealtimeQueryACollection(setData, 'order', 'uid_client', uid);
        await schedulePushNotification('HelpHouse thông báo', 'Quý khách đã hủy đơn hàng thành công!');
        const notificationOfUser = await getAnDocument('notification', uid);
        const notificationArray = notificationOfUser.notification;
        notificationArray.unshift({
            title: 'HelpHouse thông báo',
            body: 'Quý khách đã hủy đơn hàng thành công!'
        })
        await updateNotification('notification', uid, notificationArray)
    }





    const renderItem = ({ item }) => {
        const expanded = item.id == selectedId ? true : false;
        return (
            <List.Accordion
                key={item.id}
                title={item.order.informationClient.name}
                description={
                    item.order.informationClient.sdt + '    ' + item.order.status
                }
                titleNumberOfLines={15}
                left={() =>
                    <Image style={styles.avatar}
                        source={{ uri: item.order.informationClient.photoURL }} />}
                expanded={expanded}
                onPress={() => { selectedId ? setSelectedId(null) : setSelectedId(item.id) }}>
                <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontSize: 18 }}>Thời Gian Sửa Chữa</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}> {item.order.time + ' ' + item.order.date}</Text>
                    
                    <Text>Tổng: {formatPrice(item.order.totalPrice)} vnđ</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', marginBottom: 2, marginTop: 2 }}>
                        <MaterialCommunityIcons name='credit-card' size={25} color='#ffa366' />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 18 }}>Thông tin cá nhân </Text>
                            <Text style={styles.textOrder}>Tuổi: {item.order.informationClient.age}</Text>
                            <Text>Giới tính: {item.order.informationClient.sex}</Text>
                            <Text style={styles.textOrder}>SDT: {item.order.informationClient.sdt}</Text>
                            <Text style={styles.textOrder}>Địa chỉ: {item.order.address}</Text>
                            <Text style={styles.textOrder}>Khoảng cách: {item.order.distance} km</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom: 2, marginTop: 2 }}>
                        <MaterialCommunityIcons name='credit-card' size={25} color='#ffa366' />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={{ fontSize: 18 }}>Thông tin Thợ </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={styles.avatar}
                                    source={{ uri: item.order.informationRepairmen.photoURL }} />
                                <View style={{ marginLeft: 5 }}>
                                    <Text>{item.order.informationRepairmen.name}</Text>
                                    <Text style={styles.textOrder}>{item.order.informationRepairmen.age} tuổi</Text>
                                    <Text>Giới tính: {item.order.informationRepairmen.sex}</Text>
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
                        </View>
                    </View>
                    <Text>Ngày đặt: {item.order.createDay}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => CancelOrder(item)} >
                        <Text style={{ color: 'white' }}>Hủy Đơn</Text>
                    </TouchableOpacity>
                </View>
            </List.Accordion>
        )
    }
    if (loading) return <ActivityIndicatorLoading color="Blue" />
    return (
        <ScrollView>
            <List.Section>
                {
                    listOrder.length != 0 ?
                        <FlatList data={listOrder} renderItem={renderItem} keyExtractor={item => item.time} />
                        : <Nodata content="Không có đơn hàng" />
                }
            </List.Section>
        </ScrollView>
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