import { async } from '@firebase/util'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, getDoc, query, where, doc, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../../src/database/firebase'
import { getPreciseDistance } from 'geolib';


import * as Location from 'expo-location';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


// get collection
export const getData = async (nameCollection) => {
  const data = []
  const querySnapshot = await getDocs(collection(db, nameCollection))
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  })
  return data;
}

//get an document by uid
export const getAnDocument = async (nameCollection, idDocument) => {
  const docRef = doc(db, nameCollection, idDocument);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}


// get uid of current user 
export const getUidUser = async () => {
  const dataUser = await AsyncStorage.getItem('dataUser');
  const currentUser = dataUser != null ? JSON.parse(dataUser) : 'null';
  return currentUser.user.uid;
}


//get current user 
export const getCurrentUser = async () => {
  const data = await AsyncStorage.getItem('dataUser');
  const currentUser = data != null ? JSON.parse(data) : 'null';
  const dataUser = await getAnDocument('client', currentUser.user.uid);
  return dataUser;
}

// get and query order
export const getQueryCollection = async (nameCollection, role, status, condition, uid) => {
  const data = [];
  const queryOrder = query(collection(db, nameCollection), where(role, "==", uid), where(status, "==", condition));
  const querySnapshot = await getDocs(queryOrder)
  querySnapshot.forEach((doc) => {
    const object = {
      order: doc.data(),
      id: doc.id
    }
    data.push(object)
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





//get current location
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
export const scanLocation = async (job, distance, score) => {
  console.log("Quét vị trí");
  const currentLocation = await getCurrentLocation();
  const listRepairmen = await getData('repairmen');
  const dataRepairmen = [];
  listRepairmen && listRepairmen.map(item => {
    if (calculatePreciseDistance(
      { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
      , { latitude: item.detailLocation.latitude, longitude: item.detailLocation.longitude }) <= distance && item.job === job && item.totalAVG >= score) {
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





// REAL TIME

//get realtime a collection 
export const getRealtimeQueryACollection = (callback, nameCollection, conditionField, uidUser) => {
  const data = [];
  const queryCollection = query(collection(db, nameCollection), where(conditionField, "==", uidUser));
  onSnapshot(queryCollection, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const object = {
        order: doc.data(),
        id: doc.id
      }
      data.push(object);
    });
    callback(data);
  });
}
// get realtime an document
export const getRealtimeAnDocument = (callback, nameCollection, ui) => {
  const dataRef = doc(db, nameCollection, ui);
  onSnapshot(dataRef, (doc) => {
    callback(doc.data());
  })
}