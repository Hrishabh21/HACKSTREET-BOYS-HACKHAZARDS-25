'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getApplicationById } from '@/lib/get-application';
import { auth } from '@/lib/firebase';

export default function ApplicationDetails() {
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) return router.push('/login');
      if (!id || typeof id !== 'string') return;

      const data = await getApplicationById(id);
      setApp(data);
      setLoading(false);
    });

    return () => unsub();
  }, [id, router]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!app) return <div className="p-6">Application not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Application Details</h2>

      <div className="bg-white shadow p-4 rounded-xl border space-y-4">
        <div>
          <p className="text-sm text-gray-600">Wallet Address:</p>
          <p className="font-mono">{app.walletAddress}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Essay:</p>
          <p className="whitespace-pre-line">{app.essay}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Score: <span className="font-semibold">{app.score ?? 'N/A'}</span></div>
          <div>Eligible: <span className="font-semibold">{app.eligible ? '✅' : '❌'}</span></div>
          <div>Evaluated: <span className="font-semibold">{app.evaluated ? '✅' : '❌'}</span></div>
          <div>Disbursed: <span className="font-semibold">{app.disbursed ? '✅' : '❌'}</span></div>
        </div>

        {app.feedback && (
          <div>
            <p className="text-sm text-gray-600">Feedback:</p>
            <p className="italic">"{app.feedback}"</p>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            disabled={app.evaluated}
            className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm"
          >
            Evaluate
          </button>

          <button
            disabled={!app.eligible || app.disbursed}
            className="bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm"
          >
            Disburse
          </button>
        </div>
      </div>
    </div>
  );
}
