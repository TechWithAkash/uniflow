"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockChatHistory, mockAIResponses, mockProfile } from "@/lib/mockData";
import { Send, Bot, User, Sparkles } from "lucide-react";

const suggestedPrompts = [
  { label: "What jobs match my profile?", key: "default" },
  { label: "What skills am I missing for Google?", key: "google" },
  { label: "Review my career gaps", key: "skills" },
  { label: "30-day placement plan", key: "default" },
];

function ChatBubble({ msg, isNew }) {
  const isBot = msg.role === "assistant";
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      style={{ display: "flex", gap: 12, alignItems: "flex-start", flexDirection: isBot ? "row" : "row-reverse" }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
        background: isBot ? "linear-gradient(135deg,#6366f1,#c084fc)" : "linear-gradient(135deg,#10b981,#38bdf8)",
        display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
      }}>
        {isBot ? <Bot size={16} color="white" /> : <User size={16} color="white" />}
      </div>
      <div style={{
        maxWidth: "70%",
        background: isBot ? "var(--bg-card)" : "linear-gradient(135deg,#6366f1,#818cf8)",
        border: isBot ? "1px solid var(--border)" : "none",
        borderRadius: isBot ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
        padding: "12px 16px",
        fontSize: 14, lineHeight: 1.7, color: isBot ? "var(--text-primary)" : "white",
        whiteSpace: "pre-wrap",
      }}>
        {msg.content}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#c084fc)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Bot size={16} color="white" />
      </div>
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "4px 14px 14px 14px", padding: "12px 18px", display: "flex", gap: 4, alignItems: "center" }}>
        {[0, 1, 2].map(i => (
          <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
            style={{ width: 7, height: 7, borderRadius: "50%", background: "#6366f1" }} />
        ))}
      </div>
    </div>
  );
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState(mockChatHistory);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const getResponse = (userMsg) => {
    const lower = userMsg.toLowerCase();
    if (lower.includes("google") || lower.includes("missing") || lower.includes("gap")) return mockAIResponses.google;
    if (lower.includes("skill")) return mockAIResponses.skills;
    return mockAIResponses.default;
  };

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400 + Math.random() * 600));
    const reply = getResponse(msg);
    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>

      {/* Header */}
      <div style={{ padding: "24px 32px 0", borderBottom: "1px solid var(--border)", paddingBottom: 20, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#c084fc)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles size={22} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>AI Career Advisor</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>
              Gemini-powered · Has full access to your profile · CGPA {mockProfile.academic.cgpa} · {mockProfile.career.skills.length} skills
            </p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 100, padding: "4px 12px" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} className="pulse-dot" />
            <span style={{ fontSize: 12, color: "#10b981", fontWeight: 600 }}>Online</span>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
        {messages.map((msg, i) => <ChatBubble key={i} msg={msg} isNew={i === messages.length - 1 && msg.role !== "assistant"} />)}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length <= 1 && (
        <div style={{ padding: "0 32px 16px", display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
          {suggestedPrompts.map((p) => (
            <button key={p.label} onClick={() => sendMessage(p.label)} style={{
              padding: "8px 16px", borderRadius: 100, border: "1px solid var(--border)",
              background: "var(--bg-card)", color: "var(--text-secondary)", fontSize: 13, cursor: "pointer",
              transition: "all 0.15s",
            }}>
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div style={{ padding: "0 32px 32px", flexShrink: 0 }}>
        <div style={{
          display: "flex", gap: 10, background: "var(--bg-card)",
          border: "1px solid var(--border)", borderRadius: 14, padding: "10px 10px 10px 18px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Ask about your career, skills, job applications..."
            style={{
              flex: 1, background: "none", border: "none", color: "var(--text-primary)",
              fontSize: 15, outline: "none",
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{
              width: 42, height: 42, borderRadius: 10,
              background: input.trim() && !loading ? "linear-gradient(135deg,#6366f1,#818cf8)" : "var(--bg-secondary)",
              border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", flexShrink: 0,
            }}
          >
            <Send size={17} color={input.trim() && !loading ? "white" : "var(--text-muted)"} />
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: "var(--text-muted)" }}>
          AI analysis is based on your real profile data · Powered by Gemini 1.5 Flash
        </div>
      </div>
    </div>
  );
}
