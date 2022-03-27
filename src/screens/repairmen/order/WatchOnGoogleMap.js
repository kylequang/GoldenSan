import { Text } from 'react-native'
import React from 'react'
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyB22KxpEKa7qGMvGAuNu5XsfaINrcMlHvA';
export default function WatchOnGoogleMap({route}) {
    const {repairmenLocation,clientLocation}=route.params;
    
    const mapRef = useRef()
    return (
        <MapView initialRegion={{
            latitude: props.clientLocation.coords.latitude,
            longitude: props.clientLocation.coords.longitude,
            latitudeDelta: 0.009,
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

            <Marker coordinate={props.repairmenLocation} image={require('../../../assets/logo/icon_map_repairmen.png')} />
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


                onStart={(params) => {
                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }}
                onReady={result => {
                    distance = result.distance
                    time = result.duration
                    console.log(distance);
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