import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { getAuth } from 'firebase/auth';

export async function submitApplication(walletAddress: string, essay: string) {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user?.email || '';

  const ref = collection(db, 'applications');
  const newApp = {
    walletAddress,
    essay,
    email,
    evaluated: false,
    eligible: false,
    disbursed: false,
    score: null,
    feedback: '',
    timestamp: serverTimestamp(),
  };

  await addDoc(ref, newApp);
}
