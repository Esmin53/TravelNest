// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_vbDHTlprJ43LyzQExnAHpL-9VKsmZFY",
  authDomain: "travel-nest-3cb7c.firebaseapp.com",
  projectId: "travel-nest-3cb7c",
  storageBucket: "travel-nest-3cb7c.appspot.com",
  messagingSenderId: "993061388828",
  appId: "1:993061388828:web:b5435fb472508e26c095d9",
  measurementId: "G-MRZW2HXQ6S"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);