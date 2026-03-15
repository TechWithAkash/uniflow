"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockReadiness } from "@/lib/mockData";
import { TrendingUp, CheckCircle, AlertCircle, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const domainColors = {
  academic: "#6366f1", career: "#10b981", health: "#c084fc",
  finance: "#f59e0b", identity: "#38bdf8",
};

const domainIcons = { academic: "🎓", career: "💼", health: "❤️", finance: "💰", identity: "🪪" };

const priorityColors = { high: "#ef4444", medium: "#f59e0b", low: "#6366f1" };

function ScoreGauge({ score }) {
  const circumference = 2 * Math.PI * 90;
  const offset = circumference - (circumference * score) / 100;
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#6366f1" : "#f59e0b";

  return (
    <div style={{ position: "relative", width: 220, height: 220, margin: "0 auto" }}>
      <svg width="220" height="220" viewBox="0 0 220 220">
        <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
        <circle cx="110" cy="110" r="90" fill="none" stroke={color} strokeWidth="14"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 110 110)"
          style={{ transition: "stroke-dashoffset 1.5s ease, stroke 0.5s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          style={{ textAlign: "center" }}
        >
          <div style={{ fontSize: 56, fontWeight: 900, color, lineHeight: 1, letterSpacing: -2 }}>{score}</div>
          <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>out of 100</div>
          <div style={{ fontSize: 13, fontWeight: 700, color, marginTop: 8 }}>
            {score >= 80 ? "Excellent" : score >= 60 ? "Good Progress" : "Needs Work"}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ReadinessPage() {
  const [activeTab, setActiveTab] = useState("breakdown");

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>AI-Powered Analysis</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5, marginBottom: 8 }}>Transition Readiness Score</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>Your real-time readiness measurement across 5 life domains</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 28 }}>

        {/* Left: Score gauge */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(192,132,252,0.06))",
              border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: 32, textAlign: "center",
            }}
          >
            <ScoreGauge score={mockReadiness.score} />
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 16 }}>Score History</div>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
                {mockReadiness.history.map((h, i) => {
                  const month = new Date(h.recordedAt).toLocaleString("default", { month: "short" });
                  const isCurrent = i === mockReadiness.history.length - 1;
                  return (
                    <div key={i} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{
                        height: `${h.score * 0.5}px`, background: isCurrent ? "#6366f1" : "rgba(99,102,241,0.3)",
                        borderRadius: "3px 3px 0 0", margin: "0 auto 4px", width: "80%",
                        transition: "height 1s ease",
                      }} />
                      <div style={{ fontSize: 9, color: "var(--text-muted)" }}>{month}</div>
                      <div style={{ fontSize: 10, fontWeight: isCurrent ? 700 : 400, color: isCurrent ? "#818cf8" : "var(--text-muted)" }}>{h.score}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* AI Recommendations */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span>🤖</span> AI Recommendations
            </h3>
            {mockReadiness.recommendations.map((rec, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, marginBottom: 12, padding: "10px 12px",
                background: "var(--bg-secondary)", borderRadius: 8,
                borderLeft: "2px solid #6366f1",
              }}>
                <span style={{ fontSize: 13, color: "#818cf8", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Breakdown + Missing */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, background: "var(--bg-secondary)", borderRadius: 10, padding: 4, width: "fit-content" }}>
            {["breakdown", "missing"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                background: activeTab === tab ? "var(--bg-card)" : "transparent",
                color: activeTab === tab ? "var(--text-primary)" : "var(--text-secondary)",
                fontSize: 13, fontWeight: activeTab === tab ? 600 : 400,
                transition: "all 0.15s", textTransform: "capitalize",
              }}>
                {tab === "breakdown" ? "Domain Breakdown" : `Missing Items (${mockReadiness.missing.length})`}
              </button>
            ))}
          </div>

          {activeTab === "breakdown" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {Object.entries(mockReadiness.breakdown).map(([domain, score], i) => (
                <motion.div
                  key={domain}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: i * 0.1 } }}
                  style={{
                    background: "var(--bg-card)", border: "1px solid var(--border)",
                    borderRadius: 14, padding: "20px 24px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{domainIcons[domain]}</span>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", textTransform: "capitalize" }}>{domain}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                          {domain === "academic" ? "25%" : domain === "career" ? "30%" : "15%"} of total score
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: 28, fontWeight: 900, color: domainColors[domain],
                    }}>{score}</div>
                  </div>
                  <div style={{ height: 8, borderRadius: 8, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }} animate={{ width: `${score}%` }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                      style={{ height: "100%", background: `linear-gradient(90deg, ${domainColors[domain]}, ${domainColors[domain]}80)`, borderRadius: 8 }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>0</span>
                    <span style={{ fontSize: 11, color: domainColors[domain], fontWeight: 700 }}>{score}/100</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>100</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "missing" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {mockReadiness.missing.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: i * 0.1 } }}
                  style={{
                    background: "var(--bg-card)", border: `1px solid ${priorityColors[item.priority]}30`,
                    borderRadius: 14, padding: "18px 22px",
                    display: "flex", alignItems: "center", gap: 16,
                  }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${priorityColors[item.priority]}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.priority === "high" ? <XCircle size={20} style={{ color: priorityColors.high }} /> :
                     item.priority === "medium" ? <AlertCircle size={20} style={{ color: priorityColors.medium }} /> :
                     <CheckCircle size={20} style={{ color: priorityColors.low }} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{item.item}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        padding: "2px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                        background: `${priorityColors[item.priority]}20`, color: priorityColors[item.priority],
                      }}>{item.priority}</span>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "capitalize" }}>{item.domain}</span>
                    </div>
                  </div>
                  <Link href="/documents" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#818cf8", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
                    Fix it <ArrowRight size={12} />
                  </Link>
                </motion.div>
              ))}

              <div style={{ background: "rgba(99,102,241,0.08)", border: "1px dashed rgba(99,102,241,0.3)", borderRadius: 14, padding: "20px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 14, color: "#818cf8", fontWeight: 700, marginBottom: 6 }}>Complete all items to reach 90+ 🏆</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Your estimated score after completing all: <strong style={{ color: "#10b981" }}>91</strong></div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
