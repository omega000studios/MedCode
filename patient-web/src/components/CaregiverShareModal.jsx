import React, { useState } from "react";
import { X, Share2, Copy, Check, QrCode, ShieldCheck } from "lucide-react";
import { translations } from "../data/translations";

export default function CaregiverShareModal({ patient, lang, onClose }) {
  const t = translations[lang] || translations.en;
  const [copied, setCopied] = useState(false);

  const shareLink = typeof window !== "undefined" 
    ? `${window.location.origin}/caregiver-view?token=${patient.tokenNumber}&uhid=${patient.patientId}` 
    : `https://medcode.hospital/caregiver?token=${patient.tokenNumber}`;

  const copyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "520px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Share2 size={18} color="#2dd4bf" />
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{t.caregiverShare}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "none",
              color: "#94a3b8",
              borderRadius: "8px",
              padding: "0.4rem",
              cursor: "pointer"
            }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: "0.85rem", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "1.25rem" }}>
          Allow family members or designated caregivers to view live queue progress, doctor instructions, and test updates without needing hospital log-in.
        </p>

        {/* QR Code Simulation */}
        <div
          style={{
            background: "#ffffff",
            padding: "1.25rem",
            borderRadius: "12px",
            width: "160px",
            margin: "0 auto 1.25rem",
            textAlign: "center",
            boxShadow: "0 8px 25px rgba(0,0,0,0.4)"
          }}
        >
          <svg viewBox="0 0 100 100" style={{ width: "100%", height: "auto" }}>
            {/* Simple realistic QR pattern representation */}
            <rect x="0" y="0" width="30" height="30" fill="#0f172a" />
            <rect x="5" y="5" width="20" height="20" fill="#fff" />
            <rect x="9" y="9" width="12" height="12" fill="#0f172a" />

            <rect x="70" y="0" width="30" height="30" fill="#0f172a" />
            <rect x="75" y="5" width="20" height="20" fill="#fff" />
            <rect x="79" y="9" width="12" height="12" fill="#0f172a" />

            <rect x="0" y="70" width="30" height="30" fill="#0f172a" />
            <rect x="5" y="75" width="20" height="20" fill="#fff" />
            <rect x="9" y="79" width="12" height="12" fill="#0f172a" />

            {/* Matrix dots */}
            <rect x="36" y="8" width="6" height="6" fill="#0f172a" />
            <rect x="48" y="16" width="6" height="6" fill="#0f172a" />
            <rect x="40" y="40" width="20" height="20" fill="#0f172a" />
            <rect x="66" y="44" width="6" height="6" fill="#0f172a" />
            <rect x="44" y="72" width="8" height="8" fill="#0f172a" />
            <rect x="74" y="76" width="12" height="6" fill="#0f172a" />
            <rect x="18" y="42" width="6" height="14" fill="#0f172a" />
          </svg>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#475569", marginTop: "0.35rem" }}>
            SCAN FOR LIVE VIEW
          </div>
        </div>

        {/* Share Link Copy Box */}
        <div style={{ background: "rgba(15, 23, 42, 0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.6rem 0.85rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", marginBottom: "1rem" }}>
          <span style={{ fontSize: "0.78rem", color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {shareLink}
          </span>
          <button
            onClick={copyLink}
            style={{
              background: copied ? "var(--emerald-500)" : "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: copied ? "#070b14" : "#f8fafc",
              padding: "0.35rem 0.65rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.75rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              whiteSpace: "nowrap"
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>

        <button
          className="btn-primary"
          onClick={onClose}
          style={{ width: "100%", justifyContent: "center" }}
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}
