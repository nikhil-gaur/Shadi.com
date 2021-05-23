import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyD8-kvyfL_k5bjS4_EzeVAT6Ccdsext_TQ",
    authDomain: "matrimonial-29b47.firebaseapp.com",
    projectId: "matrimonial-29b47",
    storageBucket: "matrimonial-29b47.appspot.com",
    messagingSenderId: "805108848040",
    appId: "1:805108848040:web:5aaa0544c6a1f3cb44399d",
    measurementId: "G-G7E4W5XMEB"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
  
export { auth };  