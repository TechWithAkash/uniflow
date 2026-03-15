"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockDocuments } from "@/lib/mockData";
import { Upload, FileText, CheckCircle, XCircle, Clock, Trash2, Eye, Shield } from "lucide-react";
import toast from "react-hot-toast";

const typeLabels = {
  degree_cert: "Degree Certificate", cgpa_transcript: "CGPA Transcript",
  id_proof: "ID Proof", health_cert: "Health Certificate",
  income_proof: "Income Proof", other: "Other",
};

const typeColors = {
  degree_cert: "#6366f1", cgpa_transcript: "#10b981", id_proof: "#38bdf8",
  health_cert: "#c084fc", income_proof: "#f59e0b", other: "#64748b",
};

function DocCard({ doc, onDelete }) {
  const color = typeColors[doc.type] || "#64748b";
  const isVerified = doc.verified;
  const isMissing = doc.missing;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      style={{
        background: isMissing ? "rgba(239,68,68,0.04)" : "var(--bg-card)",
        border: `1px solid ${isMissing ? "rgba(239,68,68,0.2)" : isVerified ? `${color}30` : "var(--border)"}`,
        borderRadius: 14, padding: "18px 20px",
        display: "flex", alignItems: "center", gap: 16,
      }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 10, background: isMissing ? "rgba(239,68,68,0.1)" : `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {isMissing ? <XCircle size={22} style={{ color: "#ef4444" }} /> : <FileText size={22} style={{ color }} />}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: isMissing ? "var(--text-muted)" : "var(--text-primary)" }}>
            {doc.name}
          </span>
          {isVerified && !isMissing && (
            <span style={{ display: "flex", alignItems: "center", gap: 3, background: "rgba(16,185,129,0.12)", color: "#10b981", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>
              <Shield size={10} /> Verified
            </span>
          )}
          {isMissing && (
            <span style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>Missing</span>
          )}
          {!isVerified && !isMissing && (
            <span style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>Pending</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{typeLabels[doc.type]}</span>
          {doc.fileSize && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{(doc.fileSize / 1024).toFixed(0)} KB</span>}
          {doc.uploadedAt && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Uploaded {new Date(doc.uploadedAt).toLocaleDateString("en-IN")}</span>}
          {doc.expiryDate && <span style={{ fontSize: 11, color: "#f59e0b" }}>Expires {new Date(doc.expiryDate).toLocaleDateString("en-IN")}</span>}
          {doc.verifiedBy && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>by {doc.verifiedBy}</span>}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {!isMissing && (
          <button onClick={() => toast.success("Document preview opened")} style={{ width: 36, height: 36, borderRadius: 8, background: "var(--bg-secondary)", border: "1px solid var(--border)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
            <Eye size={15} />
          </button>
        )}
        {isMissing ? (
          <button onClick={() => toast("Upload window would open here", { icon: "📤" })} style={{ padding: "0 14px", height: 36, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#818cf8)", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "white" }}>
            Upload
          </button>
        ) : (
          <button onClick={() => onDelete(doc.id)} style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}>
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState(mockDocuments);
  const [dragging, setDragging] = useState(false);

  const handleDelete = (id) => {
    setDocs(prev => prev.filter(d => d.id !== id));
    toast.success("Document removed");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    toast.success("Document uploaded successfully! (Mock)");
  };

  const verified = docs.filter(d => d.verified).length;
  const missing = docs.filter(d => d.missing).length;
  const pending = docs.filter(d => !d.verified && !d.missing).length;

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>

      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: -0.5, marginBottom: 8 }}>Document Vault</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>Upload, manage, and share your verified documents</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {[
          { label: "Verified", count: verified, color: "#10b981", icon: <CheckCircle size={20} /> },
          { label: "Pending", count: pending, color: "#f59e0b", icon: <Clock size={20} /> },
          { label: "Missing", count: missing, color: "#ef4444", icon: <XCircle size={20} /> },
        ].map(({ label, count, color, icon }) => (
          <div key={label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ color, opacity: 0.8 }}>{icon}</div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color }}>{count}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{label} documents</div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => toast("File picker would open here", { icon: "📂" })}
        style={{
          border: `2px dashed ${dragging ? "#6366f1" : "var(--border-light)"}`,
          borderRadius: 14, padding: "32px 24px", textAlign: "center",
          background: dragging ? "rgba(99,102,241,0.05)" : "var(--bg-secondary)",
          cursor: "pointer", marginBottom: 28, transition: "all 0.2s",
        }}
      >
        <Upload size={28} style={{ color: dragging ? "#6366f1" : "var(--text-muted)", margin: "0 auto 12px" }} />
        <div style={{ fontSize: 15, fontWeight: 600, color: dragging ? "#818cf8" : "var(--text-primary)", marginBottom: 6 }}>
          {dragging ? "Drop to upload" : "Drop files here or click to upload"}
        </div>
        <div style={{ fontSize: 13, color: "var(--text-muted)" }}>PDF, JPG, PNG · Max 5MB per file</div>
      </div>

      {/* Document list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {docs.map(doc => <DocCard key={doc.id} doc={doc} onDelete={handleDelete} />)}
      </div>
    </div>
  );
}
