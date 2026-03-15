"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Zap, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setEmail("akash@dbit.in");
    setPassword("demo1234");
    await new Promise((r) => setTimeout(r, 400));
    toast.success("Demo login — welcome, Akash! 👋");
    await demoLogin();
    setDemoLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    const res = await login(email, password);
    if (!res.success) { toast.error(res.error); setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "30%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "20%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 70%)", zIndex: 0 }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        style={{
          position: "relative", zIndex: 1,
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: 20, padding: "48px 40px", width: "100%", maxWidth: 440,
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#c084fc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "white" }}>U</div>
          <span style={{ fontWeight: 800, fontSize: 22, color: "var(--text-primary)" }}>UniFlow</span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>Welcome back</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginBottom: 32 }}>Sign in to your unified profile</p>

        {/* Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          disabled={demoLoading}
          style={{
            width: "100%", padding: "13px 20px", borderRadius: 12,
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(192,132,252,0.15))",
            border: "1px solid rgba(99,102,241,0.35)", color: "#818cf8",
            fontSize: 14, fontWeight: 700, cursor: demoLoading ? "wait" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            marginBottom: 24, transition: "all 0.2s",
            boxShadow: "0 0 20px rgba(99,102,241,0.1)",
          }}
        >
          <Zap size={16} />
          {demoLoading ? "Logging in..." : "🚀 Demo Login — Try as Akash Vishwakarma"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>or sign in manually</span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="akash@dbit.in"
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10,
                background: "var(--bg-secondary)", border: "1px solid var(--border)",
                color: "var(--text-primary)", fontSize: 15, outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#6366f1"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%", padding: "12px 48px 12px 16px", borderRadius: 10,
                  background: "var(--bg-secondary)", border: "1px solid var(--border)",
                  color: "var(--text-primary)", fontSize: 15, outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => e.target.style.borderColor = "#6366f1"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "13px 20px", borderRadius: 12,
              background: loading ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg,#6366f1,#818cf8)",
              border: "none", color: "white", fontSize: 15, fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "opacity 0.2s",
            }}
          >
            {loading ? "Signing in..." : <><span>Sign In</span><ArrowRight size={16} /></>}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 28, color: "var(--text-muted)", fontSize: 14 }}>
          Don't have an account?{" "}
          <Link href="/register" style={{ color: "#818cf8", fontWeight: 600, textDecoration: "none" }}>Create one</Link>
        </p>

        <p style={{ textAlign: "center", marginTop: 12, color: "var(--text-muted)", fontSize: 12 }}>
          Demo: <span style={{ color: "#6366f1" }}>akash@dbit.in</span> / <span style={{ color: "#6366f1" }}>demo1234</span>
        </p>
      </motion.div>
    </div>
  );
}
