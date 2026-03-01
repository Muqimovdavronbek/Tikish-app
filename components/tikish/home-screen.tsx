"use client"

import { useState } from "react"
import { Bell, Search, Star, ShoppingBag, ChevronRight, MapPin } from "lucide-react"
import type { Tab } from "@/app/page"

const CATEGORIES = ["Barchasi", "Erkaklar", "Ayollar", "Bolalar", "Milliy", "Sport"]

const ITEMS = [
  {
    id: 1,
    name: "Klassik Kostyum",
    tailor: "Rustam Masterlar",
    price: "450 000",
    rating: 4.9,
    tag: "Mashhur",
    img: "/outfit-suit.jpg",
  },
  {
    id: 2,
    name: "Oqshom Ko'ylagi",
    tailor: "Madina Fashion",
    price: "380 000",
    rating: 4.8,
    tag: "Yangi",
    img: "/outfit-dress.jpg",
  },
  {
    id: 3,
    name: "Milliy Chapan",
    tailor: "Gulnoza Atelier",
    price: "520 000",
    rating: 4.9,
    tag: "Tavsiya",
    img: "/outfit-traditional.jpg",
  },
  {
    id: 4,
    name: "Bolalar Kiyimi",
    tailor: "Kids Style UZ",
    price: "220 000",
    rating: 4.7,
    tag: "Mashhur",
    img: "/outfit-kids.jpg",
  },
]

const TAILORS = [
  { id: 1, name: "Madina S.", city: "Toshkent", rating: 4.9, orders: 127 },
  { id: 2, name: "Rustam T.", city: "Samarqand", rating: 4.8, orders: 95 },
  { id: 3, name: "Gulnoza A.", city: "Buxoro", rating: 4.9, orders: 156 },
]

interface HomeScreenProps {
  onTabChange: (tab: Tab) => void
}

export default function HomeScreen({ onTabChange }: HomeScreenProps) {
  const [activeCategory, setActiveCategory] = useState("Barchasi")
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#f8f7f5", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div
        className="px-5 pt-4 pb-5"
        style={{ background: "#0a0a2e" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-medium" style={{ color: "#D4AF37", letterSpacing: "0.08em" }}>
              RAQAMLI MODELYER
            </p>
            <h1
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em" }}
            >
              TIKISH.UZ
            </h1>
          </div>
          <button
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)" }}
          >
            <Bell size={18} style={{ color: "#D4AF37" }} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#D4AF37", border: "1.5px solid #0a0a2e" }}
            />
          </button>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2 px-4 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", height: 44 }}
        >
          <Search size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tikuvchi yoki uslub izlang..."
            className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>
      </div>

      {/* Hero banner */}
      <div className="mx-4 mt-4 rounded-2xl overflow-hidden relative" style={{ height: 160 }}>
        <img src="/hero-fashion.jpg" alt="Hero" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0 flex flex-col justify-end p-4"
          style={{ background: "linear-gradient(to top, rgba(10,10,46,0.85) 0%, transparent 60%)" }}
        >
          <p className="text-white text-xs font-medium mb-1" style={{ color: "#D4AF37" }}>
            2026 KOLLEKSIYASI
          </p>
          <h2
            className="text-white font-bold text-lg leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sizning raqamli modelyeringiz
          </h2>
          <button
            onClick={() => onTabChange("stylist")}
            className="mt-2 self-start px-4 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: "#D4AF37", color: "#0a0a2e" }}
          >
            Boshlash
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-5 px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold" style={{ color: "#0a0a2e" }}>
            Kategoriyalar
          </h3>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: activeCategory === cat ? "#D4AF37" : "#ffffff",
                color: activeCategory === cat ? "#0a0a2e" : "#6b7280",
                border: `1px solid ${activeCategory === cat ? "#D4AF37" : "#e8e0d0"}`,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Collection */}
      <div className="mt-5 px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold" style={{ color: "#0a0a2e" }}>
            Mashhur Kolleksiya
          </h3>
          <button className="flex items-center gap-0.5 text-xs" style={{ color: "#D4AF37" }}>
            Barchasi <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#ffffff", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
            >
              <div className="relative" style={{ height: 130 }}>
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                <span
                  className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ background: "#D4AF37", color: "#0a0a2e" }}
                >
                  {item.tag}
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold leading-tight" style={{ color: "#0a0a2e" }}>
                  {item.name}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "#9ca3af" }}>
                  {item.tailor}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={10} fill="#D4AF37" style={{ color: "#D4AF37" }} />
                    <span className="text-[10px] font-medium" style={{ color: "#0a0a2e" }}>
                      {item.rating}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold" style={{ color: "#D4AF37" }}>
                    {item.price} so'm
                  </span>
                </div>
                <button
                  className="mt-2 w-full py-1.5 rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5"
                  style={{ background: "#0a0a2e", color: "#D4AF37" }}
                >
                  <ShoppingBag size={12} />
                  Buyurtma berish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Tailors */}
      <div className="mt-5 px-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold" style={{ color: "#0a0a2e" }}>
            Top Tikuvchilar
          </h3>
          <button className="flex items-center gap-0.5 text-xs" style={{ color: "#D4AF37" }}>
            Barchasi <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {TAILORS.map((t, i) => (
            <div
              key={t.id}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: i === 0 ? "#D4AF37" : "#f5f0e8", color: i === 0 ? "#0a0a2e" : "#8b7355" }}
              >
                {t.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: "#0a0a2e" }}>
                  {t.name}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={9} style={{ color: "#9ca3af" }} />
                  <span className="text-[10px]" style={{ color: "#9ca3af" }}>
                    {t.city}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-0.5">
                  <Star size={10} fill="#D4AF37" style={{ color: "#D4AF37" }} />
                  <span className="text-[10px] font-bold" style={{ color: "#0a0a2e" }}>
                    {t.rating}
                  </span>
                </div>
                <p className="text-[9px] mt-0.5" style={{ color: "#9ca3af" }}>
                  {t.orders} buyurtma
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
