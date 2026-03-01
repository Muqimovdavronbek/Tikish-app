"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HomeScreen from "@/components/tikish/home-screen"
import AiStylistScreen from "@/components/tikish/ai-stylist-screen"
import VirtualTryOnScreen from "@/components/tikish/virtual-tryon-screen"
import ProfileScreen from "@/components/tikish/profile-screen"
import BottomNav from "@/components/tikish/bottom-nav"

export type Tab = "home" | "stylist" | "tryon" | "profile"

const tabOrder: Tab[] = ["home", "stylist", "tryon", "profile"]

const pageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 48 : -48,
    opacity: 0,
  }),
}

export default function TikishApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [prevTab, setPrevTab] = useState<Tab>("home")

  const handleTabChange = (tab: Tab) => {
    setPrevTab(activeTab)
    setActiveTab(tab)
  }

  const direction = tabOrder.indexOf(activeTab) - tabOrder.indexOf(prevTab)

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a20 50%, #0a1a2e 100%)" }}
    >
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "min(390px, 100vw - 2rem)",
          height: "min(844px, 100svh - 2rem)",
          borderRadius: "2.75rem",
          border: "10px solid #0f0f2a",
          boxShadow:
            "0 0 0 1.5px #D4AF37, inset 0 0 0 1px rgba(212,175,55,0.15), 0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(212,175,55,0.08)",
          background: "#ffffff",
        }}
      >
        {/* Notch / status bar */}
        <div
          className="flex items-center justify-between px-7 shrink-0"
          style={{ background: "#0a0a2e", paddingTop: 10, paddingBottom: 10 }}
        >
          <span className="text-white text-xs font-semibold tracking-wide">9:41</span>
          {/* Notch pill */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-2 rounded-full"
            style={{ width: 90, height: 22, background: "#0a0a2e" }}
          />
          <div className="flex items-center gap-2">
            {/* Signal bars */}
            <div className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-sm"
                  style={{ height: h, background: i < 3 ? "#D4AF37" : "rgba(255,255,255,0.3)" }}
                />
              ))}
            </div>
            {/* Battery */}
            <div className="flex items-center gap-[2px]">
              <div
                className="rounded-sm relative overflow-hidden"
                style={{ width: 20, height: 10, border: "1px solid rgba(255,255,255,0.5)" }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-sm"
                  style={{ width: "75%", background: "#D4AF37" }}
                />
              </div>
              <div
                className="rounded-r-sm"
                style={{ width: 2, height: 5, background: "rgba(255,255,255,0.5)" }}
              />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 relative overflow-hidden" style={{ background: "#f8f7f5" }}>
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={activeTab}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute inset-0 overflow-y-auto"
              style={{ overscrollBehavior: "contain" }}
            >
              {activeTab === "home" && <HomeScreen onTabChange={handleTabChange} />}
              {activeTab === "stylist" && <AiStylistScreen />}
              {activeTab === "tryon" && <VirtualTryOnScreen />}
              {activeTab === "profile" && <ProfileScreen />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </main>
  )
}
