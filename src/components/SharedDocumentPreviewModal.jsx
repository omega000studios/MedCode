import React from "react";
import { GoogleIcon } from "../GoogleIcons";
import { Button } from "./ui/button";

export default function SharedDocumentPreviewModal({ doc, patient, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content simple-route-modal document-preview-simple" role="dialog" aria-modal="true" aria-labelledby="document-title" onClick={(event) => event.stopPropagation()}>
        <div className="route-modal-top">
          <GoogleIcon name="FileText" size={27} />
          <Button variant="ghost" size="icon" className="route-close" onClick={onClose} aria-label="Close document"><GoogleIcon name="X" size={22} /></Button>
        </div>
        <p className="route-eyebrow">Patient document</p>
        <h2 id="document-title">{doc.name}</h2>
        <dl className="document-preview-meta">
          <div><dt>Patient</dt><dd>{patient.name}</dd></div>
          <div><dt>Token</dt><dd>{patient.token}</dd></div>
          <div><dt>File</dt><dd>{doc.meta}</dd></div>
        </dl>
        <Button className="primary-button route-done" onClick={onClose}>Done</Button>
      </div>
    </div>
  );
}
