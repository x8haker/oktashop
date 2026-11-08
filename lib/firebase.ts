// Firebase (аутентификация покупателей + история заказов).
//
// Веб-конфиг Firebase — не секрет: apiKey идентифицирует приложение,
// а реальный доступ определяется правилами Firestore (см. firestore.rules).
// Значения зашиты как дефолты (публичны по природе веб-приложений Firebase),
// но могут быть переопределены через NEXT_PUBLIC_FIREBASE_* env.
import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    "AIzaSyA71x2VaDsH3xAeSlwjXgvxexMvETFCe78",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    "oktashop-c36d1.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "oktashop-c36d1",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "oktashop-c36d1.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "649571939363",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    "1:649571939363:web:8aacf9626ed2ff5b5aad96",
};

/** false, пока конфиг не заполнен — аутентификация мягко отключается. */
export const firebaseReady = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let app: FirebaseApp | null = null;
if (firebaseReady) {
  app = getApps()[0] ?? initializeApp(firebaseConfig);
}

export const auth: Auth | null = firebaseReady ? getAuth(app!) : null;
export const db: Firestore | null = firebaseReady ? getFirestore(app!) : null;
