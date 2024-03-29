import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, LogBox, View, TouchableOpacity, Text, TextInput, Button, Image, Modal, FlatList } from "react-native";
import { Picker } from '@react-native-picker/picker';
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import RepairmenLoading from "../../components/animation/RepairmenLoading";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, storage, db } from '../../database/firebase';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getApp } from 'firebase/app';
import { doc, setDoc } from "firebase/firestore";
import { checkAccountSurvive, getCurrentLocation, getAnDocument } from '../../../src/service/getData';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes, } from 'firebase/storage';
import { schedulePushNotification, setDocument } from '../../service/pushData'
import { updateNotification } from '../../service/updateData';
import { formatPrice } from '../../service/formatCode';
import { DataTable } from 'react-native-paper';

// Firebase references
const app = getApp();
// Double-check that we can run the example
if (!app?.options || Platform.OS === 'web') {
    throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}


const PhoneNumber = ({ navigation }) => {

    const phoneInput = useRef(null);
    const recaptchaVerifier = useRef(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [tempPhone, setTempPhone] = useState("");
    const [message, showMessage] = useState();
    const [verificationId, setVerificationId] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const attemptInvisibleVerification = false;
    const [verifyButton, setVerifyButton] = useState(true)
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    //const [step, setStep] = useState('CreateListWork');
    const [checkRole, setCheckRole] = useState('client');
    const [showLoading, setShowLoading] = useState(true);
    const [uid, setUid] = useState(null);
    const [checkSex, setCheckSex] = useState('Nam');
    const [jobRepairmen, setJobRepairmen] = useState('Điện');
    const [currentLocation, setCurrentLocation] = useState();



    const [modalVisible, setModalVisible] = useState(false);
    const [listWorkOfRepairmen, setListWorkOfRepairmen] = useState([])


    useEffect(() => {
        setTimeout(() => {
            setShowLoading(false)
        }, 4000);
        LogBox.ignoreLogs(['Setting a timer']);
    }, []);


    //send OTP code to phoneNumber
    const sendOTP = async () => {
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
                text: 'Mã Xác Minh Đã Được Gửi Đến SDT Của Bạn !.'
            });
            setStep('SEND_OTP');
            setVerifyButton(true)
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
    }

    //verify otp code
    const verifyOTP = async () => {
        try {
            const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            const client = await signInWithCredential(auth, credential);


            await AsyncStorage.setItem('dataUser', JSON.stringify(client));

            setUid(client.user.uid);

            showMessage({ text: ' Xác Minh Số Điện Thoại Thành Công ! 👍' });

            const checkAccountOfRepairmen = await checkAccountSurvive('repairmen', client.user.uid);
            const checkAccountOfClient = await checkAccountSurvive('client', client.user.uid);

            if (checkAccountOfRepairmen == null && checkAccountOfClient == null) { // không tồn tại tài khoản trong firebase
                console.log('ko tồn tại')
                setStep('VERIFY_SUCCESS');
            } else {
                if (checkAccountOfRepairmen != null) {
                    console.log(checkAccountOfRepairmen);
                    console.log('Tồn tại tài khoản trong thợ sữa chữa')
                    await AsyncStorage.setItem('role', checkAccountOfRepairmen.role);
                    await AsyncStorage.setItem('rememberLogin', 'yes');
                    await schedulePushNotification('HelpHouse thông báo', 'Chào mừng quý khách quay lại HelpHouse!');
                    const notificationOfUser = await getAnDocument('notification', checkAccountOfRepairmen.uid);
                    const notificationArray = notificationOfUser.notification;
                    notificationArray.unshift({
                        title: 'HelpHouse thông báo',
                        body: 'Chào mừng quý khách quay lại HelpHouse!',
                        time: new Date()
                    })
                    await updateNotification('notification', checkAccountOfRepairmen.uid, notificationArray)
                }
                else if (checkAccountOfClient != null) {
                    console.log('Tồn tại tài khoản trong Hộ Gia Đình')
                    await AsyncStorage.setItem('role', checkAccountOfClient.role);
                    await AsyncStorage.setItem('rememberLogin', 'yes');
                    await schedulePushNotification('HelpHouse thông báo', 'Chào mừng quý khách quay lại HelpHouse!');
                    const notificationOfUser = await getAnDocument('notification', checkAccountOfClient.uid);
                    const notificationArray = notificationOfUser.notification;
                    notificationArray.unshift({
                        title: 'HelpHouse thông báo',
                        body: 'Chào mừng quý khách quay lại HelpHouse!',
                        time: new Date()
                    })
                    await updateNotification('notification', checkAccountOfClient.uid, notificationArray)
                }
                navigation.navigate('checkRole')
            }

        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
    }

    const verifyRole = async () => {
        setCurrentLocation(await getCurrentLocation())
        if (checkRole === 'repairmen') {
            setStep('Enter_Repairmen');
        } else {
            setStep('Enter_Client')
        }
    }

    const [image, setImage] = useState(null);
    const [photoURL, setPhotoURL] = useState('');
    let url = '';
    let uri1 = null;
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); // permission
        if (permissionResult.granted === false) {
            alert("Quyền truy cập bị từ chối!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        const uri = result.uri;
        setImage(uri);
        uri1 = uri
        console.log(uri);
        const filename = uri.substring(uri.lastIndexOf('/') + 1);

        const avatarRef = ref(storage, filename);
        const img = await fetch(uri);
        const bytes = await img.blob();

        await uploadBytes(avatarRef, bytes).then(async (e) => {
            url = await getDownloadURL(avatarRef);
        });

        if (url != '') {
            console.log('Upload success');
            setPhotoURL(url);
        }
    }





    const handleAddListWork = (item) => {
        setListWorkOfRepairmen((listWorkOfRepairmen) => [...listWorkOfRepairmen, item])
    }

    //Loading UI
    if (showLoading) return <RepairmenLoading />


    return (
        <>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
                style={{ justifyContent: 'center' }}
            />
            {
                showLoading === false
                && step === 'INPUT_PHONE_NUMBER'
                && <View style={styles.container}>
                    <SafeAreaView style={styles.wrapper}>
                        <Image
                            style={{ width: 180, height: 150 }}
                            source={require('../../../assets/logo/logo.png')}
                        />
                        <View style={styles.welcome}>
                            <Text style={{ fontSize: 18 }}>Chào mừng bạn đến với chúng tôi!</Text>
                        </View>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={phoneNumber}
                            defaultCode="VN"
                            placeholder="Số Điện Thoại"
                            layout="first"
                            onChangeText={(phone) => {
                                setTempPhone(phone);
                                setPhoneNumber('+' + phoneInput.current?.getCallingCode() + phone);
                                if (11 <= phoneNumber.length <= 13)
                                    setVerifyButton(false)
                            }}
                            countryPickerProps={{ withAlphaFilter: true }}
                        />
                        <TouchableOpacity
                            style={phoneNumber.length <= 11 ? styles.button0 : styles.button}
                            disabled={verifyButton}
                            onPress={sendOTP}
                        >
                            <Text style={styles.buttonText}>Gửi mã OTP</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            }
            {
                step === 'SEND_OTP' &&
                <View style={styles.container}>
                    <SafeAreaView style={styles.wrapper}>
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={require('../../../assets/logo/logo.png')}
                        />
                        <View style={styles.welcome}>
                            <Text>Nhập mã xác minh!</Text>
                        </View>
                        <TextInput
                            placeholder="Nhập mã xác minh"
                            onChangeText={(otp) => {
                                setVerificationCode(otp)
                            }}
                        />
                        <TouchableOpacity
                            style={verificationCode.length == 6 ? styles.button : styles.button0}
                            disabled={verificationCode.length == 6 ? false : true}
                            onPress={verifyOTP}
                        >
                            <Text style={styles.buttonText}>Xác Nhận</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            }
            {
                step === 'VERIFY_SUCCESS' &&
                <View style={styles.container}>
                    <SafeAreaView style={styles.wrapper_Role}>
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={require('../../../assets/logo/logo.png')}
                        />
                        <Text style={{ fontSize: 25 }}>Bạn là ai ?</Text>
                        <View style={styles.row}>
                            <View style={styles.column}>
                                <Image
                                    style={styles.imageRole}
                                    source={require('../../../assets/image/house.png')}
                                />
                                <Text>Hộ Gia Đình</Text>
                                <RadioButton
                                    value="client"
                                    status={checkRole === 'client' ? 'checked' : 'unchecked'}
                                    onPress={() => setCheckRole('client')}
                                />
                            </View>
                            <View style={styles.column}>
                                <Image
                                    style={styles.imageRole}
                                    source={require('../../../assets/image/repairmen.png')}
                                />
                                <Text>Thợ Sửa Chữa</Text>
                                <RadioButton
                                    value="repairmen"
                                    status={checkRole === 'repairmen' ? 'checked' : 'unchecked'}
                                    onPress={() => setCheckRole('repairmen')}
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={verifyRole}
                        >
                            <Text style={styles.buttonText}>Xác Nhận Vai Trò</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            }
            {
                step === 'Enter_Client' &&
                <SafeAreaView style={styles.loginContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thông tin cá nhân</Text>
                    <View style={{ alignItems: 'center' }}>
                        <Button title="Chọn Ảnh Đại Diện" onPress={openImagePickerAsync} />
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 5 }} />}
                    </View>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            age: '',
                        }}
                        onSubmit={async (values) => {
                            await AsyncStorage.setItem('role', checkRole);
                            await AsyncStorage.setItem('rememberLogin', 'yes');
                            await setDoc(doc(db, checkRole, uid), {
                                name: values.name,
                                email: values.email,
                                phoneNumber: tempPhone,
                                role: checkRole,
                                age: values.age,
                                sex: checkSex,
                                photoURL: photoURL,
                                uid: uid,
                                status: 'active',
                                active: true
                            });
                            await schedulePushNotification('HelpHouse thông báo', 'Chào mừng quý khách đến với HelpHouse!');
                            const addNotification = {
                                title: 'HelpHouse thông báo',
                                body: 'Chào mừng quý khách đến với HelpHouse!',
                                time: new Date()
                            }
                            const array = [];
                            array.push(addNotification)
                            const data = { id: uid, notification: array }
                            await setDocument('notification', uid, data)
                            navigation.navigate('checkRole');
                        }
                        }
                        validationSchema={yup.object().shape({
                            name: yup
                                .string()
                                .required('Trường này là bắt buộc.'),
                            email: yup
                                .string()
                                .email()
                                .required('Trường này là bắt buộc.'),
                            age: yup
                                .number()
                                .min(10)
                                .max(70)
                                .required('Trường này là bắt buộc'),
                        })}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                            <>
                                <TextInput
                                    value={values.name}
                                    style={styles.textInput}
                                    onBlur={() => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder="Họ tên của bạn"
                                />
                                {touched.name && errors.name &&
                                    <Text style={styles.errorsText}>{errors.name}</Text>
                                }
                                <TextInput
                                    value={values.email}
                                    style={styles.textInput}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder="Email của bạn"
                                />
                                {touched.email && errors.email &&
                                    <Text style={styles.errorsText}>{errors.email}</Text>
                                }
                                <TextInput
                                    value={values.age}
                                    style={styles.textInput}
                                    placeholder="10 < Tuổi <70"
                                    onBlur={() => setFieldTouched('age')}
                                    onChangeText={handleChange('age')}
                                />
                                {touched.age && errors.age &&
                                    <Text style={styles.errorsText}>{errors.age}</Text>
                                }
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: "column", margin: 10, alignItems: 'center' }}>
                                        <Text>Nam</Text>
                                        <RadioButton
                                            value="Nam"
                                            status={checkSex === 'Nam' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckSex('Nam')}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "column", margin: 10, alignItems: 'center' }}>
                                        <Text>Nữ</Text>
                                        <RadioButton
                                            value="Nữ"
                                            status={checkSex === 'Nữ' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckSex('Nữ')}
                                        />
                                    </View>
                                </View>
                                <Button
                                    color="blue"
                                    style={styles.btnButton}
                                    title='Tiếp tục'
                                    disabled={!isValid}
                                    onPress={handleSubmit}
                                />
                            </>
                        )}
                    </Formik>
                </SafeAreaView>
            }

            {
                step === 'Enter_Repairmen' &&
                <SafeAreaView style={styles.loginContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thông tin cá nhân </Text>
                    <View style={{ alignItems: 'center' }}>
                        <Button title="Chọn Ảnh Đại Diện" onPress={openImagePickerAsync} />
                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 5 }} />}
                    </View>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            age: '',
                        }}
                        onSubmit={async (values) => {
                            // await AsyncStorage.setItem('role', checkRole);
                            // await AsyncStorage.setItem('rememberLogin', 'yes');
                            await setDoc(doc(db, checkRole, uid), {
                                name: values.name,
                                age: values.age,
                                email: values.email,
                                phoneNumber: tempPhone,
                                role: checkRole,
                                sex: checkSex,
                                photoURL: photoURL,
                                job: jobRepairmen,
                                uid: uid,
                                totalAVG: 0,
                                totalCount: 0,
                                totalScore: 0,
                                status: 'active',
                                detailLocation: {
                                    latitude: currentLocation.coords.latitude,
                                    longitude: currentLocation.coords.longitude,
                                    latitudeDelta: 0.08,
                                    longitudeDelta: 0.042
                                },
                                active: true
                            });
                            // await schedulePushNotification('HelpHouse thông báo', 'Chào mừng quý khách đến với HelpHouse!');

                            // const addNotification = {
                            //     title: 'HelpHouse thông báo',
                            //     body: 'Chào mừng quý khách đến với HelpHouse!',
                            //     time: new Date()
                            // }
                            // const array = [];
                            // array.push(addNotification)
                            // const data = { id: uid, notification: array }

                            // await setDocument('notification', uid, data)
                            setStep('CreateListWork');
                            //navigation.navigate('checkRole');

                        }
                        }
                        validationSchema={yup.object().shape({
                            name: yup
                                .string()
                                .required('Trường này là bắt buộc.'),
                            email: yup
                                .string()
                                .email()
                                .required('Trường này là bắt buộc.'),
                            age: yup
                                .number()
                                .min(10)
                                .max(70)
                                .required('Trường này là bắt buộc'),

                        })}
                    >
                        {({ values, errors, setFieldTouched, touched, handleChange, isValid, handleSubmit }) => (
                            <>
                                <TextInput
                                    value={values.name}
                                    style={styles.textInput}
                                    onBlur={() => setFieldTouched('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder="Họ tên của bạn"
                                />
                                {touched.name && errors.name &&
                                    <Text style={styles.errorsText}>{errors.name}</Text>
                                }
                                <TextInput
                                    value={values.email}
                                    style={styles.textInput}
                                    onBlur={() => setFieldTouched('email')}
                                    onChangeText={handleChange('email')}
                                    placeholder="Email của bạn"
                                />
                                {touched.email && errors.email &&
                                    <Text style={styles.errorsText}>{errors.email}</Text>
                                }
                                <TextInput
                                    value={values.age}
                                    style={styles.textInput}
                                    placeholder="10 < Tuổi <70"
                                    onBlur={() => setFieldTouched('age')}
                                    onChangeText={handleChange('age')}
                                />
                                {touched.age && errors.age &&
                                    <Text style={styles.errorsText}>{errors.age}</Text>
                                }
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: "column", margin: 10, alignItems: 'center' }}>
                                        <Text>Nam</Text>
                                        <RadioButton
                                            value="Nam"
                                            status={checkSex === 'Nam' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckSex('Nam')}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "column", margin: 10, alignItems: 'center' }}>
                                        <Text>Nữ</Text>
                                        <RadioButton
                                            value="Nữ"
                                            status={checkSex === 'Nữ' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckSex('Nữ')}
                                        />
                                    </View>
                                </View>
                                <Picker
                                    selectedValue={jobRepairmen}
                                    style={{ height: 50, width: 150 }}
                                    onValueChange={(itemValue, itemIndex) => setJobRepairmen(itemValue)}
                                >
                                    <Picker.Item label="Thợ Điện" value="Điện" />
                                    <Picker.Item label="Thợ Nước" value="Nước" />
                                    <Picker.Item label="Thợ Máy Tính" value="Máy Tính" />
                                    <Picker.Item label="Thợ Xây Dựng" value="Xây Dựng" />
                                    <Picker.Item label="Thợ WC" value="WC" />
                                    <Picker.Item label="Thợ Khóa" value="Khóa" />
                                    <Picker.Item label="Thợ Máy" value="Máy Lạnh" />
                                    <Picker.Item label="Thợ Xe" value="Xe" />
                                </Picker>
                                <Button
                                    color="blue"
                                    style={styles.btnButton}
                                    title='Tiếp tục'
                                    disabled={!isValid}
                                    onPress={handleSubmit}
                                />
                            </>
                        )}
                    </Formik>
                </SafeAreaView>
            }

            {step === 'CreateListWork' &&
                <SafeAreaView style={styles.listService}>
                    <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ fontSize: 20, marginRight: 5 }}>Kê khai dịch vụ của bạn</Text>

                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <MaterialCommunityIcons name='plus' size={35} color='#ff6600' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Ví dụ: Thay bóng đèn - 100.000đ - bảo hành 1 tuần</Text>
                    </View>
                    <View style={styles.listWork}>
                        <DataTable>
                            <DataTable.Row>
                                <DataTable.Cell>Dịch Vụ</DataTable.Cell>
                                <DataTable.Cell numeric>Chi Phí</DataTable.Cell>
                                <DataTable.Cell numeric>Bảo Hành</DataTable.Cell>
                            </DataTable.Row>
                            {
                                listWorkOfRepairmen && listWorkOfRepairmen.map((item, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{item.nameService}</DataTable.Cell>
                                        <DataTable.Cell numeric>{item.price} đ</DataTable.Cell>
                                        <DataTable.Cell numeric>{item.insurance} tuần</DataTable.Cell>
                                    </DataTable.Row>
                                ))
                            }
                        </DataTable>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={listWorkOfRepairmen && listWorkOfRepairmen.length != 0 ? styles.button : styles.button0}
                            disabled={listWorkOfRepairmen && listWorkOfRepairmen.length != 0 ? false : true}
                            onPress={async () => {
                                await AsyncStorage.setItem('role', checkRole);
                                await AsyncStorage.setItem('rememberLogin', 'yes');
                                await schedulePushNotification('HelpHouse thông báo', 'Chào mừng quý khách đến với HelpHouse!');
                                const addNotification = {
                                    title: 'HelpHouse thông báo',
                                    body: 'Chào mừng quý khách đến với HelpHouse!',
                                    time: new Date()
                                }
                                const array = [];
                                array.push(addNotification)
                                const data = { id: uid, notification: array }
                                await setDocument('notification', uid, data)
                                const listWorkData = { job: jobRepairmen, listWork: listWorkOfRepairmen }
                                await setDocument('listWork', uid, listWorkData);
                                navigation.navigate('checkRole');
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Hoàn Thành</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            }
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
                                price: 0,
                                insurance: 0,
                            }}
                            onSubmit={
                                (values) => {
                                    const addListWort = {
                                        id: listWorkOfRepairmen ? listWorkOfRepairmen.length : 0,
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






            {
                message ? (
                    <TouchableOpacity
                        style={[
                            StyleSheet.absoluteFill,
                            { backgroundColor: 0xffffffee, justifyContent: 'center' },
                        ]}
                        onPress={() => showMessage(undefined)}>
                        <Text
                            style={{
                                color: message.color || 'blue',
                                fontSize: 17,
                                textAlign: 'center',
                                margin: 20,
                            }}>
                            {message.text}
                        </Text>
                    </TouchableOpacity>
                ) : (
                    undefined
                )
            }



            {
                attemptInvisibleVerification &&
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <FirebaseRecaptchaBanner />
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lighter,
    },
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper_Role: {
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        margin: 5,
        width: '40%',
        alignItems: 'center',
        padding: 10
    },
    imageRole: {
        height: 150,
        width: 120,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#ff6600',
        marginBottom: 15,
        marginTop: 15
    },
    button0: {
        marginTop: 30,
        height: 45,
        width: '70%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 15
    },
    button: {
        marginTop: 30,
        height: 45,
        width: '70%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff6600",
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 1,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: 20
    },
    buttonSocial: {
        marginTop: 30,
        height: 50,
        width: '80%',
        padding: 10,
        alignItems: "center",
        flexDirection: 'row',
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 1,
            height: 5,
        },
        borderRadius: 15,

    },
    buttonText: {
        color: "white",
        fontSize: 20,
        marginLeft: 7
    },
    welcome: {
        padding: 20
    },
    status: {
        padding: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "flex-start",
        color: "gray",
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


    //Enter List Work
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
});

export default PhoneNumber;
