import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const databaseRef = getDatabase(app);

const googleAuthProvider = getAuth(app)

export {
    databaseRef,
    googleAuthProvider,
    firebase
}