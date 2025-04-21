'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { getAllApplications } from '@/lib/firestore';

export default function AdminDashboard() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('/login');
      } else {
        const data = await getAllApplications();
        setApps(data);
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading applications...</p>
      ) : apps.length === 0 ? (
        <p className="text-gray-500">No applications submitted yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {apps.map((app) => (
            <div key={app.id} className="p-4 bg-white border shadow rounded-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">Wallet: {app.walletAddress}</p>
                  <p className="text-sm text-gray-600">
                    Score: {app.score ?? 'N/A'} | Eligible: {app.eligible ? '✅' : '❌'} | Disbursed: {app.disbursed ? '✅' : '❌'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => router.push(`/admin/app/${app.id}`)}
                  >
                    View
                  </button>

                  <button
                    className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    disabled={app.evaluated}
                    // onClick={...futureEvaluateHandler}
                  >
                    Evaluate
                  </button>

                  <button
                    className="text-xs bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    disabled={!app.eligible || app.disbursed}
                    // onClick={...futureDisburseHandler}
                  >
                    Disburse
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
