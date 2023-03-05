// Firebase configuration

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

class Firebase {

    private _firebaseConfig: object
    public app: any
    constructor( firebaseConfig: object) {
        this._firebaseConfig = firebaseConfig;
        this.app = initializeApp(firebaseConfig);
    }

}

const myFirebase = new Firebase({
    apiKey: "AIzaSyARxkaimi8XP2OYqci8XMYU-PFyhhtMvr0",
    authDomain: "survival-server-org.firebaseapp.com",
    projectId: "survival-server-org",
    storageBucket: "survival-server-org.appspot.com",
    messagingSenderId: "45781323100",
    appId: "1:45781323100:web:e952c1b5e78ca255764599",
    measurementId: "G-Y8E982JSFL"});

const app = myFirebase.app;
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

