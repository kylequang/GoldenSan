import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'
import { auth } from '../../database/firebase';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hidePass, setHidePass] = useState(true)

    const navigation = useNavigation()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace('toHome')
            }
        })
        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                console.log('Registered with:', user.email)
            })
            .catch((error) => alert(error.message))
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                const user = userCredentials.user
                console.log('Logged in with:', user.email)
            })
            .catch((error) => alert(error.message))
    }

    return (
        <View behavior="padding" style={styles.container}>
            <Image
                style={{ width: 100, height: 100 }}
                source={require('../../../assets/logo/logo_login.jpg')}
            />
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <Text>Email</Text>
                    <TextInput
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.input}>
                    <Text>Password</Text>
                    <TextInput
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={hidePass ? true : false}
                    />
                    <Ionicons
                        style={styles.iconPass}
                        name={hidePass ? 'ios-eye-off-outline' : 'ios-eye-outline'}
                        size={20}
                        color="grey"
                        onPress={() => setHidePass(!hidePass)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => navigation.navigate('ForgotPassword')}
                >
                    <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
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
        backgroundColor: '#DB147F',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#DB147F',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#DB147F',
        fontWeight: '700',
        fontSize: 16,
    },
    iconPass: {
        position: 'absolute',
        bottom: 10,
        left: 320,
    },
    forgotButton: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    forgotText: {
        color: '#DB147F',
    },
})