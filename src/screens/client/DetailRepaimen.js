import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Table, Row, Rows } from 'react-native-table-component';
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '../../components/animation/Loading';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const TabDetailRepairmen = createMaterialTopTabNavigator();

function IntroduceRepairmen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Giới thiệu!</Text>
        </View>
    )
}

function ServiceTable() {
    const titleTable = ["Dịch Vụ", "Chi Phí/h", "Bảo Hành"];
    const data = [
        ['Sữa Điện', 1, 1],
        ['Sữa Sửa Lò Vi Sóng', 1, 1],
        ['Sữa Điện', 1, 1],
        ['Sữa Điện', 1, 1],
        ['Sữa Điện', 1, 1],
        ['Sữa Điện', 1, 1],
        ['Sữa Điện', 1, 1],
        ['Sữa Điện', 1, 1],
        ['Sữa Điện', 1, 1],
    ]
    return (

        <ScrollView style={{ flex: 1, padding: 10 }}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }} >
                <Row data={titleTable}  textStyle={{ textAlign: 'center' }}/>
                <Rows data={data} />
            </Table>
        </ScrollView>
    )
}

export default function DetailRepaimen({ navigation, route }) {
    const [repairman, setRepairman] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setRepairman(route.params.item);
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })

    if (loading) return <Loading />
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.header}>
                        <View style={styles.avatar}>
                            <Image style={styles.img} source={repairman.image} />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textInfo}>Độ tuổi: {repairman.age}</Text>
                            <Text style={styles.textInfo}>Giới tính:  {repairman.sex}</Text>
                            <Text style={styles.textInfo}>Lượt đánh giá:  {repairman.countFeedBack}</Text>
                            <Text style={styles.textInfo}>Đã sửa chữa: 15</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{repairman.name}</Text>
                        <Text style={{ fontSize: 25, marginLeft: 10 }}>{repairman.feedBack}</Text>
                        <FontAwesome name="star" size={20} color={"#ffcc00"} />
                    </View>
                    <Text style={{ fontSize: 18 }}>{repairman.address}</Text>
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
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={{ fontSize: 15 }}>Đặt Lịch</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <TabDetailRepairmen.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 18, fontWeight: '600' },
                    tabBarStyle: { backgroundColor: 'white' },
                }}>
                <TabDetailRepairmen.Screen name="Giới thiệu" component={IntroduceRepairmen} />
                <TabDetailRepairmen.Screen name="Bảng giá" component={ServiceTable} />
            </TabDetailRepairmen.Navigator>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#ff9933",
        padding: 10,
        margin: 5,
        borderRadius: 100
    },
    sliderTag: {
        height: 50,
        borderRadius: 50,
    },
    scrollTag: {
        marginTop: 2,
        justifyContent: 'center',
        padding: 10,
        margin: 3,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    row: {
        flexDirection: 'row'
    },
    header: {
        backgroundColor: '#ff9933',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 150,
        borderBottomLeftRadius: 100,
        borderTopRightRadius: 100,
        marginBottom: 20
    },
    avatar: {
        width: '50%',
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
    card: {
        backgroundColor: '#ff9933',
        width: '80%',
        alignItems: 'center',
        padding: 5,
        borderRadius: 15,
        marginBottom: 10
    },
    contact: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 150,
        height: 70,
        width: 70
    }
})