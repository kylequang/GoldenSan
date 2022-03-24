import { async } from '@firebase/util';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


import { collection, addDoc,setDoc ,doc} from 'firebase/firestore'
import { db } from '../../src/database/firebase';

export const putOrder = async (data) => {
    // Add a new document with a generated id.
    await addDoc(collection(db, "order"), data);
}


export const pushData = async (nameCollection, object) => {
    await addDoc(collection(db, nameCollection), object);
}


export const setDocument =async (nameCollection, uid, data) => {
    // Add a new document in collection "cities"
    await setDoc(doc(db, nameCollection, uid), data);
}



//Notification

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export async function schedulePushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
            data: { data: 'goes here' },
        },
        trigger: { seconds: 1 },
    });
}

// get permission Notification
async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            console.log("existingStatus", existingStatus)
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            console.log("finalStatus", finalStatus)
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            showBadge: true,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FE9018',
        });
    }

    return token;
}

