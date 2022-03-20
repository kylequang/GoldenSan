import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect } from 'react';
import { getCurrentUser } from '../../service/getData';
import { formatPrice, formatDate } from '../../service/formatCode';
import { DataTable } from 'react-native-paper';



export default function BookOrder({ navigation, route }) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const [selectWork, setSelectWork] = useState(route.params.listWork.listWork.map(obj => ({ ...obj, isChecked: false })))

    const [bookService, setBookService] = useState([]);

    useEffect(() => {
        getCurrentUser();
        selectWork.map(obj => ({ ...obj, isChecked: false }))
    }, [])


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
        <DataTable.Row key={id} style={{  flexDirection: 'row', alignItems: 'center' }}>
            <Checkbox
                status={item.isChecked ? 'checked' : 'unchecked'}
                onPress={() => {
                    handleChange(item.id);
                }}
            />
            <DataTable.Cell style={{flex:2}}><Text>{item.nameService}</Text></DataTable.Cell>
            <DataTable.Cell numeric>{formatPrice(item.price)}/h</DataTable.Cell>
        </DataTable.Row>
    )

    return (
        <ScrollView style={styles.container}>
            <Text style={{ fontSize: 18, marginBottom: 10, marginTop: 10 }}>THÔNG TIN LIÊN HỆ</Text>
            <View style={styles.contact}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ marginBottom: 5 }}>{route.params.repairmen.name}</Text>
                    <Text>Thay đổi</Text>
                </View>
                <Text style={{ marginBottom: 5 }}>SDT: {route.params.repairmen.phoneNumber}</Text>
                <Text style={{ marginBottom: 5 }}>Địa Chỉ: 101B Lê Hữu Trác, Phước Mỹ, Sơn Trà</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, marginBottom: 10, marginTop: 5 }}>CHỌN THỜI GIAN:</Text>
                <TouchableOpacity onPress={showDatePicker} style={styles.button}>
                    <Text style={{ fontSize: 18 }}>
                        {formatDate(date, time)}
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
                <Text>Phương thức thanh toán: Tiền Mặt</Text>
            </View>
            <View style={{
                width: '80%',
                height: 40,
                marginLeft: '10%',
                marginRight: '10%',

            }}>
                <TouchableOpacity style={{
                    backgroundColor: '#ff8000',
                    width: '100%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,

                }}
                    disabled={totalPrice == 0}
                    onPress={() => {
                        alert("Đặt Hàng")
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        color: 'white', fontWeight: 'bold'
                    }}>{formatPrice(totalPrice)} XÁC NHẬN</Text>
                    {console.log('Danh sách lựa chọn dịch vụ: ', bookService)}
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
        backgroundColor: 'yellow'
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
    listWork: {
        marginTop: 10,
        marginBottom: 20,
        height: 380
    }
})