"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "@/lib/framer-motion"
import { ChevronLeft, Star, MapPin, Phone, MessageCircle, Clock, CheckCircle, ShoppingBag, Heart } from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

const PORTFOLIO = [
  { id: 1, img: "/outfit-dress.jpg" },
  { id: 2, img: "/outfit-suit.jpg" },
  { id: 3, img: "/outfit-traditional.jpg" },
  { id: 4, img: "/outfit-kids.jpg" },
  { id: 5, img: "/outfit-dress.jpg" },
  { id: 6, img: "/outfit-suit.jpg" },
]

const SERVICES = [
  { name: "Ko'ylak tikish", price: "80 000 – 150 000 so'm" },
  { name: "Kostyum tikish", price: "200 000 – 400 000 so'm" },
  { name: "To'y libosi", price: "500 000 – 1 200 000 so'm" },
  { name: "Ta'mirlash", price: "30 000 – 80 000 so'm" },
]

const REVIEWS = [
  { id: 1, name: "Aziza K.", rating: 5, date: "15 Yanvar", text: "Juda ajoyib usta! Kiyim o'z vaqtida tayyor bo'ldi va sifat yuqori darajada." },
  { id: 2, name: "Sherzod M.", rating: 5, date: "8 Yanvar", text: "Menga aniq o'lchamda kostyum tikib berdi. Tavsiya qilaman!" },
  { id: 3, name: "Nilufar B.", rating: 4, date: "2 Yanvar", text: "Yaxshi usta, narxlar qulay. Keyingi safar ham murojaat qilaman." },
]

interface TailorProfileScreenProps {
  onOrder: () => void
  onChat: () => void
  onBack: () => void
}

