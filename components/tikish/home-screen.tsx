"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Search, Star, MapPin, ChevronRight, Navigation, Filter } from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

const TAILORS = [
  { id: 1, name: "Madina Umarova", city: "Chilonzor", dist: "0.8 km", rating: 4.9, orders: 127, spec: "Ayollar kiyimi", img: "/tailor-1.jpg", x: 52, y: 38 },
  { id: 2, name: "Rustam Toshev", city: "Yunusobod", dist: "1.4 km", rating: 4.8, orders: 95, spec: "Erkaklar kiyimi", img: "/tailor-2.jpg", x: 70, y: 55 },
  { id: 3, name: "Gulnoza Nazarova", city: "Mirzo Ulug'bek", dist: "2.1 km", rating: 4.9, orders: 156, spec: "To'y libosi", img: "/tailor-1.jpg", x: 35, y: 60 },
  { id: 4, name: "Bobur Ismoilov", city: "Shayhontohur", dist: "3.0 km", rating: 4.7, orders: 88, spec: "Milliy kiyim", img: "/tailor-2.jpg", x: 62, y: 72 },
]

const CATS = ["Barchasi", "Ayollar", "Erkaklar", "To'y", "Milliy", "Bolalar"]

interface HomeScreenProps {
  onTailorPress: () => void
  onSearchPress: () => void
}

