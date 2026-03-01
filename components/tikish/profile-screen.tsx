"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-motion"
import {
  ShoppingBag,
  Heart,
  Bell,
  Shield,
  HelpCircle,
  Settings,
  ChevronRight,
  LogOut,
  Star,
  LayoutDashboard,
} from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

const ORDERS = [
  { id: "TK-2048", service: "To'y libosi", status: "Jarayonda", tailor: "Madina U.", img: "/outfit-dress.jpg" },
  { id: "TK-2031", service: "Klassik Kostyum", status: "Tayyor", tailor: "Rustam T.", img: "/outfit-suit.jpg" },
  { id: "TK-2019", service: "Milliy Chapan", status: "Yetkazildi", tailor: "Gulnoza N.", img: "/outfit-traditional.jpg" },
]

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  "Jarayonda": { bg: "#fef9c3", text: "#92400e" },
  "Tayyor": { bg: "#d1fae5", text: "#065f46" },
  "Yetkazildi": { bg: "#e0e7ff", text: "#3730a3" },
}

const MENU_ITEMS = [
  { Icon: Bell, label: "Bildirishnomalar", sub: "3 ta yangi", color: "#a78bfa" },
  { Icon: Heart, label: "Saqlangan", sub: "8 ta tikuvchi", color: P },
  { Icon: Shield, label: "Xavfsizlik", sub: "Parol, 2FA", color: "#34d399" },
  { Icon: HelpCircle, label: "Yordam markazi", sub: "Ko'p so'raladigan savollar", color: "#60a5fa" },
  { Icon: Settings, label: "Sozlamalar", sub: "Til, bildirishnomalar", color: "#8a7a85" },
]

interface ProfileScreenProps {
  onTailorDashboard: () => void
  onLogout: () => void
}

export default function ProfileScreen({ onTailorDashboard, onLogout }: ProfileScreenProps) {
  const [tab, setTab] = useState<"orders" | "settings">("orders")

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#f7f3f5" }}>
      {/* Header */}
      <div
        className="relative overflow-hidden px-5 pt-5 pb-10"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2e1a2e 100%)" }}
      >
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-15" style={{ background: P }} />
        <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full opacity-8" style={{ background: "#f9a8c9" }} />

        <div className="flex items-center justify-between mb-5 relative">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: P }}>Mening Profilim</p>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(232,93,138,0.15)", border: "1px solid rgba(232,93,138,0.2)" }}
          >
            <Settings size={16} style={{ color: P }} />
          </button>
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <img
              src="/tailor-2.jpg"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
              style={{ border: "3px solid rgba(232,93,138,0.4)" }}
            />
            <div
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#22c55e", border: `2px solid ${DARK}` }}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <div>
            <h2
              className="text-white font-bold text-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Alisher Karimov
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>+998 90 123 45 67</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={11} fill="#fbbf24" style={{ color: "#fbbf24" }} />
              <span className="text-xs font-semibold" style={{ color: "#fbbf24" }}>Premium Mijoz</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          className="flex items-center mt-5 rounded-2xl relative"
          style={{ background: "rgba(255,255,255,0.07)", padding: "12px 0" }}
        >
          {[
            { label: "Buyurtmalar", value: "12" },
            { label: "Saqlangan", value: "8" },
            { label: "Reytingim", value: "4.9" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex-1 flex flex-col items-center"
              style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none" }}
            >
              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.value}
              </span>
              <span className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tailor dashboard CTA */}
      <div className="mx-4 -mt-5 z-10 relative mb-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onTailorDashboard}
          className="w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm"
          style={{
            background: P,
            color: "#ffffff",
            boxShadow: "0 6px 20px rgba(232,93,138,0.35)",
          }}
        >
          <LayoutDashboard size={16} />
          Tikuvchi panelini ochish
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="mx-4 flex rounded-2xl overflow-hidden mb-3" style={{ background: "#f0e4eb" }}>
        {[{ id: "orders", label: "Buyurtmalarim" }, { id: "settings", label: "Sozlamalar" }].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as "orders" | "settings")}
            className="flex-1 py-2.5 text-xs font-semibold rounded-2xl transition-all"
            style={{
              background: tab === t.id ? "#ffffff" : "transparent",
              color: tab === t.id ? DARK : "#8a7a85",
              boxShadow: tab === t.id ? "0 2px 8px rgba(232,93,138,0.1)" : "none",
              margin: tab === t.id ? 2 : 0,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-4 pb-6 flex flex-col gap-2">
        {tab === "orders" ? (
          ORDERS.map((o) => {
            const sc = STATUS_COLORS[o.status] ?? { bg: "#f3f4f6", text: "#374151" }
            return (
              <motion.div
                key={o.id}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-3.5 rounded-2xl"
                style={{ background: "#ffffff", boxShadow: "0 2px 10px rgba(232,93,138,0.07)" }}
              >
                <img src={o.img} alt={o.service} className="w-12 h-12 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: DARK }}>{o.service}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#8a7a85" }}>{o.tailor} · #{o.id}</p>
                </div>
                <span
                  className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold"
                  style={{ background: sc.bg, color: sc.text }}
                >
                  {o.status}
                </span>
              </motion.div>
            )
          })
        ) : (
          <>
            {MENU_ITEMS.map(({ Icon, label, sub, color }) => (
              <motion.button
                key={label}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-3.5 rounded-2xl text-left w-full"
                style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(232,93,138,0.06)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: DARK }}>{label}</p>
                  <p className="text-[11px] mt-0.5 truncate" style={{ color: "#8a7a85" }}>{sub}</p>
                </div>
                <ChevronRight size={15} style={{ color: "#e8d5df" }} />
              </motion.button>
            ))}

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onLogout}
              className="flex items-center gap-3 p-3.5 rounded-2xl text-left w-full mt-1"
              style={{ background: "rgba(232,93,138,0.07)", border: "1px solid rgba(232,93,138,0.15)" }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(232,93,138,0.12)" }}>
                <LogOut size={18} style={{ color: P }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: P }}>Chiqish</span>
            </motion.button>
          </>
        )}
      </div>
    </div>
  )
}
