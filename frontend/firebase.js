import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGDWefuCM6Vsk0wGZ-3tQAUGCp_yUfNSA",
  authDomain: "movie-website-71836.firebaseapp.com",
  projectId: "movie-website-71836",
  storageBucket: "movie-website-71836.appspot.com",
  messagingSenderId: "761212207719",
  appId: "1:761212207719:web:c959b1d78997acc55e4ac2",
  measurementId: "G-D612YPEG4M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
