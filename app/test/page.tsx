"use client"
import { auth, db } from "../firebase";
import { signIn, signUp, handleSignOut, createUserProfile } from "../firebase";
import type { ProfileData } from "../firebase";

const exampleData: ProfileData = {
  id: "michael",
  email: "michael@gmail.com",
  name: "Michael Lee",
  year: "sophomore",
  major: "Stats & CS",
  bio: "I like coding",
  projectIdea: "Founder matching app",
  skills: ["JavaScript", "React"],
  createdAt: new Date(Date.now()),
};
const Test = () => {

  return (
    <div>
      <button className="btn btn-neutral" onClick={() => signUp(auth, "michael@gmail.com", "password123").then(cred => console.log("Signed up:", cred.user.email)).catch(err => console.error("Sign up failed:", err.code))}>Sign Up</button>
      <button className="btn btn-neutral" onClick={() => signIn(auth, "michael@gmail.com", "password123").then(user => console.log("Signed in:", user.email)).catch(err => console.error("Sign in failed:", err.code))}>Sign In</button>
      <button className="btn btn-neutral" onClick={() => handleSignOut(auth).then(() => console.log("Signed out")).catch(err => console.error("Sign out failed:", err.code))}>Sign Out</button>
      <button className="btn btn-neutral" onClick={() => createUserProfile("michael", exampleData, db).then(() => console.log("Profile created for:", exampleData.email)).catch(err => console.error("Profile creation failed:", err.code))}>Create User Profile</button>
    </div>
  )
}

export default Test