"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "@/lib/framer-motion"
import { ChevronLeft, Send, Phone, MoreVertical, Check } from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

interface Message {
  id: number
  from: "me" | "tailor"
  text: string
  time: string
  read: boolean
}

const INITIAL_MSGS: Message[] = [
  { id: 1, from: "tailor", text: "Salom! Buyurtmangizni qabul qildim. Qanday ko'ylak kerak?", time: "10:02", read: true },
  { id: 2, from: "me", text: "Salom! Menga to'y uchun ko'ylak kerak. Oq yoki kumush rang bo'lsa yaxshi.", time: "10:05", read: true },
  { id: 3, from: "tailor", text: "Juda zo'r! O'lchamingizni ayta olasizmi? Va qachon kerak?", time: "10:06", read: true },
  { id: 4, from: "me", text: "M o'lcham. To'y 15 mart kuni. Shunga qadar bo'lishi kerak.", time: "10:08", read: true },
  { id: 5, from: "tailor", text: "Albatta! 10-12 mart orasida tayyor bo'ladi. Narxi 350,000 so'm. Rozimisiz?", time: "10:10", read: true },
]

const QUICK_REPLIES = ["Ha, roziman", "Narxni tushunarsam?", "Qachon boshlaysiz?"]

interface ChatScreenProps {
  onBack: () => void
}

export default function ChatScreen({ onBack }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MSGS)
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    const newMsg: Message = { id: Date.now(), from: "me", text, time: "Hozir", read: false }
    setMessages((p) => [...p, newMsg])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((p) => [
        ...p,
        {
          id: Date.now() + 1,
          from: "tailor",
          text: text.toLowerCase().includes("roz") ? "Yaxshi! To'lovni amalga oshirsangiz, ishni boshlayman." :
            "Tushundim! Qo'shimcha savollaringiz bo'lsa, bemalol yozing.",
          time: "Hozir",
          read: false,
        },
      ])
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#f7f3f5" }}>
      {/* Header */}
      <div
        className="shrink-0 px-4 pt-3 pb-3 flex items-center gap-3"
        style={{ background: DARK, borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <ChevronLeft size={18} style={{ color: "#ffffff" }} />
        </button>

        <img src="/tailor-1.jpg" alt="Tailor" className="w-10 h-10 rounded-full object-cover shrink-0" />

        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-semibold truncate">Madina Umarova</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>Online</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <Phone size={14} style={{ color: "rgba(255,255,255,0.7)" }} />
          </button>
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <MoreVertical size={14} style={{ color: "rgba(255,255,255,0.7)" }} />
          </button>
        </div>
      </div>

      {/* Order summary chip */}
      <div
        className="mx-4 mt-3 p-3 rounded-2xl flex items-center gap-2 shrink-0"
        style={{ background: "#fdf0f5", border: "1px solid #f9c8da" }}
      >
        <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0">
          <img src="/outfit-dress.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate" style={{ color: DARK }}>To'y libosi #TK-2048</p>
          <p className="text-[10px]" style={{ color: P }}>Jarayonda · 350 000 so'm</p>
        </div>
        <span
          className="px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0"
          style={{ background: "#d1fae5", color: "#065f46" }}
        >
          Aktiv
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2" style={{ scrollbarWidth: "none" }}>
        {/* Date divider */}
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px" style={{ background: "#f0e4eb" }} />
          <span className="text-[10px] font-medium" style={{ color: "#c4b0bc" }}>Bugun</span>
          <div className="flex-1 h-px" style={{ background: "#f0e4eb" }} />
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"} gap-2`}
            >
              {msg.from === "tailor" && (
                <img src="/tailor-1.jpg" alt="" className="w-7 h-7 rounded-full object-cover shrink-0 self-end" />
              )}
              <div
                className="max-w-[72%] px-4 py-2.5 rounded-2xl"
                style={
                  msg.from === "me"
                    ? {
                        background: P,
                        color: "#ffffff",
                        borderBottomRightRadius: 6,
                        boxShadow: "0 2px 8px rgba(232,93,138,0.25)",
                      }
                    : {
                        background: "#ffffff",
                        color: DARK,
                        borderBottomLeftRadius: 6,
                        boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                      }
                }
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <span className="text-[9px] opacity-70">{msg.time}</span>
                  {msg.from === "me" && (
                    <Check size={10} className="opacity-70" />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-2"
            >
              <img src="/tailor-1.jpg" alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
              <div
                className="flex items-center gap-1 px-4 py-3 rounded-2xl"
                style={{ background: "#ffffff", borderBottomLeftRadius: 6, boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: P, display: "block" }}
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

      {/* Quick replies */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto shrink-0" style={{ scrollbarWidth: "none" }}>
        {QUICK_REPLIES.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap"
            style={{
              background: "#fdf0f5",
              border: `1px solid ${P}40`,
              color: P,
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        className="px-4 pb-4 pt-2 flex items-center gap-2 shrink-0"
        style={{ background: "#ffffff", borderTop: "1px solid #f0e4eb" }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Xabar yozing..."
          className="flex-1 text-sm px-4 py-3 rounded-2xl outline-none"
          style={{
            background: "#fdf0f5",
            border: "1.5px solid #f0e4eb",
            color: DARK,
            fontFamily: "'Inter', sans-serif",
          }}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => send(input)}
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{
            background: input.trim() ? P : "#f0e4eb",
            transition: "background 0.2s",
          }}
        >
          <Send size={16} style={{ color: input.trim() ? "#ffffff" : "#c4b0bc" }} />
        </motion.button>
      </div>
    </div>
  )
}
