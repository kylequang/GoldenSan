import React, { useState } from "react";
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Switch,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderUser from "../../components/HeaderUser";
import { auth } from '../../database/firebase';
import { NativeModules } from "react-native"

export default function More({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={{ textAlign: 'center', fontSize: 28, paddingBottom: 10 }}>Xin Chào!</Text>
                <HeaderUser />
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <FontAwesome5 name={'cog'} color="black" size={25} />
                            <Text style={{ marginLeft: 15, fontSize: 18 }}>Lịch Sử Sữa Chữa</Text>
                        </View>
                        <View>
                            <Ionicons name="arrow-forward" size={19} color={"#0D0A03"} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <FontAwesome5 name={'comments'} color="black" size={25} />
                            <Text style={{ marginLeft: 15, fontSize: 18 }}>Đóng góp tính năng Golden Sand</Text>
                        </View>
                        <View>
                            <Ionicons name="arrow-forward" size={19} color={"#0D0A03"} />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <FontAwesome5 name={'phone-alt'} color="black" size={25} />
                            <Text style={{ marginLeft: 15, fontSize: 18 }}>Liên Hệ với Golden Sand</Text>
                        </View>
                        <View>
                            <Ionicons name="arrow-forward" size={19} color={"#0D0A03"} />
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.BtnItem}
                        onPress={
                            () => {
                                auth.signOut().then(() => { console.log("Sign out") })
                                AsyncStorage.clear().then(() => console.log('Cleared'))
                              
                                NativeModules.DevSettings.reload();
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