import React, { useEffect } from "react";
import { GoogleIcon } from "../GoogleIcons";
import { Button } from "./ui/button";

const routeCopy = {
  en: {
    title: "Where to go",
    location: "Destination",
    note: "Follow the signs to this location. A staff member can help if you need directions.",
    done: "Got it",
    close: "Close directions"
  },
  hi: {
    title: "कहाँ जाना है",
    location: "गंतव्य",
    note: "इस स्थान के संकेतों का पालन करें। रास्ते में मदद के लिए स्टाफ से पूछें।",
    done: "समझ गया/गई",
    close: "निर्देश बंद करें"
  },
  mr: {
    title: "कुठे जायचे",
    location: "ठिकाण",
    note: "या ठिकाणाच्या दिशादर्शकांचे अनुसरण करा. मदत हवी असल्यास कर्मचाऱ्यांना विचारा.",
    done: "समजले",
    close: "मार्गदर्शन बंद करा"
  }
};

export default function IndoorMapModal({ patient, lang, onClose }) {
  const card = patient.nextStep || {};
  const copy = routeCopy[lang] || routeCopy.en;

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content simple-route-modal" role="dialog" aria-modal="true" aria-labelledby="route-title" onClick={(event) => event.stopPropagation()}>
        <div className="route-modal-top">
          <span className="route-icon"><GoogleIcon name="Navigation" size={26} /></span>
          <Button variant="ghost" size="icon" className="route-close" onClick={onClose} aria-label={copy.close}><GoogleIcon name="X" size={22} /></Button>
        </div>
        <p className="route-eyebrow">{copy.title}</p>
        <h2 id="route-title">{card.title}</h2>
        <div className="route-location">
          <GoogleIcon name="MapPin" size={24} />
          <div><span>{copy.location}</span><strong>{card.location} · Follow {card.floorTape} floor markings</strong></div>
        </div>
        <p className="route-note">{copy.note}</p>
        <Button className="primary-button route-done" onClick={onClose}>{copy.done}</Button>
      </div>
    </div>
  );
}
