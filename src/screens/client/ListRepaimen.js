import * as React from 'react';
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

const dataListRepairmen = [
    {
        id: 1,
        age:45,
        name: 'Nguyễn Văn A',
        sex: 'Nam',
        feedBack: 4,
        countFeedBack: 2,
        star: 8,
        address: 'Sơn Trà, Đà Nẵng',
        active: true,
        image: require('../../../assets/image/avatar/avatar1.png'),
        distance: 3,
        active:true,
        tag:[
            "Điều Hòa",
            "Tủ Lạnh",
            "Lò Vi Sóng",
            "Máy Sưởi",
            "Lắp Đặt Bóng Đèn",
            "Lắp Đặt Cấu Trúc Điện",
            "Biến Áp"
        ]
    }, {
        id: 2,
        name: 'Nguyễn Văn B',
        age:45,
        sex: 'Nam',
        feedBack: 4,
        countFeedBack: 2,
        star: 8,
        address: 'Sơn Trà, Đà Nẵng',
        active: true,
        image: require('../../../assets/image/avatar/avatar1.png'),
        distance: 3,
        active:true,
        tag:[
            "Điều Hòa",
            "Tủ Lạnh",
            "Lò Vi Sóng",
            "Máy Sưởi",
            "Lắp Đặt Bóng Đèn",
            "Lắp Đặt Cấu Trúc Điện",
            "Biến Áp"
        ]
    }, {
        id: 3,
        name: 'Nguyễn Văn C',
        age:45,
        sex: 'Nam',
        feedBack: 4,
        countFeedBack: 2,
        star: 8,
        address: 'Sơn Trà, Đà Nẵng',
        active: true,
        image: require('../../../assets/image/avatar/avatar1.png'),
        distance: 3,
        active:true,
        tag:[
            "Điều Hòa",
            "Tủ Lạnh",
            "Lò Vi Sóng",
            "Máy Sưởi",
            "Lắp Đặt Bóng Đèn",
            "Lắp Đặt Cấu Trúc Điện",
            "Biến Áp"
        ]
    }, {
        id: 4,
        name: 'Nguyễn Văn D',
        age:45,
        sex: 'Nam',
        feedBack: 4,
        countFeedBack: 2,
        star: 8,
        address: 'Sơn Trà, Đà Nẵng',
        active: true,
        image: require('../../../assets/image/avatar/avatar1.png'),
        distance: 3,
        active:true,
        tag:[
            "Điều Hòa",
            "Tủ Lạnh",
            "Lò Vi Sóng",
            "Máy Sưởi",
            "Lắp Đặt Bóng Đèn",
            "Lắp Đặt Cấu Trúc Điện",
            "Biến Áp"
        ]
    }
]

function NearAddress({ navigation }) {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('detailRepaimen', { item, name: item.name })}
        >
            <Image
                style={styles.img}
                source={item.image}
            />
            <View style={styles.profile}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{item.name}</Text>
                <Text >{item.address}</Text>
                <Text style={{ marginTop: 5 }}>Khoảng cách: {item.distance} Km</Text>
            </View>
            <View style={styles.profile}>
                <View style={styles.row}>
                    <Text style={{ fontSize: 20 }}>{item.feedBack} </Text>
                    <FontAwesome name="star" size={20} color={"#ffcc00"} />
                </View>
                <Text style={{marginTop:30}}>{item.sex}</Text>
            </View>
        </TouchableOpacity>
    )
    return (
        <View style={styles.container}>
            <FlatList
                data={dataListRepairmen}
                numColumns={1}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

function Favorite() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Ưa chuộng!</Text>
        </View>
    );
}
export default function ListRepaimen() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: 'white' },
            }}>
            <Tab.Screen name="Gần Bạn"
                initialRouteName="Gần Bạn"
                component={NearAddress}
            />
            <Tab.Screen name="Ưa Chuộng" component={Favorite} />
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
        backgroundColor: '#f2f2f2',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 100,
        height: 110,
        resizeMode: 'contain',
    },
    button: {
        alignItems: 'center',
        marginBottom: 8,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    profile: {
        marginLeft: '6%',
      
    },
    text: {
        marginBottom: 2
    }
})