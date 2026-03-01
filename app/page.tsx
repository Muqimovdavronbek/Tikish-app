"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "@/lib/framer-motion"
import SplashScreen from "@/components/tikish/splash-screen"
import OnboardingScreen from "@/components/tikish/onboarding-screen"
import LoginScreen from "@/components/tikish/login-screen"
import RegisterScreen from "@/components/tikish/register-screen"
import HomeScreen from "@/components/tikish/home-screen"
import SearchScreen from "@/components/tikish/search-screen"
import TailorProfileScreen from "@/components/tikish/tailor-profile-screen"
import OrderScreen from "@/components/tikish/order-screen"
import ChatScreen from "@/components/tikish/chat-screen"
import ProfileScreen from "@/components/tikish/profile-screen"
import TailorDashboardScreen from "@/components/tikish/tailor-dashboard-screen"
import BottomNav from "@/components/tikish/bottom-nav"

import AiStylistScreen from "@/components/tikish/ai-stylist-screen"

export type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "register"
  | "home"
  | "search"
  | "tailor-profile"
  | "order"
  | "chat"
  | "ai-stylist"
  | "profile"
  | "tailor-dashboard"

const SCREENS_WITH_NAV: Screen[] = ["home", "search", "ai-stylist", "profile", "tailor-dashboard"]

const pageVariants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
}

export default function TikishApp() {
  const [screen, setScreen] = useState<Screen>("splash")

  const navigate = (s: Screen) => setScreen(s)

  const showNav = SCREENS_WITH_NAV.includes(screen)

  return (
    <main
      className="min-h-screen flex items-center justify-center p-3"
      style={{ background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 40%, #f9a8d4 100%)" }}
    >
      {/* Phone frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: "min(390px, 100vw - 1.5rem)",
          height: "min(844px, 100svh - 1.5rem)",
          borderRadius: "3rem",
          border: "10px solid #1a1a2e",
          boxShadow:
            "0 0 0 1.5px rgba(232,93,138,0.4), 0 40px 80px rgba(26,26,46,0.45), 0 0 50px rgba(232,93,138,0.12)",
          background: "#ffffff",
        }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-7 shrink-0"
          style={{ background: screen === "splash" ? "transparent" : "#1a1a2e", paddingTop: 10, paddingBottom: 10, position: "relative", zIndex: 10 }}
        >
          <span className="text-white text-xs font-semibold tracking-wide">9:41</span>
          <div
            className="absolute left-1/2 -translate-x-1/2 top-2 rounded-full"
            style={{ width: 90, height: 22, background: "#1a1a2e" }}
          />
          <div className="flex items-center gap-2">
            <div className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-sm"
                  style={{ height: h, background: i < 3 ? "#e85d8a" : "rgba(255,255,255,0.3)" }}
                />
              ))}
            </div>
            <div className="flex items-center gap-[2px]">
              <div
                className="rounded-sm relative overflow-hidden"
                style={{ width: 20, height: 10, border: "1px solid rgba(255,255,255,0.5)" }}
              >
                <div className="absolute left-0 top-0 bottom-0 rounded-sm" style={{ width: "80%", background: "#e85d8a" }} />
              </div>
              <div className="rounded-r-sm" style={{ width: 2, height: 5, background: "rgba(255,255,255,0.5)" }} />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 relative overflow-hidden" style={{ background: "#ffffff" }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={screen}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="absolute inset-0 overflow-y-auto"
              style={{ overscrollBehavior: "contain" }}
            >
              {screen === "splash" && <SplashScreen onNext={() => navigate("onboarding")} />}
              {screen === "onboarding" && <OnboardingScreen onNext={() => navigate("login")} />}
              {screen === "login" && (
                <LoginScreen onLogin={() => navigate("home")} onRegister={() => navigate("register")} />
              )}
              {screen === "register" && (
                <RegisterScreen onRegister={() => navigate("home")} onLogin={() => navigate("login")} />
              )}
              {screen === "home" && (
                <HomeScreen
                  onTailorPress={() => navigate("tailor-profile")}
                  onSearchPress={() => navigate("search")}
                />
              )}
              {screen === "search" && (
                <SearchScreen onTailorPress={() => navigate("tailor-profile")} onBack={() => navigate("home")} />
              )}
              {screen === "tailor-profile" && (
                <TailorProfileScreen
                  onOrder={() => navigate("order")}
                  onChat={() => navigate("chat")}
                  onBack={() => navigate("home")}
                />
              )}
              {screen === "order" && (
                <OrderScreen onChat={() => navigate("chat")} onBack={() => navigate("tailor-profile")} />
              )}
              {screen === "chat" && <ChatScreen onBack={() => navigate("tailor-profile")} />}
              {screen === "ai-stylist" && <AiStylistScreen onBack={() => navigate("home")} />}
              {screen === "profile" && (
                <ProfileScreen
                  onTailorDashboard={() => navigate("tailor-dashboard")}
                  onLogout={() => navigate("login")}
                />
              )}
              {screen === "tailor-dashboard" && (
                <TailorDashboardScreen onBack={() => navigate("profile")} onChat={() => navigate("chat")} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        {showNav && (
          <BottomNav
            activeScreen={screen}
            onNavigate={navigate}
          />
        )}
      </div>
    </main>
  )
}
