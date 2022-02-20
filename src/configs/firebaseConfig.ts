import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from 'firebase/database'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const databaseRef = getDatabase(firebaseApp);

const auth = getAuth(firebaseApp);

export default Object.freeze({ auth, databaseRef })
export { auth, databaseRef , firebaseApp }