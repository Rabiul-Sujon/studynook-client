import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCs6BmIcyni5gTORELT3B6vE_5UV_U4VP8",
  authDomain: "studynook-a16f3.firebaseapp.com",
  projectId: "studynook-a16f3",
  storageBucket: "studynook-a16f3.firebasestorage.app",
  messagingSenderId: "191896944510",
  appId: "1:191896944510:web:ea56ebbf9cdb0a47b77d2f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;