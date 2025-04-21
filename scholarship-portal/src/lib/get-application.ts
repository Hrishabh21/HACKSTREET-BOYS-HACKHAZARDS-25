// src/lib/get-application.ts
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getApplicationById(id: string) {
  const ref = doc(db, "applications", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}
