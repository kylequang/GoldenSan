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
            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'red' }}>Chưa có Thợ {props.job} {props.title} ở khu vực bạn</Text>
            <Text style={{ fontSize: 15, fontWeight: 'bold',color:'black'}}>Vui lòng quay lại sau</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    img: {
        height: '70%',
        width: '100%',
    },

});