import * as React from 'react';
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createMaterialTopTabNavigator();

const dataListRepaimen = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        sex: 'Nam',
        feeBack: 4,
        count: 2,
        star: 8,
        address: 'Sơn Trà, Đà Nẵng',
        active: true,
        image: require('../../../assets/image/avatar/avatar1.png')
    }, {
        id: 2,
        name: 'Nguyễn Văn B',
        sex: 'Nam',
        feeBack: 4,
        count: 2,
        star: 8,
        address: 'Sơn Trà, Đà Nẵng',
        active: true,
        image: require('../../../assets/image/avatar/avatar1.png')
    }, {
        id: 3,
        name: 'Nguyễn Văn C',
        sex: 'Nam',
        feeBack: 4,
        count: 2,
        star: 8,
        address: 'Sơn Trà, Đà Nẵng',
        active: true,
        image: require('../../../assets/image/avatar/avatar1.png')
    }, {
        id: 4,
        name: 'Nguyễn Văn D',
        sex: 'Nam',
        feeBack: 4,
        count: 2,
        star: 8,
        address: 'Sơn Trà, Đà Nẵng',
        active: true,
        image: require('../../../assets/image/avatar/avatar1.png')
    }
]

function NearAddress({ navigation }) {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('detailRepaimen',{item,name:item.name})}
        >
            <Image
                style={styles.img}
                source={item.image}
            />
            <View style={styles.profile}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 2 }}>{item.name}</Text>
                <Text >{item.address}</Text>
            </View>
            <View style={styles.profile}>
                <Text style={{ fontSize: 20, marginBottom: 7}}>{item.feeBack}
                    <FontAwesome name="star" size={20} color={"#ffcc00"} />
                </Text>
                <Text>{item.sex}</Text>
            </View>
        </TouchableOpacity>
    )
    return (
        <View style={styles.container}>
            <FlatList
                data={dataListRepaimen}
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
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    img: {
        width: 100,
        height: '110%',
        resizeMode:'contain',
    },
    button: {
        alignItems: 'center',
        marginBottom: 15,
        padding: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
    },
    profile: {
        marginLeft: '5%',
    },
})