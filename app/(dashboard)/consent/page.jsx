"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockConsentRequests } from "@/lib/mockData";
import { Shield, CheckCircle, XCircle, Clock, FileText, Eye, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

const docLabels = {
  degree_cert: "Degree Certificate", cgpa_transcript: "CGPA Transcript",
  id_proof: "ID Proof", health_cert: "Health Certificate", income_proof: "Income Proof",
};

const statusConfig = {
  pending:  { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Pending",  icon: <Clock size={14} /> },
  approved: { color: "#10b981", bg: "rgba(16,185,129,0.12)", label: "Approved", icon: <CheckCircle size={14} /> },
  denied:   { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Denied",    icon: <XCircle size={14} /> },
};

export default function ConsentPage() {
  const [requests, setRequests] = useState(mockConsentRequests);
  const [activeTab, setActiveTab] = useState("all");

  const update = (id, status) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status, respondedAt: new Date().toISOString() } : r));
    toast.success(status === "approved" ? "Access granted to institution" : "Request denied");
  };

  const filtered = activeTab === "all" ? requests : requests.filter(r => r.status === activeTab);
  const pending = requests.filter(r => r.status === "pending").length;

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Shield size={26} style={{ color: "#6366f1" }} />
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>Consent Manager</h1>
            {pending > 0 && <span style={{ background: "#f59e0b", color: "white", fontSize: 13, fontWeight: 700, padding: "2px 10px", borderRadius: 100 }}>{pending} pending</span>}
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>Control who can access your data and for how long</p>
        </div>
      </div>

      {/* Info box */}
      <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: "14px 18px", marginBottom: 28, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Shield size={16} style={{ color: "#818cf8", flexShrink: 0, marginTop: 1 }} />
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#818cf8" }}>Zero-trust data sharing</span>
          <span style={{ fontSize: 13, color: "var(--text-secondary)", marginLeft: 6 }}>Nothing leaves your vault without your explicit approval. Every access is logged with timestamp and IP.</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {["all", "pending", "approved", "denied"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "7px 18px", borderRadius: 100, fontSize: 13, fontWeight: tab === activeTab ? 700 : 400,
            border: `1px solid ${tab === activeTab ? "#6366f1" : "var(--border)"}`,
            background: tab === activeTab ? "rgba(99,102,241,0.12)" : "var(--bg-card)",
            color: tab === activeTab ? "#818cf8" : "var(--text-secondary)", cursor: "pointer",
            textTransform: "capitalize", transition: "all 0.15s",
          }}>
            {tab === "all" ? `All (${requests.length})` : `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${requests.filter(r => r.status === tab).length})`}
          </button>
        ))}
      </div>

      {/* Requests */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map((req, i) => {
          const sc = statusConfig[req.status];
          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08 } }}
              style={{
                background: "var(--bg-card)", border: `1px solid ${req.status === "pending" ? "rgba(245,158,11,0.25)" : "var(--border)"}`,
                borderRadius: 16, padding: "24px 26px", overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏢</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{req.institutionName}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{req.purpose}</div>
                    </div>
                  </div>
                </div>
                <span style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 100, background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {sc.icon} {sc.label}
                </span>
              </div>

              {/* Documents requested */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Documents Requested</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {req.documentsRequested.map(d => (
                    <span key={d} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 100, background: "var(--bg-secondary)", border: "1px solid var(--border)", fontSize: 12, color: "var(--text-secondary)" }}>
                      <FileText size={11} /> {docLabels[d] || d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div style={{ display: "flex", gap: 24, marginBottom: req.status === "pending" ? 20 : 0 }}>
                <div><div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Requested</div><div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{new Date(req.requestedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div></div>
                {req.respondedAt && <div><div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Responded</div><div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{new Date(req.respondedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div></div>}
                {req.expiresAt && req.status === "approved" && <div><div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Access expires</div><div style={{ fontSize: 12, color: "#f59e0b" }}>{new Date(req.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div></div>}
              </div>

              {/* Action buttons */}
              {req.status === "pending" && (
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => update(req.id, "approved")} style={{
                    flex: 1, padding: "11px 20px", borderRadius: 10, border: "none",
                    background: "linear-gradient(135deg,#10b981,#059669)", color: "white",
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}>
                    <CheckCircle size={16} /> Approve Access
                  </button>
                  <button onClick={() => update(req.id, "denied")} style={{
                    padding: "11px 20px", borderRadius: 10,
                    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
                    color: "#ef4444", fontSize: 14, fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <XCircle size={16} /> Deny
                  </button>
                  <button onClick={() => toast("Full audit trail coming soon")} style={{
                    padding: "11px 14px", borderRadius: 10,
                    background: "var(--bg-secondary)", border: "1px solid var(--border)",
                    color: "var(--text-secondary)", cursor: "pointer",
                    display: "flex", alignItems: "center",
                  }}>
                    <Eye size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
