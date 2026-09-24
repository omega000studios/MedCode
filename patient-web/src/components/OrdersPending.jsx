import React from "react";
import { 
  FlaskConical, 
  Pill, 
  Scan, 
  Clock, 
  CheckCircle, 
  ShieldCheck,
  PackageCheck
} from "lucide-react";
import { translations } from "../data/translations";

export default function OrdersPending({ patient, lang }) {
  const t = translations[lang] || translations.en;
  const orders = patient.ordersPending || [];

  const getIcon = (type) => {
    if (type.toLowerCase().includes("lab")) return <FlaskConical size={18} color="#38bdf8" />;
    if (type.toLowerCase().includes("pharmacy")) return <Pill size={18} color="#34d399" />;
    return <Scan size={18} color="#a78bfa" />;
  };

  const getStatusColor = (status) => {
    const s = status.toLowerCase();
    if (s.includes("ready") || s.includes("cleared") || s.includes("dispensed")) {
      return { bg: "rgba(16, 185, 129, 0.15)", text: "#34d399", border: "rgba(16, 185, 129, 0.3)" };
    }
    if (s.includes("processing") || s.includes("compounding") || s.includes("scheduled")) {
      return { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa", border: "rgba(59, 130, 246, 0.3)" };
    }
    return { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24", border: "rgba(245, 158, 11, 0.3)" };
  };

  return (
    <div className="glass-panel" style={{ padding: "1.5rem" }}>
      {/* Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <PackageCheck size={18} color="#38bdf8" />
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{t.ordersTitle}</h3>
        </div>
        <span style={{ fontSize: "0.78rem", color: "#94a3b8" }}>
          {orders.length} Active Orders
        </span>
      </div>

      {/* Orders List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {orders.map((ord) => {
          const statusStyle = getStatusColor(ord.status);

          return (
            <div
              key={ord.id}
              style={{
                background: "rgba(15, 23, 42, 0.65)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                borderRadius: "var(--radius-md)",
                padding: "0.9rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                  <div
                    style={{
                      padding: "0.45rem",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.05)",
                      marginTop: "2px"
                    }}
                  >
                    {getIcon(ord.type)}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#f1f5f9" }}>
                      {ord.title}
                    </h4>
                    <p style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "0.15rem" }}>
                      {ord.department} • Ref: {ord.code}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  style={{
                    background: statusStyle.bg,
                    color: statusStyle.text,
                    border: `1px solid ${statusStyle.border}`,
                    borderRadius: "var(--radius-full)",
                    padding: "0.2rem 0.65rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    whiteSpace: "nowrap"
                  }}
                >
                  {ord.status}
                </div>
              </div>

              {/* Price & Insurance Tag */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.45rem", fontSize: "0.78rem" }}>
                <span style={{ color: "#94a3b8" }}>
                  Cost: <strong style={{ color: "#cbd5e1" }}>{ord.cost}</strong>
                </span>
                {ord.covered && (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "#34d399", fontWeight: 600 }}>
                    <ShieldCheck size={14} />
                    <span>{t.coPayZero}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
