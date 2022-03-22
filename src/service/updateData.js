import { doc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebase";

export const updateData = async (nameCollection, id, changStatus) => {

  // Set the "capital" field of the city 'DC'
  await updateDoc(doc(db, nameCollection, id), {
    status: changStatus
  });
}