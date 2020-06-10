import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// const  firebaseConfig = {
//     apiKey: "AIzaSyD0RWTw5Rp3BxcqcxMGAOxxUxdAElFjlz8",
//     authDomain: "chat-app-d8550.firebaseapp.com",
//     databaseURL: "https://chat-app-d8550.firebaseio.com",
//     projectId: "chat-app-d8550",
//     storageBucket: "chat-app-d8550.appspot.com",
//     messagingSenderId: "784023948085",
//     appId: "1:784023948085:web:bc7b539d0ba331dca81a7c"
//   };
//   const appFirebase = firebase.initializeApp(firebaseConfig);
const appFirebase = firebase.initializeApp({
    apiKey: "AIzaSyD0RWTw5Rp3BxcqcxMGAOxxUxdAElFjlz8",
    authDomain: "chat-app-d8550.firebaseapp.com",
    databaseURL: "https://chat-app-d8550.firebaseio.com",
    projectId: "chat-app-d8550",
    storageBucket: "chat-app-d8550.appspot.com",
    messagingSenderId: "784023948085",
    appId: "1:784023948085:web:bc7b539d0ba331dca81a7c"
  });
  
  export default appFirebase;
  