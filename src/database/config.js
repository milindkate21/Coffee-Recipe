// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDM-30vU-9nohmH8aOehBfhzGUwYBfhhIU",
    authDomain: "coffee-recipe-a151d.firebaseapp.com",
    projectId: "coffee-recipe-a151d",
    storageBucket: "coffee-recipe-a151d.appspot.com",
    messagingSenderId: "381127697475",
    appId: "1:381127697475:web:3df020f8b46994ce5be0f6",
    measurementId: "G-6S8KR75K78"
  };

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

export { auth, database,storage };
