import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, LogBox, } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome } from '@expo/vector-icons';
import ScanLoadingLocation from '../../../src/components/animation/ScanLoadingLocation';
import { scanLocation } from '../../service/getData';
import SadFaceStatus from '../../components/animation/SadFaceStatus';
import * as Speech from 'expo-speech';
import FavoriteRepairmen from './FavoriteRepairmen';
const Tab = createMaterialTopTabNavigator();

function NearAddress(props) {
    const [loading, setLoading] = useState(true);
    const [listRepairmen, setListRepairmen] = useState([]);

    useEffect(async () => {
        Speech.speak("Chúng tôi đang tìm kiếm thợ sửa " + props.job + " với phạm vi 2 km gần bạn. Vui lòng đợi ");
        LogBox.ignoreLogs(['Setting a timer'])
        console.log("Tìm kiếm thợ");
        setListRepairmen(await scanLocation(props.job, 2, 0));
        setTimeout(() => {
            if (listRepairmen) {
                setLoading(false);
            }
        }, 7000);
    }, [])

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.button}
            key={item.uid}
            onPress={() => props.navigation.navigate('detailRepairmen', { item, name: item.name })}
        >
            <Image
                style={styles.img}
                source={{ uri: item.photoURL }}
            />
            <View style={styles.profileLeft}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{item.name}  <Text>{item.age}</Text></Text>
                <Text >{item.phoneNumber}</Text>
                <Text style={{ marginTop: 5 }}>Thợ {item.job}</Text>
            </View>
            <View style={styles.profileRight}>
                <View style={styles.row}>
                    <Text style={{ fontSize: 20 }}>{item.totalAVG} </Text>
                    <FontAwesome name="star" size={20} color={"#ffcc00"} />
                    <Text>  ({item.totalCount})</Text>
                </View>
                <Text style={{ marginTop: 30 }}>{item.sex}</Text>
            </View>
        </TouchableOpacity>
    )
    if (loading) return <ScanLoadingLocation />
    return (
        <View style={styles.container}>
            {
                listRepairmen.length == 0 ? <SadFaceStatus job={props.job} title="gần" /> :
                    listRepairmen && <FlatList
                        data={listRepairmen}
                        numColumns={1}
                        renderItem={renderItem}
                        keyExtractor={item => item.uid}
                    />
            }
        </View>
    );
}

export default function ListRepairmen({ navigation, route }) {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: 'white' },
            }}>
            <Tab.Screen name="Gần Bạn"
                initialRouteName="Gần Bạn"
                children={() => <NearAddress job={route.params.job} navigation={navigation} />}
            />
            <Tab.Screen name="Ưa Chuộng"
                // children={() => <FavoriteRepairmen job={route.params.job} navigation={navigation} />} 
                component={FavoriteRepairmen}
                initialParams={{ job: route.params.job }}
            />
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
        // justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 90,
        height: 90,
    },
    button: {
        alignItems: 'center',
        marginVertical: 8,
        padding: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 15,
    },

    profileLeft: {
        width: '40%',
        marginLeft: 10
    },
    profileRight: {
        paddingLeft: 10,
        marginLeft: 10,
        width: '30%',
    }
})