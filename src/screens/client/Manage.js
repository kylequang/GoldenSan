import React, { useState } from "react";
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from '../../database/firebase';


export default function Manage({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>
                <Text>Quản lí tài khoản</Text>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.BtnItem}
                        onPress={
                            async () => {
                                auth.signOut().then(() => { console.log("Sign out") })
                                await AsyncStorage.clear().then(() => console.log('Cleared'))
                                navigation.navigate('Auth')
                            }}>
                        <Text style={styles.leftContent}>Logout</Text>
                        <View style={styles.rightContent}>
                            <Ionicons name="log-out-outline" size={19} color={"black"} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#F7F8F9",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15
    },
    contentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'yellow',
    },

    BtnItem: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        fontSize: 14,
        marginRight: 5,
    },

    block: {
        paddingVertical: 5,
        paddingHorizontal: 9,
        backgroundColor: "#ffff",
        flexDirection: "column",
        flexWrap: "wrap",
        marginBottom: 12,
    },

    footer: {
        paddingVertical: 5,
        paddingHorizontal: 9,
        backgroundColor: "#ffff",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    rightContent: {
        padding: 11,
    },
    leftContent: {
        color: "black",
        padding: 11,
    },
    boldText: {
        color: "#2D1F21",
        fontWeight: "700",
    },
});