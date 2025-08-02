import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // These will be set up by the user
  apiKey: "AIzaSyDIcIeCpVP7oshkUVvGcUmJxeuAJBcDXzY",
  authDomain: "barruu-a4214.firebaseapp.com",
  projectId: "barruu-a4214",
  storageBucket: "barruu-a4214.firebasestorage.app",
  messagingSenderId: "806163566580",
  appId: "1:806163566580:web:f7712adfcba081ee7e73a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;