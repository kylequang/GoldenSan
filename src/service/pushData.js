import { async } from '@firebase/util'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, getDoc, query, where, doc, onSnapshot,addDoc } from 'firebase/firestore'
import { db, auth } from '../../src/database/firebase'
import { getPreciseDistance } from 'geolib';


import * as Location from 'expo-location';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const putOrder = async(data) => {
    // Add a new document with a generated id.
    await addDoc(collection(db, "order"), data );
}
