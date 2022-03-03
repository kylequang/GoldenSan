import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PhoneInput, { getCountryCode } from "react-native-phone-number-input";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import Loading from '../../components/animation/Loading';
import RepainerLoading from "../../components/animation/RepainerLoading";

import * as Facebook from 'expo-facebook';
import { FacebookAuthProvider, PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, firebase } from '../../database/firebase';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getApp } from 'firebase/app';

// Firebase references
const app = getApp();
// Double-check that we can run the example
if (!app?.options || Platform.OS === 'web') {
    throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}


const PhoneNumber = ({ navigation }) => {

    //
    const [logInEd, setLogInEd] = useState(false);
    const phoneInput = useRef(null);

    const recaptchaVerifier = useRef(null);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, showMessage] = useState();

    const [verificationId, setVerificationId] = useState(null);
    const [verificationCode, setVerificationCode] = useState('');
    const attemptInvisibleVerification = false;







    const [verifyButton, setVerifyButton] = useState(true)
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    // const [result, setResult] = useState('');
    const [checked, setChecked] = useState('house');

    const sendOTP = async () => {
        try {
            const phoneProvider = new PhoneAuthProvider(auth);
            const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
                text: 'Verification code has been sent to your phone.',
            });
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }

        setStep('SEND_OTP');
        setVerifyButton(true)
    }

    const verifyOTP = () => {
        setStep('VERIFY_OTP_SUCCESS');
    }
    const [showLoading, setShowLoading] = useState(true);

    useEffect(
        async () => {

            setTimeout(() => {
                setShowLoading(false)
            }, 5000);

            // const unsubscribe = auth.onAuthStateChanged(async (user) => {
            //     if (user.displayName = "Kỳ Lê Quang") {
            //         AsyncStorage.setItem('login', 'success')
            //         console.log(user);
            //         console.log(user.displayName);
            //         console.log(user.uid);
            //     }
            // })
            // return unsubscribe
        },[]
    );

    // const unsubscribe = auth.onAuthStateChanged(async (user) => {
    //     if (user.displayName = "Kỳ Lê Quang") {
    //         AsyncStorage.setItem('login', 'success')
    //         console.log(user);
    //         console.log(user.displayName);
    //         console.log(user.uid);
    //     }
    // })
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
    // const checkLoginEd = async () => {
    //     const userToken = await AsyncStorage.getItem('login');
    //     return userToken;
    // }
    //Loading UI
    if (showLoading) return <RepainerLoading />
    // if (checkLoginEd !== null) { navigation.navigate('home') }
    return (
        <>

            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
                style={{justifyContent:'center'}}
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
                                setPhoneNumber('+'+phoneInput.current?.getCallingCode()+phone);
                                if (9 <= phoneNumber.length <= 11)
                                    setVerifyButton(false)
                            }}
                            countryPickerProps={{ withAlphaFilter: true }}
                        />
                        <TouchableOpacity
                            style={phoneNumber.length <= 8 ? styles.button0 : styles.button}
                            disabled={verifyButton}
                            onPress={sendOTP}
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
                                if (verificationCode.length == 6)
                                    setVerifyButton(false)
                            }}
                        />
                        <TouchableOpacity
                            style={verificationCode.length == 6 ? styles.button : styles.button0}
                            disabled={verifyButton}
                            onPress={async () => {
                                try {
                                    const credential = PhoneAuthProvider.credential(
                                        verificationId,
                                        verificationCode
                                    );
                                    await signInWithCredential(auth, credential);
                                    showMessage({ text: 'Phone authentication successful 👍' });
                                } catch (err) {
                                    showMessage({ text: `Error: ${err.message}`, color: 'red' });
                                }
                            }}

                        >
                            <Text style={styles.buttonText}>Xác Nhận</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            }
            {
                step === 'VERIFY_OTP_SUCCESS' &&
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
                            onPress={() => navigation.navigate('inputInfo')}
                        >
                            <Text style={styles.buttonText}>Xác Nhận Vai Trò</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
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
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <FirebaseRecaptchaBanner />
            </View> }
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
        width: '70%',
        paddingLeft: 5,
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
});

export default PhoneNumber;
