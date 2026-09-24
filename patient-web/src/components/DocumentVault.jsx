import React, { useState } from "react";
import { 
  FolderLock, 
  FileText, 
  Eye, 
  Download, 
  Plus, 
  CheckCircle,
  FileCheck
} from "lucide-react";
import { translations } from "../data/translations";

export default function DocumentVault({ patient, lang, onPreviewDocument }) {
  const t = translations[lang] || translations.en;
  const docs = patient.documents || [];
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "Consultation", "Lab Orders", "Insurance & ID"];

  const filteredDocs = activeCategory === "all" 
    ? docs 
    : docs.filter((d) => d.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="glass-panel" style={{ padding: "1.5rem" }}>
      {/* Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FolderLock size={18} color="#2dd4bf" />
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{t.docVault}</h3>
        </div>
        <span style={{ fontSize: "0.78rem", color: "#34d399", display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <CheckCircle size={13} />
          <span>ABDM Health Locker Linked</span>
        </span>
      </div>

      {/* Category Pills */}
      <div style={{ display: "flex", gap: "0.4rem", overflowX: "auto", paddingBottom: "0.5rem", marginBottom: "0.85rem" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? "rgba(20, 184, 166, 0.2)" : "rgba(255, 255, 255, 0.05)",
              color: activeCategory === cat ? "#2dd4bf" : "#94a3b8",
              border: activeCategory === cat ? "1px solid rgba(20, 184, 166, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "var(--radius-full)",
              padding: "0.3rem 0.75rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              textTransform: "capitalize"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              borderRadius: "var(--radius-md)",
              padding: "0.85rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(20, 184, 166, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                <FileText size={18} color="#2dd4bf" />
              </div>
              <div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#f1f5f9" }}>
                  {doc.name}
                </h4>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.15rem" }}>
                  <span>{doc.date}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span style={{ color: "#34d399", fontWeight: 600 }}>{doc.badge}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <button
                onClick={() => onPreviewDocument(doc)}
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#cbd5e1",
                  borderRadius: "6px",
                  padding: "0.4rem 0.65rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
                title="Preview"
              >
                <Eye size={13} />
                <span>{t.viewDocument}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
