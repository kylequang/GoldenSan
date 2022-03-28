import { View, Image, StyleSheet } from 'react-native';
import React from 'react'
export default function Loading() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={require('../../../assets/animation/loadingTime.gif')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor:'#ff9900'
    },
    img: {
        height: '20%',
        width: '60%',
    },

});