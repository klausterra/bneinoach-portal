import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

/** Config pública do Firebase Web App hipercube-dev-train. */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBr-QoJasxWE15yBPXOHCEvEkb25lNU9Oo',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'hipercube-dev-train.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'hipercube-dev-train',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    'hipercube-dev-train.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '488155064180',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:488155064180:web:1f40f7fd3b8ed5c4692e21',
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
)

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(app)
