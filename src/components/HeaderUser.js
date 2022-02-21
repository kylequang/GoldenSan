import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

export default function HeaderUser() {
    return (
        <View style={styles.row}>
            <View style={styles.avatar}>
                <Image style={styles.image}
                    source={require('../../assets/image/avatarDefault.png')} />
            </View>

            <View style={styles.name}>
                <Text style={{fontSize:25,fontWeight:'bold'}}>KỲ LÊ QUANG</Text>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={{fontSize:18,fontWeight:'500'}}>Cật nhật hồ sơ</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        backgroundColor:'white',
        marginBottom:10
    },
    avatar: {
        width: '30%',
        alignContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 90,
        width: 90
    },
    name: {
        alignContent: 'center',
        justifyContent:'center',
        padding:10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 5,
        borderRadius: 20,
        margin:5
    },
})