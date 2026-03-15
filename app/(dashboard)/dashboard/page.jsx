"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { mockReadiness, mockProfile, mockNotifications, mockDocuments } from "@/lib/mockData";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import {
  Bell, FileText, ArrowRight, TrendingUp, AlertCircle,
  GaugeCircle, Wand2, MessageSquareCode, CheckCircle, Clock
} from "lucide-react";

const domainColors = {
  academic: "#6366f1",
  career: "#10b981",
  health: "#c084fc",
  finance: "#f59e0b",
  identity: "#38bdf8",
};

function StatCard({ title, value, subtitle, color, icon, href }) {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <motion.div
        whileHover={{ scale: 1.02, borderColor: color }}
        style={{
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: 14, padding: "20px 22px", cursor: "pointer",
          transition: "all 0.2s", display: "flex", flexDirection: "column", gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{title}</span>
          <div style={{ color, opacity: 0.7 }}>{icon}</div>
        </div>
        <div>
          <div style={{ fontSize: 28, fontWeight: 900, color: "var(--text-primary)", letterSpacing: -1 }}>{value}</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>{subtitle}</div>
        </div>
        <div style={{ height: 3, borderRadius: 3, background: `${color}30` }}>
          <div style={{ height: "100%", width: `${typeof value === "string" && value.includes("%") ? parseInt(value) : 70}%`, background: color, borderRadius: 3 }} />
        </div>
      </motion.div>
    </Link>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const unread = mockNotifications.filter(n => !n.read).length;
  const verifiedDocs = mockDocuments.filter(d => d.verified).length;

  const radarData = [
    { name: "Academic", value: mockReadiness.breakdown.academic, fill: domainColors.academic },
    { name: "Career", value: mockReadiness.breakdown.career, fill: domainColors.career },
    { name: "Health", value: mockReadiness.breakdown.health, fill: domainColors.health },
    { name: "Finance", value: mockReadiness.breakdown.finance, fill: domainColors.finance },
    { name: "Identity", value: mockReadiness.breakdown.identity, fill: domainColors.identity },
  ];

  return (
    <div style={{ padding: "32px 32px", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 36 }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6 }}>
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>
            {user?.degree} · Year {user?.year} · {user?.college}
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/notifications" style={{
            position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
            width: 42, height: 42, borderRadius: 10, background: "var(--bg-card)",
            border: "1px solid var(--border)", color: "var(--text-secondary)", textDecoration: "none",
          }}>
            <Bell size={18} />
            {unread > 0 && (
              <span style={{ position: "absolute", top: -4, right: -4, width: 18, height: 18, borderRadius: "50%", background: "#ef4444", fontSize: 10, fontWeight: 700, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>{unread}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Alert strip */}
      {unread > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{
            background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
            borderRadius: 12, padding: "12px 18px", marginBottom: 28,
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <AlertCircle size={18} style={{ color: "#f59e0b", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 14, color: "#fbbf24", fontWeight: 600 }}>{mockNotifications[0].title}</span>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", marginLeft: 8 }}>{mockNotifications[0].message}</span>
          </div>
          <Link href="/notifications" style={{ fontSize: 12, color: "#f59e0b", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>View all →</Link>
        </motion.div>
      )}

      {/* Readiness score hero + quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 24, marginBottom: 24 }}>

        {/* Readiness Score */}
        <Link href="/readiness" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(192,132,252,0.08) 100%)",
              border: "1px solid rgba(99,102,241,0.25)", borderRadius: 16, padding: 28,
              cursor: "pointer", height: "100%",
            }}
          >
            <div style={{ fontSize: 12, color: "#818cf8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 20 }}>Transition Readiness</div>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ position: "relative", width: 120, height: 120 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#6366f1" strokeWidth="10"
                    strokeDasharray="314" strokeDashoffset={314 - (314 * mockReadiness.score / 100)}
                    strokeLinecap="round" transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dashoffset 1.2s ease" }}
                  />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 30, fontWeight: 900, color: "#818cf8" }}>{mockReadiness.score}</span>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>/ 100</span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>Good Progress</div>
                {Object.entries(mockReadiness.breakdown).map(([domain, score]) => (
                  <div key={domain} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "capitalize" }}>{domain}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: domainColors[domain] }}>{score}%</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
                      <div style={{ height: "100%", width: `${score}%`, background: domainColors[domain], borderRadius: 4, transition: "width 1s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 6, color: "#818cf8", fontSize: 13, fontWeight: 600 }}>
              <TrendingUp size={14} /> View full breakdown <ArrowRight size={14} />
            </div>
          </motion.div>
        </Link>

        {/* Quick stats 2×2 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 16 }}>
          <StatCard title="Documents" value={`${verifiedDocs}/${mockDocuments.length}`} subtitle="Verified documents ready" color="#10b981" icon={<FileText size={18} />} href="/documents" />
          <StatCard title="Skills" value={mockProfile.career.skills.length} subtitle="Tracked in career profile" color="#6366f1" icon={<TrendingUp size={18} />} href="/dashboard" />
          <StatCard title="Projects" value={mockProfile.career.projects.length} subtitle="Completed projects" color="#c084fc" icon={<CheckCircle size={18} />} href="/dashboard" />
          <StatCard title="Applications" value={mockProfile.career.applicationsCount} subtitle="Job applications sent" color="#f59e0b" icon={<Clock size={18} />} href="/advisor" />
        </div>
      </div>

      {/* Middle row: modules */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { title: "Academic", icon: "🎓", color: domainColors.academic, items: [`CGPA: ${mockProfile.academic.cgpa}`, `Attendance: ${mockProfile.academic.attendance}%`, `Year: ${mockProfile.academic.year} of 4`, `${mockProfile.academic.certificates.length} certs`] },
          { title: "Health", icon: "❤️", color: domainColors.health, items: [`Status: ${mockProfile.health.status}`, `Blood: ${mockProfile.health.bloodGroup}`, `Last checkup: Dec '25`, `Cert expiry: Jun '26`] },
          { title: "Career", icon: "💼", color: domainColors.career, items: [`Target: ${mockProfile.career.targetRole}`, `${mockProfile.career.skills.length} skills listed`, `${mockProfile.career.internships.length} internship`, `${mockProfile.career.projects.length} projects`] },
          { title: "Finance", icon: "💰", color: domainColors.finance, items: [`Fee: ${mockProfile.finance.feeStatus}`, `${mockProfile.finance.scholarships.length} scholarships`, `Bank: linked ✓`, `Loan: none`] },
        ].map(({ title, icon, color, items }) => (
          <motion.div
            key={title}
            whileHover={{ scale: 1.02, borderColor: color }}
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, transition: "all 0.2s", borderTop: `3px solid ${color}` }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>{title}</span>
            </div>
            {items.map((item) => (
              <div key={item} style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 6, padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{item}</div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Bottom row: Quick actions + Notifications */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

        {/* Quick actions */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Quick Actions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "Generate Job Application Bundle", href: "/bundle", icon: <Wand2 size={16} />, color: "#6366f1", desc: "3 seconds → 6 verified docs" },
              { label: "Ask AI Career Advisor", href: "/advisor", icon: <MessageSquareCode size={16} />, color: "#10b981", desc: "Personalized guidance" },
              { label: "View Readiness Report", href: "/readiness", icon: <GaugeCircle size={16} />, color: "#c084fc", desc: "Score: 74 — 3 items to improve" },
              { label: "Manage Documents", href: "/documents", icon: <FileText size={16} />, color: "#f59e0b", desc: `${verifiedDocs} verified of ${mockDocuments.length}` },
            ].map(({ label, href, icon, color, desc }) => (
              <Link
                key={href} href={href}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 16px", borderRadius: 10,
                  background: "var(--bg-secondary)", border: "1px solid var(--border)",
                  textDecoration: "none", transition: "all 0.2s",
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{desc}</div>
                </div>
                <ArrowRight size={16} style={{ marginLeft: "auto", color: "var(--text-muted)" }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent notifications */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700 }}>Smart Notifications</h2>
            <Link href="/notifications" style={{ fontSize: 12, color: "#818cf8", textDecoration: "none", fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {mockNotifications.slice(0, 4).map((n) => {
              const colors = { opportunity: "#10b981", risk: "#ef4444", expiry: "#f59e0b", completion: "#6366f1", deadline: "#f59e0b" };
              const emojis = { opportunity: "💡", risk: "⚠️", expiry: "⏰", completion: "✅", deadline: "📅" };
              return (
                <div key={n.id} style={{
                  display: "flex", gap: 12, padding: "12px 14px",
                  background: n.read ? "transparent" : `${colors[n.type]}08`,
                  border: `1px solid ${n.read ? "var(--border)" : `${colors[n.type]}25`}`,
                  borderRadius: 10,
                }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{emojis[n.type]}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: n.read ? 400 : 600, color: "var(--text-primary)", marginBottom: 3 }}>{n.title}</div>
                    <div style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.5 }}>{n.message.slice(0, 80)}...</div>
                  </div>
                  {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: colors[n.type], flexShrink: 0, marginTop: 4, alignSelf: "flex-start" }} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
