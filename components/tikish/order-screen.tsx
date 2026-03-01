"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-motion"
import { ChevronLeft, ChevronDown, MessageCircle, CheckCircle } from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

const SERVICES = ["Ko'ylak tikish", "Kostyum tikish", "To'y libosi", "Ta'mirlash", "Milliy kiyim"]
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "O'lcham bilan"]

const STATUS_STEPS = [
  { label: "Yangi", desc: "Buyurtma qabul qilindi" },
  { label: "Ko'rib chiqilmoqda", desc: "Usta ko'rib chiqyapti" },
  { label: "Jarayonda", desc: "Tikish boshlandi" },
  { label: "Tayyor", desc: "Kiyim tayyor" },
  { label: "Yetkazildi", desc: "Buyurtma yetkazildi" },
]

interface OrderScreenProps {
  onChat: () => void
  onBack: () => void
}

export default function OrderScreen({ onChat, onBack }: OrderScreenProps) {
  const [step, setStep] = useState<"form" | "status">("form")
  const [service, setService] = useState(SERVICES[0])
  const [size, setSize] = useState("M")
  const [desc, setDesc] = useState("")
  const [budget, setBudget] = useState("")
  const [deadline, setDeadline] = useState("")
  const [currentStatus, setCurrentStatus] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep("status") }, 1400)
  }

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#f7f3f5" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-5 shrink-0" style={{ background: DARK }}>
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <ChevronLeft size={18} style={{ color: "#ffffff" }} />
          </button>
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: P }}>
              {step === "form" ? "Yangi Buyurtma" : "Buyurtma Holati"}
            </p>
            <h2
              className="text-white font-bold text-base"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Madina Umarova
            </h2>
          </div>
        </div>
      </div>

      {step === "form" ? (
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-8 flex flex-col gap-4">
          {/* Service selection */}
          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: DARK }}>Xizmat turi</label>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s}
                  onClick={() => setService(s)}
                  className="py-2.5 px-3 rounded-2xl text-xs font-medium text-left transition-all"
                  style={{
                    background: service === s ? P : "#ffffff",
                    color: service === s ? "#ffffff" : "#8a7a85",
                    border: `1.5px solid ${service === s ? P : "#f0e4eb"}`,
                    boxShadow: service === s ? "0 4px 12px rgba(232,93,138,0.25)" : "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: DARK }}>O'lcham</label>
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: size === s ? P : "#ffffff",
                    color: size === s ? "#ffffff" : "#8a7a85",
                    border: `1.5px solid ${size === s ? P : "#f0e4eb"}`,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: DARK }}>
              Tavsif (ixtiyoriy)
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Kiyim haqida qo'shimcha ma'lumot bering..."
              rows={3}
              className="w-full text-sm p-3.5 rounded-2xl outline-none resize-none"
              style={{
                background: "#ffffff",
                border: `1.5px solid ${desc ? P : "#f0e4eb"}`,
                color: DARK,
                fontFamily: "'Inter', sans-serif",
                transition: "border 0.2s",
              }}
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: DARK }}>Byudjet (so'm)</label>
            <div
              className="flex items-center px-4 rounded-2xl"
              style={{ background: "#ffffff", border: `1.5px solid ${budget ? P : "#f0e4eb"}`, height: 52 }}
            >
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="150 000"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: DARK, fontFamily: "'Inter', sans-serif" }}
              />
              <span className="text-xs font-medium shrink-0" style={{ color: "#8a7a85" }}>so'm</span>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: DARK }}>Muddati</label>
            <div
              className="flex items-center px-4 rounded-2xl"
              style={{ background: "#ffffff", border: "1.5px solid #f0e4eb", height: 52 }}
            >
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: deadline ? DARK : "#c4b0bc", fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm mt-2"
            style={{
              background: loading ? "#f9c8da" : P,
              color: "#ffffff",
              boxShadow: "0 6px 20px rgba(232,93,138,0.35)",
            }}
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            ) : "Buyurtma berish"}
          </motion.button>
        </div>
      ) : (
        /* Status screen */
        <div className="flex-1 px-4 pt-5 pb-8 flex flex-col gap-4">
          {/* Order card */}
          <div
            className="p-4 rounded-3xl"
            style={{ background: "#ffffff", boxShadow: "0 4px 20px rgba(232,93,138,0.1)" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium" style={{ color: "#8a7a85" }}>Buyurtma #TK-2048</p>
                <p className="text-sm font-bold mt-1" style={{ color: DARK }}>{service}</p>
                <p className="text-xs mt-0.5" style={{ color: "#8a7a85" }}>O'lcham: {size}</p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-[10px] font-bold"
                style={{ background: "#fdf0f5", color: P }}
              >
                Jarayonda
              </span>
            </div>
          </div>

          {/* Progress tracker */}
          <div
            className="p-4 rounded-3xl"
            style={{ background: "#ffffff", boxShadow: "0 2px 12px rgba(232,93,138,0.08)" }}
          >
            <h3 className="text-sm font-bold mb-4" style={{ color: DARK }}>Buyurtma holati</h3>
            <div className="flex flex-col gap-0">
              {STATUS_STEPS.map((s, i) => {
                const done = i < currentStatus
                const active = i === currentStatus
                return (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10"
                        style={{
                          background: done ? P : active ? "#fdf0f5" : "#f0e4eb",
                          border: `2px solid ${done || active ? P : "#e8d5df"}`,
                        }}
                      >
                        {done ? (
                          <CheckCircle size={12} style={{ color: "#ffffff" }} fill="#ffffff" />
                        ) : (
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ background: active ? P : "#e8d5df" }}
                          />
                        )}
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div
                          className="w-0.5 flex-1 my-0.5"
                          style={{ background: done ? P : "#f0e4eb", minHeight: 24 }}
                        />
                      )}
                    </div>
                    <div className="pb-4">
                      <p
                        className="text-xs font-semibold"
                        style={{ color: done || active ? DARK : "#c4b0bc" }}
                      >
                        {s.label}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#8a7a85" }}>{s.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Chat with tailor */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onChat}
            className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm"
            style={{ background: P, color: "#ffffff", boxShadow: "0 6px 20px rgba(232,93,138,0.35)" }}
          >
            <MessageCircle size={16} />
            Usta bilan gaplashing
          </motion.button>
        </div>
      )}
    </div>
  )
}
