"use client"

import { useState } from "react"
import {
  User,
  Star,
  ShoppingBag,
  Heart,
  Settings,
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
} from "lucide-react"
import { motion } from "framer-motion"

const STATS = [
  { label: "Buyurtmalar", value: "12" },
  { label: "Saqlangan", value: "8" },
  { label: "Reytingim", value: "4.9" },
]

const MENU_ITEMS = [
  { Icon: ShoppingBag, label: "Buyurtmalarim", sub: "12 ta buyurtma", color: "#D4AF37" },
  { Icon: Heart, label: "Saqlangan", sub: "8 ta kiyim", color: "#e05a6a" },
  { Icon: Bell, label: "Bildirishnomalar", sub: "3 ta yangi", color: "#6c63ff" },
  { Icon: Shield, label: "Xavfsizlik", sub: "Parol, 2FA", color: "#22c55e" },
  { Icon: HelpCircle, label: "Yordam", sub: "Ko'p so'raladigan savollar", color: "#0a0a2e" },
  { Icon: Settings, label: "Sozlamalar", sub: "Til, bildirishnomalar", color: "#9ca3af" },
]

export default function ProfileScreen() {
  const [saved, setSaved] = useState(false)

  return (
    <div
      className="flex flex-col min-h-full"
      style={{ background: "#f8f7f5", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div
        className="px-5 pt-5 pb-8 relative overflow-hidden"
        style={{ background: "#0a0a2e" }}
      >
        {/* Decorative circle */}
        <div
          className="absolute -right-10 -top-10 rounded-full opacity-10"
          style={{ width: 160, height: 160, background: "#D4AF37" }}
        />
        <div
          className="absolute right-20 bottom-0 rounded-full opacity-5"
          style={{ width: 80, height: 80, background: "#D4AF37" }}
        />

        <div className="flex items-center justify-between mb-5 relative">
          <p
            className="text-xs font-medium tracking-widest"
            style={{ color: "#D4AF37" }}
          >
            PROFIL
          </p>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.25)" }}
          >
            <Settings size={16} style={{ color: "#D4AF37" }} />
          </button>
        </div>

        {/* Avatar + name */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #D4AF37, #b8960c)",
                boxShadow: "0 0 0 3px rgba(212,175,55,0.25)",
              }}
            >
              <User size={30} style={{ color: "#0a0a2e" }} />
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#22c55e", border: "2px solid #0a0a2e" }}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <div>
            <h2
              className="text-white font-bold text-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Alisher Karimov
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
              alisher@email.com
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={11} fill="#D4AF37" style={{ color: "#D4AF37" }} />
              <span className="text-xs font-semibold" style={{ color: "#D4AF37" }}>
                Premium Mijoz
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="flex items-center mt-5 rounded-2xl relative"
          style={{ background: "rgba(255,255,255,0.07)", padding: "12px 0" }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex-1 flex flex-col items-center"
              style={{ borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}
            >
              <span className="text-lg font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </span>
              <span className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit profile CTA */}
      <div className="mx-4 -mt-4 z-10 relative">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setSaved(!saved)}
          className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
          style={{
            background: saved ? "#f5f0e8" : "#D4AF37",
            color: saved ? "#8b6914" : "#0a0a2e",
            border: saved ? "1.5px solid #D4AF37" : "none",
            boxShadow: saved ? "none" : "0 4px 18px rgba(212,175,55,0.35)",
            transition: "all 0.2s",
          }}
        >
          {saved ? "Profilni tahrirlash" : "Profilni saqlash"}
        </motion.button>
      </div>

      {/* Menu list */}
      <div className="mx-4 mt-4 flex flex-col gap-2 pb-6">
        {MENU_ITEMS.map(({ Icon, label, sub, color }) => (
          <motion.button
            key={label}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-3.5 rounded-2xl text-left w-full"
            style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${color}18` }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: "#0a0a2e" }}>
                {label}
              </p>
              <p className="text-[11px] mt-0.5 truncate" style={{ color: "#9ca3af" }}>
                {sub}
              </p>
            </div>
            <ChevronRight size={16} style={{ color: "#d1d5db", flexShrink: 0 }} />
          </motion.button>
        ))}

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 p-3.5 rounded-2xl text-left w-full mt-1"
          style={{ background: "rgba(224, 90, 106, 0.08)", border: "1px solid rgba(224,90,106,0.15)" }}
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(224,90,106,0.12)" }}>
            <LogOut size={18} style={{ color: "#e05a6a" }} />
          </div>
          <span className="text-sm font-semibold" style={{ color: "#e05a6a" }}>
            Chiqish
          </span>
        </motion.button>
      </div>
    </div>
  )
}
