import { View, Image, Text, StyleSheet } from 'react-native';
import React from 'react'

export default function SadFaceStatus(props) {
    console.log(props.job);
    return (
        <View style={styles.container}>
            <Image
                style={styles.img}
                source={require('../../../assets/animation/notFound.gif')}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>Chưa có Thợ {props.job} ở {props.title} khu vực bạn</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold',color:'black'}}>Vui lòng quay lại sau</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        alignItems: 'center'
    },
    img: {
        height: '70%',
        width: '100%',
    },

});