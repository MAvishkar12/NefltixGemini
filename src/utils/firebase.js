// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDypzrnSAPYgempGk3rT-V3apkLzkHkRpY",
  authDomain: "netflix-20e70.firebaseapp.com",
  projectId: "netflix-20e70",
  storageBucket: "netflix-20e70.appspot.com",
  messagingSenderId: "984943430612",
  appId: "1:984943430612:web:764ab5b0ef9d260307e441",
  measurementId: "G-NYC678C4HT",
};

// Initialize Firebase
 initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth();
