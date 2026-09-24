import React from "react";
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  ExternalLink,
  Download
} from "lucide-react";
import { translations } from "../data/translations";

export default function InsuranceClaimTracker({ patient, lang, onDownloadPreAuth }) {
  const t = translations[lang] || translations.en;
  const ins = patient.insurance || {};

  return (
    <div className="glass-panel" style={{ padding: "1.5rem" }}>
      {/* Title & Pre-Approved Badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ShieldCheck size={20} color="#10b981" />
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{t.insuranceTracker}</h3>
        </div>
        <div
          style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.35)",
            color: "#34d399",
            borderRadius: "var(--radius-full)",
            padding: "0.25rem 0.75rem",
            fontSize: "0.78rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "0.35rem"
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399" }} />
          <span>{ins.status || t.statusPreApproved}</span>
        </div>
      </div>

      {/* Provider Details */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "var(--radius-md)",
          padding: "1rem"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
          <div>
            <span style={{ fontSize: "0.75rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Coverage Provider & Scheme
            </span>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", marginTop: "0.15rem" }}>
              {ins.provider}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Claim ID</span>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#38bdf8", fontFamily: "monospace" }}>
              {ins.claimId}
            </div>
          </div>
        </div>

        {/* Coverage Metrics Grid */}
        <div className="ins-metric-grid">
          <div className="ins-metric-card">
            <span style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase" }}>
              Pre-Auth Approved
            </span>
            <div className="ins-metric-val" style={{ color: "#34d399" }}>
              {ins.preAuthApproved || "₹18,500"}
            </div>
          </div>
          <div className="ins-metric-card">
            <span style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase" }}>
              Patient Co-Pay
            </span>
            <div className="ins-metric-val" style={{ color: "#38bdf8" }}>
              {ins.copay || "₹0 (Zero)"}
            </div>
          </div>
        </div>

        {/* Policy Number */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "#94a3b8", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.6rem" }}>
          <span>Policy: <strong style={{ color: "#e2e8f0" }}>{ins.policyNumber}</strong></span>
          <button
            onClick={onDownloadPreAuth}
            style={{
              background: "transparent",
              border: "none",
              color: "#2dd4bf",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem"
            }}
          >
            <Download size={13} />
            <span>Pre-Auth Slip</span>
          </button>
        </div>
      </div>

      {/* Claim Process Stepper */}
      {ins.timeline && ins.timeline.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#cbd5e1" }}>
            Cashless Approval Milestones
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.6rem" }}>
            {ins.timeline.map((step, idx) => (
              <div 
                key={idx}
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  fontSize: "0.82rem",
                  color: step.done ? "#e2e8f0" : "#64748b"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {step.done ? (
                    <CheckCircle2 size={16} color="#34d399" />
                  ) : (
                    <Clock size={16} color="#64748b" />
                  )}
                  <span>{step.title}</span>
                </div>
                <span style={{ fontSize: "0.75rem", color: step.done ? "#94a3b8" : "#475569" }}>
                  {step.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
