import React, { useState, useRef, useEffect } from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from 'react-native-safe-area-context';
import { RadioButton } from 'react-native-paper';
import Loading from '../../components/animation/Loading';
import RepainerLoading from "../../components/animation/RepainerLoading";

import * as Facebook from 'expo-facebook';
import { FacebookAuthProvider } from "firebase/auth";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

import { auth, firebase } from '../../database/firebase';

const PhoneNumber = ({ navigation }) => {

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);

    const [phoneNumber, setPhoneNumber] = useState("");
    const [verifyButton, setVerifyButton] = useState(true)

    const [otp, setOtp] = useState("");
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [result, setResult] = useState('');
    const [checked, setChecked] = useState('house');


    const [user_Info, setUser_Info] = useState({})



    const appVerifier = window.recaptchaVerifier;
    const sendOTP123 = () => {
        setStep('SEND_OTP');
        setVerifyButton(true)
    }
    const verifyOTP = () => {
        setStep('VERIFY_OTP_SUCCESS');
    }
    const [showLoading, setShowLoading] = useState(true)

    useEffect(
        () => {
            setTimeout(() => {
                setShowLoading(false)
            }, 5000);
            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (user) {
                    navigation.replace('loginfb')
                }
            })
            return unsubscribe
        }
    );

    async function logIn() {
        try {
            await Facebook.initializeAsync({
                appId: '470392018091052',
            });
            const { type, token } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                });

            if (type === 'success') {
                //Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture`);
                console.log('Đăng nhập thành công!', `Xin chào ${(await response.json()).name}!`);
                //Create a Firebase credential with the AccessToken
                const facebookCredential = FacebookAuthProvider.credential(token);
                //Sign -in the user with the credential
                auth.signInWithCredential(facebookCredential);
            } else {
                alert('Đăng nhập thất bại')
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    if (showLoading) {
        return (
            <RepainerLoading />
        )
    }
    return (
        <>
            {
                showLoading === false && step === 'INPUT_PHONE_NUMBER' && <View style={styles.container}>
                    <SafeAreaView style={styles.wrapper}>
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={require('../../../assets/logo/logo.png')}
                        />
                        <View style={styles.welcome}>
                            <Text style={{ fontSize: 18 }}>Chào mừng bạn đến với chúng tôi!</Text>
                        </View>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="VN"
                            layout="first"
                            onChangeText={(phone) => {
                                setPhoneNumber(phone);
                                if (9 <= phoneNumber.length <= 11)
                                    setVerifyButton(false)
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            countryPickerProps={{ withAlphaFilter: true }}
                        />
                        <TouchableOpacity
                            style={phoneNumber.length <= 8 ? styles.button0 : styles.button}
                            disabled={verifyButton}
                            onPress={sendOTP123}
                        >
                            <Text style={styles.buttonText}>Tiếp tục</Text>
                        </TouchableOpacity>
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={styles.buttonSocial}
                                onPress={logIn}
                            >
                                <Text style={styles.buttonText}>Đăng nhập với FaceBook</Text>
                            </TouchableOpacity>
                        </View>
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
                                setOtp(otp)
                                if (otp.length === 6)
                                    setVerifyButton(false)
                            }}
                        />
                        <TouchableOpacity
                            style={otp.length == 6 ? styles.button : styles.button0}
                            disabled={verifyButton}
                            onPress={verifyOTP}
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
                        <Text>{user_Info.name}</Text>
                    </SafeAreaView>
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
        height: 40,
        width: '38%',
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
        borderRadius: 20
    },
    button: {
        marginTop: 30,
        height: 40,
        width: '45%',
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
        marginTop: 70,
        height: 40,
        width: '70%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3385ff",
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
