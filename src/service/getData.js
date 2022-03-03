import { View, Text } from 'react-native'
import React from 'react'

import { collection, getDocs,query, where } from 'firebase/firestore'
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

