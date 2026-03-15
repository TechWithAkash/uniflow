"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { mockProfile } from "@/lib/mockData";
import {
  User, GraduationCap, Heart, Briefcase, DollarSign,
  Edit3, Save, X, CheckCircle, Plus, ExternalLink,
  Calendar, MapPin, Mail, Phone, Link2, Award, Layers
} from "lucide-react";
import toast from "react-hot-toast";

const tabConfig = [
  { id: "overview",  label: "Overview",  icon: User },
  { id: "academic",  label: "Academic",  icon: GraduationCap },
  { id: "career",    label: "Career",    icon: Briefcase },
  { id: "health",    label: "Health",    icon: Heart },
  { id: "finance",   label: "Finance",   icon: DollarSign },
];

const domainColors = {
  academic: "#6366f1",
  career:   "#10b981",
  health:   "#c084fc",
  finance:  "#f59e0b",
};

function SectionCard({ title, color, icon: Icon, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: 16, overflow: "hidden",
      }}
    >
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "16px 22px", borderBottom: "1px solid var(--border)",
        background: `${color}08`,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}20`, display: "flex", alignItems: "center", justifyContent: "center", color }}>
          <Icon size={16} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>{title}</span>
      </div>
      <div style={{ padding: "20px 22px" }}>{children}</div>
    </motion.div>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <span style={{ fontSize: 13, color: "var(--text-muted)", minWidth: 160 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: highlight ? 700 : 500, color: highlight ? "var(--text-primary)" : "var(--text-secondary)", textAlign: "right" }}>{value || "—"}</span>
    </div>
  );
}

function Tag({ children, color = "#6366f1" }) {
  return (
    <span style={{
      padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 600,
      background: `${color}18`, color,
      display: "inline-block",
    }}>{children}</span>
  );
}

// ─── TAB VIEWS ────────────────────────────────────────────────────────────────

function OverviewTab({ user, profile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Profile hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(192,132,252,0.06))",
          border: "1px solid rgba(99,102,241,0.2)", borderRadius: 16, padding: "28px 28px",
          display: "flex", alignItems: "center", gap: 24,
        }}
      >
        <div style={{
          width: 80, height: 80, borderRadius: 20, flexShrink: 0,
          background: "linear-gradient(135deg,#6366f1,#c084fc)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32, fontWeight: 900, color: "white", letterSpacing: -1,
        }}>
          {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6, letterSpacing: -0.3 }}>{user.name}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 5 }}><GraduationCap size={13} />{profile.academic.degree}</span>
            <span style={{ color: "var(--text-muted)" }}>·</span>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 5 }}><MapPin size={13} />{profile.academic.college}</span>
            <span style={{ color: "var(--text-muted)" }}>·</span>
            <span style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 5 }}><Mail size={13} />{user.email}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Tag color="#6366f1">Year {profile.academic.year}</Tag>
            <Tag color="#10b981">{profile.career.targetRole}</Tag>
            <Tag color="#c084fc">CGPA {profile.academic.cgpa}</Tag>
          </div>
        </div>
      </motion.div>

      {/* Quick snapshot grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { label: "CGPA",           value: profile.academic.cgpa,              sub: `Sem ${profile.academic.year * 2 - 1}`,        color: domainColors.academic },
          { label: "Skills",          value: profile.career.skills.length,        sub: "Career skills",                               color: domainColors.career },
          { label: "Projects",        value: profile.career.projects.length,      sub: "Completed",                                   color: "#c084fc" },
          { label: "Scholarships",    value: profile.finance.scholarships.length, sub: "Available / applied",                         color: domainColors.finance },
        ].map(({ label, value, sub, color }) => (
          <div key={label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "18px 18px", borderTop: `3px solid ${color}` }}>
            <div style={{ fontSize: 30, fontWeight: 900, color, letterSpacing: -1, marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Skills preview */}
      <SectionCard title="Skills" color="#10b981" icon={Layers}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {profile.career.skills.map(s => <Tag key={s} color="#10b981">{s}</Tag>)}
        </div>
      </SectionCard>

      {/* Integrations status */}
      <SectionCard title="Platform Connections" color="#38bdf8" icon={Link2}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            { name: "DigiLocker", emoji: "🏛️", connected: profile.integrations.digilocker.connected },
            { name: "ABHA",        emoji: "🏥", connected: profile.integrations.abha.connected },
            { name: "APAAR",       emoji: "🎓", connected: profile.integrations.apaar.connected },
          ].map(({ name, emoji, connected }) => (
            <div key={name} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
              borderRadius: 10, border: `1px solid ${connected ? "rgba(16,185,129,0.25)" : "var(--border)"}`,
              background: connected ? "rgba(16,185,129,0.06)" : "var(--bg-secondary)",
            }}>
              <span style={{ fontSize: 18 }}>{emoji}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{name}</span>
              {connected
                ? <CheckCircle size={14} style={{ color: "#10b981" }} />
                : <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Not connected</span>}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function AcademicTab({ profile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionCard title="Academic Details" color={domainColors.academic} icon={GraduationCap}>
        <InfoRow label="College" value={profile.academic.college} highlight />
        <InfoRow label="Degree" value={profile.academic.degree} />
        <InfoRow label="Branch" value={profile.academic.branch} />
        <InfoRow label="Current Year" value={`Year ${profile.academic.year} of 4`} />
        <InfoRow label="CGPA" value={`${profile.academic.cgpa} / 10`} highlight />
        <InfoRow label="Attendance" value={`${profile.academic.attendance}%`} />
      </SectionCard>

      {/* CGPA trend */}
      <SectionCard title="CGPA Trend" color={domainColors.academic} icon={Award}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 80, padding: "4px 0" }}>
          {profile.academic.cgpaHistory.map((h) => {
            const pct = ((h.cgpa - 6) / (10 - 6)) * 100;
            return (
              <div key={h.semester} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ fontSize: 10, color: domainColors.academic, fontWeight: 700 }}>{h.cgpa}</div>
                <div style={{ width: "100%", height: `${pct * 0.6}px`, background: `linear-gradient(180deg, ${domainColors.academic}, ${domainColors.academic}66)`, borderRadius: "4px 4px 0 0", minHeight: 8 }} />
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>S{h.semester}</div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Certificates */}
      <SectionCard title="Certificates & Achievements" color={domainColors.academic} icon={Award}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Certificates</div>
          {profile.academic.certificates.map((c, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.issuer}</div>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{new Date(c.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Achievements</div>
          {profile.academic.achievements.map((a, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 14 }}>🏆</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{a.title}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{new Date(a.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

function CareerTab({ profile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionCard title="Career Overview" color={domainColors.career} icon={Briefcase}>
        <InfoRow label="Target Role" value={profile.career.targetRole} highlight />
        <InfoRow label="Applications Sent" value={profile.career.applicationsCount} />
        <InfoRow label="Resume Last Updated" value={new Date(profile.career.resumeUpdated).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} />
        <InfoRow label="LinkedIn" value={profile.career.linkedinUrl !== "#" ? profile.career.linkedinUrl : "Not linked"} />
      </SectionCard>

      <SectionCard title="Skills" color={domainColors.career} icon={Layers}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {profile.career.skills.map(s => <Tag key={s} color={domainColors.career}>{s}</Tag>)}
        </div>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, color: "var(--text-muted)", cursor: "pointer" }}
          onClick={() => toast("Add skills feature coming in backend integration")}>
          <Plus size={14} />
          <span style={{ fontSize: 12 }}>Add skill</span>
        </div>
      </SectionCard>

      <SectionCard title="Projects" color={domainColors.career} icon={Layers}>
        {profile.career.projects.map((p, i) => (
          <div key={i} style={{ padding: "14px 0", borderBottom: i < profile.career.projects.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{p.name}</div>
              <a href={p.url} style={{ color: "var(--text-muted)", display: "flex" }}><ExternalLink size={14} /></a>
            </div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8, lineHeight: 1.5 }}>{p.description}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {p.techStack.map(t => <Tag key={t} color="#64748b">{t}</Tag>)}
            </div>
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Internships" color={domainColors.career} icon={Briefcase}>
        {profile.career.internships.map((intern, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 0" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 3 }}>{intern.role}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>{intern.company}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: domainColors.career, fontWeight: 600 }}>{intern.duration}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{intern.year}</div>
            </div>
          </div>
        ))}
        {profile.career.internships.length === 0 && (
          <div style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "16px 0" }}>No internships added yet</div>
        )}
      </SectionCard>
    </div>
  );
}

function HealthTab({ profile }) {
  const h = profile.health;
  const statusColors = { good: "#10b981", moderate: "#f59e0b", needs_attention: "#ef4444" };
  const statusColor = statusColors[h.status] || "#10b981";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionCard title="Health Overview" color={domainColors.health} icon={Heart}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: statusColor }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: statusColor, textTransform: "capitalize" }}>{h.status.replace("_", " ")}</span>
        </div>
        <InfoRow label="Blood Group" value={h.bloodGroup} highlight />
        <InfoRow label="Last Checkup" value={new Date(h.lastCheckup).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
        <InfoRow label="Certificate Expiry" value={new Date(h.certificateExpiry).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} />
        <InfoRow label="Conditions" value={h.conditions.length === 0 ? "None" : h.conditions.join(", ")} />
        <InfoRow label="Allergies" value={h.allergies.join(", ")} />
      </SectionCard>

      <SectionCard title="Doctor Visits" color={domainColors.health} icon={Calendar}>
        {h.doctorVisits.map((v, i) => (
          <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < h.doctorVisits.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(192,132,252,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🩺</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{v.reason}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>{new Date(v.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
              {v.prescription !== "None" && (
                <div style={{ fontSize: 11, color: "#c084fc" }}>Rx: {v.prescription}</div>
              )}
            </div>
          </div>
        ))}
      </SectionCard>
    </div>
  );
}

function FinanceTab({ profile }) {
  const f = profile.finance;
  const statusColors = { paid: "#10b981", pending: "#ef4444", partial: "#f59e0b" };
  const scholarshipStatusColors = { eligible: "#10b981", applied: "#6366f1", received: "#c084fc", rejected: "#ef4444" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionCard title="Finance Overview" color={domainColors.finance} icon={DollarSign}>
        <InfoRow label="Fee Status" value={f.feeStatus.charAt(0).toUpperCase() + f.feeStatus.slice(1)} highlight />
        <InfoRow label="Bank Account" value={f.bankAccountLinked ? "Linked ✓" : "Not linked"} />
        <InfoRow label="Loan Status" value={f.loanStatus === "none" ? "No active loan" : f.loanStatus} />
        <InfoRow label="Scholarships" value={`${f.scholarships.length} tracked`} />
      </SectionCard>

      <SectionCard title="Scholarship Tracker" color={domainColors.finance} icon={Award}>
        {f.scholarships.map((s, i) => {
          const color = scholarshipStatusColors[s.status] || "#64748b";
          const daysLeft = Math.ceil((new Date(s.deadline) - new Date()) / 86400000);
          return (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 0", borderBottom: i < f.scholarships.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{s.name}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 15, fontWeight: 800, color: domainColors.finance }}>₹{s.amount.toLocaleString("en-IN")}</span>
                  <span style={{ padding: "2px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700, background: `${color}18`, color, textTransform: "capitalize" }}>{s.status}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 2 }}>Deadline</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: daysLeft <= 7 ? "#ef4444" : daysLeft <= 14 ? "#f59e0b" : "var(--text-secondary)" }}>
                  {new Date(s.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </div>
                <div style={{ fontSize: 11, color: daysLeft <= 7 ? "#ef4444" : "var(--text-muted)" }}>
                  {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
                </div>
              </div>
            </div>
          );
        })}
      </SectionCard>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [editing, setEditing] = useState(false);

  if (!user) return null;

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5, marginBottom: 8 }}>My Profile</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>Your unified digital identity — academic, career, health, and finance</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => { setEditing(!editing); if (editing) toast.success("Profile changes saved!"); }}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer",
            background: editing ? "linear-gradient(135deg,#10b981,#059669)" : "var(--bg-card)",
            borderWidth: 1, borderStyle: "solid", borderColor: editing ? "transparent" : "var(--border)",
            color: editing ? "white" : "var(--text-secondary)",
            fontSize: 14, fontWeight: 600, transition: "all 0.2s",
          }}
        >
          {editing ? <><Save size={15} /> Save Changes</> : <><Edit3 size={15} /> Edit Profile</>}
        </motion.button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "var(--bg-secondary)", borderRadius: 12, padding: 4, marginBottom: 28, width: "fit-content" }}>
        {tabConfig.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 9, border: "none", cursor: "pointer",
              background: activeTab === id ? "var(--bg-card)" : "transparent",
              color: activeTab === id ? "var(--text-primary)" : "var(--text-secondary)",
              fontSize: 13, fontWeight: activeTab === id ? 700 : 400,
              transition: "all 0.15s",
              boxShadow: activeTab === id ? "0 1px 8px rgba(0,0,0,0.3)" : "none",
            }}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: 860 }}>
        {activeTab === "overview" && <OverviewTab user={user} profile={mockProfile} />}
        {activeTab === "academic" && <AcademicTab profile={mockProfile} />}
        {activeTab === "career"   && <CareerTab   profile={mockProfile} />}
        {activeTab === "health"   && <HealthTab   profile={mockProfile} />}
        {activeTab === "finance"  && <FinanceTab  profile={mockProfile} />}
      </div>
    </div>
  );
}
