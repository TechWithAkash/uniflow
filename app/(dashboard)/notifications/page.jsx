"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { mockNotifications } from "@/lib/mockData";
import { Bell, CheckCircle, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const typeColors = { opportunity: "#10b981", risk: "#ef4444", expiry: "#f59e0b", completion: "#6366f1", deadline: "#f59e0b", longitudinal: "#c084fc" };
const typeEmojis = { opportunity: "💡", risk: "⚠️", expiry: "⏰", completion: "✅", deadline: "📅", longitudinal: "📈" };
const priorityColors = { high: "#ef4444", medium: "#f59e0b", low: "#6366f1" };

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? notifications : filter === "unread" ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter);

  const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const remove = (id) => { setNotifications(prev => prev.filter(n => n.id !== id)); toast.success("Notification deleted"); };
  const markAllRead = () => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); toast.success("All marked as read"); };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>Smart Notifications</h1>
            {unreadCount > 0 && (
              <span style={{ background: "#ef4444", color: "white", fontSize: 13, fontWeight: 700, padding: "2px 10px", borderRadius: 100 }}>{unreadCount}</span>
            )}
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>AI-generated alerts based on your profile and deadlines</p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{ padding: "10px 20px", borderRadius: 10, background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Mark all read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
        {["all", "unread", "opportunity", "risk", "deadline", "expiry", "completion"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "7px 16px", borderRadius: 100, border: `1px solid ${filter === f ? "#6366f1" : "var(--border)"}`,
            background: filter === f ? "rgba(99,102,241,0.12)" : "var(--bg-card)",
            color: filter === f ? "#818cf8" : "var(--text-secondary)",
            fontSize: 13, fontWeight: filter === f ? 700 : 400, cursor: "pointer",
            textTransform: "capitalize", whiteSpace: "nowrap", transition: "all 0.15s",
          }}>
            {f === "all" ? `All (${notifications.length})` : f === "unread" ? `Unread (${unreadCount})` : f}
          </button>
        ))}
      </div>

      {/* Notifications */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 24px", color: "var(--text-muted)", fontSize: 15 }}>
            🎉 No notifications here
          </div>
        )}
        {filtered.map((n, i) => {
          const color = typeColors[n.type] || "#6366f1";
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
              onClick={() => markRead(n.id)}
              style={{
                background: n.read ? "var(--bg-card)" : `${color}08`,
                border: `1px solid ${n.read ? "var(--border)" : `${color}25`}`,
                borderRadius: 14, padding: "18px 20px",
                display: "flex", gap: 16, cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              <div style={{
                fontSize: 24, flexShrink: 0, width: 44, height: 44,
                borderRadius: 12, background: `${color}15`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {typeEmojis[n.type]}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: n.read ? 500 : 700, color: "var(--text-primary)" }}>{n.title}</span>
                  {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />}
                  <span style={{
                    marginLeft: "auto", padding: "2px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                    background: `${priorityColors[n.priority]}18`, color: priorityColors[n.priority],
                  }}>{n.priority}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 8 }}>{n.message}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {new Date(n.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {n.actionUrl && (
                    <Link href={n.actionUrl} onClick={e => e.stopPropagation()} style={{ fontSize: 11, color: color, display: "flex", alignItems: "center", gap: 3, textDecoration: "none", fontWeight: 600 }}>
                      Take action <ExternalLink size={10} />
                    </Link>
                  )}
                </div>
              </div>

              <button onClick={e => { e.stopPropagation(); remove(n.id); }} style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", alignSelf: "flex-start" }}>
                <Trash2 size={14} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
