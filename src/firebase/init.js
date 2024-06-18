// firebase/init.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // Import getStorage for Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDpWJr-vcfNiQRpNNH3lYNGZV4Ego5qRvQ',
  authDomain: 'test-3b4f1.firebaseapp.com',
  projectId: 'test-3b4f1',
  storageBucket: 'test-3b4f1.appspot.com',
  messagingSenderId: '131030931772',
  appId: '1:131030931772:web:17ab237dd8eca45cd1e639',
  measurementId: 'G-QZY7MW2NYW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

export { db, auth, storage }; // Export Firestore, Authentication, and Storage instances for use in your Vue components
