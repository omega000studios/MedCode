export const locationCatalog = [
  { id: "diag-204", title: "Diagnostic Pathology & Biochemistry", location: "Floor 2, Wing B, Room 204", floorTape: "Yellow" },
  { id: "retina-110", title: "Ophthalmology & Retinal Imaging", location: "Floor 1, Wing A, Room 110", floorTape: "Blue" },
  { id: "infusion-4b", title: "Medical Oncology Infusion Suite", location: "Floor 4, Wing C, Suite 4B", floorTape: "Purple" },
  { id: "ultrasound-315", title: "Fetal Medicine & Radiology", location: "Floor 3, Room 315", floorTape: "Pink footprints" },
  { id: "pharmacy-g", title: "Outpatient Pharmacy", location: "Ground Floor Atrium, Counter 2", floorTape: "Green" }
];

export const orderCatalog = [
  { id: "diabetic-panel", name: "Comprehensive Diabetic Panel", location: "Diagnostic Pathology, Room 204", cost: "₹1,450", coverage: "AB-PMJAY covered" },
  { id: "retinal-scan", name: "Retinal Fundus Scan", location: "Ophthalmology, Room 110", cost: "₹900", coverage: "AB-PMJAY covered" },
  { id: "cbc", name: "Complete Blood Count", location: "Central Laboratory, Room 204", cost: "₹650", coverage: "Covered" },
  { id: "chemo-cycle", name: "Paclitaxel + Carboplatin Cycle", location: "Infusion Suite 4B", cost: "₹18,600", coverage: "Pre-authorization required" },
  { id: "anatomy-scan", name: "Level-II Fetal Anatomy Scan", location: "Ultrasound Suite 315", cost: "₹2,800", coverage: "80% covered" },
  { id: "metformin", name: "Metformin XR 500 mg", location: "Outpatient Pharmacy", cost: "₹180", coverage: "Formulary covered" }
];

export const careTypes = ["Cancer Care", "Diabetes Care", "Maternal & Child"];
