import { View, Text } from 'react-native'
import React from 'react'

import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../src/database/firebase'

export const getData = async (nameCollection) => {
  const data = []
  const querySnapshot = await getDocs(collection(db, nameCollection))
  querySnapshot.forEach((doc) => {
    data.push(doc.data())
  })
  return data;
}
export const getCheckLoginUser= async ()=>{

}