import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_LISTA_GASTOS_APIKEY,
  authDomain: process.env.REACT_APP_LISTA_GASTOS_AUTHDOMAIN,
  projectId: process.env.REACT_APP_LISTA_GASTOS_PROJECTID, 
  storageBucket: process.env.REACT_APP_LISTA_GASTOS_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_LISTA_GASTOS_STORAGEBUCKET,
  appId: process.env.REACT_APP_LISTA_GASTOS_STORAGEBUCKET
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {db, auth}