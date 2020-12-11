import firebase from "firebase";

const config = require('./config')

import "firebase/firestore";

var firebaseConfig = config;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db,
};
