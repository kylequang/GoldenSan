import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

export default function DetailRepaimen({ navigation, route }) {

    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Image style={styles.img} source={route.params.item.image} />
            </View>
            <View style={styles.card}>
                <Text style={{fontSize:25,fontWeight:'bold'}}>{route.params.item.name}</Text>
                <Text>{route.params.item.address}</Text>
                <View>
                    <Text>{route.params.item.count} đánh giá</Text>
                </View>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.contact}>
                        <Text>hi</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.contact}>
                <Text>hi</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.contact}>
                <Text>hi</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems:'center'
    },
    row:{
        flexDirection:'row'
    },
    avatar: {
        backgroundColor: 'yellow',
        width: '100%',
        alignItems: 'center',
        padding: 10,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        marginBottom:10
    },
    img: {
        height: 100,
        width: 100
    },
    card:{
        backgroundColor: 'white',
        width: '90%',
        alignItems: 'center',
        padding: 10,
        borderRadius:15,
        marginBottom:10
    },
    contact:{
       
            alignItems: 'center',
            marginBottom: 15,
            padding: 15,
            backgroundColor: 'white',
            borderRadius: 150,
            height:70,
            width:70
  
    }
})