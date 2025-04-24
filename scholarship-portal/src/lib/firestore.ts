import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  enableNetwork,
} from "firebase/firestore";

/**
 * Ensure Firestore is online before any operation.
 */
async function ensureFirestoreOnline() {
  try {
    await enableNetwork(db);
  } catch (err) {
    console.warn("Firestore may already be online or failed to enable:", err);
  }
}

/**
 * Fetch all applications ordered by timestamp (descending).
 */
export async function getAllApplications() {
  try {
    const appsQuery = query(
      collection(db, "applications"),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(appsQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error: any) {
    console.error("Error fetching applications:", error.message);
    throw error;
  }
}

/**
 * Test Firestore connection by reading a test collection.
 */
export async function testFirestoreConnection() {
  try {
    await ensureFirestoreOnline();

    const snapshot = await getDocs(collection(db, "test"));
    console.log(
      "Firestore connection successful:",
      snapshot.docs.map((doc) => doc.data())
    );
  } catch (error: any) {
    console.error("Firestore connection failed:", error.message);
  }
}
