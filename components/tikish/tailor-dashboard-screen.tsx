"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, MessageCircle, CheckCircle, Clock, TrendingUp, Users, Star, Package } from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

const INCOMING_ORDERS = [
  { id: "TK-2051", client: "Zulfiya M.", service: "Ko'ylak tikish", size: "S", deadline: "20 Mart", budget: "120 000", status: "Yangi", img: "/outfit-dress.jpg" },
  { id: "TK-2049", client: "Jasur K.", service: "Kostyum tikish", size: "L", deadline: "18 Mart", budget: "280 000", status: "Ko'rib chiqilmoqda", img: "/outfit-suit.jpg" },
  { id: "TK-2047", client: "Nafisa B.", service: "Milliy Chapan", size: "M", deadline: "25 Mart", budget: "200 000", status: "Jarayonda", img: "/outfit-traditional.jpg" },
]

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Yangi": { bg: "#fdf0f5", text: P, border: "#f9c8da" },
  "Ko'rib chiqilmoqda": { bg: "#fef9c3", text: "#92400e", border: "#fde68a" },
  "Jarayonda": { bg: "#d1fae5", text: "#065f46", border: "#6ee7b7" },
}

interface TailorDashboardScreenProps {
  onBack: () => void
  onChat: () => void
}

export default function TailorDashboardScreen({ onBack, onChat }: TailorDashboardScreenProps) {
  const [orders, setOrders] = useState(INCOMING_ORDERS)

  const acceptOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Jarayonda" } : o))
    )
  }

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#f7f3f5" }}>
      {/* Header */}
      <div
        className="relative overflow-hidden px-5 pt-5 pb-6"
        style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2e1a2e 100%)" }}
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-12" style={{ background: P }} />
        <div className="flex items-center gap-3 mb-4 relative">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <ChevronLeft size={18} style={{ color: "#ffffff" }} />
          </button>
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: P }}>
              Tikuvchi Paneli
            </p>
            <h2 className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
              Madina Umarova
            </h2>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>Aktiv</span>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-2 relative">
          {[
            { label: "Oylik daromad", value: "2 450 000", unit: "so'm", Icon: TrendingUp, color: "#34d399" },
            { label: "Jami buyurtmalar", value: "127", unit: "ta", Icon: Package, color: P },
            { label: "Doimiy mijozlar", value: "38", unit: "ta", Icon: Users, color: "#60a5fa" },
            { label: "O'rtacha reyting", value: "4.9", unit: "★", Icon: Star, color: "#fbbf24" },
          ].map(({ label, value, unit, Icon, color }) => (
            <div
              key={label}
              className="p-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</p>
                <Icon size={13} style={{ color }} />
              </div>
              <p className="text-base font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                {value} <span className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.5)" }}>{unit}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Incoming orders */}
      <div className="px-4 pt-4 pb-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold" style={{ color: DARK }}>Yangi buyurtmalar</h3>
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
            style={{ background: "#fdf0f5", color: P }}
          >
            {orders.filter((o) => o.status === "Yangi").length} yangi
          </span>
        </div>

        {orders.map((o) => {
          const sc = STATUS_COLORS[o.status] ?? { bg: "#f3f4f6", text: "#374151", border: "#e5e7eb" }
          return (
            <motion.div
              key={o.id}
              layout
              className="rounded-3xl overflow-hidden"
              style={{ background: "#ffffff", boxShadow: "0 2px 14px rgba(232,93,138,0.08)" }}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <img src={o.img} alt={o.service} className="w-12 h-12 rounded-2xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold truncate" style={{ color: DARK }}>{o.service}</p>
                      <span
                        className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}
                      >
                        {o.status}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#8a7a85" }}>
                      Mijoz: <span className="font-medium" style={{ color: DARK }}>{o.client}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1">
                        <Package size={10} style={{ color: "#c4b0bc" }} />
                        <span className="text-[10px]" style={{ color: "#8a7a85" }}>O'lcham: {o.size}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={10} style={{ color: "#c4b0bc" }} />
                        <span className="text-[10px]" style={{ color: "#8a7a85" }}>{o.deadline}</span>
                      </div>
                      <span className="text-[10px] font-bold ml-auto" style={{ color: P }}>
                        {o.budget} so'm
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={onChat}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                    style={{ background: "#fdf0f5", color: P, border: `1px solid ${P}30` }}
                  >
                    <MessageCircle size={13} />
                    Muloqot
                  </button>
                  {o.status === "Yangi" && (
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => acceptOrder(o.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                      style={{ background: P, color: "#ffffff", boxShadow: "0 3px 10px rgba(232,93,138,0.3)" }}
                    >
                      <CheckCircle size={13} />
                      Qabul qilish
                    </motion.button>
                  )}
                  {o.status === "Ko'rib chiqilmoqda" && (
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={() => acceptOrder(o.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                      style={{ background: "#065f46", color: "#ffffff" }}
                    >
                      <CheckCircle size={13} />
                      Boshlash
                    </motion.button>
                  )}
                  {o.status === "Jarayonda" && (
                    <div
                      className="flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                      style={{ background: "#d1fae5", color: "#065f46" }}
                    >
                      <CheckCircle size={13} />
                      Jarayonda
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
