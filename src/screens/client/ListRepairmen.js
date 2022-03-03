import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity,LogBox } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome } from '@expo/vector-icons';

import { getDetailRepairmen } from '../../service/getData';
const Tab = createMaterialTopTabNavigator();


function NearAddress(props) {

    const [listRepairmen, setListRepairmen] = useState([]);

    useEffect(async () => {
        LogBox.ignoreLogs(['Setting a timer'])
        setListRepairmen(await getDetailRepairmen(props.role))
    },[])

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.button}
            key={item.uid}
            onPress={() => props.navigation.navigate('detailRepairmen', { item, name: item.name })}
        >
            <Image
                style={styles.img}
                source={{ uri:item.avatarURL}}
            />
            <View style={styles.profile}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{item.name}</Text>
                <Text >{item.address}</Text>
                <Text style={{ marginTop: 5 }}>Khoảng cách: {item.distance} Km</Text>
            </View>
            <View style={styles.profile}>
                <View style={styles.row}>
                    <Text style={{ fontSize: 20 }}>{item.totalScoreAVG} </Text>
                    <FontAwesome name="star" size={20} color={"#ffcc00"} />
                </View>
                <Text style={{ marginTop: 30 }}>{item.sex}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={listRepairmen}
                numColumns={1}
                renderItem={renderItem}
                keyExtractor={item => item.uid}
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
export default function ListRepairmen({navigation,route}) {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: 'white' },
            }}>
            <Tab.Screen name="Gần Bạn"
                initialRouteName="Gần Bạn"
                children={() =>  <NearAddress role={route.params.role} navigation={navigation} />}
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
        width: 90,
        height: 90,
        // resizeMode: 'contain',
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