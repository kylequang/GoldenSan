import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import ScanLoadingLocation from '../../components/animation/ScanLoadingLocation';

import { getCurrentLocation } from '../../service/getData';


import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '../../Constance';

import { getAllRealTimeRepairmen } from '../../service/getData';


import { getDistance, getPreciseDistance } from 'geolib';
export default function ScanLocation() {

    const [currentLocationUser, setCurrentLocationUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [repairmen, setRepairmen] = useState([]);

    const [repairmenNearYou, setRepairmenNearYou] = useState([]);

    useEffect(async () => {
        const currentLocation = await getCurrentLocation();
        if (currentLocation) {
            setCurrentLocationUser(currentLocation)
            console.log('Ví trí hiện tại :', currentLocation);
        }
        getRealTime();
        setLoading(false)
    }, [])

    function getRealTime() {
        const allRepairmen = getAllRealTimeRepairmen(getAllRepairmen);
        setRepairmen(allRepairmen);
    }
    function getAllRepairmen(data) {
        setRepairmen(data)
    }

    const mapRef = useRef()

    const getNearLocation = (currentLocation, Location) => (
        <MapViewDirections
            mode="DRIVING"
            origin={currentLocation}
            precision='high'
            destination={Location}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={7}
            strokeColor="blue"
            optimizeWaypoints={true}
            onStart={(params) => {
                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
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
    )




    if (loading) return <ScanLoadingLocation />
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                getNearLocation({
                    latitude: 16.059809822553397,
                    longitude: 108.24354026119771,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0421
                },{
                    latitude: 16.0484728028824,
                    longitude: 108.22690889265418,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0421
                })
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})