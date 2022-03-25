import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
export default function NotificationApp() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return (
        <View>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="Nhấn để gửi thông báo"
                onPress={async () => {
                    await schedulePushNotification();
                }}
            />
        </View>
    );
}

async function schedulePushNotification() {
    // await Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: "HelpHouse Xin Thông Báo! 📬",
    //     body: 'Đơn hàng của bạn đã đặt lịch thành công !',
    //     data: { data: 'goes here' },
    //   },
    //   to: "ExponentPushToken[OSlpseIy52P6gSEHp__l1f]",
    //   trigger: { seconds: 1 },
    // });

    console.log('hihi');
    await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `key=AIzaSyADmgzD_ESR2S1ZZ3ShM6cmbB9X55UUuT0`,
        },
        body: JSON.stringify({
            to: 'ExponentPushToken[OSlpseIy52P6gSEHp__l1f]',
            priority: 'normal',
            data: {
                experienceId: '@kylequanghothikhua/graduate',
                scopeKey: '@kylequanghothikhua/graduate',
                title: "\uD83D\uDCE7 You've got mail",
                message: 'Hello world! \uD83C\uDF10',
            },
        }),
    });
}




async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);


    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    console.log(token);
    return token;
}