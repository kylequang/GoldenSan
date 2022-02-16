import { View, Text } from 'react-native'
import React from 'react'

export default function OTP() {
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 200, height: 200 }}
                source={require('../../../assets/logo/logo.png')}
            />
            <Text style={{ fontSize: 25 }}>Nhập mã OTP</Text>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <TextInput
                        placeholder="nhập mã xác minh"
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('toHome')} style={styles.button}>
                    <Text style={styles.buttonText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}