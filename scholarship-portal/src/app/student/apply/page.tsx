"use client";

import { useState, useEffect } from "react";
import { submitApplication } from "../../../lib/submit-application";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function ApplyForm() {
  const [uid, setUid] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    previousEducation: "",
    essay: "",
    walletAddress: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uid) {
      setErrorMessage("User not authenticated. Please log in again.");
      return;
    }

    if (!formData.walletAddress) {
      setErrorMessage("Wallet Address is required.");
      return;
    }

    setIsSubmitting(true);
    const res = await submitApplication({ ...formData, uid });

    if (res.success) {
      setSuccessMessage("✅ Application submitted successfully!");
      setFormData({
        fullName: "",
        fatherName: "",
        fatherOccupation: "",
        motherName: "",
        motherOccupation: "",
        previousEducation: "",
        essay: "",
        walletAddress: "",
      });
      setErrorMessage("");
    } else {
      setErrorMessage("❌ " + res.error);
      setSuccessMessage("");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-10 shadow-2xl w-full max-w-2xl space-y-6 border border-blue-200 animate-fadeIn"
      >
        <h2 className="text-4xl font-bold text-center text-blue-800">🎓 Apply for Scholarship</h2>
        <p className="text-center text-gray-500 mb-4">Fill the form below to apply</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} value={formData.fullName} className="input" required />
          <input type="text" name="fatherName" placeholder="Father's Name" onChange={handleChange} value={formData.fatherName} className="input" required />
          <input type="text" name="fatherOccupation" placeholder="Father's Occupation" onChange={handleChange} value={formData.fatherOccupation} className="input" required />
          <input type="text" name="motherName" placeholder="Mother's Name" onChange={handleChange} value={formData.motherName} className="input" required />
          <input type="text" name="motherOccupation" placeholder="Mother's Occupation" onChange={handleChange} value={formData.motherOccupation} className="input" required />
          <input type="text" name="previousEducation" placeholder="Previous Education (%)" onChange={handleChange} value={formData.previousEducation} className="input" required />
        </div>

        <textarea
          name="essay"
          placeholder="Essay - Purpose of Scholarship"
          onChange={handleChange}
          value={formData.essay}
          className="input h-32"
          required
        />
        <input
         type="text"
         name="walletAddress"
         required
         placeholder="Stellar Wallet Address"
         onChange={handleChange}
         value={formData.walletAddress}
        />


        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition-all ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>

        {successMessage && <p className="text-green-600 text-center font-medium">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-center font-medium">{errorMessage}</p>}
      </form>
    </div>
  );
}
