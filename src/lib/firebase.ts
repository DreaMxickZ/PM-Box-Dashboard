import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBfstxaiGeywhe41qiGV6M0wgl6l32yHGo",
    authDomain: "pm-box-data-visual.firebaseapp.com",
    databaseURL: "https://pm-box-data-visual-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "pm-box-data-visual",
    storageBucket: "pm-box-data-visual.firebasestorage.app",
    messagingSenderId: "422711023420",
    appId: "1:422711023420:web:3e163bf418ff6c5132b039",
    measurementId: "G-XVZQ7QRW3W"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);