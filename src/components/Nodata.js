import { View, Text, StyleSheet ,Image} from 'react-native'
import React from 'react'

export default function Nodata(props) {
    return (
        <View style={styles.container}>
           
            <Text style={{ fontSize: 16 }}>Chưa Có {props.content} Nào</Text>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:'center',
        backgroundColor:'red'
    },
})