import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '../../components/animation/Loading';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DataTable } from 'react-native-paper';
const TabDetailRepairmen = createMaterialTopTabNavigator();

function IntroduceRepairmen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Giới thiệu!</Text>
        </View>
    )
}

const listWork = [
    {
        id: 1,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    },
    {
        id: 2,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 3,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 4,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 5,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 6,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 7,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 8,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 9,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }, {
        id: 10,
        service: 'Thay Bóng Đèn',
        price: 150000,
        insurance: 1,
        isChecked: false
    }
]
function ServiceTable() {
    const renderListWork = ({ item }) => (
        <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.service}</DataTable.Cell>
            <DataTable.Cell numeric>{item.price}</DataTable.Cell>
            <DataTable.Cell numeric>{item.insurance}</DataTable.Cell>
        </DataTable.Row>
    )
    return (
        <DataTable>
            <DataTable.Header >
                <DataTable.Title >
                    <Text style={styles.titleTable} >Dịch vụ</Text>
                </DataTable.Title>
                <DataTable.Title numeric>
                    <Text style={styles.titleTable}>
                        Chi phí/h
                    </Text>
                </DataTable.Title>
                <DataTable.Title numeric>
                    <Text style={styles.titleTable} >Bảo hành</Text>
                </DataTable.Title>
            </DataTable.Header>
            <FlatList
                data={listWork}
                renderItem={renderListWork}
                keyExtractor={item => item.id}
            />
        </DataTable>


    )
}

export default function DetailRepairmen({ navigation, route }) {
    const [repairman, setRepairman] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setRepairman(route.params.item);
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    },[])

    if (loading) return <Loading />
    return (
        <>
            <View style={styles.row}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Image style={styles.img} source={{uri:repairman.avatarURL}} />
                        <View style={[styles.row, { position: 'absolute', bottom: 0, left: 30 }]}>
                            <Text style={{ fontSize: 25 }}>{repairman.totalScoreAVG}</Text>
                            <FontAwesome name="star" size={20} color={"#ffcc00"} />
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.textInfo}>Độ tuổi: {repairman.age}</Text>
                        <Text style={styles.textInfo}>Giới tính:  {repairman.sex}</Text>
                        <Text style={styles.textInfo}>Lượt đánh giá:  {repairman.totalUserFeedBack}</Text>
                        <Text style={styles.textInfo}>Đã sửa chữa: 15</Text>
                    </View>
                </View>
            </View>
            <View style={styles.sliderTag}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {repairman.tag.map((item, id) => {
                        return (
                            <View key={id} style={styles.scrollTag}>
                                <Text style={{ fontSize: 15 }}>{item}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 5 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('bookOrder', { name: "Đặt Lịch Sữa Chữa" })
                    }}
                >
                    <Text style={{ fontSize: 18 }}>Đặt Lịch</Text>
                </TouchableOpacity>
            </View>
            <TabDetailRepairmen.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
                    tabBarStyle: { backgroundColor: 'white' },
                }}>
                <TabDetailRepairmen.Screen name="Bảng giá" component={ServiceTable} />
                <TabDetailRepairmen.Screen name="Giới thiệu" component={IntroduceRepairmen} />
            </TabDetailRepairmen.Navigator>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#ff9933",
        padding: 10,
        margin: 5,
        borderRadius: 10,
        width: '50%',
    },
    sliderTag: {
        height: 50,
        borderRadius: 50,
        margin: 5
    },
    scrollTag: {
        marginTop: 2,
        justifyContent: 'center',
        padding: 10,
        margin: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    row: {
        flexDirection: 'row',
    },
    header: {
        backgroundColor: '#ff9933',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 150,
        marginBottom: 5
    },
    avatar: {
        width: '50%',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative'
    },
    info: {
        width: '50%',
    },
    textInfo: {
        fontSize: 17,
        fontWeight: '100',
        marginBottom: 2,
        padding: 2,
        color: 'black',
    },
    img: {
        height: 130,
        width: '100%',
        resizeMode: 'contain',
    },
    titleTable: {
        fontSize: 16,
        color: 'black',
    }

})