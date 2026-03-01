"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-motion"
import { User, Phone, Lock, Eye, EyeOff, ChevronLeft, ArrowRight } from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

const ROLES = [
  { id: "customer", label: "Mijoz", desc: "Tikuvchi qidiraman", icon: "👤" },
  { id: "tailor", label: "Tikuvchi", desc: "Xizmat ko'rsataman", icon: "🧵" },
]

interface RegisterScreenProps {
  onRegister: () => void
  onLogin: () => void
}

export default function RegisterScreen({ onRegister, onLogin }: RegisterScreenProps) {
  const [role, setRole] = useState<"customer" | "tailor">("customer")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [pass, setPass] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); onRegister() }, 1200)
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: "#ffffff" }}>
      {/* Header */}
      <div
        className="relative overflow-hidden shrink-0 flex flex-col justify-end px-7 pb-7"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2e1a2e 100%)", height: 200 }}
      >
        <div className="absolute -top-8 -right-8 rounded-full opacity-15"
          style={{ width: 150, height: 150, background: P }} />
        <button onClick={onLogin} className="relative flex items-center gap-1 mb-4">
          <ChevronLeft size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Orqaga</span>
        </button>
        <p className="text-xs font-semibold tracking-widest uppercase mb-1 relative" style={{ color: P }}>
          Yangi hisob
        </p>
        <h1
          className="text-2xl font-bold text-white relative"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Ro'yxatdan o'ting
        </h1>
      </div>

      <div className="flex flex-col px-6 -mt-5 relative z-10 pb-8">
        <div
          className="rounded-3xl p-6 flex flex-col gap-4"
          style={{ background: "#ffffff", boxShadow: "0 -4px 32px rgba(232,93,138,0.1), 0 8px 32px rgba(26,26,46,0.08)" }}
        >
          {/* Role selection */}
          <div>
            <label className="text-xs font-semibold mb-2 block" style={{ color: DARK }}>
              Siz kimingiz?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as "customer" | "tailor")}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all"
                  style={{
                    background: role === r.id ? "#fdf0f5" : "#f7f3f5",
                    border: `2px solid ${role === r.id ? P : "transparent"}`,
                  }}
                >
                  <span className="text-2xl">{r.icon}</span>
                  <span className="text-xs font-semibold" style={{ color: role === r.id ? P : DARK }}>
                    {r.label}
                  </span>
                  <span className="text-[10px]" style={{ color: "#8a7a85" }}>{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name field */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: DARK }}>Ism Familiya</label>
            <div
              className="flex items-center gap-3 px-4 rounded-2xl"
              style={{ background: "#fdf0f5", border: `1.5px solid ${name ? P : "#f0e4eb"}`, height: 52, transition: "border 0.2s" }}
            >
              <User size={16} style={{ color: "#c4b0bc", flexShrink: 0 }} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Anvar Toshmatov"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: DARK, fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>

          {/* Phone field */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: DARK }}>Telefon raqam</label>
            <div
              className="flex items-center gap-3 px-4 rounded-2xl"
              style={{ background: "#fdf0f5", border: `1.5px solid ${phone ? P : "#f0e4eb"}`, height: 52 }}
            >
              <span className="text-sm">🇺🇿</span>
              <span className="text-sm font-medium shrink-0" style={{ color: DARK }}>+998</span>
              <div style={{ width: 1, height: 20, background: "#f0e4eb" }} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="90 123 45 67"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: DARK, fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: DARK }}>Parol</label>
            <div
              className="flex items-center gap-3 px-4 rounded-2xl"
              style={{ background: "#fdf0f5", border: `1.5px solid ${pass ? P : "#f0e4eb"}`, height: 52 }}
            >
              <Lock size={16} style={{ color: "#c4b0bc", flexShrink: 0 }} />
              <input
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: DARK, fontFamily: "'Inter', sans-serif" }}
              />
              <button onClick={() => setShowPass(!showPass)} className="shrink-0">
                {showPass ? <EyeOff size={16} style={{ color: "#c4b0bc" }} /> : <Eye size={16} style={{ color: "#c4b0bc" }} />}
              </button>
            </div>
          </div>

          {/* Register button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleRegister}
            disabled={loading}
            className="mt-1 w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm"
            style={{
              background: loading ? "#f9c8da" : P,
              color: "#ffffff",
              boxShadow: "0 6px 20px rgba(232,93,138,0.35)",
              transition: "background 0.2s",
            }}
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>Ro'yxatdan o'tish <ArrowRight size={16} /></>
            )}
          </motion.button>
        </div>

        <p className="text-center mt-5 text-sm" style={{ color: "#8a7a85" }}>
          Hisobingiz bormi?{" "}
          <button onClick={onLogin} className="font-semibold" style={{ color: P }}>
            Kirish
          </button>
        </p>
      </div>
    </div>
  )
}
