import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyBIPxMFCVN9MwuLPxxCq8xUWvepVReMvtI",
    authDomain: "codex-web-de8dc.firebaseapp.com",
    projectId: "codex-web-de8dc",
    storageBucket: "codex-web-de8dc.appspot.com",
    messagingSenderId: "71176549914",
    appId: "1:71176549914:web:3e2f9087da72f83ac143a3"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app);
const functions = getFunctions(app)

export { auth, db, functions };