export default function HomeScreen({ onTailorPress, onSearchPress }: HomeScreenProps) {
  const [mapMode, setMapMode] = useState(true)
  const [selected, setSelected] = useState<number | null>(null)
  const [cat, setCat] = useState("Barchasi")

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#f7f3f5" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-4 shrink-0" style={{ background: DARK }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <MapPin size={12} style={{ color: P }} />
              <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                Toshkent, O'zbekiston
              </p>
            </div>
            <h1
              className="text-xl font-bold text-white mt-0.5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Yaqin tikuvchilar
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="relative w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(232,93,138,0.15)", border: "1px solid rgba(232,93,138,0.3)" }}
            >
              <Bell size={17} style={{ color: P }} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ background: P, border: `1.5px solid ${DARK}` }} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <button
          onClick={onSearchPress}
          className="w-full flex items-center gap-2 px-4 rounded-2xl text-left"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", height: 46 }}
        >
          <Search size={15} style={{ color: "rgba(255,255,255,0.4)" }} />
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Tikuvchi yoki xizmat izlang...</span>
        </button>
      </div>

      {/* Toggle map/list */}
      <div className="px-5 pt-3 pb-2 flex items-center gap-2 shrink-0" style={{ background: DARK }}>
        {["Xarita", "Ro'yxat"].map((label, i) => (
          <button
            key={label}
            onClick={() => setMapMode(i === 0)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: mapMode === (i === 0) ? P : "rgba(255,255,255,0.08)",
              color: mapMode === (i === 0) ? "#ffffff" : "rgba(255,255,255,0.5)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {mapMode ? (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1"
          >
            {/* Fake map */}
            <div
              className="mx-4 mt-3 rounded-3xl overflow-hidden relative shrink-0"
              style={{ height: 260, background: "#e8f4e8" }}
            >
              {/* SVG map background */}
              <svg className="w-full h-full" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
                {/* Roads */}
                <rect width="400" height="260" fill="#edf2f7"/>
                {/* Grid roads */}
                {[60,120,180,240,300,360].map(x => (
                  <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="#d1dce8" strokeWidth="1.5"/>
                ))}
                {[52,104,156,208].map(y => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#d1dce8" strokeWidth="1.5"/>
                ))}
                {/* Main roads */}
                <line x1="0" y1="130" x2="400" y2="130" stroke="#c8d8e8" strokeWidth="4"/>
                <line x1="200" y1="0" x2="200" y2="260" stroke="#c8d8e8" strokeWidth="4"/>
                <line x1="0" y1="80" x2="400" y2="200" stroke="#c8d8e8" strokeWidth="3"/>
                {/* Blocks */}
                {[[20,20,70,40],[150,20,60,35],[250,30,80,40],[320,15,70,45],
                  [30,90,80,40],[140,95,70,38],[240,88,75,42],[330,80,55,44],
                  [25,155,65,42],[155,150,85,40],[255,160,70,38],[340,145,50,46],
                  [20,210,90,35],[155,205,75,40],[260,208,80,38]].map(([x,y,w,h],i) => (
                  <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#dce8f2" opacity="0.8"/>
                ))}
                {/* Park */}
                <ellipse cx="120" cy="180" rx="35" ry="25" fill="#b8ddb8" opacity="0.6"/>
                <ellipse cx="320" cy="100" rx="28" ry="20" fill="#b8ddb8" opacity="0.6"/>
              </svg>

              {/* User location pin */}
              <div
                className="absolute flex flex-col items-center"
                style={{ left: "48%", top: "45%", transform: "translate(-50%,-50%)" }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(26,26,46,0.85)", border: "2px solid white", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: "#60a5fa" }} />
                </motion.div>
                <div className="absolute -inset-3 rounded-full" style={{ background: "rgba(96,165,250,0.15)" }} />
              </div>

              {/* Tailor pins */}
              {TAILORS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelected(selected === t.id ? null : t.id)}
                  className="absolute flex flex-col items-center"
                  style={{ left: `${t.x}%`, top: `${t.y}%`, transform: "translate(-50%,-50%)", zIndex: selected === t.id ? 10 : 5 }}
                >
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full overflow-hidden"
                    style={{
                      width: selected === t.id ? 38 : 30,
                      height: selected === t.id ? 38 : 30,
                      border: `2.5px solid ${selected === t.id ? P : "#ffffff"}`,
                      boxShadow: selected === t.id ? `0 0 0 3px rgba(232,93,138,0.25), 0 4px 12px rgba(0,0,0,0.2)` : "0 2px 8px rgba(0,0,0,0.15)",
                      transition: "all 0.2s",
                    }}
                  >
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                  </motion.div>
                  <div
                    className="w-1.5 h-1.5 rounded-full -mt-0.5"
                    style={{ background: selected === t.id ? P : "#ffffff", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
                  />
                </button>
              ))}

              {/* Selected tailor popup */}
              <AnimatePresence>
                {selected !== null && (() => {
                  const t = TAILORS.find((x) => x.id === selected)!
                  return (
                    <motion.button
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      onClick={onTailorPress}
                      className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl flex items-center gap-3 text-left"
                      style={{ background: "#ffffff", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                    >
                      <img src={t.img} alt={t.name} className="w-11 h-11 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate" style={{ color: DARK }}>{t.name}</p>
                        <p className="text-[10px]" style={{ color: "#8a7a85" }}>{t.spec}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-0.5">
                            <Star size={9} fill={P} style={{ color: P }} />
                            <span className="text-[10px] font-semibold" style={{ color: DARK }}>{t.rating}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <MapPin size={9} style={{ color: "#c4b0bc" }} />
                            <span className="text-[10px]" style={{ color: "#c4b0bc" }}>{t.dist}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: "#fdf0f5" }}
                      >
                        <ChevronRight size={14} style={{ color: P }} />
                      </div>
                    </motion.button>
                  )
                })()}
              </AnimatePresence>

              {/* My location button */}
              <button
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
              >
                <Navigation size={15} style={{ color: DARK }} />
              </button>
            </div>

            {/* Nearby tailors list */}
            <div className="mt-4 px-4 pb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold" style={{ color: DARK }}>Yaqin tikuvchilar</h3>
                <button className="flex items-center gap-0.5 text-xs font-medium" style={{ color: P }}>
                  Barchasi <ChevronRight size={12} />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {TAILORS.slice(0, 3).map((t) => (
                  <motion.button
                    key={t.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={onTailorPress}
                    className="flex items-center gap-3 p-3 rounded-2xl text-left w-full"
                    style={{ background: "#ffffff", boxShadow: "0 1px 8px rgba(232,93,138,0.07)" }}
                  >
                    <img src={t.img} alt={t.name} className="w-12 h-12 rounded-2xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color: DARK }}>{t.name}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "#8a7a85" }}>{t.spec}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span
                          className="px-2 py-0.5 rounded-full text-[9px] font-semibold"
                          style={{ background: "#fdf0f5", color: P }}
                        >
                          {t.city}
                        </span>
                        <div className="flex items-center gap-0.5">
                          <MapPin size={9} style={{ color: "#c4b0bc" }} />
                          <span className="text-[9px]" style={{ color: "#c4b0bc" }}>{t.dist}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center justify-end gap-0.5">
                        <Star size={10} fill={P} style={{ color: P }} />
                        <span className="text-xs font-bold" style={{ color: DARK }}>{t.rating}</span>
                      </div>
                      <p className="text-[9px] mt-0.5" style={{ color: "#c4b0bc" }}>{t.orders} buyurtma</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* List mode */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1 px-4 pt-3 pb-4 gap-3"
          >
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className="shrink-0 px-4 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: cat === c ? P : "#ffffff",
                    color: cat === c ? "#ffffff" : "#8a7a85",
                    border: `1px solid ${cat === c ? P : "#f0e4eb"}`,
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            {TAILORS.map((t) => (
              <motion.button
                key={t.id}
                whileTap={{ scale: 0.98 }}
                onClick={onTailorPress}
                className="flex items-center gap-3 p-3.5 rounded-2xl text-left w-full"
                style={{ background: "#ffffff", boxShadow: "0 2px 12px rgba(232,93,138,0.07)" }}
              >
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: DARK }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#8a7a85" }}>{t.spec}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-0.5">
                      <Star size={11} fill={P} style={{ color: P }} />
                      <span className="text-xs font-semibold" style={{ color: DARK }}>{t.rating}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <MapPin size={10} style={{ color: "#c4b0bc" }} />
                      <span className="text-xs" style={{ color: "#c4b0bc" }}>{t.dist}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: "#e8d5df" }} />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
