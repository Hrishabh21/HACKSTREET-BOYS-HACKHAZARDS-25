'use client'

import Link from 'next/link'
import { Button } from './components/ui/Button'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen font-sans text-white bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-purple-800 to-gray-900 border-b border-white/10 shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-tight text-yellow-400 drop-shadow-lg hover:scale-105 transition-transform duration-300">ScholarX</h1>
        <div className="space-x-4">
          <Link href="/login">
            <Button className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 shadow-md">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-black hover:from-pink-500 hover:to-yellow-400 transition-all duration-300 shadow-lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-transparent to-blue-500 opacity-20 animate-pulse"></div>
        <motion.h2
          className="text-6xl sm:text-7xl font-extrabold mb-6 leading-tight text-yellow-300 drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Unlock the Future with Real-Time Scholarships
        </motion.h2>

        <motion.p
          className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Apply in minutes. Let AI do the evaluation. Receive scholarship funds instantly via blockchain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Link href="/apply">
            <Button className="text-lg px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold shadow-xl rounded-xl flex items-center gap-2">
              Get Started <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 bg-gradient-to-br from-purple-800 to-gray-900 text-center shadow-inner">
        <h3 className="text-5xl font-bold mb-12 text-pink-400 drop-shadow-lg">Why ScholarX?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-[#3c3a60] p-6 rounded-2xl shadow-xl">
            <h4 className="text-2xl font-bold mb-2 text-yellow-300">⚡ Instant Processing</h4>
            <p className="text-white/80">No delays, no waiting. AI evaluates your application on the spot.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-[#3c3a60] p-6 rounded-2xl shadow-xl">
            <h4 className="text-2xl font-bold mb-2 text-green-300">🔗 Blockchain-Powered</h4>
            <p className="text-white/80">Built on Stellar for secure and transparent fund distribution.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-[#3c3a60] p-6 rounded-2xl shadow-xl">
            <h4 className="text-2xl font-bold mb-2 text-blue-300">🧠 Groq AI</h4>
            <p className="text-white/80">Lightning-fast AI compute makes real-time decisions possible.</p>
          </motion.div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-16 px-6 text-center bg-gradient-to-br from-purple-900 to-indigo-900 shadow-lg">
        <blockquote className="text-2xl sm:text-3xl italic text-white/80 max-w-4xl mx-auto">
          “ScholarX is not just a platform. It's a mission to revolutionize how deserving students get access to education.”
        </blockquote>
        <p className="mt-4 text-white/60 text-sm">— The ScholarX Team</p>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-black shadow-2xl">
        <h4 className="text-5xl font-bold mb-6">Join the Revolution</h4>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Be part of a smarter, fairer scholarship ecosystem powered by blockchain and AI.
        </p>
        <Link href="/apply">
          <Button className="px-6 py-3 text-lg font-bold bg-black text-white hover:bg-white hover:text-black rounded-xl transition duration-300">
            Apply Now
          </Button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-white/60 bg-[#1f1d2b] border-t border-white/10">
        Made with ❤️ in India 🇮🇳 | Powered by Stellar ⚡ Groq 🚀 Framer Motion 🎥
      </footer>
    </main>
  )
}
