import { View, Image,StyleSheet } from 'react-native';
import React from 'react'

export default function RepainerLoading() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={require('../../../assets/animation/repainerLoading.gif')}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:'center',
        backgroundColor:'white'
    },
    img:{
        height:'30%',
        width:'80%',
    },

});