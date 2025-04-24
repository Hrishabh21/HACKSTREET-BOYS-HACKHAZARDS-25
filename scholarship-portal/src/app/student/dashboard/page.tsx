"use client";

import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-blue-600">🎓 Student Dashboard</h1>
        <p className="text-gray-700">Welcome to your dashboard! Use the options below to proceed.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/student/apply"
            className="block bg-blue-500 text-white p-6 rounded-xl text-center hover:bg-blue-600 transition"
          >
            📝 Apply for Scholarship
          </Link>
          <Link
            href="/student/status"
            className="block bg-green-500 text-white p-6 rounded-xl text-center hover:bg-green-600 transition"
          >
            📊 Check Application Status
          </Link>
        </div>
      </div>
    </div>
  );
}
