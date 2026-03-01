"use client"

import { useState } from "react"
import { Camera, RefreshCw, ZoomIn } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const CLOTHES = [
  { id: 1, name: "Klassik Kostyum", img: "/outfit-suit.jpg" },
  { id: 2, name: "Oqshom Ko'ylagi", img: "/outfit-dress.jpg" },
  { id: 3, name: "Milliy Chapan", img: "/outfit-traditional.jpg" },
  { id: 4, name: "Bolalar Kiyimi", img: "/outfit-kids.jpg" },
]

export default function VirtualTryOnScreen() {
  const [selectedCloth, setSelectedCloth] = useState(0)
  const [snapped, setSnapped] = useState(false)
  const [snapping, setSnapping] = useState(false)

  const handleSnap = () => {
    setSnapping(true)
    setTimeout(() => {
      setSnapping(false)
      setSnapped(true)
    }, 600)
  }

  const handleChange = () => {
    setSnapped(false)
    setSelectedCloth((prev) => (prev + 1) % CLOTHES.length)
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "#0a0a2e", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between shrink-0">
        <div>
          <p className="text-[10px] font-medium tracking-widest" style={{ color: "#D4AF37" }}>
            VIRTUAL KIYINISH
          </p>
          <h2
            className="text-white font-bold text-base"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kamerada Kiyinish
          </h2>
        </div>
        <button
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}
        >
          <ZoomIn size={16} style={{ color: "#D4AF37" }} />
        </button>
      </div>

      {/* Camera / Try-on view */}
      <div className="mx-4 rounded-3xl overflow-hidden relative flex-1" style={{ maxHeight: 400 }}>
        {/* Camera feed (model image) */}
        <img
          src="/tryon-model.jpg"
          alt="Model"
          className="w-full h-full object-cover"
        />

        {/* AR silhouette outline */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            viewBox="0 0 120 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: 120, height: 220, opacity: 0.55 }}
          >
            <ellipse cx="60" cy="28" rx="22" ry="26" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 3" />
            <path
              d="M38 54 C28 60 18 75 16 100 L14 150 L30 152 L32 200 L88 200 L90 152 L106 150 L104 100 C102 75 92 60 82 54 C74 65 46 65 38 54Z"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              fill="rgba(212,175,55,0.04)"
            />
          </svg>
        </div>

        {/* Clothing overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCloth}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: snapped ? 1 : 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ paddingTop: 60 }}
          >
            <img
              src={CLOTHES[selectedCloth].img}
              alt="Clothing overlay"
              className="object-contain"
              style={{ width: 140, height: 180, mixBlendMode: "multiply", filter: "contrast(1.1)" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Flash on snap */}
        <AnimatePresence>
          {snapping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
              style={{ background: "rgba(255,255,255,0.85)" }}
            />
          )}
        </AnimatePresence>

        {/* Snapped checkmark badge */}
        <AnimatePresence>
          {snapped && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{ background: "#D4AF37" }}
            >
              <span className="text-[11px] font-bold" style={{ color: "#0a0a2e" }}>
                Saqlandi
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.07) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Corner guides */}
        {[
          "top-3 left-3",
          "top-3 right-3 rotate-90",
          "bottom-3 left-3 -rotate-90",
          "bottom-3 right-3 rotate-180",
        ].map((pos, i) => (
          <div key={i} className={`absolute ${pos}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8V1H8" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </div>

      {/* Clothing carousel */}
      <div className="px-4 mt-4 shrink-0">
        <p className="text-xs font-medium mb-2" style={{ color: "rgba(255,255,255,0.5)" }}>
          Kiyimni tanlang
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {CLOTHES.map((cloth, i) => (
            <button
              key={cloth.id}
              onClick={() => { setSelectedCloth(i); setSnapped(false) }}
              className="shrink-0 rounded-xl overflow-hidden relative transition-all active:scale-95"
              style={{
                width: 64,
                height: 64,
                border: `2px solid ${i === selectedCloth ? "#D4AF37" : "transparent"}`,
                boxShadow: i === selectedCloth ? "0 0 0 1px rgba(212,175,55,0.3)" : "none",
              }}
            >
              <img src={cloth.img} alt={cloth.name} className="w-full h-full object-cover" />
              {i === selectedCloth && (
                <div
                  className="absolute inset-0"
                  style={{ background: "rgba(212,175,55,0.15)" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-4 pt-3 pb-4 flex items-center justify-between shrink-0">
        {/* Change cloth */}
        <button
          onClick={handleChange}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all active:scale-95"
          style={{
            background: "rgba(212,175,55,0.12)",
            border: "1px solid rgba(212,175,55,0.3)",
            color: "#D4AF37",
          }}
        >
          <RefreshCw size={15} />
          Kiyimni almashtirish
        </button>

        {/* Snap button */}
        <button
          onClick={handleSnap}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-90"
          style={{
            background: "linear-gradient(135deg, #D4AF37, #f0d060)",
            boxShadow: "0 0 0 3px rgba(212,175,55,0.25), 0 4px 20px rgba(212,175,55,0.4)",
          }}
        >
          <Camera size={26} style={{ color: "#0a0a2e" }} />
        </button>

        <div style={{ width: 140 }} />
      </div>
    </div>
  )
}
