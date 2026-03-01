"use client"

import { useEffect, useState } from "react"
import { motion } from "@/lib/framer-motion"

const P = "#e85d8a"
const DARK = "#1a1a2e"

interface SplashScreenProps {
  onNext: () => void
}

export default function SplashScreen({ onNext }: SplashScreenProps) {
  const [phase, setPhase] = useState<"logo" | "tagline" | "done">("logo")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("tagline"), 900)
    const t2 = setTimeout(() => setPhase("done"), 1800)
    const t3 = setTimeout(() => onNext(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onNext])

  return (
    <div
      className="flex flex-col items-center justify-center h-full relative overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="/splash-bg.jpg" alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.92) 60%, #ffffff 100%)" }}
        />
      </div>

      {/* Decorative circles */}
      <div
        className="absolute -top-16 -right-16 rounded-full"
        style={{ width: 200, height: 200, background: "rgba(232,93,138,0.08)" }}
      />
      <div
        className="absolute -bottom-20 -left-20 rounded-full"
        style={{ width: 240, height: 240, background: "rgba(249,168,201,0.12)" }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-4 px-8 text-center">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #e85d8a, #f9a8c9)",
            boxShadow: "0 12px 40px rgba(232,93,138,0.35)",
          }}
        >
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Needle and thread icon */}
            <path d="M12 40 Q16 20 26 14 Q36 8 42 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <path d="M26 14 L28 8 M26 14 L30 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="10" cy="42" r="3" fill="white"/>
            <path d="M28 30 Q32 26 38 28 Q44 30 40 38 Q36 44 30 42 Q24 40 28 34 Q30 30 28 30Z" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M20 22 Q22 28 26 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"/>
          </svg>
        </motion.div>

        {/* App name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: DARK }}
          >
            TIKISH<span style={{ color: P }}>.UZ</span>
          </h1>
          <p
            className="text-xs font-semibold tracking-widest uppercase mt-1"
            style={{ color: P, letterSpacing: "0.2em" }}
          >
            Raqamli Atelye
          </p>
        </motion.div>

        {/* Tagline */}
        {(phase === "tagline" || phase === "done") && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm leading-relaxed"
            style={{ color: "#8a7a85", maxWidth: 240 }}
          >
            Yaqin joydagi tikuvchilarni toping. Sifatli kiyimlarni buyurtma qiling.
          </motion.p>
        )}

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-2 mt-4"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: P }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom branding */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 text-xs"
        style={{ color: "#c4b0bc" }}
      >
        O'zbekistondagi #1 tikuvchi platformasi
      </motion.p>
    </div>
  )
}
