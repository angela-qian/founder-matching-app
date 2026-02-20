// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  UserCredential,
  User,
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Firestore, doc, setDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function signIn(
  auth: Auth,
  email: string,
  password: string,
): Promise<User> {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      return user;
    })
    .catch((error) => {
      console.log("Error signing in:", error);
      throw error;
    });
}

async function signUp(
  auth: Auth,
  email: string,
  password: string,
): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential;
    })
    .catch((error) => {
      console.error("Error creating user", error);
      throw error;
    });
}

// calls setDoc on db collection users with the uid as document ID, writes all the profile fields
interface ProfileData {
  id: string;
  email: string;
  name: string;
  year: "freshman" | "sophomore" | "junior" | "senior";
  major: string;
  bio: string;
  projectIdea: string;
  skills: string[];
  createdAt: Date;
}

async function createUserProfile(
  uid: string,
  profileData: ProfileData,
  db: Firestore,
): Promise<void> {
  await setDoc(doc(db, "users", uid), {
    id: profileData.id,
    email: profileData.email,
    name: profileData.name,
    year: profileData.year,
    major: profileData.major,
    bio: profileData.bio,
    projectIdea: profileData.projectIdea,
    skills: profileData.skills,
    createdAt: profileData.createdAt,
  });
}

async function handleSignOut(auth: Auth): Promise<void> {
  try {
    await signOut(auth);
    // Successfully signed out
    // You can add additional cleanup here like:
    // - Clearing local storage
    // - Redirecting to login page
    // - Resetting app state
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export { app, auth, db };

export { signIn, signUp, handleSignOut, createUserProfile };

export type { ProfileData };
