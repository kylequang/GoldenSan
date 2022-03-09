import { async } from '@firebase/util'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, getDoc, query, where, doc } from 'firebase/firestore'
import { db, auth } from '../../src/database/firebase'

export const getData = async (nameCollection) => {
  const data = []
  const querySnapshot = await getDocs(collection(db, nameCollection))
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  })
  return data;
}


export const getDetailRepairmen = async (role) => {
  const data = [];
  const queryJobRepairmen = query(collection(db, 'repairmen'), where('role', "==", role));
  const querySnapshot = await getDocs(queryJobRepairmen)
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  })
  return data;
}


export const phoneCheckAccountSurvive = async (phoneNumber) => {
  const { docs } = await db
    .collection('client')
    .where('phoneNumber', '==', phoneNumber)
    .get()
  return docs.map((doc) => doc.data());
}

export const checkAccountSurvive = async (nameCollection, uid) => {
  const docRef = doc(db, nameCollection, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const getRoleUserAsyncStorage = async () => {
  const jsonValue = await AsyncStorage.getItem('newUser')
  return jsonValue != null ? JSON.parse(jsonValue) : null
}