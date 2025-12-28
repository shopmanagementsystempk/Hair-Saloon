import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
    //   apiKey: "YOUR_API_KEY",
    //   authDomain: "YOUR_AUTH_DOMAIN",
    //   projectId: "YOUR_PROJECT_ID",
    //   storageBucket: "YOUR_STORAGE_BUCKET",
    //   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    //   appId: "YOUR_APP_ID"

    apiKey: "AIzaSyCAnIwTFZbwN202oFP5ArY_-xV_nrO874w",
    authDomain: "hair-saloon-564c6.firebaseapp.com",
    projectId: "hair-saloon-564c6",
    storageBucket: "hair-saloon-564c6.firebasestorage.app",
    messagingSenderId: "606522261314",
    appId: "1:606522261314:web:ed5ed19eb6a6e106cf12db",
    measurementId: "G-CWNYHT150E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
