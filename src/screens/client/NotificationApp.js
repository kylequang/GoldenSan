import {StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react'
import CardNotification from '../../components/Cart/CardNotification';
import {  getRealtimeAnDocument, getUidUser } from '../../service/getData';

export default function NotificationApp() {
    const [listNotification, setListNotification] = useState([]);

    useEffect(async () => {
        const uid = await getUidUser();
        const dataNotification = getRealtimeAnDocument(setDataNotification, 'notification', uid)
        setListNotification(dataNotification)
    }, [])

    function setDataNotification(list) {
        setListNotification(list)
    }

    const renderItem = ({ item }) => (
        <CardNotification item={item} />
    )
    return (
        <SafeAreaView style={styles.container}>
            {
                listNotification && <FlatList data={listNotification.notifi} renderItem={renderItem} />
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f2f2f2'
    },
})


