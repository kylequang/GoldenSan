{/* <GooglePlacesAutocomplete
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance"
        }}
        placeholder='Tìm kiếm'

        onPress={(data, details = null) => {
          console.log(data);
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          })
        }}
        query={{
          key: 'AIzaSyADmgzD_ESR2S1ZZ3ShM6cmbB9X55UUuT0',
          language: 'en',
          components: "country:us",
          types: "establishment",
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`
        }}
        styles={{
          container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
          listView: { backgroundColor: "red" }
        }}
      />
      <MapView style={{
        width: '100%',
        height: 400,
      }}
        initialRegion={{
          latitude: 16.060932,
          longitude: 108.241346,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034
        }}
        provider="google"
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        <Marker
          coordinate={pin}
          pinColor="red"
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
            <Text>Hiện Tại</Text>
          </Callout>
        </Marker>


        <Circle radius={100} center={{
          latitude: 16.060932,
          longitude: 108.241346,
        }} />


      </MapView> */}
      
  const [pin, setPin] = useState({
    latitude: 16.060932,
    longitude: 108.241346,
    latitudeDelta: 0.08,
    longitudeDelta: 0.04
  });
  const [region, setRegion] = useState({
    latitude: 1,
    longitude: 1,
    latitudeDelta: 1,
    longitudeDelta: 1
  })
