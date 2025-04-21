'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function StatusPage() {
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (!user) return router.push('/login');

      const q = query(
        collection(db, 'applications'),
        where('email', '==', user.email),
        orderBy('timestamp', 'desc')
      );

      const snapUnsub = onSnapshot(q, (snap) => {
        const apps = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (apps.length > 0) {
          setApplication(apps[0]);
        }
        setLoading(false);
      });

      return () => snapUnsub();
    });

    return () => unsub();
  }, [router]);

  if (loading) return <div className="p-6">Loading status...</div>;

  if (!application) {
    return <div className="p-6">No application found. Please apply first.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Application Status</h1>
      <div className="bg-white p-6 rounded-xl shadow border space-y-3">
        <p><strong>Wallet:</strong> {application.walletAddress}</p>
        <p><strong>Score:</strong> {application.score ?? 'Pending'}</p>
        <p><strong>Eligibility:</strong> {application.eligible ? '✅ Eligible' : '❌ Not Eligible'}</p>
        <p><strong>Disbursed:</strong> {application.disbursed ? '✅ XLM Sent' : '⌛ Not Yet'}</p>
        {application.feedback && (
          <p><strong>Feedback:</strong> {application.feedback}</p>
        )}
      </div>
    </div>
  );
}
