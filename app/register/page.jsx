"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

const perks = [
  "Unified academic, health, career & finance profile",
  "AI-powered career advisor using your real data",
  "One-click verified document bundles",
  "Consent-based sharing with audit trail",
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", college: "", degree: "B.E. Computer Engineering", year: "4", cgpa: "" });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const inputStyle = {
    width: "100%", padding: "11px 15px", borderRadius: 10,
    background: "var(--bg-secondary)", border: "1px solid var(--border)",
    color: "var(--text-primary)", fontSize: 14, outline: "none",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error("Please fill in all required fields"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Account created! Redirecting...");
    await new Promise((r) => setTimeout(r, 500));
    router.push("/login");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex" }}>
      {/* Left panel — form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          style={{ width: "100%", maxWidth: 440 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#c084fc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "white" }}>U</div>
            <span style={{ fontWeight: 800, fontSize: 22 }}>UniFlow</span>
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>Create your profile</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginBottom: 32 }}>Your unified digital identity starts here</p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Full Name *</label>
                <input style={inputStyle} placeholder="Akash Vishwakarma" value={form.name} onChange={(e) => update("name", e.target.value)} required />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Email *</label>
                <input style={inputStyle} type="email" placeholder="akash@dbit.in" value={form.email} onChange={(e) => update("email", e.target.value)} required />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Password *</label>
              <input style={inputStyle} type="password" placeholder="••••••••" value={form.password} onChange={(e) => update("password", e.target.value)} required />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>College</label>
              <input style={inputStyle} placeholder="Don Bosco Institute of Technology" value={form.college} onChange={(e) => update("college", e.target.value)} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Degree</label>
                <input style={inputStyle} value={form.degree} onChange={(e) => update("degree", e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>Year</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={form.year} onChange={(e) => update("year", e.target.value)}>
                  {[1,2,3,4].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>CGPA</label>
                <input style={inputStyle} type="number" step="0.1" min="0" max="10" placeholder="8.2" value={form.cgpa} onChange={(e) => update("cgpa", e.target.value)} />
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", padding: "13px 20px", borderRadius: 12, marginTop: 4,
                background: loading ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg,#6366f1,#818cf8)",
                border: "none", color: "white", fontSize: 15, fontWeight: 700,
                cursor: loading ? "wait" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              {loading ? "Creating profile..." : <><span>Create Profile</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: 24, color: "var(--text-muted)", fontSize: 14 }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#818cf8", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
          </p>
        </motion.div>
      </div>

      {/* Right panel — value prop */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }}
        style={{
          flex: 1, background: "var(--bg-card)", borderLeft: "1px solid var(--border)",
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "60px 48px",
        }}
      >
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: "#6366f1", fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Why UniFlow?</div>
          <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1, lineHeight: 1.2, marginBottom: 16 }}>
            Stop proving yourself<br />
            <span className="gradient-text">over and over again.</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.7 }}>
            Your verified degree, health records, and identity shouldn't live in 5 different portals.
            UniFlow brings them together — once, with your consent, intelligently.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
          {perks.map((p) => (
            <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <CheckCircle size={18} style={{ color: "#10b981", flexShrink: 0, marginTop: 2 }} />
              <span style={{ color: "var(--text-secondary)", fontSize: 15 }}>{p}</span>
            </div>
          ))}
        </div>

        {/* Score teaser */}
        <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(192,132,252,0.1))", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 16, padding: 24 }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>Example: Your Readiness Score after setup</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: "#818cf8" }}>74</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Life-Stage Readiness</div>
              {["Academic 82%", "Career 70%", "Health 90%"].map(d => (
                <div key={d} style={{ fontSize: 12, color: "var(--text-secondary)" }}>{d}</div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
