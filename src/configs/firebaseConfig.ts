import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
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


const authGoogleProvider = new GoogleAuthProvider();

const databaseRef = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export default Object.freeze({ auth, databaseRef })
export { auth, databaseRef , firebaseApp, authGoogleProvider }