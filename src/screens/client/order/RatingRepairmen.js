import { AirbnbRating } from 'react-native-ratings';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getAnDocument, getUidUser } from '../../../service/getData';
import { formatPrice } from '../../../service/formatCode';
import { getRealtimeQueryACollection } from '../../../service/getData';
import { updateRatingRepairmen } from '../../../service/updateData';
import { deleteDocument } from '../../../service/deleteData';
export default function RatingRepairmen({ navigation }) {


    const [rate, setRate] = useState(4);
    const [selectedId, setSelectedId] = useState(null);
    const [listOrder, setListOrder] = useState([]); // list order of client

    useEffect(async () => {
        console.log("Render 1 lần Rating");
        const id = await getUidUser();
        const data = getRealtimeQueryACollection(setData, 'orderRating', 'uid_client', id);
        setListOrder(data);
    }, [])

    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const id = await getUidUser();
            const data = getRealtimeQueryACollection(setData, 'orderRating', 'uid_client', id);
            setListOrder(data);
        });
        return unsubscribe;
    }, [navigation]);

    function setData(data) {
        setListOrder(data);
    }

    function handleRating(rate) {
        setRate(rate);
    }

    async function finishedRate(item) {
        const uidRepairmen = await getAnDocument('repairmen', item.order.uid_repairmen)
        uidRepairmen.totalCount += 1;
        uidRepairmen.totalScore += rate;
        uidRepairmen.totalAVG = (uidRepairmen.totalScore / uidRepairmen.totalCount).toFixed(1);
        const data = {
            totalScore: uidRepairmen.totalScore,
            totalAVG: uidRepairmen.totalAVG,
            totalCount: uidRepairmen.totalCount
        };
        console.log("Điểm Đánh Giá: ", data);
        console.log("Điểm Trung Bình: ", uidRepairmen.totalAVG);
        await deleteDocument('orderRating', item.id);// delete from list order;
        await updateRatingRepairmen('repairmen', uidRepairmen.uid, data);
        navigation.navigate('Trang Chủ')
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

                    <AirbnbRating
                        count={5}
                        reviews={["Tồi tệ", "Tệ", "Ổn", "Tốt", "Rất Tốt"]}
                        defaultRating={4}
                        size={35}
                        onFinishRating={handleRating}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} >
                            <Text style={{ color: 'white' }}>Báo Cáo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => finishedRate(item)}
                            style={[styles.button, { backgroundColor: '#33cc33' }]} >
                            <Text style={{ color: 'white' }}>Xác Nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </List.Accordion>
        )
    }
    return (

        <List.Section>
            {
                listOrder && <FlatList data={listOrder} renderItem={renderItem} keyExtractor={item => item.id} />
            }
        </List.Section>

    )
}

const styles = StyleSheet.create({

    button: {
        marginVertical: 10,
        marginLeft: 50,
        height: 45,
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
        marginVertical: 5
    }
})

