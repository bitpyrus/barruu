import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // These will be set up by the user
  apiKey: "demo-api-key",
  authDomain: "barruu-demo.firebaseapp.com",
  projectId: "barruu-demo",
  storageBucket: "barruu-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;