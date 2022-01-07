import {initializeApp} from 'firebase/app'
import {getAuth, } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD9Tr2rrRrcspn9hfcO-27qqDdzNlvtlRo",
    authDomain: "fourpeaks-sc.firebaseapp.com",
    projectId: "fourpeaks-sc",
    storageBucket: "fourpeaks-sc.appspot.com",
    messagingSenderId: "740169779172",
    appId: "1:740169779172:web:2159a61789440068c169f1",
    measurementId: "G-2CQL4SVEZ2"
};

//     apiKey: process.env.REACT_APP_FIREABSE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     appId: process.env.REACT_APP_FIREABSE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// })

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)