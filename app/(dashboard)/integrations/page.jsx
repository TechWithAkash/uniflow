"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockProfile } from "@/lib/mockData";
import { Plug, CheckCircle, XCircle, RefreshCw, ExternalLink, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const platforms = [
  {
    id: "digilocker",
    name: "DigiLocker",
    description: "Government document repository — Aadhaar, PAN, driving license, certificates",
    icon: "🏛️",
    color: "#6366f1",
    dataFetched: ["Aadhaar Card", "PAN Card", "Driving License"],
    note: "Powered by MeitY — Govt of India",
  },
  {
    id: "abha",
    name: "ABHA Health ID",
    description: "Ayushman Bharat Health Account — access your complete health records",
    icon: "🏥",
    color: "#10b981",
    dataFetched: ["Health Records", "Vaccination History", "Doctor Prescriptions"],
    note: "Powered by NHA — National Health Authority",
  },
  {
    id: "apaar",
    name: "APAAR Academic ID",
    description: "Academic Bank of Credits — link all academic achievements and credits",
    icon: "🎓",
    color: "#c084fc",
    dataFetched: ["Academic Credits", "Certificates", "Exam Records"],
    note: "Powered by MoE — Ministry of Education",
  },
];

function PlatformCard({ platform }) {
  const { id, name, description, icon, color, dataFetched, note } = platform;
  const [Status, setStatus] = useState(mockProfile.integrations[id] || { connected: false, lastSync: null });
  const [connecting, setConnecting] = useState(false);

  const connect = async () => {
    setConnecting(true);
    await new Promise(r => setTimeout(r, 1800));
    setStatus({ connected: true, lastSync: new Date().toISOString() });
    setConnecting(false);
    toast.success(`${name} connected successfully! ✓`);
  };

  const disconnect = () => {
    setStatus({ connected: false, lastSync: null });
    toast(`${name} disconnected`, { icon: "🔌" });
  };

  const sync = async () => {
    setConnecting(true);
    await new Promise(r => setTimeout(r, 1200));
    setStatus(p => ({ ...p, lastSync: new Date().toISOString() }));
    setConnecting(false);
    toast.success(`${name} synced!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      style={{
        background: "var(--bg-card)",
        border: `1px solid ${Status.connected ? `${color}35` : "var(--border)"}`,
        borderRadius: 18, padding: "28px 28px", position: "relative", overflow: "hidden",
      }}
    >
      {/* Connected glow */}
      {Status.connected && (
        <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, borderRadius: "50%", background: `${color}08`, transform: "translate(50%, -50%)", pointerEvents: "none" }} />
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{icon}</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{note}</div>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, padding: "5px 13px", borderRadius: 100,
          background: Status.connected ? `${color}15` : "rgba(255,255,255,0.04)",
          border: `1px solid ${Status.connected ? `${color}30` : "var(--border)"}`,
        }}>
          {Status.connected ? <CheckCircle size={13} style={{ color }} /> : <XCircle size={13} style={{ color: "var(--text-muted)" }} />}
          <span style={{ fontSize: 12, fontWeight: 700, color: Status.connected ? color : "var(--text-muted)" }}>
            {Status.connected ? "Connected" : "Not connected"}
          </span>
        </div>
      </div>

      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>{description}</p>

      {/* Data preview */}
      {Status.connected && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Data fetched</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {dataFetched.map(d => (
              <span key={d} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 12px", borderRadius: 100, background: `${color}12`, color, fontSize: 12, fontWeight: 600 }}>
                <CheckCircle size={10} /> {d}
              </span>
            ))}
          </div>
          {Status.lastSync && (
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 10 }}>
              Last synced: {new Date(Status.lastSync).toLocaleString("en-IN")}
            </div>
          )}
        </motion.div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 10 }}>
        {!Status.connected ? (
          <button onClick={connect} disabled={connecting} style={{
            flex: 1, padding: "11px 18px", borderRadius: 10, border: "none",
            background: connecting ? "rgba(99,102,241,0.5)" : `linear-gradient(135deg, ${color}, ${color}cc)`,
            color: "white", fontSize: 14, fontWeight: 700, cursor: connecting ? "wait" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            {connecting ? (
              <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><RefreshCw size={15} /></motion.div> Connecting...</>
            ) : (
              <><Plug size={15} /> Connect {name}</>
            )}
          </button>
        ) : (
          <>
            <button onClick={sync} disabled={connecting} style={{
              flex: 1, padding: "11px 18px", borderRadius: 10, border: `1px solid ${color}40`,
              background: `${color}12`, color, fontSize: 14, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              {connecting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><RefreshCw size={14} /></motion.div> : <RefreshCw size={14} />}
              {connecting ? "Syncing..." : "Sync Data"}
            </button>
            <button onClick={disconnect} style={{
              padding: "11px 16px", borderRadius: 10, border: "1px solid rgba(239,68,68,0.25)",
              background: "rgba(239,68,68,0.08)", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>
              Disconnect
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function IntegrationsPage() {
  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <Plug size={26} style={{ color: "#6366f1" }} />
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>Platform Connections</h1>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>Connect government platforms to auto-populate your verified data</p>
      </div>

      {/* Info banner */}
      <div style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 12, padding: "14px 18px", marginBottom: 32, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <AlertCircle size={16} style={{ color: "#38bdf8", flexShrink: 0, marginTop: 1 }} />
        <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
          <strong style={{ color: "#38bdf8" }}>About integrations:</strong> In the live system, these connect via real OAuth2 flows. For this prototype, connections use simulated data that's architecturally identical to the live implementation.
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20, maxWidth: 720 }}>
        {platforms.map(p => <PlatformCard key={p.id} platform={p} />)}
      </div>
    </div>
  );
}
