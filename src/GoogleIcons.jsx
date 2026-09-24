import React from "react";

// Google Material Symbols, rendered through one consistent rounded icon style.
const symbols = {
  Activity: "monitor_heart",
  AlertCircle: "error",
  AlertTriangle: "warning",
  ArrowRight: "arrow_forward",
  Building: "domain",
  Calendar: "calendar_month",
  Check: "check",
  CheckCircle: "check_circle",
  CheckCircle2: "check_circle",
  ChevronDown: "keyboard_arrow_down",
  ChevronUp: "keyboard_arrow_up",
  Circle: "radio_button_unchecked",
  ClipboardList: "assignment",
  Clock: "schedule",
  Compass: "explore",
  Copy: "content_copy",
  CornerDownRight: "subdirectory_arrow_right",
  Download: "download",
  ExternalLink: "open_in_new",
  Eye: "visibility",
  FastForward: "fast_forward",
  FileCheck: "task",
  FileCheck2: "task",
  FileText: "description",
  FlaskConical: "science",
  FolderLock: "folder_managed",
  HeartPulse: "cardiology",
  HelpCircle: "help",
  LayoutDashboard: "space_dashboard",
  LifeBuoy: "support_agent",
  MapPin: "location_on",
  Milestone: "timeline",
  Navigation: "navigation",
  PackageCheck: "inventory_2",
  PhoneCall: "call",
  Pill: "medication",
  Plus: "add",
  Printer: "print",
  QrCode: "qr_code_2",
  RotateCcw: "restart_alt",
  Scan: "document_scanner",
  Share2: "share",
  ShieldCheck: "verified_user",
  Sliders: "tune",
  Sparkles: "auto_awesome",
  Stethoscope: "stethoscope",
  UserCheck: "how_to_reg",
  Volume2: "volume_up",
  VolumeX: "volume_off",
  X: "close"
};

export function GoogleIcon({ name, size = 20, color, className = "", style, strokeWidth, ...props }) {
  return (
    <span
      className={`material-symbols-rounded google-icon ${className}`}
      style={{ fontSize: size, color, ...style }}
      aria-hidden="true"
      {...props}
    >
      {symbols[name] || name}
    </span>
  );
}

function namedIcon(name) {
  return function MaterialIcon(props) {
    return <GoogleIcon name={name} {...props} />;
  };
}

export const Activity = namedIcon("Activity");
export const AlertCircle = namedIcon("AlertCircle");
export const AlertTriangle = namedIcon("AlertTriangle");
export const ArrowRight = namedIcon("ArrowRight");
export const Building = namedIcon("Building");
export const Calendar = namedIcon("Calendar");
export const Check = namedIcon("Check");
export const CheckCircle = namedIcon("CheckCircle");
export const CheckCircle2 = namedIcon("CheckCircle2");
export const ChevronDown = namedIcon("ChevronDown");
export const ChevronDownIcon = ChevronDown;
export const ChevronUp = namedIcon("ChevronUp");
export const Circle = namedIcon("Circle");
export const ClipboardList = namedIcon("ClipboardList");
export const Clock = namedIcon("Clock");
export const Compass = namedIcon("Compass");
export const Copy = namedIcon("Copy");
export const CornerDownRight = namedIcon("CornerDownRight");
export const Download = namedIcon("Download");
export const ExternalLink = namedIcon("ExternalLink");
export const Eye = namedIcon("Eye");
export const FastForward = namedIcon("FastForward");
export const FileCheck = namedIcon("FileCheck");
export const FileCheck2 = namedIcon("FileCheck2");
export const FileText = namedIcon("FileText");
export const FlaskConical = namedIcon("FlaskConical");
export const FolderLock = namedIcon("FolderLock");
export const HeartPulse = namedIcon("HeartPulse");
export const HelpCircle = namedIcon("HelpCircle");
export const LayoutDashboard = namedIcon("LayoutDashboard");
export const LifeBuoy = namedIcon("LifeBuoy");
export const MapPin = namedIcon("MapPin");
export const Milestone = namedIcon("Milestone");
export const Navigation = namedIcon("Navigation");
export const PackageCheck = namedIcon("PackageCheck");
export const PhoneCall = namedIcon("PhoneCall");
export const Pill = namedIcon("Pill");
export const Plus = namedIcon("Plus");
export const Printer = namedIcon("Printer");
export const QrCode = namedIcon("QrCode");
export const RotateCcw = namedIcon("RotateCcw");
export const Scan = namedIcon("Scan");
export const Share2 = namedIcon("Share2");
export const ShieldCheck = namedIcon("ShieldCheck");
export const Sliders = namedIcon("Sliders");
export const Sparkles = namedIcon("Sparkles");
export const Stethoscope = namedIcon("Stethoscope");
export const UserCheck = namedIcon("UserCheck");
export const Volume2 = namedIcon("Volume2");
export const VolumeX = namedIcon("VolumeX");
export const X = namedIcon("X");
