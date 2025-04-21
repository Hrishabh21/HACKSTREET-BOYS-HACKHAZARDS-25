// src/lib/auth.ts
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export async function loginAdmin(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signupAdmin(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function logoutAdmin() {
  return await signOut(auth);
}
