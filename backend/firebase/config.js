import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV3oT4zWS_zD79ngkDn_2D_1j42rbxG8Y",
  authDomain: "fir-recetas-d6d31.firebaseapp.com",
  projectId: "fir-recetas-d6d31",
  storageBucket: "fir-recetas-d6d31.appspot.com",
  messagingSenderId: "1028848992944",
  appId: "1:1028848992944:web:91e65fbfd0c63993b7b175"

};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Storage
const storage = getStorage(app);

export { app, storage };