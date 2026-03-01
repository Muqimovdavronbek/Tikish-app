"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-motion"
import { ChevronLeft, Search, Star, MapPin, Filter, X } from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

const TAILORS = [
  { id: 1, name: "Madina Umarova", city: "Chilonzor", dist: "0.8 km", rating: 4.9, orders: 127, spec: "Ayollar kiyimi", price: "100 000", img: "/tailor-1.jpg" },
  { id: 2, name: "Rustam Toshev", city: "Yunusobod", dist: "1.4 km", rating: 4.8, orders: 95, spec: "Erkaklar kiyimi", price: "80 000", img: "/tailor-2.jpg" },
  { id: 3, name: "Gulnoza Nazarova", city: "Mirzo Ulug'bek", dist: "2.1 km", rating: 4.9, orders: 156, spec: "To'y libosi", price: "250 000", img: "/tailor-1.jpg" },
  { id: 4, name: "Bobur Ismoilov", city: "Shayhontohur", dist: "3.0 km", rating: 4.7, orders: 88, spec: "Milliy kiyim", price: "120 000", img: "/tailor-2.jpg" },
  { id: 5, name: "Kamola Yusupova", city: "Uchtepa", dist: "3.5 km", rating: 4.6, orders: 74, spec: "Bolalar kiyimi", price: "60 000", img: "/tailor-1.jpg" },
]

const FILTERS = ["Eng yaqin", "Eng yuqori reyting", "Eng ko'p buyurtma", "Narx: past-yuqori"]

interface SearchScreenProps {
  onTailorPress: () => void
  onBack: () => void
}

export default function SearchScreen({ onTailorPress, onBack }: SearchScreenProps) {
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("Eng yaqin")
  const [showFilters, setShowFilters] = useState(false)

  const filtered = TAILORS.filter((t) =>
    !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.spec.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#f7f3f5" }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-4 shrink-0" style={{ background: DARK }}>
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <ChevronLeft size={18} style={{ color: "#ffffff" }} />
          </button>
          {/* Search input */}
          <div
            className="flex-1 flex items-center gap-2 px-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.08)", height: 46 }}
          >
            <Search size={15} style={{ color: "rgba(255,255,255,0.5)" }} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tikuvchi yoki xizmat..."
              className="flex-1 bg-transparent text-sm outline-none text-white placeholder-white/40"
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            {query && (
              <button onClick={() => setQuery("")}>
                <X size={14} style={{ color: "rgba(255,255,255,0.5)" }} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: showFilters ? P : "rgba(255,255,255,0.1)",
              border: `1px solid ${showFilters ? P : "rgba(255,255,255,0.08)"}`,
            }}
          >
            <Filter size={16} style={{ color: showFilters ? "#ffffff" : "rgba(255,255,255,0.7)" }} />
          </button>
        </div>

        {/* Filter pills */}
        {showFilters && (
          <div className="flex gap-2 overflow-x-auto pb-1 mt-1" style={{ scrollbarWidth: "none" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium"
                style={{
                  background: activeFilter === f ? P : "rgba(255,255,255,0.1)",
                  color: activeFilter === f ? "#ffffff" : "rgba(255,255,255,0.6)",
                  border: `1px solid ${activeFilter === f ? P : "transparent"}`,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="px-4 pt-4 pb-4 flex flex-col gap-2">
        <p className="text-xs font-medium mb-1" style={{ color: "#8a7a85" }}>
          {filtered.length} tikuvchi topildi
        </p>

        {filtered.map((t) => (
          <motion.button
            key={t.id}
            whileTap={{ scale: 0.98 }}
            onClick={onTailorPress}
            className="flex items-center gap-3 p-4 rounded-3xl text-left w-full"
            style={{ background: "#ffffff", boxShadow: "0 2px 14px rgba(232,93,138,0.07)" }}
          >
            <img src={t.img} alt={t.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-bold truncate" style={{ color: DARK }}>{t.name}</p>
                <span
                  className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold"
                  style={{ background: "#fdf0f5", color: P }}
                >
                  {t.dist}
                </span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: "#8a7a85" }}>{t.spec}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    <Star size={11} fill={P} style={{ color: P }} />
                    <span className="text-xs font-semibold" style={{ color: DARK }}>{t.rating}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <MapPin size={10} style={{ color: "#c4b0bc" }} />
                    <span className="text-xs" style={{ color: "#c4b0bc" }}>{t.city}</span>
                  </div>
                </div>
                <span className="text-xs font-bold" style={{ color: P }}>
                  {t.price} so'm
                </span>
              </div>
            </div>
          </motion.button>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "#fdf0f5" }}
            >
              <Search size={28} style={{ color: "#f9c8da" }} />
            </div>
            <p className="text-sm font-semibold" style={{ color: DARK }}>Topilmadi</p>
            <p className="text-xs text-center" style={{ color: "#8a7a85" }}>
              Boshqa kalit so'z bilan qidiring
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
