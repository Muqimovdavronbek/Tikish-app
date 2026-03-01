"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: number
  role: "ai" | "user"
  text: string
}

const CHIPS = [
  { label: "To'y uchun obraz", reply: "To'y uchun sizga klassik oq yoki kumush rangli kechki ko'ylak yoki zamonaviy kostyum tavsiya qilaman. Tikuvchimiz Madina S. bu uslubda ixtisoslashgan — u bilan bog'lanishingizni maslahat beraman." },
  { label: "Ofis stili", reply: "Ofis uchun qulay va professional ko'rinish uchun to'q ko'k yoki kulrang rangli klassik kostyum ideal bo'ladi. Shimdagi aniq kesim va yuqori sifatli mato sizga ishonchli ko'rinish beradi." },
  { label: "Sayr uchun", reply: "Sayr uchun qulay va zamonaviy kiyim — keng shimlar va rangli ko'ylak kombinatsiyasi zo'r bo'ladi. Milliy ikat naqshli casual kiyimlarni ham ko'rib chiqishingizni maslahat beraman!" },
]

const WELCOME: Message = {
  id: 0,
  role: "ai",
  text: "Salom! Men sizning AI stilistingizman. Bugun qanday tadbirga boryapsiz? Mening maslahatlarimdan foydalaning yoki o'z savolingizni yozing.",
}

export default function AiStylistScreen() {
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now(), role: "user", text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const chip = CHIPS.find((c) => c.label === text)
      const aiText = chip
        ? chip.reply
        : `"${text}" bo'yicha maslahatim: Har doim o'z tanangizga mos keladigan matoni tanlang. Tikuvchimiz bilan bevosita muloqot qilish uchun buyurtma bering.`
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: aiText }])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "#f8f7f5", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div
        className="px-5 pt-4 pb-4 shrink-0"
        style={{ background: "#0a0a2e" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "rgba(212,175,55,0.2)", border: "1.5px solid #D4AF37" }}
          >
            <Sparkles size={18} style={{ color: "#D4AF37" }} />
          </div>
          <div>
            <h2
              className="font-bold text-white text-base"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              AI Stilist
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                Doimo onlayn
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "ai" && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-2 mt-1"
                  style={{ background: "rgba(212,175,55,0.18)", border: "1px solid #D4AF37" }}
                >
                  <Sparkles size={13} style={{ color: "#D4AF37" }} />
                </div>
              )}
              <div
                className="max-w-[76%] px-4 py-3 rounded-2xl text-sm leading-relaxed"
                style={
                  msg.role === "ai"
                    ? {
                        background: "#ffffff",
                        color: "#0a0a2e",
                        borderBottomLeftRadius: 6,
                        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
                      }
                    : {
                        background: "#0a0a2e",
                        color: "#f5f0e8",
                        borderBottomRightRadius: 6,
                      }
                }
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(212,175,55,0.18)", border: "1px solid #D4AF37" }}
              >
                <Sparkles size={13} style={{ color: "#D4AF37" }} />
              </div>
              <div
                className="flex items-center gap-1 px-4 py-3 rounded-2xl"
                style={{ background: "#ffffff", borderBottomLeftRadius: 6, boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#D4AF37", display: "block" }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Quick chip suggestions */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto shrink-0" style={{ scrollbarWidth: "none" }}>
        {CHIPS.map((chip) => (
          <button
            key={chip.label}
            onClick={() => sendMessage(chip.label)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all active:scale-95"
            style={{
              background: "rgba(212,175,55,0.12)",
              border: "1px solid rgba(212,175,55,0.4)",
              color: "#8b6914",
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        className="px-4 pb-3 pt-2 shrink-0 flex items-center gap-2"
        style={{ background: "#ffffff", borderTop: "1px solid #e8e0d0" }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Xabar yozing..."
          className="flex-1 text-sm px-4 py-2.5 rounded-2xl outline-none"
          style={{
            background: "#f8f7f5",
            border: "1px solid #e8e0d0",
            color: "#0a0a2e",
            fontFamily: "'Inter', sans-serif",
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-95"
          style={{ background: "#D4AF37" }}
        >
          <Send size={16} style={{ color: "#0a0a2e" }} />
        </button>
      </div>
    </div>
  )
}
