import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAfcYaJT2yCcEY9xjhf2MA_ylwvArSuDSU",
  authDomain: "market-place-5767c.firebaseapp.com",
  projectId: "market-place-5767c",
  storageBucket: "market-place-5767c.appspot.com",
  messagingSenderId: "51019764006",
  appId: "1:51019764006:web:4eae561f926a6d682231e7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)