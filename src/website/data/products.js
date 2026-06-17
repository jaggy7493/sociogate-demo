import {
  AlertTriangle,
  BarChart3,
  Car,
  CreditCard,
  ScanFace,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export const productModules = [
  {
    id: "visitor",
    title: "Visitor Intelligence",
    subtitle: "Smart visitor approvals powered by AI.",
    icon: ScanFace,
    tone: "from-blue-700 to-cyan-400",
    workflow: ["Visitor arrives", "AI scans visitor", "Resident notified", "Approval", "Gate opens"],
    highlights: ["AI Face Recognition", "QR Visitor Pass", "Blacklist Detection", "Resident Approval"],
  },
  {
    id: "vehicle",
    title: "Vehicle Intelligence",
    subtitle: "AI-assisted vehicle tracking, watchlist detection and smart gate alerts.",
    icon: Car,
    tone: "from-slate-800 to-blue-600",
    workflow: ["Vehicle arrives", "Number plate scanned", "AI detects", "Watchlist check", "Guard alerted"],
    highlights: ["ANPR Ready", "Watchlist Alerts", "Blacklist Detection", "Vehicle Logs"],
  },
  {
    id: "billing",
    title: "Smart Billing",
    subtitle: "Maintenance billing, payment receipts and ERP ledger tracking.",
    icon: CreditCard,
    tone: "from-emerald-700 to-cyan-500",
    workflow: ["Bill generated", "Resident notified", "UPI payment", "Receipt created", "ERP updated"],
    highlights: ["UPI Flow", "Auto Reminders", "Receipts", "Ledger Reports"],
  },
  {
    id: "sos",
    title: "Emergency SOS",
    subtitle: "Resident panic alerts routed instantly to guard and ERP command center.",
    icon: AlertTriangle,
    tone: "from-red-700 to-rose-500",
    workflow: ["Resident taps SOS", "Guard alerted", "ERP escalates", "Security responds", "Resolved"],
    highlights: ["Panic Button", "Guard Alert", "Admin Alert", "Emergency Timeline"],
  },
  {
    id: "erp",
    title: "ERP Intelligence",
    subtitle: "Command center for billing, visitors, complaints, notices, polls and analytics.",
    icon: BarChart3,
    tone: "from-violet-700 to-fuchsia-500",
    workflow: ["Data syncs", "AI dashboard", "Reports generated", "Risks highlighted", "Action taken"],
    highlights: ["Admin Dashboard", "Analytics", "Reports", "AI Insights"],
  },
  {
    id: "resident",
    title: "Resident Experience",
    subtitle: "A premium app experience for visitors, bills, notices, polls, complaints and SOS.",
    icon: Smartphone,
    tone: "from-indigo-700 to-cyan-500",
    workflow: ["Resident opens app", "Approves visitor", "Pays bill", "Votes poll", "Tracks activity"],
    highlights: ["Visitor Approval", "Bill Payments", "Notices & Polls", "Complaints"],
  },
];

export const trustPoints = [
  "Built for Indian apartments, villas and townships",
  "Designed for guard teams, residents and ERP admins",
  "Premium AI workflows without operational complexity",
];
