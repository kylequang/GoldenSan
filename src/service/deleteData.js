import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../src/database/firebase';


export const deleteDocument = async (nameCollection, id) => {
    await deleteDoc(doc(db, nameCollection, id));
}