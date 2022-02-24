import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Facebook from 'expo-facebook';
import { auth } from '../../database/firebase'
export default function LoginFB({ navigation }) {

    function logOut() {
        auth.signOut()
            .then(() => { console.log("Sign out") })
        navigation.navigate('test')
    }
    const user = auth.currentUser;


    return (
        <View style={{ margin: 100 }}>
            <TouchableOpacity
                onPress={logOut}
            >
                <Text >FaceBook 123</Text>
            </TouchableOpacity>
            {user.providerData.forEach((userInfo) => {
                console.log('User info for provider: ', userInfo);
            })}
        </View>


    )
}