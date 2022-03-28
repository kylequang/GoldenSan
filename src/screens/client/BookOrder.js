import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { Checkbox } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import { formatPrice, formatDate, formatTime, formatDateTime } from '../../service/formatCode';
import { DataTable } from 'react-native-paper';
import { schedulePushNotification, pushData } from '../../service/pushData';
import { getUidUser, getAnDocument } from '../../service/getData';
import { updateNotification } from '../../service/updateData';
const GOOGLE_MAPS_API_KEY = 'AIzaSyBJFNgQI0m6N6_R0azIqc0UBeEld9zS634';

export default function BookOrder({ navigation, route }) {
    const [totalPrice, setTotalPrice] = useState(route.params.distance > 2 ? (5000 * (route.params.distance - 2)) : 0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectWork, setSelectWork] = useState(route.params.listWork.listWork.map(obj => ({ ...obj, isChecked: false })))
    const [bookService, setBookService] = useState([]);
    const [detailLocation, setDetailLocation] = useState();

    useEffect(() => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + route.params.location.coords.latitude + ',' + route.params.location.coords.longitude + '&key=' + GOOGLE_MAPS_API_KEY)
            .then((response) =>
                response.json()
            )
            .then((responseJson) => {
                console.log(responseJson.results[0].formatted_address);
                setDetailLocation(responseJson.results[0].formatted_address)
            });
    }, [])

    const handleBookOrder = async () => {
        const data = {
            uid_client: route.params.dataUser.uid,
            uid_repairmen: route.params.repairmen.uid,
            informationClient: {
                name: route.params.dataUser.name,
                sdt: route.params.dataUser.phoneNumber,
                age: route.params.dataUser.age,
                sex: route.params.dataUser.sex,
                photoURL: route.params.dataUser.photoURL
            },
            informationRepairmen: {
                name: route.params.repairmen.name,
                sdt: route.params.repairmen.phoneNumber,
                age: route.params.repairmen.age,
                job: route.params.repairmen.job,
                sex: route.params.repairmen.sex,
                photoURL: route.params.repairmen.photoURL
            },
            toAddress: {
                latitude: route.params.location.coords.latitude,
                longitude: route.params.location.coords.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.042
            },
            locationRepairmen: {
                latitude: route.params.repairmen.detailLocation.latitude,
                longitude: route.params.repairmen.detailLocation.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.042
            },
            shipPrice: route.params.distance > 2 ? (5000 * (route.params.distance - 2)) : 0,
            address: detailLocation,
            distance: route.params.distance,
            date: formatDate(date),
            time: formatTime(time),
            createDay: formatDateTime(new Date(), new Date()),
            totalPrice: totalPrice,
            bookService: bookService,
            status: 'Đang chờ'
        }
        await pushData('order', data);
        await schedulePushNotification('HelpHouse thông báo', 'Quý khách đã đặt lịch thành công ! Xin vui lòng kiểm tra trong đơn hàng của bạn')
        const uid = await getUidUser();
        const notificationOfUser = await getAnDocument('notification', uid);
        const notificationArray = notificationOfUser.notification;
        notificationArray.unshift({
            title: 'HelpHouse thông báo',
            body: 'Quý khách đã đặt lịch thành công ! Xin vui lòng kiểm tra trong đơn hàng của bạn!',
            time: new Date()
        })
        await updateNotification('notification', uid, notificationArray)
        navigation.navigate('Trang Chủ');
    }

    const onChange = (event, selectedValue) => {
        setShow(Platform.OS === 'ios');
        if (mode == 'date') {
            const currentDate = selectedValue || new Date();
            setDate(currentDate);
            setMode('time');
            setShow(Platform.OS !== 'ios'); // to show time
        } else {
            const selectedTime = selectedValue || new Date();
            setTime(selectedTime);
            setShow(Platform.OS === 'ios'); // to hide back the picker
            setMode('date'); // defaulting to date for next open
        }
    };
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatePicker = () => {
        showMode('date');
    };
    const handleChange = (id) => {
        let temp = selectWork.map((work) => {
            if (id === work.id) {
                if (work.isChecked == false) {
                    setTotalPrice(totalPrice + work.price)
                    setBookService([...bookService, work])
                }
                else {
                    bookService.map((temp) => {
                        if (temp.id === work.id) {
                            setTotalPrice(totalPrice - temp.price)
                            setBookService((bookService) => bookService.filter(item => item.id !== work.id));
                        }
                    }
                    )
                }
                return { ...work, isChecked: !work.isChecked };
            }
            return work;
        });
        setSelectWork(temp);
    }
    const renderListWork = ({ item }) => (
        <DataTable.Row key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
                status={item.isChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                    handleChange(item.id);
                }}
            />
            <DataTable.Cell style={{ flex: 2 }}><Text>{item.nameService}</Text></DataTable.Cell>
            <DataTable.Cell numeric>{formatPrice(item.price)}đ</DataTable.Cell>
        </DataTable.Row>
    )
    return (
        <ScrollView style={styles.container}>

            <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 10 }}>THÔNG TIN LIÊN HỆ CỦA BẠN</Text>
            <View style={styles.contact}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginBottom: 5 }}>{route.params.dataUser.name}</Text>
                    <Text>Thay đổi</Text>
                </View>
                <Text style={{ marginBottom: 5 }}>SDT: {route.params.dataUser.phoneNumber}</Text>
                <Text style={{ marginBottom: 5 }}>Địa Chỉ: {detailLocation}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, marginBottom: 10, marginTop: 5 }}>CHỌN THỜI GIAN:</Text>
                <TouchableOpacity onPress={showDatePicker} style={styles.button}>
                    <Text style={{ fontSize: 18 }}>
                        {formatDateTime(date, time)}
                    </Text>
                </TouchableOpacity>
            </View>
            {show && (
                <DateTimePicker
                    value={date}
                    minimumDate={Date.parse(new Date())}
                    display='default'
                    mode={mode}
                    onChange={onChange}
                />
            )}
            <View style={styles.listWork}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>LỰA CHỌN DỊCH VỤ</Text>
                <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell>Dịch Vụ</DataTable.Cell>
                        <DataTable.Cell numeric>Chi Phí</DataTable.Cell>
                    </DataTable.Row>
                    <FlatList
                        data={selectWork}
                        renderItem={renderListWork}
                        keyExtractor={item => item.id} />
                </DataTable>
                {
                    route.params.distance > 2 ?
                        (<Text style={{ fontSize: 15, fontWeight: '900' }}>Phí dịch vụ ({route.params.distance}km): {formatPrice(5000 * (route.params.distance - 2))} đ</Text>)
                        : (<Text>Phí dịch vụ ({route.params.distance}km): 0đ</Text>)
                }
                <Text style={{ marginBottom: 30, marginTop: 10 }}>Phương thức thanh toán: Tiền Mặt</Text>
            </View>
            <View style={{
                flex: 1, backgroundColor: 'red', flexDirection: 'row', marginVertical: 30, alignItems: 'center',
                marginVertical: 8,
                padding: 5,
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 15,
            }}>
                <Image
                    style={{
                        width: 90,
                        height: 90,
                    }}
                    source={{ uri: route.params.repairmen.photoURL }}
                />
                <View style={{
                    width: '40%',
                    marginLeft: 5
                }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{route.params.repairmen.name}
                        <Text> {route.params.repairmen.age}</Text></Text>
                    <Text >{route.params.repairmen.phoneNumber}</Text>
                    <Text style={{ marginTop: 5 }}>Thợ {route.params.repairmen.job}</Text>
                </View>
                <View style={{
                    paddingLeft: 2,
                    marginLeft: 5,
                    width: '30%',
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20 }}>{route.params.repairmen.totalAVG} </Text>
                        <FontAwesome name="star" size={20} color={"#ffcc00"} />
                        <Text>  ({route.params.repairmen.totalCount})</Text>
                    </View>
                    <Text style={{ marginTop: 30 }}>{route.params.repairmen.sex}</Text>
                </View>
            </View>
            <View style={{
                width: '80%',
                height: 40,
                marginLeft: '10%',
                marginRight: '10%',
                marginBottom: '10%'
            }}>
                <TouchableOpacity style={[styles.btnOrder, bookService.length == 0 ? { backgroundColor: 'gray' } : { backgroundColor: '#ff8000' }]}

                    disabled={bookService.length == 0}
                    onPress={handleBookOrder}
                >
                    <Text style={{
                        fontSize: 18,
                        color: 'white', fontWeight: 'bold'
                    }}>{formatPrice(totalPrice)} XÁC NHẬN</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    contact: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#33cc33',
    },
    button: {
        width: '50%',
        marginLeft: 10,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1
    },
    btnOrder: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
})