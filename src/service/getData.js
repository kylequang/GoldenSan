import { async } from '@firebase/util'
import { collection, getDocs, getDoc, query, where,doc } from 'firebase/firestore'
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
export const checkAccountSurvive = async (uid) => {
  const docRef = doc(db, 'client', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
  return false;
  }
}

export const getCurrentUser = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(user)
    }
  });
}