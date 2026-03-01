"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight } from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

const SLIDES = [
  {
    img: "/onboard-1.jpg",
    title: "Yaqin tikuvchilarni toping",
    desc: "Geolokatsiya orqali atrofingizdagi eng yaxshi tikuvchilarni xaritada ko'ring va masofani bilib oling.",
    accent: "#fce7f3",
  },
  {
    img: "/onboard-2.jpg",
    title: "Portfolio va baholar",
    desc: "Tikuvchilarning ish namunalarini ko'ring, real mijoz baholarini o'qing va to'g'ri tanlov qiling.",
    accent: "#fdf0f5",
  },
  {
    img: "/onboard-3.jpg",
    title: "Buyurtma bering, kuting",
    desc: "Buyurtma bering, jarayonni kuzating va tayyor bo'lganda xabar oling. Xavfsiz to'lov kafolatlangan.",
    accent: "#fce7f3",
  },
]

interface OnboardingScreenProps {
  onNext: () => void
}

export default function OnboardingScreen({ onNext }: OnboardingScreenProps) {
  const [idx, setIdx] = useState(0)
  const slide = SLIDES[idx]
  const isLast = idx === SLIDES.length - 1

  const next = () => {
    if (isLast) { onNext(); return }
    setIdx((p) => p + 1)
  }

  return (
    <div className="flex flex-col h-full" style={{ background: slide.accent, transition: "background 0.4s" }}>
      {/* Skip */}
      <div className="flex justify-end px-6 pt-4 shrink-0">
        <button onClick={onNext} className="text-xs font-medium" style={{ color: "#c4b0bc" }}>
          O'tkazib yuborish
        </button>
      </div>

      {/* Image */}
      <div className="flex-1 flex items-center justify-center px-8 py-4 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.92, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.92, x: -24 }}
            transition={{ duration: 0.35 }}
            className="w-full rounded-3xl overflow-hidden"
            style={{
              height: 280,
              boxShadow: "0 16px 48px rgba(232,93,138,0.18)",
            }}
          >
            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text card */}
      <div
        className="mx-4 mb-4 rounded-3xl p-6 shrink-0"
        style={{ background: "#ffffff", boxShadow: "0 8px 32px rgba(232,93,138,0.12)" }}
      >
        {/* Dots */}
        <div className="flex gap-2 mb-5">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              animate={{ width: i === idx ? 24 : 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="h-2 rounded-full"
              style={{ background: i === idx ? P : "#f9c8da" }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            <h2
              className="text-xl font-bold leading-tight mb-3"
              style={{ fontFamily: "'Playfair Display', serif", color: DARK }}
            >
              {slide.title}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#8a7a85" }}>
              {slide.desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.button
          onClick={next}
          whileTap={{ scale: 0.96 }}
          className="mt-6 w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm"
          style={{
            background: isLast ? P : "#1a1a2e",
            color: "#ffffff",
            boxShadow: isLast ? "0 6px 20px rgba(232,93,138,0.35)" : "0 6px 20px rgba(26,26,46,0.2)",
          }}
        >
          {isLast ? "Boshlash" : "Keyingisi"}
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  )
}
