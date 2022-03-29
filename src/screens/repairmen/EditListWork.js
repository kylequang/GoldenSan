import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataTable } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatPrice } from '../../service/formatCode';
export default function EditListWork({ route }) {
    console.log(route.params.dataListWork);
    const [listWork, setListWork] = useState(route.params.dataListWork.listWork);
    const [modalVisible, setModalVisible] = useState(false);
    const handleAddListWork = (item) => {
        setListWork((listWorkOfRepairmen) => [...listWorkOfRepairmen, item])
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal:10 }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} onPress={() => setModalVisible(true)}>
                    <Text>Thêm Công Việc</Text>
                    <MaterialCommunityIcons name='plus' size={35} color='#ff6600' />
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>Hoàn thành</Text>
                    <MaterialCommunityIcons name="check-circle" size={30} color="#ff6600" />
                </TouchableOpacity>
            </View>



            <ScrollView horizontal style={{ flexDirection: 'row' }}>
                <DataTable style={{width:'100%'}}>
                    <DataTable.Row>
                        <DataTable.Cell style={{flex:2}}>Công Việc</DataTable.Cell>
                        <DataTable.Cell numeric >Chi Phí</DataTable.Cell>
                        <DataTable.Cell numeric style={{flex:1/2}}>Bảo Hành</DataTable.Cell>
                        <DataTable.Cell numeric style={{flex:1/2}}>Xóa</DataTable.Cell>
                    </DataTable.Row>

                    {
                        listWork && listWork.map((item, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell style={{flex:2}}>{item.nameService}</DataTable.Cell>
                                <DataTable.Cell numeric >{ formatPrice(item.price)}đ</DataTable.Cell>
                                <DataTable.Cell numeric style={{flex:1/2}}>{item.insurance} tuần</DataTable.Cell>
                                <DataTable.Cell numeric style={{flex:1/2}}>
                                    <TouchableOpacity onPress={() => {
                                        alert('xóa')
                                    }}
                                    >
                                        <MaterialCommunityIcons name='delete' size={25} color='#ff6600' />
                                    </TouchableOpacity>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))
                    }
                </DataTable>
                <Text>hihihi</Text>
                <Text>hihihi</Text>
                <Text>hihihi</Text>
                <Text>hihihi</Text>
                <Text>hihihi</Text>
                <Text>hihihi</Text>
                <Text>hihihi</Text>
                <Text>hihihi</Text>

            </ScrollView>

            <View style={{ flex: 1 / 3, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#ff6600' }}>Cung cấp các công việc với chi phí phù hợp !</Text>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'normal' }}>Bạn sẽ đạt được nhiều đơn hàng và sự kì vọng từ người dùng</Text>
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
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Kê Khai Dịch Vụ!</Text>
                        <Formik
                            initialValues={{
                                nameService: '',
                                price: '',
                                insurance: '',
                            }}
                            onSubmit={
                                (values) => {
                                    const addListWort = {
                                        id: listWork ? listWork.length : 0,
                                        nameService: values.nameService,
                                        price: Number(values.price),
                                        insurance: Number(values.insurance)
                                    }

                                    handleAddListWork(addListWort);
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
                                    <Text>Chi Phí Sửa Chữa</Text>
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
                                        placeholder="Thời gian bảo trì ( tuần )"
                                        onBlur={() => setFieldTouched('insurance')}
                                        onChangeText={handleChange('insurance')}
                                    />
                                    {touched.insurance && errors.insurance &&
                                        <Text style={styles.errorsText}>{errors.insurance}</Text>
                                    }
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        disabled={!isValid}
                                        style={{ backgroundColor: '#ff9933', padding: 10, borderRadius: 10, margin: 5 }}
                                    >
                                        <Text style={{ fontSize: 20, color: 'white' }}>Thêm công việc</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ backgroundColor: 'red', padding: 8, borderRadius: 10, margin: 5 }}
                                        onPress={() => { setModalVisible(!modalVisible) }}
                                    >
                                        <Text style={{ fontSize: 16, color: 'white' }}>Hủy dịch vụ</Text>
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
    //Enter List Work
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

    listService: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center'
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
})