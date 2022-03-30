import { doc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebase";

export const updateData = async (nameCollection, id, changStatus) => {
  await updateDoc(doc(db, nameCollection, id), {
    status: changStatus
  });
}

export const updateNotification = async (nameCollection, uid, data) => {
  await updateDoc(doc(db, nameCollection, uid), {
    notification: data
  })
}

export const updateRatingRepairmen = async (nameCollection, uid, data) => {
  await updateDoc(doc(db, nameCollection, uid), {
    totalAVG: data.totalAVG,
    totalCount: data.totalCount,
    totalScore: data.totalScore
  })
}

export const updateListWork = async (nameCollection, uid, data) => {
  console.log("Dữ liệu cập nhật",data);
  await updateDoc(doc(db, nameCollection, uid), {
    listWork: data
  })
}