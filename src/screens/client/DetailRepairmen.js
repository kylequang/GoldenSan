import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DataTable } from 'react-native-paper';
import { getCurrentLocation, getAnDocument, getCurrentUser } from '../../service/getData';

import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';
const GOOGLE_MAPS_APIKEY = 'AIzaSyBJFNgQI0m6N6_R0azIqc0UBeEld9zS634';

import { formatPrice, formatNameService } from '../../service/formatCode';
import RepairmenLoading from '../../components/animation/RepairmenLoading';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabDetailRepairmen = createMaterialTopTabNavigator();

var distance = 1;
var time = 0;
const OnGoogleMap = (props) => {
    const mapRef = useRef()
    return (
        // <MapView initialRegion={{
        //     latitude: props.clientLocation.coords.latitude,
        //     longitude: props.clientLocation.coords.longitude,
        //     latitudeDelta: 0.009,
        //     longitudeDelta: 0.0421
        // }} ref={mapRef} style={{
        //     width: Dimensions.get("window").width,
        //     height: 500
        // }}
        //     showsUserLocation={true}
        //     showsTraffic={true}
        //     userLocationUpdateInterval={5000}
        // >

        //     <Text>Khoảng cách:{distance} km</Text>
        //     <Text>Thời gian:{time} phút</Text>

        //     <Marker coordinate={{
        //         latitude: props.clientLocation.coords.latitude,
        //         longitude: props.clientLocation.coords.longitude,
        //         latitudeDelta: 0.0042,
        //         longitudeDelta: 0.0421
        //     }} pinColor="green" draggable={true} >
        //         <Callout>
        //             <Text>Bạn</Text>
        //         </Callout>
        //     </Marker>
        //     <Marker coordinate={props.repairmenLocation} image={require('../../../assets/logo/icon_map_repairmen.png')} />
        //     <MapViewDirections
        //         mode="DRIVING"
        //         origin={{
        //             latitude: props.clientLocation.coords.latitude,
        //             longitude: props.clientLocation.coords.longitude,
        //             latitudeDelta: 0.0042,
        //             longitudeDelta: 0.0421
        //         }}
        //         precision='high'
        //         destination={props.repairmenLocation}
        //         apikey={GOOGLE_MAPS_APIKEY}
        //         strokeWidth={7}
        //         strokeColor="blue"
        //         optimizeWaypoints={true}

        //         onStart={(params) => {
        //             console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
        //         }}
        //         onReady={result => {
        //             distance = result.distance
        //             time = result.duration
        //             console.log(distance);
        //             console.log(`Distance: ${result.distance} km`)
        //             console.log(`Duration: ${result.duration} min.`)
        //             mapRef.current.fitToCoordinates(result.coordinate, {
        //                 edgePadding: {
        //                     right: 5,
        //                     left: 5,
        //                     bottom: 10,
        //                     top: 10
        //                 }
        //             })
        //         }
        //         }
        //     />
        // </MapView>
        <Text>hi</Text>
    )
}

function ServiceTable(props) {
    const renderListWork = ({ item, id }) => (
        <DataTable.Row key={id}>
            <DataTable.Cell>{item.nameService}</DataTable.Cell>
            <DataTable.Cell numeric>{formatPrice(item.price)}/h</DataTable.Cell>
            <DataTable.Cell numeric>{item.insurance} tuần</DataTable.Cell>
        </DataTable.Row>
    )
    return (
        <DataTable>
            <DataTable.Row>
                <DataTable.Cell>Dịch Vụ</DataTable.Cell>
                <DataTable.Cell numeric>Chi Phí</DataTable.Cell>
                <DataTable.Cell numeric>Bảo Hành</DataTable.Cell>
            </DataTable.Row>
            <FlatList
                data={props.listWork.listWork}
                renderItem={renderListWork}
                keyExtractor={item => item.id}
            />
        </DataTable>

    )
}

export default function DetailRepairmen({ navigation, route }) {

    const [repairman, setRepairman] = useState({});
    const [loading, setLoading] = useState(true);
    const [listWork, setListWork] = useState({});
    const [currentLocationOfClient, setCurrentLocationOfClient] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    useEffect(async () => {
        setRepairman(route.params.item);
        const location = await getCurrentLocation();
        const listWork = await getAnDocument('listWork', route.params.item.uid);
        const dataUser = await getCurrentUser();
        setListWork(listWork);
        setCurrentLocationOfClient(location);
        setCurrentUser(dataUser);
        setLoading(false)
    }, [])

    if (loading) return <RepairmenLoading />

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
                        <Text style={styles.textInfo}>SDT:  {repairman.phoneNumber}</Text>
                        <Text style={styles.textInfo}>Giới tính:  {repairman.sex}</Text>
                        <Text style={styles.textInfo}>Đánh Giá:  {repairman.totalCount}</Text>
                        {distance != 0 && <Text>Khoảng cách: {distance} km</Text>}
                    </View>
                </View>
            </View>



            <View style={styles.sliderTag}>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 5 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('bookOrder',
                            {
                                name: "Đặt Lịch Sữa Chữa",
                                repairmen: route.params.item,
                                distance: distance,
                                listWork: listWork,
                                dataUser: currentUser
                            })
                    }}
                >
                    <Text style={{ fontSize: 18 }}>Đặt Lịch</Text>
                </TouchableOpacity>
            </View>
            <TabDetailRepairmen.Navigator
                initialRouteName='Bảng Giá'
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' },
                    tabBarStyle: { backgroundColor: 'white' },
                }}>
                <TabDetailRepairmen.Screen name="Bảng giá"
                    children={() => <ServiceTable listWork={listWork} />}
                />
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
        height: '100%',
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
        borderRadius: 200
    },
    titleTable: {
        fontSize: 16,
        color: 'black',
    }

})