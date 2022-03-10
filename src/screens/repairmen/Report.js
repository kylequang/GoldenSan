import React, { useState, useEffect } from "react"
import { Dimensions, StyleSheet, Text, View, Platform } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import * as Location from 'expo-location';
import Constants from 'expo-constants';
export default function Report() {
  const [pin, setPin] = useState({
    latitude: 37.78825,
    longitude: -122.4324
  })
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.1
  })

  const [errorMsg, setErrorMsg] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null)

  const getCurrentLocation = async () => {

    if (Platform.OS === 'android' && !Constants.isDevice) {
      setErrorMsg(
        'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
      );
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Quyền Truy Cập Bị Từ Chối');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setCurrentLocation(location);
    console.log('Địa chỉ', currentLocation);
  }
  useEffect(async () => {
    await getCurrentLocation();
  }, [])
  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      {/* <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance"
        }}
        onPress={(data, details = null) => {
          console.log(data, details)
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          })
        }}
        query={{
          key: "AIzaSyADmgzD_ESR2S1ZZ3ShM6cmbB9X55UUuT0",
          language: "en",
          // components: "country:us",
          types: "establishment",
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`
        }}
        styles={{
          container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
          listView: { backgroundColor: "white" }
        }}
      /> */}
      {
        currentLocation && <MapView
          style={styles.map}
          initialRegion={{
            latitude: currentLocation.coords.latitude,
            longitude:currentLocation.coords.longitude,
            latitudeDelta: 0.0042,
            longitudeDelta: 0.0421
          }}
          provider="google"
        >
          <Marker coordinate={{ latitude:currentLocation.coords.latitude , longitude: currentLocation.coords.longitude }} />
          <Marker
            coordinate={pin}
            pinColor="black"
            draggable={true}
          >
            <Callout>
              <Text>I'm here</Text>
            </Callout>
          </Marker>
          <Circle center={{latitude:currentLocation.coords.latitude , longitude: currentLocation.coords.longitude }} radius={500} />
        </MapView>
      }
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        provider="google"
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        <Marker
          coordinate={pin}
          pinColor="black"
          draggable={true}
          onDragStart={(e) => {
            console.log("Drag start", e.nativeEvent.coordinates)
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            })
          }}
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={1000} />
      </MapView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
}
)