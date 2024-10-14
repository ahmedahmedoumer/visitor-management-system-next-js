// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

// export const firebaseConfig: Record<string, string> = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMIAN as string,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET as string,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID as string,
//   appId: process.env.NEXT_PUBLIC_APP_ID as string,
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
// export const microsoftProvider = new OAuthProvider('microsoft.com');

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMIAN as string,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET as string,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID as string,
  appId: process.env.NEXT_PUBLIC_APP_ID as string,
};

// Initialize Firebase

 const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export const googleProvider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');
