// src/lib/firestore.ts
import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function getAllApplications() {
  const snapshot = await getDocs(query(collection(db, "applications"), orderBy("timestamp", "desc")));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
