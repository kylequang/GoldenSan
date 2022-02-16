import React, { useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Image
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";

const PhoneNumber = ({ navigation }) => {

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);




    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [result, setResult] = useState('');



    const appVerifier = window.recaptchaVerifier;
    const sendOTP123 = () => {
        // console.log('hi')
        // if (phoneNumber === "") return;
        // let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        //     'size': 'invisible'
        // });
        // auth.signInWithPhoneNumber(phoneNumber, verify).then((result) => {
        //     console.log('sai');
        //     setResult(result);
        // })
        //     .catch((err) => {
        //         alert(err);
        //     });
        setStep('SEND_OTP');
    }
    const verifyOTP = () => {
        setStep('VERIFY_OTP_SUCCESS');
        navigation.navigate('toHome');
    }

    return (
        <>
            {
                step === 'INPUT_PHONE_NUMBER' && <View style={styles.container}>
                    <SafeAreaView style={styles.wrapper}>
                        <Image
                            style={{ width: 200, height: 200 }}
                            source={require('../../../assets/logo/logo.png')}
                        />
                        <View style={styles.welcome}>
                            <Text>Welcome!</Text>
                        </View>
                        <PhoneInput
                            ref={phoneInput}
                            defaultValue={value}
                            defaultCode="VN"
                            layout="first"
                            onChangeText={(phone) => {
                                setPhoneNumber(phone);
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            countryPickerProps={{ withAlphaFilter: true }}
                            withShadow
                            autoFocus
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={sendOTP123}
                        >
                            <Text style={styles.buttonText}>Tiếp tục</Text>
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
                            onChangeText={otp => setOtp(otp)}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={verifyOTP}
                        >
                            <Text style={styles.buttonText}>Xác Nhận</Text>
                        </TouchableOpacity>
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

    button: {
        marginTop: 20,
        height: 50,
        width: 300,
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
    },

    buttonText: {
        color: "white",
        fontSize: 14,
    },

    welcome: {
        padding: 20,
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
