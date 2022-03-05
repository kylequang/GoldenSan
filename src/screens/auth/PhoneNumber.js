import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Button,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import RepairmenLoading from "../../components/animation/RepairmenLoading";
import { Formik } from 'formik';
import * as yup from 'yup';
import * as Facebook from 'expo-facebook';
import { FacebookAuthProvider, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, firebase, db } from '../../database/firebase';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getApp } from 'firebase/app';
import { phoneCheckAccountSurvive } from '../../../src/service/getData';
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
    const [checked, setChecked] = useState('house');

    const [showLoading, setShowLoading] = useState(true);

    useEffect(
        async () => {
            setTimeout(() => {
                setShowLoading(false)
            }, 4000);
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


    const test = async () => {
        const data = await phoneCheckAccountSurvive(tempPhone);
        console.log(data);
        if (data.length != 0) {
            navigation.navigate('home_user');
        } else {
            setStep('VERIFY_SUCCESS')
        }
    }


    //verify otp code
    const verifyOTP = async () => {
        try {
            const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
            );
            await signInWithCredential(auth, credential);
            showMessage({ text: ' Xác Minh Số Điện Thoại Thành Công ! 👍' });
            //check phone survive in app's database
            if (await phoneCheckAccountSurvive(tempPhone).length != 0) { // if true
                //check role of user ( client or repairmen)
                navigation.navigate('home_user')
            } else {    //if false

                setStep('VERIFY_SUCCESS');
                //if it is not survive app's database then create and push it into database

                console.log('ko tồn tại')
            }
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
    }




    async function logInFB() {
        try {
            await Facebook.initializeAsync({
                appId: '470392018091052',
            });
            const { type, token } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                });
            if (type === 'success') {
                //Create a Firebase credential with the AccessToken
                const facebookCredential = FacebookAuthProvider.credential(token);
                //Sign -in the user with the credential
                auth.signInWithCredential(facebookCredential);
                AsyncStorage.setItem('login', 'success');
            } else {
                alert('Đăng nhập thất bại')
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }


    const verifyRole = () => {
        //Process User enter information personal
        setStep('Enter_Info');
    }




    //Process enter information of user
    const [checkSex, setCheckSex] = useState('nam');

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
                            // onPress={sendOTP}
                            onPress={test}
                        >
                            <Text style={styles.buttonText}>Gửi mã OTP</Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 30, fontSize: 20 }}>Hoặc</Text>
                        <TouchableOpacity
                            style={[styles.buttonSocial, { backgroundColor: '#3333ff' }]}
                            onPress={logInFB}
                        >
                            <Ionicons name="logo-facebook" size={19} color={"white"} />
                            <Text style={styles.buttonText}>Đăng nhập với FaceBook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonSocial, { backgroundColor: '#e63900' }]}
                            onPress={logInFB}
                        >
                            <Ionicons name="logo-google" size={22} color={"white"} />
                            <Text style={styles.buttonText}>Đăng nhập với Google</Text>
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
                                if (verificationCode.length == 5) {
                                    setVerifyButton(false)
                                    console.log('change status of button')
                                }
                            }}
                        />
                        <TouchableOpacity
                            style={verificationCode.length == 6 ? styles.button : styles.button0}
                            disabled={verifyButton}
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
                                    value="house"
                                    status={checked === 'house' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('house')}
                                />
                            </View>
                            <View style={styles.column}>
                                <Image
                                    style={styles.imageRole}
                                    source={require('../../../assets/image/repainner.png')}
                                />
                                <Text>Thợ Sữa Chữa</Text>
                                <RadioButton
                                    value="repainer"
                                    status={checked === 'repainer' ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked('repainer')}
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
                step === 'Enter_Info' &&
                <View style={styles.loginContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Thông tin cá nhân</Text>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            Phone: '',
                            password: ''
                        }}
                        onSubmit={values => {
                            db
                                .collection('client')
                                .add({
                                    name: values.name,
                                    email:values.email
                                })
                                .then(() => {
                                    console.log('User added!');
                                });
                            console.log(values.email)
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
                            Phone: yup
                                .number()
                                .required('Trường này là bắt buộc'),
                            password: yup
                                .string()
                                .min(4, 'Mật khẩu không được dưới 4 kí tự.')
                                .max(11, 'Mật khẩu không được vượt quá 12 kí tự.')
                                .required('Trường này bắt buộc'),
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
                                    value={values.Phone}
                                    style={styles.textInput}
                                    placeholder="Số điện thoại"
                                    onBlur={() => setFieldTouched('Phone')}
                                    onChangeText={handleChange('Phone')}
                                />
                                {touched.Phone && errors.Phone &&
                                    <Text style={styles.errorsText}>{errors.Phone}</Text>
                                }
                                <TextInput
                                    value={values.password}
                                    style={styles.textInput}
                                    placeholder="Mật khẩu"
                                    onBlur={() => setFieldTouched('password')}
                                    onChangeText={handleChange('password')}
                                    secureTextEntry={true}
                                />
                                {touched.password && errors.password &&
                                    <Text style={styles.errorsText}>{errors.password}</Text>
                                }
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: "column", margin: 10, alignItems: 'center' }}>
                                        <Text>Nam</Text>
                                        <RadioButton
                                            value="nam"
                                            status={checkSex === 'nam' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckSex('nam')}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "column", margin: 10, alignItems: 'center' }}>
                                        <Text>Nữ</Text>
                                        <RadioButton
                                            value="nu"
                                            status={checkSex === 'nu' ? 'checked' : 'unchecked'}
                                            onPress={() => setCheckSex('nu')}
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
                </View>
            }
            {message ? (
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
            )}
            {attemptInvisibleVerification &&
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <FirebaseRecaptchaBanner />
                </View>}
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
        margin: 15,
        width: '40%',
        alignItems: 'center'
    },
    imageRole: {
        height: 200,
        width: 180,
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
        height: 45,
        width: '80%',
        padding: 10,
        alignItems: "center",
        flexDirection: 'row',
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 1,
            height: 5,
        },
        borderRadius: 15
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
});

export default PhoneNumber;
