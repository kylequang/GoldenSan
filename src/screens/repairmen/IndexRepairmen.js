import { View, Text, StyleSheet, FlatList, Alert, Modal, TouchableOpacity, TextInput, Button, Dimensions } from 'react-native';
import { Checkbox } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';

import Constants from 'expo-constants';
import * as Location from 'expo-location';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const listWork = [
  {
    id: 1,
    service: 'Thay Bóng Đèn',
    price: 150000,
    insurance: 1,
  },
  {
    id: 2,
    service: 'Thay Bóng Đèn',
    price: 150000,
    insurance: 1,
  }, {
    id: 3,
    service: 'Thay Bóng Đèn',
    price: 150000,
    insurance: 1,
  }, {
    id: 4,
    service: 'Thay Bóng Đèn',
    price: 150000,
    insurance: 1,
  }, {
    id: 5,
    service: 'Thay Bóng Đèn',
    price: 150000,
    insurance: 1,
  }
]

const listTag = [
  {
    id: 1,
    nameTag: 'Tivi',
    description: 'Sửa lỗi màn hình tivi, lắp đặt...'
  },
  {
    id: 2,
    nameTag: 'Tivi',
    description: 'Sửa lỗi màn hình tivi, lắp đặt...'
  },
  {
    id: 3,
    nameTag: 'Tivi',
    description: 'Sửa lỗi màn hình tivi, lắp đặt...'
  },
  {
    id: 4,
    nameTag: 'Tivi',
    description: 'Sửa lỗi màn hình tivi, lắp đặt...'
  },
  {
    id: 5,
    nameTag: 'Tivi',
    description: 'Sửa lỗi màn hình tivi, lắp đặt...'
  },
  {
    id: 6,
    nameTag: 'Tivi',
    description: 'Sửa lỗi màn hình tivi, lắp đặt...'
  },
  {
    id: 7,
    nameTag: 'Tivi',
    description: 'Sửa lỗi màn hình tivi, lắp đặt...'
  }
]


export default function IndexRepairmen() {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectWork, setSelectWork] = useState(listWork);


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



  const formatPrice = (price) => {
    return price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  const renderListWork = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
      <Text>{item.service}</Text>
      <Text> {formatPrice(item.price)}</Text>
      <Text>{item.insurance} tuần</Text>
      <TouchableOpacity onPress={() => { alert('thêm') }}>
        <MaterialCommunityIcons name='file-edit' size={20} color='#ffa366' />
      </TouchableOpacity>
    </View>
  )
  const renderListTag = ({ item }) => (
    <View>
      <Text>{item.nameTag}</Text>
    </View>
  )


  console.log('reload')
  return (
    <SafeAreaView style={styles.container}>


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



















      <View style={styles.chooseJob}>
        <Text>Nghề Nghiệp Của Bạn</Text>
      </View>
      <View style={{ backgroundColor: 'red' }}>
        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>Vai Trò Của Bạn</Text>
        </View>
        <FlatList
          data={listTag}
          renderItem={renderListTag}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.listService}>
        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ fontSize: 20, marginRight: 5 }}>Kê khai dịch vụ của bạn</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name='briefcase-plus-outline' size={25} color='#ff6600' />
          </TouchableOpacity>
        </View>
        <View style={styles.listWork}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>Dịch Vụ</Text>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>Phí/Giờ</Text>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>Bảo Hành</Text>
          </View>
          <FlatList
            data={selectWork}
            renderItem={renderListWork}
            keyExtractor={item => item.id} />
        </View>
      </View>












      <Modal
        animationType="slide"
        transparent={true}
        hardwareAccelerated={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Kê Khai Dịch Vụ!</Text>
            <Formik
              initialValues={{
                nameService: '',
                price: '',
                insurance: '',
              }}
              onSubmit={
                (values) => {
                  alert('Thêm Dịch Vụ');
                  const add = {
                    id: listWork.length + 1,
                    service: values.name,
                    price: values.price,
                    insurance: values.insurance
                  }
                  listWork.push(add);
                  console.log(listWork);
                  setModalVisible(!modalVisible);
                }
              }
              validationSchema={yup.object().shape({
                nameService: yup
                  .string()
                  .required('Trường này là bắt buộc.'),
                price: yup
                  .number()
                  .required('Trường này là bắt buộc'),
                insurance: yup
                  .number()
                  .min(0)
                  .max(24)
                  .required('Trường này bắt buộc'),
              })}
            >
              {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                <>
                  <Text>Tên Dịch Vụ Sửa Chữa</Text>
                  <TextInput
                    value={values.nameService}
                    style={styles.textInput}
                    onBlur={() => setFieldTouched('nameService')}
                    onChangeText={handleChange('nameService')}
                    placeholder="Dịch vụ của bạn"
                  />
                  {touched.nameService && errors.nameService &&
                    <Text style={styles.errorsText}>{errors.nameService}</Text>
                  }
                  <Text>Chi Phí Sửa Chữa/H</Text>
                  <TextInput
                    value={values.price}
                    style={styles.textInput}
                    onBlur={() => setFieldTouched('price')}
                    onChangeText={handleChange('price')}
                    placeholder="Chi phí sửa chữa"
                  />
                  {touched.price && errors.price &&
                    <Text style={styles.errorsText}>{errors.price}</Text>
                  }
                  <Text>Thời Gian Bảo Trì</Text>
                  <TextInput
                    value={values.insurance}
                    style={styles.textInput}
                    placeholder="Thời gian bảo trì/tuần"
                    onBlur={() => setFieldTouched('insurance')}
                    onChangeText={handleChange('insurance')}
                  />
                  {touched.insurance && errors.insurance &&
                    <Text style={styles.errorsText}>{errors.insurance}</Text>
                  }
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!isValid}
                    style={{ backgroundColor: '#3366ff', padding: 10, borderRadius: 10, margin: 5 }}
                  >
                    <Text style={{ fontSize: 22 }}>Thêm dịch vụ</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ backgroundColor: 'gray', padding: 8, borderRadius: 10, margin: 5 }}
                    onPress={() => { setModalVisible(!modalVisible) }}
                  >
                    <Text style={{ fontSize: 18 }}>Hủy dịch vụ</Text>
                  </TouchableOpacity>

                </>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 50,
  },
  row: {
    flexDirection: 'row'
  },
  chooseJob: {
    backgroundColor: 'yellow',
    borderRadius: 10,
  }
  ,
  listService: {
    backgroundColor: '#f234',
    borderRadius: 10,
    marginVertical: 10
  }
  ,
  listWork: {
    marginTop: 10,
    marginBottom: 10,
    height: 250
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 30,
    padding: 10,
    elevation: 2
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    height: 40,
    width: '80%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingLeft: 10
  },
  errorsText: {
    fontSize: 15,
    color: 'red'
  },
})