import { collection,addDoc } from 'firebase/firestore'
import { db} from '../../src/database/firebase'
export const putOrder = async (data) => {
    // Add a new document with a generated id.
    await addDoc(collection(db, "order"), data);
}
export const pushData = async (nameCollection, object) => {
    await addDoc(collection(db, nameCollection), object);
}