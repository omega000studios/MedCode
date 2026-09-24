import React from "react";
import { FileText, Eye } from "../GoogleIcons";
import { translations } from "../data/translations";

export default function DocumentVault({ patient, lang, onPreviewDocument }) {
  const t = translations[lang] || translations.en;
  const docs = patient.documents || [];
  const available = lang === "hi" ? "दस्तावेज़ उपलब्ध हैं" : lang === "mr" ? "कागदपत्रे उपलब्ध आहेत" : "Documents available";

  return (
    <div className="document-vault">
      <div className="document-heading">
        <div><h2>{t.docVault}</h2><p>{docs.length} {available}</p></div>
      </div>
      <div className="document-list">
        {docs.map((doc) => (
          <article className="document-row" key={doc.id}>
            <FileText size={22} />
            <div className="document-copy">
              <h3>{doc.name}</h3>
              <p>{doc.meta}</p>
            </div>
            <button onClick={() => onPreviewDocument(doc)}><Eye size={18} />{t.viewDocument}</button>
          </article>
        ))}
      </div>
    </div>
  );
}
