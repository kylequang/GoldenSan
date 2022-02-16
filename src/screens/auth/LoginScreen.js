import { useNavigation } from '@react-navigation/core';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'
import React, { useState } from 'react';
import { auth } from '../../database/firebase';

export default function LoginScreen() {

    const [phoneNumber, setPhone] = useState('+84');

    signIn = async () => {
        await auth.signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => {
                alert('confirmResult' + confirmResult)
                navigation.navigate('toHome');
            })
            .catch(error => console.log(error))
    };
    sendOTP =() => {
        navigation.navigate('sendOTP');
    };

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 200, height: 200 }}
                source={require('../../../assets/logo/logo.png')}
            />
            <Text style={{ fontSize: 25 }}>Số điện thoại</Text>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Enter your phone number"
                        onChangeText={phone => setPhone(phone)}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => signIn()} style={styles.button}>
                    <Text style={styles.buttonText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => sendOTP()} style={styles.button}>
                    <Text style={styles.buttonText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '90%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#ff6600',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})