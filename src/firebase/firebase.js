import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4pXiZmalnp1k5BhEuGp5yB9bqj53IvaE",
  authDomain: "todo-app-bcd0b.firebaseapp.com",
  projectId: "todo-app-bcd0b",
  storageBucket: "todo-app-bcd0b.appspot.com",
  messagingSenderId: "903661698053",
  appId: "1:903661698053:web:9039aa07f1075bef51f06c",
  measurementId: "G-FMH3FS4LF7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();