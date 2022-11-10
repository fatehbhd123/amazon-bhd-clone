const firebaseConfig = {
    apiKey: "AIzaSyBNKfWGS90PTMeoVJr4IKH5rQFcrnQBFGQ",
    authDomain: "clone-bhd.firebaseapp.com",
    projectId: "clone-bhd",
    storageBucket: "clone-bhd.appspot.com",
    messagingSenderId: "854607285542",
    appId: "1:854607285542:web:042e5a1854dd16cb5745e7"
};
import firebase from 'firebase/app';
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }