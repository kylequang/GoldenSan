import { View, Text, StyleSheet, ScrollView, LogBox } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import ScanLoadingLocation from '../../components/animation/ScanLoadingLocation';
import {scanLocation } from '../../service/getData';

export default function ScanLocation() {
    const [loading, setLoading] = useState(true);
    const [repairmenNearYou, setRepairmenNearYou] = useState([]);
    useEffect(async () => {
        LogBox.ignoreLogs(['Setting a timer']);
        console.log("Goi useEffect");
        const data = await scanLocation();
        setRepairmenNearYou(data);
        setLoading(false)
    }, [])
    if (loading) return <ScanLoadingLocation />
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>Thợ Gần Bạn</Text>

            <ScrollView>
                {repairmenNearYou && repairmenNearYou.map((item, id) => (
                    <View key={id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text>{id} </Text>
                        <Text>{item.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})