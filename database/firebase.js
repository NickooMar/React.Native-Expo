import firebase from "firebase";

import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDw6lDKzigT5SLjmdcgSP8FhNHRWsqVhEY",
  authDomain: "react-native-firebase-a12ea.firebaseapp.com",
  databaseURL: "https://react-native-firebase-a12ea.firebaseio.com",
  projectId: "react-native-firebase-a12ea",
  storageBucket: "react-native-firebase-a12ea.appspot.com",
  messagingSenderId: "424100050043",
  appId: "1:424100050043:web:8547d48c6b4ea37c101ede",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};
