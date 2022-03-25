import { View, Image, StyleSheet } from 'react-native';
import React from 'react'
export default function ScanLoadingLocation() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={require('../../../assets/animation/radar.gif')}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    img: {
        height: '70%',
        width: '100%',
    },

});