import { Text, Dimensions } from 'react-native'
import React, { useRef } from 'react'
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyB22KxpEKa7qGMvGAuNu5XsfaINrcMlHvA';
export default function WatchOnGoogleMap({ route }) {
    const { repairmenLocation, clientLocation } = route.params;

    console.log(route.params);
    const mapRef = useRef()
    return (
        <MapView initialRegion={repairmenLocation}
            ref={mapRef}
            style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
            }}
            // showsUserLocation={true}
            showsTraffic={true}
            userLocationUpdateInterval={5000}
        >
            <Marker coordinate={clientLocation} pinColor="green" draggable={true} >
                <Callout>
                    <Text style={{fontWeight:'bold',fontSize:14}}>Khách</Text>
                </Callout>
            </Marker>
            <Marker coordinate={repairmenLocation} image={require('../../../../assets/logo/icon_map_repairmen.png')} >
                <Callout>
                    <Text style={{fontWeight:'bold',fontSize:14}}>Thợ Sửa Chữa</Text>
                </Callout>
            </Marker>
            <MapViewDirections
                mode="DRIVING"
                origin={clientLocation}
                precision='high'
                destination={repairmenLocation}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={7}
                strokeColor="blue"
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
        </MapView>
    )
}