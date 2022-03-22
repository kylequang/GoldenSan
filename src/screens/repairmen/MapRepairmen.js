import { View, Dimensions, LogBox } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import MapView, { Marker } from "react-native-maps"
import {getRealTimeLocationRepairmen } from '../../service/getData';
export default function MapRepairmen() {

    const [data, setData] = useState([]);
    useEffect( () => {
        LogBox.ignoreLogs(['Setting a timer']);
        const location =  getRealTimeLocationRepairmen(setDataLocation)
        setData(location)
    }, [])

    function setDataLocation(location){
        setData(location)
    }
    
    const mapRef = useRef()
    return (
        <View>
            <MapView initialRegion={{
                latitude: 16.059809822553397,
                longitude: 108.24354026119771,
                latitudeDelta: 0.0042,
                longitudeDelta: 0.0421
            }} ref={mapRef}
                style={{
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                }}
                showsTraffic={true}
                userLocationUpdateInterval={5000}
            >
                {
                    data && data.map((item, id) => (
                        <Marker key={id} coordinate={item.detailLocation} image={require('../../../assets/logo/icon_map_repairmen.png')} />
                    ))
                }
            </MapView>
        </View>
    )
}
