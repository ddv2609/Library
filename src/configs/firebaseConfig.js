// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChK6sn56l5HKZ-bZzT0vk1bd3eSsa1FKc",
  authDomain: "library-cb5ed.firebaseapp.com",
  projectId: "library-cb5ed",
  storageBucket: "library-cb5ed.appspot.com",
  messagingSenderId: "591640301525",
  appId: "1:591640301525:web:b0ec1d10c42f410748775c",
  measurementId: "G-HQ293TS9Q5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const auth = getAuth(app);
export default storage;