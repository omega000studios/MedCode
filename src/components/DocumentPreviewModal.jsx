import React from "react";
import { X, Download, Printer, ShieldCheck, CheckCircle2 } from "../GoogleIcons";
import { translations } from "../data/translations";

export default function DocumentPreviewModal({ doc, patient, lang, onClose }) {
  const t = translations[lang] || translations.en;
  if (!doc) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "680px", background: "#0b1222" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.85rem" }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{doc.name}</h3>
            <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
              Category: {doc.category} • Date: {doc.date}
            </span>
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

        {/* Paper Document Preview Simulation */}
        <div
          style={{
            background: "#ffffff",
            color: "#0f172a",
            borderRadius: "8px",
            padding: "1.75rem",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            fontFamily: "var(--font-body)",
            marginBottom: "1.25rem",
            position: "relative"
          }}
        >
          {/* Hospital Header Banner */}
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "2px solid #0f172a", paddingBottom: "0.75rem", marginBottom: "1rem" }}>
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#065f46", textTransform: "uppercase" }}>
                Apollo-ABDM Medical Centre
              </h2>
              <p style={{ fontSize: "0.72rem", color: "#475569" }}>
                Integrated National Health Grid • ABDM Health Facility ID: IN-DL-HOSP-0941
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#047857" }}>
                ABDM VERIFIED RECORD
              </div>
              <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                Token: {patient.tokenNumber} | UHID: {patient.patientId}
              </div>
            </div>
          </div>

          {/* Patient Bio Strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem", background: "#f1f5f9", padding: "0.6rem 0.8rem", borderRadius: "6px", fontSize: "0.8rem", marginBottom: "1rem" }}>
            <div><strong>Patient Name:</strong> {patient.name}</div>
            <div><strong>Age / Sex:</strong> {patient.age} Yrs / {patient.gender}</div>
            <div><strong>ABHA ID:</strong> {patient.abhaId}</div>
            <div><strong>Pathway:</strong> {patient.carePathway}</div>
          </div>

          {/* Clinical Details */}
          <div style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#1e293b", marginBottom: "1.25rem" }}>
            <p style={{ fontWeight: 700, color: "#0f172a", marginBottom: "0.25rem" }}>
              CLINICAL NOTE & ORDERS:
            </p>
            <p>
              Patient evaluated for {patient.carePathway} protocol. Active vitals recorded. Electronic clinical clearance issued for scheduled diagnostics and specialized consultation.
            </p>
            <ul style={{ paddingLeft: "1.2rem", marginTop: "0.5rem", fontSize: "0.8rem", color: "#334155" }}>
              <li>Orders transmitted electronically to Central Pathology & Pharmacy.</li>
              <li>Pre-authorization verified under {patient.insurance?.provider || "Health Insurance"}.</li>
              <li>Next milestone scheduled in OPD Electronic Tracking System.</li>
            </ul>
          </div>

          {/* Doctor Signature Stamp */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px dashed #cbd5e1", paddingTop: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.72rem", color: "#059669", fontWeight: 600 }}>
              <CheckCircle2 size={14} />
              <span>Digitally Authenticated via ABDM Provider Key</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.95rem", fontFamily: "cursive", color: "#1e3a8a", fontWeight: "bold" }}>
                Dr. R. Sen
              </div>
              <div style={{ fontSize: "0.7rem", color: "#64748b" }}>
                Attending Physician (Reg: MCI-84920)
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <button
            className="btn-secondary"
            onClick={() => window.print()}
            style={{ fontSize: "0.82rem", padding: "0.5rem 0.9rem" }}
          >
            <Printer size={15} />
            <span>Print Slip</span>
          </button>
          <button
            className="btn-primary"
            onClick={() => {
              alert("PDF downloaded to your device.");
              onClose();
            }}
            style={{ fontSize: "0.82rem", padding: "0.5rem 0.9rem" }}
          >
            <Download size={15} />
            <span>{t.downloadReport}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
