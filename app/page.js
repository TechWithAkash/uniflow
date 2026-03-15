"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Shield, Zap, Brain, GitMerge,
  CheckCircle, Star, ChevronRight, Layers, Globe
} from "lucide-react";

const features = [
  {
    icon: <Brain size={24} />,
    title: "AI Career Advisor",
    description: "Gemini-powered personalized guidance based on your real profile — CGPA, skills, projects — not generic advice.",
    color: "#6366f1",
  },
  {
    icon: <Zap size={24} />,
    title: "One-Click Bundle",
    description: "Generate a verified document bundle for any institution in 3 seconds. What used to take 3 days.",
    color: "#10b981",
  },
  {
    icon: <Shield size={24} />,
    title: "Consent-Based Sharing",
    description: "Nothing leaves your vault without your explicit approval. Every access is logged and auditable.",
    color: "#f59e0b",
  },
  {
    icon: <GitMerge size={24} />,
    title: "Cross-Domain Intelligence",
    description: "UniFlow sees patterns across all your domains — health, academics, career, finance — and acts on them.",
    color: "#c084fc",
  },
  {
    icon: <Layers size={24} />,
    title: "Readiness Score",
    description: "A real-time 0–100 score measuring your life-stage transition readiness across 5 domains.",
    color: "#38bdf8",
  },
  {
    icon: <Globe size={24} />,
    title: "Platform Integrations",
    description: "Connects to DigiLocker, ABHA, and APAAR to pull your verified government data automatically.",
    color: "#fb923c",
  },
];

const stats = [
  { value: "3 sec", label: "Document bundle generation" },
  { value: "74%", label: "Average readiness score" },
  { value: "5+", label: "Platforms unified" },
  { value: "0×", label: "Repetitive verification needed" },
];

