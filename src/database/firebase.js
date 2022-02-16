import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyB7DFDID-iY1J61YPG3sNmEzhWQ_9g6Hsw",
    authDomain: "graduationproject-b2c00.firebaseapp.com",
    projectId: "graduationproject-b2c00",
    storageBucket: "graduationproject-b2c00.appspot.com",
    messagingSenderId: "956746569611",
    appId: "1:956746569611:web:a24a169ebd09d98c03818e",
    measurementId: "G-VM0PNHFML0"
};
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const auth = firebase.auth();

export { db, auth,firebase };