// src/firebase.js
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAnKKcYRsZs4GmMv54Bm6XYld7O8-chVNU",
  authDomain: "careerpear-10c55.firebaseapp.com",
  databaseURL: "https://careerpear-10c55.firebaseio.com",
  projectId: "careerpear-10c55",
  storageBucket: "careerpear-10c55.appspot.com",
  messagingSenderId: "540600913367"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};

// export default firebase;