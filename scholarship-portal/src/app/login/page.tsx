"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLogin } from "../../lib/auth";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin">("student");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await handleLogin(email, password);

      if (!result.success) {
        alert(result.error || "Login failed. Please try again.");
        return;
      }

      if (result.warning) {
        alert(result.warning);
        setLoading(false);
        return;
      }

      if (result.userType !== role) {
        alert(`This account is not registered as ${role}.`);
        return;
      }

      if (result.userType === "admin") {
        router.push("/admin");
      } else {
        router.push("/student/dashboard");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      alert(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side Illustration */}
      <div className="md:w-1/2 bg-gradient-to-br from-indigo-800 to-purple-800 text-white flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mt-6 leading-snug">
            Welcome Back<br /> to ScholarX
          </h1>
          <p className="mt-4 text-white/80 text-sm">
            Log in and access your dashboard instantly. Funded. Fast. Fair.
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12"
      >
        <motion.form
          onSubmit={onLogin}
          initial={{ scale: 0.95, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-gray-100"
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-center text-indigo-700 mb-6 drop-shadow"
          >
            Login
          </motion.h2>

          <motion.select
            value={role}
            onChange={(e) => setRole(e.target.value as "student" | "admin")}
            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </motion.select>

          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          />

          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 transition duration-300"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : "Login"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
