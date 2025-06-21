// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API,
  authDomain: VITE_AUTH_DOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDERID,
  appId: VITE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


console.log(app)