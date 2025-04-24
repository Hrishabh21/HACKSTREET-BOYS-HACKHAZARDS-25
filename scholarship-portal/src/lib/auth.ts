import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  enableNetwork,
} from "firebase/firestore";
import { auth, db } from "./firebase";

// ✅ Hardcoded Admin UID
const ADMIN_UID = "r6nGqXyB3pgW5MTAfQFNBFcbrIT2";

/**
 * Sign up a new student user and store their data in Firestore.
 */
export const handleSignUp = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      fullName,
      email,
      userType: "student",
      createdAt: serverTimestamp(),
    });

    console.log("User signed up and saved in Firestore!");
    return { success: true, uid: user.uid };
  } catch (error: any) {
    console.error("Signup error:", error.code);

    let errorMessage = "Something went wrong. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "This email is already registered. Please log in.";
        break;
      case "auth/invalid-email":
        errorMessage = "Please enter a valid email address.";
        break;
      case "auth/weak-password":
        errorMessage = "Password should be at least 6 characters.";
        break;
      default:
        errorMessage = error.message;
        break;
    }

    return { success: false, error: errorMessage };
  }
};

/**
 * Create a minimal user document in Firestore for a given user.
 */
const createMinimalUserDoc = async (user: any) => {
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    userType: "student",
    createdAt: serverTimestamp(),
  });
};

/**
 * Log in an existing user and determine userType based on UID or Firestore.
 * If user document is missing, create a minimal user document.
 */
export const handleLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await enableNetwork(db);

    if (user.uid === ADMIN_UID) {
      return {
        success: true,
        uid: user.uid,
        userType: "admin",
      };
    }

    // Check Firestore if student data exists
    const docRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      // Create minimal user document if missing
      await createMinimalUserDoc(user);
      return {
        success: true,
        uid: user.uid,
        userType: "student",
        warning: "User document was missing and has been created.",
      };
    }

    const userType = userDoc.data()?.userType || "student";

    return {
      success: true,
      uid: user.uid,
      userType,
    };
  } catch (error: any) {
    console.error("Login error:", error.message);
    return {
      success: false,
      error: error.message || "Login failed.",
    };
  }
};
