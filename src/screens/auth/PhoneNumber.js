import React, { useState, useRef } from "react";
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
const PhoneNumber = ({ navigation }) => {

    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);




    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [result, setResult] = useState('');
    const [checked, setChecked] = useState('house');


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
            {
                step === 'VERIFY_OTP_SUCCESS' && <View style={styles.container}>
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
                            onPress={()=> navigation.navigate('inputInfo')}
                        >
                            <Text style={styles.buttonText}>Xác Nhận Vai Trò</Text>
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
    wrapper_Role: {
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        height: '50%'
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
        borderRadius: 20
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
