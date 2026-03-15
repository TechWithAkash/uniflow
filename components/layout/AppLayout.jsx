"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard, GaugeCircle, Wand2, MessageSquareCode,
  FileText, Bell, ShieldCheck, Plug, LogOut, User
} from "lucide-react";

const navItems = [
  { href: "/dashboard",      label: "Dashboard",       icon: LayoutDashboard },
  { href: "/readiness",      label: "Readiness",       icon: GaugeCircle },
  { href: "/advisor",        label: "AI Advisor",       icon: MessageSquareCode },
  { href: "/bundle",         label: "Bundle",           icon: Wand2 },
  { href: "/documents",      label: "Documents",        icon: FileText },
  { href: "/notifications",  label: "Notifications",    icon: Bell },
  { href: "/consent",        label: "Consent",          icon: ShieldCheck },
  { href: "/integrations",   label: "Platforms",        icon: Plug },
];

export default function AppLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  if (loading || !user) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg,#6366f1,#c084fc)", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "white" }}>U</div>
          <div style={{ color: "var(--text-muted)", fontSize: 14 }}>Loading UniFlow...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, flexShrink: 0,
        background: "var(--bg-secondary)", borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column",
        position: "fixed", left: 0, top: 0, bottom: 0, overflowY: "auto",
        zIndex: 40,
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#6366f1,#c084fc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "white" }}>U</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text-primary)", lineHeight: 1 }}>UniFlow</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: 0.5, marginTop: 2 }}>Student Hub</div>
            </div>
          </div>
        </div>

        {/* User pill */}
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg-card)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#c084fc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "white", flexShrink: 0 }}>
              {user.avatar || user.name.slice(0,2).toUpperCase()}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Year {user.year} • {user.degree?.split(" ")[0]} {user.degree?.split(" ")[1]}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px" }}>
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href} href={href}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 9, marginBottom: 2,
                  background: active ? "rgba(99,102,241,0.15)" : "transparent",
                  color: active ? "#818cf8" : "var(--text-secondary)",
                  textDecoration: "none", fontSize: 14, fontWeight: active ? 600 : 400,
                  transition: "all 0.15s",
                  borderLeft: active ? "2px solid #6366f1" : "2px solid transparent",
                }}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: "12px 10px", borderTop: "1px solid var(--border)" }}>
          <Link href="/profile" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, color: "var(--text-secondary)", textDecoration: "none", fontSize: 14, marginBottom: 2 }}>
            <User size={17} /> Profile
          </Link>
          <button onClick={logout} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 9, color: "var(--text-secondary)", background: "none", border: "none", cursor: "pointer", fontSize: 14, textAlign: "left" }}>
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main style={{ flex: 1, marginLeft: 240, minHeight: "100vh", overflowX: "hidden" }}>
        {children}
      </main>
    </div>
  );
}
