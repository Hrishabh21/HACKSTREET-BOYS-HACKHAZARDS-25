'use client';

import { useState } from 'react';
import { submitApplication } from '@/lib/submit-application';

export default function ApplyPage() {
  const [wallet, setWallet] = useState('');
  const [essay, setEssay] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet || !essay) return;
    setLoading(true);
    try {
      await submitApplication(wallet, essay);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting application:', err);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Application Submitted ✅</h2>
        <p className="text-sm text-gray-600">You will be notified upon evaluation.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Scholarship Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-6 rounded-xl border">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
          <input
            type="text"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="0x..."
            className="w-full border px-3 py-2 rounded-xl text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Essay</label>
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Why do you deserve the scholarship?"
            rows={6}
            className="w-full border px-3 py-2 rounded-xl text-sm"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-xl text-sm hover:bg-gray-800"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}
