"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-motion"
import { Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

interface LoginScreenProps {
  onLogin: () => void
  onRegister: () => void
}

export default function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [phone, setPhone] = useState("")
  const [pass, setPass] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin() }, 1200)
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#ffffff" }}>
      {/* Top decorative area */}
      <div
        className="relative overflow-hidden shrink-0 flex flex-col justify-end px-7 pb-8"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2e1a2e 100%)", height: 260 }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 rounded-full opacity-20"
          style={{ width: 180, height: 180, background: P }} />
        <div className="absolute top-16 -left-8 rounded-full opacity-10"
          style={{ width: 120, height: 120, background: "#f9a8c9" }} />

        <div className="relative">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: P }}>
            Xush kelibsiz
          </p>
          <h1
            className="text-3xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            TIKISH<span style={{ color: P }}>.UZ</span>
          </h1>
          <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>
            Hisobingizga kiring
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="flex-1 flex flex-col px-6 -mt-6 relative z-10">
        <div
          className="rounded-3xl p-6 flex flex-col gap-4"
          style={{ background: "#ffffff", boxShadow: "0 -4px 32px rgba(232,93,138,0.1), 0 8px 32px rgba(26,26,46,0.08)" }}
        >
          {/* Phone field */}
          <div>
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: DARK }}>Telefon raqam</label>
            <div
              className="flex items-center gap-3 px-4 rounded-2xl"
              style={{ background: "#fdf0f5", border: `1.5px solid ${phone ? P : "#f0e4eb"}`, height: 52, transition: "border 0.2s" }}
            >
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-sm">🇺🇿</span>
                <span className="text-sm font-medium" style={{ color: DARK }}>+998</span>
              </div>
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
              style={{ background: "#fdf0f5", border: `1.5px solid ${pass ? P : "#f0e4eb"}`, height: 52, transition: "border 0.2s" }}
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
                {showPass
                  ? <EyeOff size={16} style={{ color: "#c4b0bc" }} />
                  : <Eye size={16} style={{ color: "#c4b0bc" }} />
                }
              </button>
            </div>
          </div>

          <button className="text-xs text-right font-medium" style={{ color: P }}>
            Parolni unutdingizmi?
          </button>

          {/* Login button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm"
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
              <>Kirish <ArrowRight size={16} /></>
            )}
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "#f0e4eb" }} />
            <span className="text-xs" style={{ color: "#c4b0bc" }}>yoki</span>
            <div className="flex-1 h-px" style={{ background: "#f0e4eb" }} />
          </div>

          {/* Role selection hint */}
          <div
            className="rounded-2xl p-3 flex gap-3"
            style={{ background: "#fdf0f5", border: "1px solid #f9c8da" }}
          >
            <span className="text-xs leading-relaxed" style={{ color: "#8a7a85" }}>
              <span className="font-semibold" style={{ color: P }}>Tikuvchi sifatida kirmoqchimisiz?</span>{" "}
              Ro'yxatdan o'tishda "Tikuvchi" rolini tanlang.
            </span>
          </div>
        </div>

        {/* Register link */}
        <p className="text-center mt-5 text-sm" style={{ color: "#8a7a85" }}>
          Hisobingiz yo'qmi?{" "}
          <button
            onClick={onRegister}
            className="font-semibold"
            style={{ color: P }}
          >
            Ro'yxatdan o'ting
          </button>
        </p>
      </div>
    </div>
  )
}
