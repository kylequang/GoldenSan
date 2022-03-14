import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Loading from '../../components/animation/Loading';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DataTable } from 'react-native-paper';
import { getCurrentLocation } from '../../service/getData';

import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_MAPS_APIKEY = 'AIzaSyADmgzD_ESR2S1ZZ3ShM6cmbB9X55UUuT0';

const TabDetailRepairmen = createMaterialTopTabNavigator();

var distance
const OnGoogleMap = (props) => {

    console.log(props.repairmenLocation);
    console.log('Vị trí của client', props.clientLocation);
    const mapRef = useRef()

    return (

        <MapView initialRegion={{
            latitude: props.clientLocation.coords.latitude,
            longitude: props.clientLocation.coords.longitude,
            latitudeDelta: 0.0042,
            longitudeDelta: 0.0421
        }} ref={mapRef} style={{
            width: Dimensions.get("window").width,
            height: 500
        }}
            showsUserLocation={true}
            showsTraffic={true}
            userLocationUpdateInterval={5000}
        >
            <Marker coordinate={{
                latitude: props.clientLocation.coords.latitude,
                longitude: props.clientLocation.coords.longitude,
                latitudeDelta: 0.0042,
                longitudeDelta: 0.0421
            }} pinColor="green" draggable={true} >
                <Callout>
                    <Text>Bạn</Text>
                </Callout>
            </Marker>
            <Marker coordinate={props.repairmenLocation} image={require('../../../assets/logo/icon_map_repairmen.png')}/>
            <MapViewDirections
                mode="DRIVING"
                origin={{
                    latitude: props.clientLocation.coords.latitude,
                    longitude: props.clientLocation.coords.longitude,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0421
                }}
                precision='high'
                destination={props.repairmenLocation}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={7}
                strokeColor="blue"
                optimizeWaypoints={true}

                onStart={(params) => {
                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={result => {
                    distance = result.distance
                    console.log(`Distance: ${result.distance} km`)
                    console.log(`Duration: ${result.duration} min.`)
                    mapRef.current.fitToCoordinates(result.coordinate, {
                        edgePadding: {
                            right: 5,
                            left: 5,
                            bottom: 10,
                            top: 10
                        }
                    })
                }
                }
            />
        </MapView>
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
    const [currentLocationOfClient, setCurrentLocationOfClient] = useState(null);
    useEffect(() => {
        setRepairman(route.params.item);
        setTimeout(async () => {
            const location = await getCurrentLocation();
            setCurrentLocationOfClient(location);
            setLoading(false)
        }, 1000)

    }, [])



    if (loading) return <Loading />




    return (
        <>
            <View style={styles.row}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Image style={styles.img} source={{ uri: repairman.photoURL }} />
                        <View style={[styles.row, { position: 'absolute', bottom: 0, left: 30 }]}>
                            <Text style={{ fontSize: 25 }}>{repairman.totalAVGComment}</Text>
                            <FontAwesome name="star" size={20} color={"#ffcc00"} />
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.textInfo}>Tuổi: {repairman.age}</Text>
                        <Text style={styles.textInfo}>Giới tính:  {repairman.sex}</Text>
                        <Text style={styles.textInfo}>Đánh Giá:  {repairman.totalCount}</Text>
                        <Text style={styles.textInfo}>SDT:  {repairman.phoneNumber}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.sliderTag}>
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
                <TabDetailRepairmen.Screen name="Xem Bản Đồ"
                    children={() => <OnGoogleMap repairmenLocation={repairman.detailLocation} clientLocation={currentLocationOfClient} />}
                />

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