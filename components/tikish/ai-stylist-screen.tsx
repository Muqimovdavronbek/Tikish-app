"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useEffect, useRef, useState } from "react"
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
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: P,
            animation: `typingBounce 0.9s infinite`,
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes typingBounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

function MessageBubble({ msg, index }: { msg: { role: string; parts?: unknown[]; id?: string }, index: number }) {
  const isUser = msg.role === "user"
  const text = Array.isArray(msg.parts)
    ? (msg.parts as Array<{ type: string; text?: string }>)
        .filter((p) => p.type === "text")
        .map((p) => p.text ?? "")
        .join("")
    : ""

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}
      style={{ animation: "fadeSlideUp 0.25s ease both", animationDelay: `${index * 0.03}s` }}
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
          style={{ color: isUser ? "#fff" : DARK, fontSize: 13 }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}

interface AiStylistScreenProps {
  onBack: () => void
}

export default function AiStylistScreen({ onBack }: AiStylistScreenProps) {
  const [input, setInput] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/stylist" }),
  })

  const isStreaming = status === "streaming" || status === "submitted"
  const showTyping = isStreaming && (messages.length === 0 || messages[messages.length - 1]?.role !== "assistant")

  const handleSend = () => {
    const text = input.trim()
    if (!text || isStreaming) return
    sendMessage({ text })
    setInput("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
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

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="flex flex-col h-full" style={{ background: "#fff" }}>
        {/* Header */}
        <div className="shrink-0 px-4 pt-3 pb-4" style={{ background: DARK }}>
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
                <span className="font-semibold tracking-wide font-serif" style={{ color: "#fff", fontSize: 16 }}>
                  AI Stilist
                </span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 10 }}>
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

          {/* Suggestion chips — only when no messages */}
          {messages.length === 0 && (
            <div
              className="rounded-2xl p-3"
              style={{ background: "rgba(255,255,255,0.06)", animation: "fadeIn 0.3s ease" }}
            >
              <p className="text-center mb-3" style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>
                Qanday yordam kerak?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleSuggestion(s)}
                    className="flex flex-col items-center gap-1 rounded-xl py-2 px-1 active:scale-95 transition-transform"
                    style={{ background: "rgba(232,93,138,0.15)", border: "1px solid rgba(232,93,138,0.25)" }}
                  >
                    <span style={{ fontSize: 18 }}>{s.emoji}</span>
                    <span style={{ color: "#fff", fontSize: 9, fontWeight: 600, textAlign: "center", lineHeight: 1.3 }}>
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ overscrollBehavior: "contain" }}>
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center pt-8 gap-3" style={{ animation: "fadeSlideUp 0.3s ease" }}>
              <div
                className="rounded-full flex items-center justify-center"
                style={{ width: 64, height: 64, background: "#fdf0f5" }}
              >
                <Sparkles size={28} color={P} />
              </div>
              <p className="text-center leading-relaxed" style={{ color: "#8a7a85", fontSize: 13, maxWidth: 240 }}>
                Assalomu alaykum! Men sizning shaxsiy uslub maslahatchiingizman. Yuqoridagi variantlardan birini tanlang yoki savolingizni yozing.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble key={msg.id ?? i} msg={msg} index={i} />
          ))}

          {showTyping && (
            <div className="flex justify-start gap-2" style={{ animation: "fadeSlideUp 0.2s ease" }}>
              <div
                className="shrink-0 rounded-full flex items-center justify-center self-end mb-1"
                style={{ width: 28, height: 28, background: DARK }}
              >
                <Sparkles size={13} color={P} />
              </div>
              <div className="rounded-2xl" style={{ background: "#fdf0f5", borderBottomLeftRadius: 4 }}>
                <TypingDots />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="shrink-0 px-4 pt-3 pb-5" style={{ borderTop: "1px solid #f0e4eb", background: "#fff" }}>
          <div
            className="flex items-end gap-2 rounded-2xl px-4 py-2"
            style={{ background: "#fdf0f5", border: "1.5px solid #f0e4eb" }}
          >
            <textarea
              ref={textareaRef}
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
              style={{ fontSize: 13, color: DARK, minHeight: 22, maxHeight: 100 }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="shrink-0 flex items-center justify-center rounded-xl mb-0.5 transition-all active:scale-90"
              style={{
                width: 36,
                height: 36,
                background: input.trim() && !isStreaming ? P : "#f0e4eb",
              }}
            >
              <Send size={16} color={input.trim() && !isStreaming ? "#fff" : "#c4b0bc"} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
