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
import { NativeModules } from "react-native"

export default function Manage({ navigation }) {
    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <Text style={styles.name}>John Doe</Text>
                        <Text style={styles.info}>UX Designer / Mobile developer</Text>
                        <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>

                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text>Opcion 2</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.BtnItem}
                        onPress={
                            async () => {
                                auth.signOut().then(() => { console.log("Sign out") })
                                await AsyncStorage.clear().then(() => console.log('Cleared'))

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