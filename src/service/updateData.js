import { doc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebase";

export const updateData = async (nameCollection, id, changStatus) => {
  await updateDoc(doc(db, nameCollection, id), {
    status: changStatus
  });
}

export const updateNotification = async(nameCollection,uid,data)=>{
  await updateDoc(doc(db,nameCollection,uid),{
    notification: data
  })
}