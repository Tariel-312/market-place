import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBJ7yx6L0PwZmS-sJEQYzuLoziAYuGSYPA",
  authDomain: "applestore-bb8db.firebaseapp.com",
  projectId: "applestore-bb8db",
  storageBucket: "applestore-bb8db.appspot.com",
  messagingSenderId: "1005127877690",
  appId: "1:1005127877690:web:0ff286302ed7b9a6d26103"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)