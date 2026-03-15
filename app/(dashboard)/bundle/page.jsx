"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bundleTemplates, mockDocuments } from "@/lib/mockData";
import { Wand2, CheckCircle, FileText, Shield, AlertCircle, Download, Clock, Zap, X } from "lucide-react";
import toast from "react-hot-toast";

const purposeLabels = {
  job_application: "Job Application", scholarship: "Scholarship",
  college_admission: "College Admission", bank_loan: "Bank Loan",
};

const typeLabels = {
  degree_cert: "Degree Certificate", cgpa_transcript: "CGPA Transcript",
  id_proof: "ID Proof", health_cert: "Health Certificate",
  income_proof: "Income Proof", resume: "Resume",
};

export default function BundlePage() {
  const [purpose, setPurpose] = useState("job_application");
  const [institution, setInstitution] = useState("Infosys Ltd.");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [countdown, setCountdown] = useState(null);

  const template = bundleTemplates[purpose];
  const docMap = Object.fromEntries(mockDocuments.map(d => [d.type, d]));

  const handleGenerate = async () => {
    if (!institution.trim()) { toast.error("Enter institution name"); return; }
    setGenerating(true);
    setGenerated(null);

    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count--;
      if (count > 0) setCountdown(count);
      else { clearInterval(interval); setCountdown(null); }
    }, 1000);

    await new Promise(r => setTimeout(r, 3200));
    setGenerating(false);
    setGenerated({
      bundleId: `bundle_${Date.now().toString(36)}`,
      institution,
      purpose,
      docs: template.docs,
      generatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    });
    toast.success("Bundle generated! 3 seconds. ⚡");
  };

  return (
    <div style={{ padding: "32px", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#6366f1,#c084fc)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wand2 size={20} color="white" />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>One-Click Bundle Generator</h1>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: 15 }}>Generate a verified document bundle for any institution in seconds</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>

        {/* Config panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Purpose selector */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>Bundle Purpose</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {Object.entries(purposeLabels).map(([key, label]) => (
                <button key={key} onClick={() => { setPurpose(key); setGenerated(null); }} style={{
                  padding: "12px 16px", borderRadius: 10, border: `1px solid ${purpose === key ? "#6366f1" : "var(--border)"}`,
                  background: purpose === key ? "rgba(99,102,241,0.12)" : "var(--bg-secondary)",
                  color: purpose === key ? "#818cf8" : "var(--text-secondary)",
                  fontSize: 13, fontWeight: purpose === key ? 700 : 400, cursor: "pointer",
                  transition: "all 0.15s", textAlign: "left",
                }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Institution input */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>Recipient Institution</h2>
            <input
              value={institution} onChange={e => setInstitution(e.target.value)}
              placeholder="e.g. Infosys Ltd., Google India..."
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 10,
                background: "var(--bg-secondary)", border: "1px solid var(--border)",
                color: "var(--text-primary)", fontSize: 14, outline: "none",
              }}
              onFocus={e => e.target.style.borderColor = "#6366f1"}
              onBlur={e => e.target.style.borderColor = "var(--border)"}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {["Infosys Ltd.", "TCS Digital", "Wipro", "Google India"].map(name => (
                <button key={name} onClick={() => setInstitution(name)} style={{
                  padding: "4px 12px", borderRadius: 100, border: "1px solid var(--border)",
                  background: "var(--bg-secondary)", color: "var(--text-secondary)",
                  fontSize: 12, cursor: "pointer",
                }}>
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Documents in bundle */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: 1 }}>
              Documents in Bundle ({template.docs.length})
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {template.docs.map(type => {
                const doc = docMap[type];
                const available = doc && !doc.missing;
                return (
                  <div key={type} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                    background: "var(--bg-secondary)", borderRadius: 8,
                    border: `1px solid ${available ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}`,
                  }}>
                    <div style={{ color: available ? "#10b981" : "#ef4444" }}>
                      {available ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                    </div>
                    <span style={{ fontSize: 13, color: "var(--text-primary)", flex: 1 }}>{typeLabels[type] || type}</span>
                    {doc?.verified && <span style={{ fontSize: 10, color: "#10b981", fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}><Shield size={9} /> Verified</span>}
                    {!available && <span style={{ fontSize: 10, color: "#ef4444", fontWeight: 700 }}>Missing</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generate button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={generating}
            style={{
              width: "100%", padding: "16px 24px", borderRadius: 14,
              background: generating ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg,#6366f1,#818cf8)",
              border: "none", color: "white", fontSize: 16, fontWeight: 800, cursor: generating ? "wait" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: generating ? "none" : "0 0 30px rgba(99,102,241,0.3)",
            }}
          >
            {generating ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Wand2 size={18} />
                </motion.div>
                Generating... {countdown && <span style={{ fontVariantNumeric: "tabular-nums" }}>({countdown}s)</span>}
              </>
            ) : (
              <><Zap size={20} /> Generate Bundle in 3 Seconds</>
            )}
          </motion.button>
        </div>

        {/* Output panel */}
        <div>
          <AnimatePresence mode="wait">
            {!generated && !generating && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{
                  background: "var(--bg-card)", border: "2px dashed var(--border)", borderRadius: 16,
                  padding: 48, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center",
                }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Wand2 size={28} style={{ color: "#6366f1", opacity: 0.5 }} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>Bundle preview</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Select a purpose, enter institution name,<br />and click generate</div>
              </motion.div>
            )}

            {generating && (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ background: "var(--bg-card)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 16, padding: 48, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" }}
              >
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                  style={{ fontSize: 48, marginBottom: 20 }}>⚡</motion.div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#818cf8", marginBottom: 8 }}>
                  Assembling bundle...
                </div>
                <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 24 }}>
                  Verifying documents · Compiling · Encrypting
                </div>
                {template.docs.map((type, i) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.6 } }}
                    style={{ fontSize: 13, color: "#10b981", marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <CheckCircle size={14} /> {typeLabels[type] || type} — verified ✓
                  </motion.div>
                ))}
              </motion.div>
            )}

            {generated && !generating && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {/* Success banner */}
                <div style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 14, padding: "16px 20px", display: "flex", items: "center", gap: 12 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 28 }}>⚡</span>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: "#10b981" }}>Bundle Generated in 3 Seconds</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                        Old way: 3 days hunting documents · UniFlow: 3 seconds
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bundle info */}
                <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>Bundle ID</div>
                  <div style={{ fontSize: 13, fontFamily: "monospace", color: "#818cf8", marginBottom: 16, padding: "6px 12px", background: "var(--bg-secondary)", borderRadius: 6, display: "inline-block" }}>{generated.bundleId}</div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                    <div><div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Institution</div><div style={{ fontSize: 14, fontWeight: 700 }}>{generated.institution}</div></div>
                    <div><div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Purpose</div><div style={{ fontSize: 14, fontWeight: 700 }}>{purposeLabels[generated.purpose]}</div></div>
                    <div><div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Generated</div><div style={{ fontSize: 13, color: "#10b981" }}>{new Date(generated.generatedAt).toLocaleString("en-IN")}</div></div>
                    <div><div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Expires</div><div style={{ fontSize: 13, color: "#f59e0b", display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} />{new Date(generated.expiresAt).toLocaleDateString("en-IN")}</div></div>
                  </div>

                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Documents Included</h3>
                  {generated.docs.map(type => (
                    <div key={type} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "var(--bg-secondary)", borderRadius: 8, marginBottom: 6 }}>
                      <CheckCircle size={14} style={{ color: "#10b981" }} />
                      <span style={{ fontSize: 13, flex: 1 }}>{typeLabels[type] || type}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#10b981", fontWeight: 700 }}><Shield size={10} /> verified</span>
                    </div>
                  ))}

                  <button
                    onClick={() => toast.success("Bundle downloaded!")}
                    style={{
                      width: "100%", marginTop: 20, padding: "12px", borderRadius: 10,
                      background: "linear-gradient(135deg,#10b981,#059669)", border: "none",
                      color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}
                  >
                    <Download size={16} /> Download Verified Bundle
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