export default function TailorProfileScreen({ onOrder, onChat, onBack }: TailorProfileScreenProps) {
  const [tab, setTab] = useState<"portfolio" | "services" | "reviews">("portfolio")
  const [saved, setSaved] = useState(false)
  const [reviewStars, setReviewStars] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewText, setReviewText] = useState("")

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#f7f3f5" }}>
      {/* Hero */}
      <div className="relative" style={{ height: 240 }}>
        <img src="/tailor-1.jpg" alt="Tailor" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(26,26,46,0.85) 100%)" }}
        />
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <ChevronLeft size={18} style={{ color: "#ffffff" }} />
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <Heart size={17} fill={saved ? P : "none"} style={{ color: saved ? P : "#ffffff" }} />
          </button>
        </div>
        {/* Info overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
          <div className="flex items-center gap-1.5 mb-1">
            <CheckCircle size={13} fill={P} style={{ color: "#ffffff" }} />
            <span className="text-[10px] font-semibold" style={{ color: P }}>Tasdiqlangan usta</span>
          </div>
          <h2
            className="text-white text-xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Madina Umarova
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <Star size={11} fill="#fbbf24" style={{ color: "#fbbf24" }} />
              <span className="text-xs font-semibold text-white">4.9</span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>(127 baho)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={10} style={{ color: "rgba(255,255,255,0.6)" }} />
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.7)" }}>Chilonzor · 0.8 km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mx-4 -mt-3 z-10 relative">
        <div
          className="rounded-2xl p-4 flex items-center"
          style={{ background: "#ffffff", boxShadow: "0 4px 20px rgba(232,93,138,0.1)" }}
        >
          {[
            { label: "Buyurtmalar", value: "127+" },
            { label: "Tajriba", value: "6 yil" },
            { label: "Javob", value: "~1 soat" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex-1 flex flex-col items-center"
              style={{ borderRight: i < 2 ? "1px solid #f0e4eb" : "none" }}
            >
              <span className="text-base font-bold" style={{ fontFamily: "'Playfair Display', serif", color: DARK }}>
                {s.value}
              </span>
              <span className="text-[10px] mt-0.5" style={{ color: "#8a7a85" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info chips */}
      <div className="px-4 mt-3 flex gap-2 flex-wrap">
        {["Ayollar kiyimi", "Ko'ylaklar", "Zamonaviy uslub", "To'y libosi"].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-[11px] font-medium"
            style={{ background: "#fdf0f5", color: P, border: "1px solid #f9c8da" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Working hours */}
      <div className="mx-4 mt-3 flex items-center gap-2 p-3 rounded-2xl"
        style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(232,93,138,0.06)" }}>
        <Clock size={14} style={{ color: P }} />
        <span className="text-xs font-medium" style={{ color: DARK }}>Ish vaqti:</span>
        <span className="text-xs" style={{ color: "#8a7a85" }}>Dush–Shan · 09:00 – 18:00</span>
        <span
          className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-semibold"
          style={{ background: "#d1fae5", color: "#065f46" }}
        >
          Ochiq
        </span>
      </div>

      {/* Tabs */}
      <div className="mx-4 mt-4 flex rounded-2xl overflow-hidden" style={{ background: "#f0e4eb" }}>
        {(["portfolio", "services", "reviews"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2.5 text-xs font-semibold transition-all rounded-2xl"
            style={{
              background: tab === t ? "#ffffff" : "transparent",
              color: tab === t ? DARK : "#8a7a85",
              boxShadow: tab === t ? "0 2px 8px rgba(232,93,138,0.1)" : "none",
              margin: tab === t ? 2 : 0,
            }}
          >
            {t === "portfolio" ? "Portfolio" : t === "services" ? "Xizmatlar" : "Baholar"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-4 mt-3 pb-32">
        <AnimatePresence mode="wait">
          {tab === "portfolio" && (
            <motion.div key="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="grid grid-cols-3 gap-2">
                {PORTFOLIO.map((p) => (
                  <div key={p.id} className="aspect-square rounded-2xl overflow-hidden">
                    <img src={p.img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {tab === "services" && (
            <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col gap-2"
            >
              {SERVICES.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between p-3.5 rounded-2xl"
                  style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(232,93,138,0.06)" }}
                >
                  <span className="text-sm font-medium" style={{ color: DARK }}>{s.name}</span>
                  <span className="text-xs font-semibold" style={{ color: P }}>{s.price}</span>
                </div>
              ))}
            </motion.div>
          )}
          {tab === "reviews" && (
            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col gap-3"
            >
              {/* Add review */}
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
                style={{ background: "#fdf0f5", color: P, border: `1.5px dashed ${P}` }}
              >
                <Star size={14} />
                Baho qo'shish
              </button>

              <AnimatePresence>
                {showReviewForm && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-2xl flex flex-col gap-3"
                      style={{ background: "#ffffff", boxShadow: "0 2px 12px rgba(232,93,138,0.1)" }}>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map((s) => (
                          <button key={s} onClick={() => setReviewStars(s)}>
                            <Star size={24} fill={s <= reviewStars ? "#fbbf24" : "none"} style={{ color: s <= reviewStars ? "#fbbf24" : "#e8d5df" }} />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Fikringizni yozing..."
                        rows={3}
                        className="w-full text-sm p-3 rounded-xl outline-none resize-none"
                        style={{ background: "#fdf0f5", border: "1px solid #f0e4eb", color: DARK, fontFamily: "'Inter', sans-serif" }}
                      />
                      <button
                        onClick={() => { setShowReviewForm(false); setReviewStars(0); setReviewText("") }}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold"
                        style={{ background: P, color: "#ffffff" }}
                      >
                        Yuborish
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {REVIEWS.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl"
                  style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(232,93,138,0.06)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: "#fdf0f5", color: P }}
                      >
                        {r.name.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold" style={{ color: DARK }}>{r.name}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={10} fill="#fbbf24" style={{ color: "#fbbf24" }} />
                      ))}
                      <span className="text-[10px] ml-1" style={{ color: "#8a7a85" }}>{r.date}</span>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#8a7a85" }}>{r.text}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 px-5 pb-4 pt-3 flex gap-3"
        style={{
          width: "min(390px, 100vw - 1.5rem)",
          background: "linear-gradient(to top, #ffffff 70%, transparent)",
        }}
      >
        <button
          onClick={onChat}
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "#fdf0f5", border: `1.5px solid ${P}` }}
        >
          <MessageCircle size={18} style={{ color: P }} />
        </button>
        <button
          onClick={onChat}
          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "#e8f0ff", border: "1.5px solid #93c5fd" }}
        >
          <Phone size={18} style={{ color: "#3b82f6" }} />
        </button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onOrder}
          className="flex-1 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm"
          style={{
            background: P,
            color: "#ffffff",
            boxShadow: "0 6px 20px rgba(232,93,138,0.35)",
          }}
        >
          <ShoppingBag size={16} />
          Buyurtma berish
        </motion.button>
      </div>
    </div>
  )
}
