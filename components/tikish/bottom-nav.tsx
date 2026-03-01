"use client"

import { motion } from "framer-motion"
import { Home, Sparkles, Camera, User } from "lucide-react"
import type { Tab } from "@/app/page"

const tabs: { id: Tab; label: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { id: "home", label: "Bosh sahifa", Icon: Home },
  { id: "stylist", label: "AI Stilist", Icon: Sparkles },
  { id: "tryon", label: "Virtual Kiyinish", Icon: Camera },
  { id: "profile", label: "Profil", Icon: User },
]

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div
      className="shrink-0 flex items-center justify-around px-2 pt-2 pb-3 relative"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e8e0d0",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
      }}
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex flex-col items-center gap-1 relative px-3 py-1 rounded-2xl transition-all"
            style={{ minWidth: 64 }}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 rounded-2xl"
                style={{ background: "rgba(212,175,55,0.12)" }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <Icon
              size={22}
              strokeWidth={isActive ? 2.2 : 1.6}
              style={{ color: isActive ? "#D4AF37" : "#9ca3af", position: "relative" }}
            />
            <span
              className="text-[10px] font-medium leading-tight relative"
              style={{
                color: isActive ? "#D4AF37" : "#9ca3af",
                fontFamily: "'Inter', sans-serif",
                whiteSpace: "nowrap",
                fontSize: 9,
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
