import { collection, getDocs, getDoc, query, where } from 'firebase/firestore'
import { db } from '../../src/database/firebase'

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
       // db
        //     .collection('client')
        //     // Filter results
        //     .where('role', '==','user')
        //     .limit(1)
        //     .get()
        //     .then(querySnapshot => {
        //         querySnapshot.forEach(documentSnapshot => {
        //             console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        //             console.log('hi')
        //         });
        //     });
}

