"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles, ChevronLeft, RotateCcw } from "lucide-react"

const P = "#e85d8a"
const DARK = "#1a1a2e"

const SUGGESTIONS = [
  { label: "To'y uchun", emoji: "💍", desc: "kiyim tavsiya qiling" },
  { label: "Ofis uslubi", emoji: "💼", desc: "professional ko'rinish" },
  { label: "Sayr va dam olish", emoji: "🌿", desc: "qulay va chiroyli" },
  { label: "Qishki kiyimlar", emoji: "❄️", desc: "issiq va zamonaviy" },
  { label: "Milliy kiyim", emoji: "🎨", desc: "an'anaviy uslub" },
  { label: "Rasmiy tadbir", emoji: "✨", desc: "elegant ko'rinish" },
]

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ width: 7, height: 7, background: P }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.18 }}
        />
      ))}
    </div>
  )
}

interface AiStylistScreenProps {
  onBack: () => void
}

export default function AiStylistScreen({ onBack }: AiStylistScreenProps) {
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/stylist" }),
  })

  const isStreaming = status === "streaming" || status === "submitted"

  const handleSend = () => {
    const text = input.trim()
    if (!text || isStreaming) return
    sendMessage({ text })
    setInput("")
  }

  const handleSuggestion = (s: (typeof SUGGESTIONS)[0]) => {
    if (isStreaming) return
    sendMessage({ text: `${s.label} uchun ${s.desc}` })
  }

  const handleReset = () => {
    setMessages([])
    setInput("")
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isStreaming])

  const getMessageText = (parts: typeof messages[0]["parts"]) => {
    if (!parts || !Array.isArray(parts)) return ""
    return parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("")
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#fff" }}>
      {/* Header */}
      <div
        className="shrink-0 px-4 pt-3 pb-4"
        style={{ background: DARK }}
      >
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center rounded-full"
            style={{ width: 36, height: 36, background: "rgba(255,255,255,0.1)" }}
          >
            <ChevronLeft size={20} color="#fff" />
          </button>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-0.5">
              <div
                className="flex items-center justify-center rounded-full"
                style={{ width: 28, height: 28, background: "rgba(232,93,138,0.2)" }}
              >
                <Sparkles size={14} color={P} />
              </div>
              <span
                className="font-semibold tracking-wide"
                style={{ color: "#fff", fontFamily: "'Playfair Display', serif", fontSize: 16 }}
              >
                AI Stilist
              </span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "'Inter', sans-serif" }}>
              {isStreaming ? "Yozmoqda..." : "Onlayn • Tayyor"}
            </span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center justify-center rounded-full"
            style={{ width: 36, height: 36, background: "rgba(255,255,255,0.1)" }}
          >
            <RotateCcw size={16} color="rgba(255,255,255,0.7)" />
          </button>
        </div>

        {/* Suggestion chips — only show when no messages */}
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="rounded-2xl p-3 mb-1"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <p
                  className="text-center mb-3"
                  style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "'Inter', sans-serif" }}
                >
                  Qanday yordam kerak?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => handleSuggestion(s)}
                      className="flex flex-col items-center gap-1 rounded-xl py-2 px-1 transition-all active:scale-95"
                      style={{ background: "rgba(232,93,138,0.15)", border: "1px solid rgba(232,93,138,0.25)" }}
                    >
                      <span style={{ fontSize: 18 }}>{s.emoji}</span>
                      <span style={{ color: "#fff", fontSize: 9, fontFamily: "'Inter', sans-serif", fontWeight: 600, textAlign: "center", lineHeight: 1.3 }}>
                        {s.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ overscrollBehavior: "contain" }}>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center pt-8 gap-3"
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{ width: 64, height: 64, background: "#fdf0f5" }}
            >
              <Sparkles size={28} color={P} />
            </div>
            <p
              className="text-center leading-relaxed"
              style={{ color: "#8a7a85", fontSize: 13, fontFamily: "'Inter', sans-serif", maxWidth: 240 }}
            >
              Assalomu alaykum! Men sizning shaxsiy uslub maslahatchiingizman. Yuqoridagi variantlardan birini tanlang yoki savolingizni yozing.
            </p>
          </motion.div>
        )}

        {messages.map((msg, i) => {
          const text = getMessageText(msg.parts)
          const isUser = msg.role === "user"
          return (
            <motion.div
              key={msg.id ?? i}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}
            >
              {!isUser && (
                <div
                  className="shrink-0 rounded-full flex items-center justify-center self-end mb-1"
                  style={{ width: 28, height: 28, background: DARK }}
                >
                  <Sparkles size={13} color={P} />
                </div>
              )}
              <div
                className="max-w-[78%] rounded-2xl px-4 py-3"
                style={{
                  background: isUser ? P : "#fdf0f5",
                  borderBottomRightRadius: isUser ? 4 : undefined,
                  borderBottomLeftRadius: !isUser ? 4 : undefined,
                }}
              >
                <p
                  className="leading-relaxed whitespace-pre-wrap"
                  style={{
                    color: isUser ? "#fff" : DARK,
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {text}
                </p>
              </div>
            </motion.div>
          )
        })}

        {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start gap-2"
          >
            <div
              className="shrink-0 rounded-full flex items-center justify-center self-end mb-1"
              style={{ width: 28, height: 28, background: DARK }}
            >
              <Sparkles size={13} color={P} />
            </div>
            <div className="rounded-2xl" style={{ background: "#fdf0f5", borderBottomLeftRadius: 4 }}>
              <TypingDots />
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        className="shrink-0 px-4 pt-3 pb-5"
        style={{ borderTop: "1px solid #f0e4eb", background: "#fff" }}
      >
        <div
          className="flex items-end gap-2 rounded-2xl px-4 py-2"
          style={{ background: "#fdf0f5", border: "1.5px solid #f0e4eb" }}
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              e.target.style.height = "auto"
              e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px"
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Kiyim haqida so'rang..."
            className="flex-1 bg-transparent outline-none resize-none leading-relaxed"
            style={{
              fontSize: 13,
              color: DARK,
              fontFamily: "'Inter', sans-serif",
              minHeight: 22,
              maxHeight: 100,
            }}
          />
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            className="shrink-0 flex items-center justify-center rounded-xl mb-0.5 transition-opacity"
            style={{
              width: 36,
              height: 36,
              background: input.trim() && !isStreaming ? P : "#f0e4eb",
            }}
          >
            <Send size={16} color={input.trim() && !isStreaming ? "#fff" : "#c4b0bc"} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
