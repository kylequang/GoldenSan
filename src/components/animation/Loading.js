import { View, Text, ActivityIndicator, StyleSheet,Image } from 'react-native'
import React from 'react'

export default function Loading() {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={70} color="#ff6600" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});