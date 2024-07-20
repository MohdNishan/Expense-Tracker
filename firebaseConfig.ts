
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxpRKfwdFo4o8exSOFgtIDNACfx9mC2P4",
  authDomain: "web-app-4c530.firebaseapp.com",
  projectId: "web-app-4c530",
  storageBucket: "web-app-4c530.appspot.com",
  messagingSenderId: "352894237879",
  appId: "1:352894237879:web:384d249a195ea6d82ca132"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {storage}