const steps = [
  { num: "01", title: "Create your profile", desc: "Connect your academic, health, career, and finance data in one place. Link DigiLocker and ABHA for verified records." },
  { num: "02", title: "Get your Readiness Score", desc: "See exactly how prepared you are for life's next transition — with specific items to improve your score." },
  { num: "03", title: "Take action with AI", desc: "Your AI career advisor analyses your full profile and gives you actionable, specific guidance — not generic tips." },
  { num: "04", title: "Share in one click", desc: "When an institution needs your documents, approve it once. They get a verified bundle. You keep full control." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Radial cursor glow */}
      <div
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 0,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          left: mousePos.x,
          top: mousePos.y,
          transition: "left 0.1s, top 0.1s",
        }}
      />

      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, #6366f1, #c084fc)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, fontWeight: 800, color: "white",
            }}>U</div>
            <span style={{ fontWeight: 700, fontSize: 18, color: "var(--text-primary)" }}>UniFlow</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/login" style={{
              color: "var(--text-secondary)", textDecoration: "none",
              fontSize: 14, fontWeight: 500, padding: "8px 16px",
              borderRadius: 8, transition: "color 0.2s",
            }}>
              Sign In
            </Link>
            <Link href="/register" style={{
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              color: "white", textDecoration: "none",
              fontSize: 14, fontWeight: 600, padding: "8px 20px",
              borderRadius: 8, transition: "opacity 0.2s",
            }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, padding: "100px 24px 80px", textAlign: "center" }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", top: 100, left: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", zIndex: -1 }} />
        <div style={{ position: "absolute", top: 200, right: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.10) 0%, transparent 70%)", zIndex: -1 }} />

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: 100, padding: "6px 16px", marginBottom: 32,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", display: "inline-block" }} className="pulse-dot" />
              <span style={{ fontSize: 13, color: "#818cf8", fontWeight: 500 }}>ColoHacks 2026 — Software Track</span>
            </div>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 24, letterSpacing: "-2px" }}
          >
            One Profile.{" "}
            <span className="gradient-text">Every Stage.</span>
            <br />Zero Repetition.
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            style={{ fontSize: 20, color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}
          >
            UniFlow connects your academic, health, career, and financial life into one AI-powered hub.
            Share verified data with institutions in a single, consent-based click.
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/login" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #6366f1, #818cf8)",
              color: "white", textDecoration: "none",
              fontSize: 16, fontWeight: 700, padding: "14px 32px",
              borderRadius: 12, boxShadow: "0 0 30px rgba(99,102,241,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}>
              Try the Demo <ArrowRight size={18} />
            </Link>
            <a href="#features" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent", border: "1px solid var(--border-light)",
              color: "var(--text-primary)", textDecoration: "none",
              fontSize: 16, fontWeight: 600, padding: "14px 32px",
              borderRadius: 12, transition: "border-color 0.2s, background 0.2s",
            }}>
              See how it works <ChevronRight size={18} />
            </a>
          </motion.div>
        </div>

        {/* Dashboard preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } }}
          style={{ maxWidth: 900, margin: "80px auto 0", position: "relative" }}
        >
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: 20, padding: 20, boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
          }}>
            {/* Fake browser top bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
              <div style={{ flex: 1, background: "var(--bg-secondary)", borderRadius: 6, height: 28, display: "flex", alignItems: "center", padding: "0 12px", marginLeft: 8 }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>uniflow.app/dashboard</span>
              </div>
            </div>

            {/* Mock dashboard grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 16,minHeight: 360 }}>
              {/* Sidebar */}
              <div style={{ background: "var(--bg-secondary)", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#c084fc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "white" }}>AV</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Akash V.</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Final Year • DBIT</div>
                  </div>
                </div>
                {["Dashboard", "Readiness", "Advisor", "Documents", "Bundle", "Notifications"].map((item, i) => (
                  <div key={item} style={{
                    padding: "8px 12px", borderRadius: 8, marginBottom: 4,
                    background: i === 0 ? "rgba(99,102,241,0.15)" : "transparent",
                    color: i === 0 ? "#818cf8" : "var(--text-secondary)",
                    fontSize: 13, fontWeight: i === 0 ? 600 : 400,
                    cursor: "pointer",
                  }}>{item}</div>
                ))}
              </div>

              {/* Main content */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Score card */}
                <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(192,132,252,0.1))", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: 20, display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ width: 80, height: 80, borderRadius: "50%", background: "conic-gradient(#6366f1 0% 74%, var(--border) 74%)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontWeight: 800, fontSize: 18, color: "#818cf8" }}>74</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Readiness Score</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Complete 3 items to reach 85+</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                      {["Academic", "Career", "Health"].map((d, i) => (
                        <div key={d} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 100, background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>{d}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Notification strip */}
                <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>⚡</span>
                  <span style={{ fontSize: 12, color: "#fbbf24" }}>Scholarship deadline in 5 days — ₹50,000 from HDFC Badhte Kadam</span>
                </div>

                {/* Module grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Academic", val: "CGPA 8.2", color: "#6366f1" },
                    { label: "Career", val: "7 skills", color: "#10b981" },
                    { label: "Health", val: "Good ✓", color: "#c084fc" },
                    { label: "Finance", val: "2 scholarships", color: "#f59e0b" },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{ background: "var(--bg-secondary)", borderRadius: 10, padding: 14, borderLeft: `3px solid ${color}` }}>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Glow behind mockup */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 20, boxShadow: "0 0 80px rgba(99,102,241,0.15)", pointerEvents: "none" }} />
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ padding: "60px 24px", background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40, textAlign: "center" }}>
          {stats.map(({ value, label }, i) => (
            <motion.div key={label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#818cf8", letterSpacing: -1, marginBottom: 6 }}>{value}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1.5, marginBottom: 16 }}>
              Everything you need, <span className="gradient-text">finally connected</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 18, maxWidth: 540, margin: "0 auto" }}>
              Six features that individually exist elsewhere. Together, they've never existed before.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {features.map(({ icon, title, description, color }, i) => (
              <motion.div
                key={title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                style={{
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: 16, padding: 28, cursor: "default",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                whileHover={{ scale: 1.02, borderColor: color }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", color, marginBottom: 20 }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "80px 24px", background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1.5, marginBottom: 16 }}>How UniFlow works</h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {steps.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                style={{ display: "flex", gap: 32, padding: "32px 0", borderBottom: i < steps.length - 1 ? "1px solid var(--border)" : "none", alignItems: "flex-start" }}
              >
                <div style={{ fontSize: 40, fontWeight: 900, color: "rgba(99,102,241,0.3)", lineHeight: 1, minWidth: 60, fontVariantNumeric: "tabular-nums" }}>{num}</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", zIndex: 0 }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2, marginBottom: 20 }}>
            Ready to <span className="gradient-text">experience it?</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 18, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            Log in with demo credentials and explore the full UniFlow prototype.
          </p>
          <Link href="/login" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #6366f1, #818cf8)",
            color: "white", textDecoration: "none",
            fontSize: 18, fontWeight: 700, padding: "16px 40px",
            borderRadius: 14, boxShadow: "0 0 40px rgba(99,102,241,0.35)",
          }}>
            Start the Demo <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          UniFlow — ColoHacks 2026 | DBIT Mumbai | Software Track
        </p>
      </footer>
    </div>
  );
}
