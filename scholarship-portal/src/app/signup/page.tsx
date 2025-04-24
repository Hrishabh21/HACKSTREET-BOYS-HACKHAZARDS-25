"use client";

import { useState } from "react";
import { handleSignUp } from "../../lib/auth";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await handleSignUp(fullName, email, password);

    if (result.success) {
      alert("Signup successful!");
      // Redirect to login or dashboard
    } else {
      alert("Signup failed: " + result.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-rose-100 px-4"
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="hidden md:block"
        >
          
          <blockquote className="text-xl italic text-center mt-6 text-gray-700">
            "A scholarship is not just a reward — it’s a responsibility to rise higher."
          </blockquote>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.95, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-gray-100"
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-center text-indigo-700 mb-6 drop-shadow"
          >
            Student Signup
          </motion.h2>

          <motion.input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-indigo-400 transition"
            required
          />

          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-indigo-400 transition"
            required
          />

          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-indigo-400 transition"
            required
          />

          <motion.input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-indigo-400 transition"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-indigo-700 hover:to-pink-600 transition duration-300"
          >
            Sign Up
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
}