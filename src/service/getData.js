import { async } from '@firebase/util'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, getDoc, query, where, doc, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../../src/database/firebase'
import { getPreciseDistance } from 'geolib';


import * as Location from 'expo-location';
import Constants from 'expo-constants';

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

export const getLocationRepairmen = async () => {
  const data = [];
  const location = collection(db, "repairmen");
  const querySnapshot = await getDocs(location);
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  })
  return data;
}


export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Quyền Truy Cập Bị Từ Chối');
    return;
  }
  const location = await Location.getCurrentPositionAsync({});
  return location;
}

//calculator distance
const calculatePreciseDistance = (currentLocation, repairmenLocation) => {
  var distance = getPreciseDistance(currentLocation, repairmenLocation);
  return distance / 1000
};

// scan location near you
export const scanLocation = async () => {
  const currentLocation = await getCurrentLocation();
  const listRepairmen = await getData('repairmen');
  const dataRepairmen = [];
  listRepairmen && listRepairmen.map(item => {
    if (calculatePreciseDistance(
      { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
      , { latitude: item.detailLocation.latitude, longitude: item.detailLocation.longitude }) <=1) {
      dataRepairmen.push(item);
    }
  })
  return dataRepairmen;
}









export const getAllRealTimeRepairmen = (callback) => {
  const repairmen = [];
  const getDataCollection = collection(db, 'repairmen');
  onSnapshot(getDataCollection, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      repairmen.push(doc.data());
    })
    callback(repairmen)
  })

}


export const getRealTimeLocationRepairmen = (callback) => {
  const location = [];
  const q = collection(db, "repairmen");
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      location.push(doc.data());
    });
    callback(location)
  });

}