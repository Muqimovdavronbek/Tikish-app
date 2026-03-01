"use client"

import { motion } from "@/lib/framer-motion"
import { Home, Search, Sparkles, User, LayoutDashboard } from "lucide-react"

const tabs: { id: Screen; label: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: "home", label: "Bosh sahifa", Icon: Home },
  { id: "search", label: "Qidiruv", Icon: Search },
  { id: "ai-stylist", label: "AI Stilist", Icon: Sparkles },
  { id: "profile", label: "Profil", Icon: User },
  { id: "tailor-dashboard", label: "Dashboard", Icon: LayoutDashboard },
]

interface BottomNavProps {
  activeScreen: Screen
  onNavigate: (s: Screen) => void
}

const PRIMARY = "#e85d8a"

export default function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  return (
    <div
      className="shrink-0 flex items-center justify-around px-2 pt-2 pb-4"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #f0e4eb",
        boxShadow: "0 -4px 24px rgba(232,93,138,0.08)",
      }}
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeScreen === id
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="flex flex-col items-center gap-1 relative px-3 py-1 rounded-2xl transition-all"
            style={{ minWidth: 64 }}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 rounded-2xl"
                style={{ background: "rgba(232,93,138,0.10)" }}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <Icon
              size={22}
              strokeWidth={isActive ? 2.2 : 1.6}
              style={{ color: isActive ? PRIMARY : "#c4b0bc", position: "relative" }}
            />
            <span
              className="relative leading-tight"
              style={{
                color: isActive ? PRIMARY : "#c4b0bc",
                fontFamily: "'Inter', sans-serif",
                fontSize: 9,
                fontWeight: isActive ? 600 : 400,
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
