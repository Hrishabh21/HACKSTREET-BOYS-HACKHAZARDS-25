'use client'

import Link from 'next/link'
import { Button } from './components/ui/Button'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from 'lucide-react'


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-950 text-white font-sans">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-white/10">
        <h1 className="text-3xl font-bold tracking-tight">ScholarX</h1>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-black">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-gray-200">
              Sign Up
            </Button>
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center px-6 py-20 text-center max-w-3xl mx-auto">
        <motion.h2
          className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Unlock the Future with Real-Time Scholarships
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-white/90 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Apply. Get evaluated by AI. Instantly receive funds via blockchain. The smartest way to fund education in India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <Link href="/apply">
            <Button className="text-lg px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow-xl rounded-xl">
              Get Started <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <footer className="text-center py-6 text-white/50 border-t border-white/10">
        Built for India 🇮🇳 | Powered by Base, Groq, and Stellar
      </footer>
    </main>
  )
}
