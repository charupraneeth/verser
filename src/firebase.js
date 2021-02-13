import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHk4O1yyz67UyWdPBjN0_7iOJ3I18hx2M",
  authDomain: "safepe-d8e02.firebaseapp.com",
  projectId: "safepe-d8e02",
  storageBucket: "safepe-d8e02.appspot.com",
  messagingSenderId: "580336241671",
  appId: "1:580336241671:web:b582f252b97f7b341beea2",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
// export const db = firebase.firestore();
// export const auth = firebase.auth();
// export const storage = firebase.storage();
