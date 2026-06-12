import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Bell, UserCheck, Wallet, MessageSquareWarning, Megaphone, Siren, Home,
  Users, Car, QrCode, PhoneCall, CheckCircle2, Clock, LayoutDashboard, Building2,
  ReceiptText, ClipboardList, BarChart3, Search, Settings, UserRound, ArrowRight,
  Truck, BadgeCheck, CreditCard, FileText, Wrench, Send, X, Plus, Download, AlertTriangle,
  UserPlus, LogOut, Menu, ChevronLeft, IndianRupee, Check, Camera, Bot, Sparkles, ShieldAlert
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-white shadow-sm border border-slate-100 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false }) => {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    success: "bg-emerald-500 text-white hover:bg-emerald-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    navy: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl px-4 py-3 font-semibold transition active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const PhoneShell = ({ children, dark = false }) => (
  <div className={`w-full max-w-[340px] sm:max-w-[360px] h-[640px] sm:h-[700px] rounded-[2rem] p-2 phone-polish mx-auto ${dark ? "bg-slate-950" : "bg-slate-900"}`}>
    <div className={`h-full rounded-[1.7rem] overflow-hidden ${dark ? "bg-slate-950" : "bg-slate-50"}`}>
      <div className="h-6 flex items-center justify-center shrink-0">
        <div className={`w-20 h-1.5 rounded-full ${dark ? "bg-slate-700" : "bg-slate-300"}`} />
      </div>
      {children}
    </div>
  </div>
);

const HeaderBack = ({ title, subtitle, onBack, dark = false }) => (
  <div className="flex items-center gap-3 mb-5">
    <button
      onClick={onBack}
      className={`h-10 w-10 rounded-xl flex items-center justify-center ${dark ? "bg-slate-900 text-white" : "bg-white text-slate-700 border border-slate-100"}`}
    >
      <ChevronLeft size={20} />
    </button>
    <div>
      <h2 className={`text-xl font-black ${dark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      {subtitle && <p className={`text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>{subtitle}</p>}
    </div>
  </div>
);

const Logo = ({ dark = false }) => (
  <div className="flex items-center gap-2">
    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-200/40">
      <ShieldCheck className="text-white" size={23} />
    </div>
    <div>
      <div className={`text-xl font-black tracking-tight ${dark ? "text-white" : "text-slate-950"}`}>SocioGate</div>
      <div className={`text-xs ${dark ? "text-cyan-200" : "text-slate-500"}`}>Smart Living Begins at the Gate</div>
    </div>
  </div>
);

const DarkTextInput = React.memo(({ label, value, onChange }) => (
  <div>
    <label className="text-xs text-slate-500">{label}</label>
    <input
      className="mt-1 w-full rounded-2xl bg-slate-900 border border-slate-800 p-4 outline-none text-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
));

const initials = (name = "NA") =>
  name.split(" ").filter(Boolean).map((x) => x[0]).join("").slice(0, 2).toUpperCase();

const normalizeMobile = (mobile = "") => String(mobile).replace(/\D/g, "").slice(-10);

const BLACKLISTED_VISITOR_MOBILES = ["9990001111", "8881112222", "7773334444"];

const getSecurityRisk = (mobile = "") => {
  const normalized = normalizeMobile(mobile);
  if (BLACKLISTED_VISITOR_MOBILES.includes(normalized)) {
    return {
      blacklisted: true,
      riskScore: 95,
      riskLabel: "High Risk",
      faceType: "Blacklisted Visitor",
      securityReason: "Visitor mobile is present in society watchlist",
      securityRecommendation: "Reject recommended",
    };
  }

  return {
    blacklisted: false,
    riskScore: null,
    riskLabel: null,
    faceType: null,
    securityReason: "",
    securityRecommendation: "",
  };
};


const normalizeVehicleNumber = (number = "") =>
  String(number).toUpperCase().replace(/[^A-Z0-9]/g, "");

const WATCHLIST_VEHICLES = ["DL8CAF0001", "UP14ZZ9999", "MH01ZZ0007"];

const getVehicleSecurityRisk = (number = "") => {
  const normalized = normalizeVehicleNumber(number);
  if (WATCHLIST_VEHICLES.includes(normalized)) {
    return {
      watchlisted: true,
      riskScore: 95,
      riskLabel: "High Risk",
      vehicleType: "Watchlist Vehicle",
      securityReason: "Vehicle number is present in society watchlist",
      securityRecommendation: "Security verification required",
    };
  }
  return {
    watchlisted: false,
    riskScore: null,
    riskLabel: null,
    vehicleType: null,
    securityReason: "",
    securityRecommendation: "",
  };
};


const visitorBadge = (status) => {
  if (["approved", "inside"].includes(status)) return "bg-emerald-100 text-emerald-700";
  if (status === "pending") return "bg-blue-100 text-blue-700";
  if (status === "auto closed") return "bg-purple-100 text-purple-700";
  if (status === "exited") return "bg-slate-100 text-slate-700";
  if (status === "wrong entry") return "bg-red-100 text-red-700";
  if (status === "rejected") return "bg-red-100 text-red-700";
  return "bg-slate-100 text-slate-600";
};

const residentDisplayStatus = (status) => {
  if (status === "auto closed") return "exited";
  return status || "none";
};

const residentDisplayBadge = (status) => {
  if (status === "auto closed") return "bg-slate-100 text-slate-700";
  return visitorBadge(status);
};

const GuardStatusCard = ({ status, exitTime = "12:25 PM" }) => {
  const config = {
    exited: {
      title: "Visitor Exited",
      subtitle: "Exit completed successfully",
      timeLabel: "Exit Time",
      time: exitTime,
      dot: "bg-emerald-400",
      border: "border-emerald-400/30",
      glow: "shadow-emerald-950/30",
      text: "text-emerald-300",
      bg: "from-slate-950 via-slate-900 to-emerald-950",
    },
    "auto closed": {
      title: "Auto Closed",
      subtitle: "System automatically closed this delivery pass",
      timeLabel: "Closed At",
      time: exitTime,
      dot: "bg-purple-400",
      border: "border-purple-400/30",
      glow: "shadow-purple-950/30",
      text: "text-purple-300",
      bg: "from-slate-950 via-slate-900 to-purple-950",
    },
    "wrong entry": {
      title: "Wrong Entry Reported",
      subtitle: "Resident marked this entry as suspicious",
      timeLabel: "Reported At",
      time: "12:28 PM",
      dot: "bg-red-400",
      border: "border-red-400/30",
      glow: "shadow-red-950/30",
      text: "text-red-300",
      bg: "from-red-950 via-slate-950 to-red-950",
    },
    default: {
      title: "Pass Closed",
      subtitle: "This pass is no longer active",
      timeLabel: "Status",
      time: status || "closed",
      dot: "bg-cyan-400",
      border: "border-cyan-400/30",
      glow: "shadow-cyan-950/30",
      text: "text-cyan-300",
      bg: "from-slate-950 via-slate-900 to-cyan-950",
    },
  };
  const item = config[status] || config.default;
  return (
    <Card className={`mt-5 p-5 bg-gradient-to-r ${item.bg} ${item.border} text-white shadow-xl ${item.glow}`}>
      <div className="flex items-start gap-3">
        <span className={`mt-1 h-3 w-3 rounded-full ${item.dot} shadow-lg animate-pulse`} />
        <div>
          <p className="font-black text-lg text-white">{item.title}</p>
          <p className="mt-1 text-sm text-slate-300">{item.subtitle}</p>
          <p className={`mt-2 text-sm font-bold ${item.text}`}>{item.timeLabel}: {item.time}</p>
        </div>
      </div>
    </Card>
  );
};

const VehicleStatusCard = ({ outTime = "12:05 PM" }) => (
  <Card className="mt-5 p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border-cyan-400/30 text-white shadow-xl shadow-cyan-950/30">
    <div className="flex items-start gap-3">
      <span className="mt-1 h-3 w-3 rounded-full bg-cyan-400 shadow-lg animate-pulse" />
      <div>
        <p className="font-black text-lg text-white">Vehicle Exited</p>
        <p className="mt-1 text-sm text-slate-300">Vehicle successfully left society</p>
        <p className="mt-2 text-sm font-bold text-cyan-300">Out Time: {outTime}</p>
      </div>
    </div>
  </Card>
);

function Toast({ toast, clear }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold"
          onClick={clear}
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ResidentApp({ activeVisitor, visitorHistory, setActiveVisitor, saveVisitor, preApprovedVisitors = {}, setPreApprovedVisitors, sosAlerts = [], setSosAlerts, notices = [], communityPolls = [], setCommunityPolls, billingLedger = [], setBillingLedger, addLog, notify, billPaid, setBillPaid }) {
  const [screen, setScreen] = useState("splash");
  const [showPopup, setShowPopup] = useState(false);
  const [complaintRaised, setComplaintRaised] = useState(false);
  const [preApprovalForm, setPreApprovalForm] = useState({
    name: "Amit Sharma",
    mobile: "9876501234",
    purpose: "Guest Visit",
    arrival: "5:30 PM",
  });
  const [lastPreApproval, setLastPreApproval] = useState(null);
  const [seenNoticeIds, setSeenNoticeIds] = useState([]);
  const [dismissedPollIds, setDismissedPollIds] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [lastPaymentReceipt, setLastPaymentReceipt] = useState(null);
  const latest = activeVisitor || visitorHistory[0];
  const activeSosAlert = sosAlerts.find((s) => s.status === "active");
  const latestUnreadNotice = notices.find((n) => !seenNoticeIds.includes(n.id));
  const latestPendingPoll = communityPolls.find((p) => !p.votedOption && !dismissedPollIds.includes(p.id));
  const unreadNoticeCount = notices.filter((n) => !seenNoticeIds.includes(n.id)).length;
  const pendingPollCount = communityPolls.filter((p) => !p.votedOption).length;
  const residentCurrentBill = billingLedger.find((b) => b.flat === "A-1204") || {
    flat: "A-1204",
    name: "Jagmeet Singh",
    month: "June 2026",
    amount: 4500,
    dueDate: "10 June 2026",
    status: billPaid ? "paid" : "pending",
  };
  const residentBillHistory = billingLedger.filter((b) => b.flat === "A-1204");

  useEffect(() => {
    if (screen === "dashboard" && activeVisitor?.status === "pending") setShowPopup(true);
  }, [screen, activeVisitor?.id, activeVisitor?.status]);

  const approve = () => {
    if (!activeVisitor) return;
    const updated = {
      ...activeVisitor,
      status: "approved",
      approvedBy: "Jagmeet Singh",
      approvedAt: "11:46 AM",
    };
    setActiveVisitor(updated);
    saveVisitor(updated);
    addLog(`Resident approved ${updated.name} for ${updated.flat}`);
    setShowPopup(false);
    notify("Visitor approved");
  };

  const reject = () => {
    if (!activeVisitor) return;
    const updated = { ...activeVisitor, status: "rejected", rejectedAt: "11:46 AM" };
    setActiveVisitor(updated);
    saveVisitor(updated);
    addLog(`Resident rejected ${updated.name}`);
    if (typeof window !== "undefined") {
      // Demo state is updated centrally by guard attempt tracking.
    }
    setShowPopup(false);
    notify("Visitor rejected");
  };

  const wrongEntry = () => {
    if (!latest) return;
    const updated = {
      ...latest,
      status: "wrong entry",
      wrongEntryAt: "12:28 PM",
      riskScore: 92,
      riskLabel: "High Risk",
    };
    setActiveVisitor(updated);
    saveVisitor(updated);
    addLog(`Wrong Entry Alert: Resident A-1204 reported ${updated.name} as wrong entry`);
    notify("Wrong entry alert sent to guard and admin");
  };

  const callVisitor = () => {
    if (!latest?.mobile) {
      notify("Visitor mobile number not available");
      return;
    }
    window.location.href = `tel:${latest.mobile}`;
  };

  const triggerSosAlert = () => {
    if (activeSosAlert) {
      notify("SOS already active");
      return;
    }
    const alert = {
      id: Date.now(),
      flat: "A-1204",
      resident: "Jagmeet Singh",
      status: "active",
      priority: "Critical",
      triggeredAt: "Now",
      message: "Resident triggered emergency SOS from mobile app",
      resolvedAt: "--",
    };
    if (typeof setSosAlerts === "function") setSosAlerts((prev) => [alert, ...prev]);
    addLog(`🚨 SOS alert triggered by ${alert.resident} from ${alert.flat}`);
    notify("SOS alert sent to guard and admin");
    setScreen("dashboard");
  };

  const resolveResidentSos = () => {
    if (!activeSosAlert || typeof setSosAlerts !== "function") return;
    setSosAlerts((prev) => prev.map((s) => s.id === activeSosAlert.id ? { ...s, status: "resolved", resolvedAt: "Now" } : s));
    addLog(`SOS alert resolved for ${activeSosAlert.flat}`);
    notify("SOS alert resolved");
  };

  const createPreApproval = () => {
    const mobileKey = normalizeMobile(preApprovalForm.mobile);
    if (mobileKey.length !== 10) {
      notify("Enter valid 10 digit mobile number");
      return;
    }
    const pass = {
      id: Date.now(),
      passId: `PA-${Date.now().toString().slice(-5)}`,
      name: preApprovalForm.name || "Guest Visitor",
      mobile: mobileKey,
      flat: "A-1204",
      purpose: preApprovalForm.purpose || "Guest Visit",
      gate: "Main Gate",
      arrival: preApprovalForm.arrival || "Today",
      approvedBy: "Jagmeet Singh",
      approvedAt: "Pre-approved",
      status: "pre-approved",
      trusted: true,
      createdAt: "Today",
    };
    if (typeof setPreApprovedVisitors === "function") {
      setPreApprovedVisitors((prev) => ({ ...prev, [mobileKey]: pass }));
    }
    setLastPreApproval(pass);
    addLog(`Resident pre-approved ${pass.name} (${mobileKey}) for ${pass.flat}`);
    notify("Visitor pre-approved");
  };

  const payMaintenanceBill = () => {
    if (!residentCurrentBill || residentCurrentBill.status === "paid") {
      notify("No pending bill to pay");
      return;
    }

    const txId = `TXN-${residentCurrentBill.flat.replace("-", "")}-${Date.now().toString().slice(-5)}`;
    const receiptId = `RCPT-${residentCurrentBill.flat.replace("-", "")}-${Date.now().toString().slice(-5)}`;

    const updatedBill = {
      ...residentCurrentBill,
      status: "paid",
      paidAt: "Now",
      txId,
      method: paymentMethod,
      receiptId,
    };

    if (typeof setBillingLedger === "function") {
      setBillingLedger((prev) =>
        prev.map((b) => (b.flat === residentCurrentBill.flat ? updatedBill : b))
      );
    }

    setBillPaid(true);
    setLastPaymentReceipt(updatedBill);
    addLog(`Maintenance payment received from ${updatedBill.flat}: ₹${updatedBill.amount} via ${paymentMethod}`);
    notify("Payment successful. Receipt generated.");
  };

  const voteCommunityPoll = (pollId, optionLabel) => {
    if (typeof setCommunityPolls !== "function") return;
    setCommunityPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;

        const previousVote = poll.votedOption;
        if (previousVote === optionLabel) {
          notify("Same option already selected");
          return poll;
        }

        return {
          ...poll,
          votedOption: optionLabel,
          options: poll.options.map((opt) => {
            if (opt.label === optionLabel) return { ...opt, votes: opt.votes + 1 };
            if (opt.label === previousVote) return { ...opt, votes: Math.max(0, opt.votes - 1) };
            return opt;
          }),
        };
      })
    );
    addLog(`Resident updated community poll vote: ${optionLabel}`);
    notify("Vote updated");
  };

  const markNoticeRead = (noticeId) => {
    setSeenNoticeIds((prev) => Array.from(new Set([...prev, noticeId])));
  };

  const openNoticeFromPopup = (noticeId) => {
    markNoticeRead(noticeId);
    setScreen("notices");
  };

  const openPollFromPopup = (pollId) => {
    setDismissedPollIds((prev) => Array.from(new Set([...prev, pollId])));
    setScreen("polls");
  };

  const DashboardCard = ({ Icon, title, sub, onClick, urgent }) => (
    <button onClick={onClick} className="text-left rounded-2xl bg-white shadow-md border border-slate-200 p-4 active:scale-[0.98] transition relative overflow-hidden min-h-[112px]">
      {urgent && <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />}
      <Icon className="text-blue-600" size={25} />
      <p className="font-bold mt-3">{title}</p>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </button>
  );

  if (screen === "splash") {
    return (
      <PhoneShell>
        <div className="h-full bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-400 flex flex-col items-center justify-center text-white p-8 text-center">
          <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-5 h-24 w-24 rounded-[2rem] bg-white/20 backdrop-blur flex items-center justify-center">
            <ShieldCheck size={54} />
          </motion.div>
          <h1 className="text-4xl font-black">SocioGate</h1>
          <p className="mt-2 text-cyan-50">Smart Living Begins at the Gate</p>
          <button onClick={() => setScreen("login")} className="mt-12 w-full rounded-2xl bg-white px-5 py-4 text-center text-base font-black text-blue-700 shadow-xl shadow-blue-900/20 border border-white hover:bg-blue-50 active:scale-[0.98] transition">
            Start Demo
          </button>
        </div>
      </PhoneShell>
    );
  }

  if (screen === "login") {
    return (
      <PhoneShell>
        <div className="h-full overflow-y-auto sg-scroll bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-400 p-5">
          <div className="flex flex-col items-center text-white pt-8">
            <div className="h-20 w-20 rounded-[1.7rem] bg-white/20 backdrop-blur flex items-center justify-center">
              <ShieldCheck size={46} />
            </div>
            <h1 className="text-4xl font-black mt-5">SocioGate</h1>
            <p className="text-sm text-blue-50 mt-1">Smart Living Begins at the Gate</p>
          </div>
          <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-2xl">
            <h2 className="text-2xl font-black text-slate-950">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-1">Login to continue</p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-800">Mobile Number</label>
                <div className="mt-2 flex rounded-2xl border border-slate-200 overflow-hidden bg-white">
                  <span className="px-4 py-4 border-r border-slate-200 text-slate-700 font-semibold">+91</span>
                  <input className="flex-1 p-4 outline-none text-slate-900" defaultValue="9876543210" />
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-800">Society Code</label>
                <input className="mt-2 w-full rounded-2xl border border-slate-200 p-4 outline-none text-slate-900" defaultValue="GREEN101" />
              </div>
              <Button onClick={() => setScreen("dashboard")} className="w-full text-base">Login <ArrowRight size={18} /></Button>
            </div>
            <div className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm text-blue-900">
              Demo Society: <b>Green Meadows Society</b><br />Flat: <b>A-1204</b>
            </div>
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screen === "bills") {
    const isPaid = residentCurrentBill.status === "paid";
    return (
      <PhoneShell>
        <div className="h-full p-5 overflow-y-auto sg-scroll">
          <HeaderBack title="Maintenance Bills" subtitle="Smart billing and payments" onBack={() => setScreen("dashboard")} />

          <div className={`rounded-3xl p-5 text-white ${isPaid ? "bg-gradient-to-r from-emerald-600 to-cyan-500" : "bg-gradient-to-r from-blue-700 to-cyan-500"}`}>
            <p className="text-blue-100">Current Due</p>
            <h1 className="text-4xl font-black mt-1">₹{isPaid ? "0" : residentCurrentBill.amount.toLocaleString("en-IN")}</h1>
            <p className="text-sm text-blue-100 mt-1">{residentCurrentBill.month} • Due: {residentCurrentBill.dueDate}</p>
            <span className={`inline-block mt-3 text-xs rounded-full px-3 py-1 font-bold ${isPaid ? "bg-white/20 text-white" : "bg-amber-300 text-slate-950"}`}>
              {isPaid ? "PAID" : residentCurrentBill.status.toUpperCase()}
            </span>
          </div>

          <Card className="p-4 mt-4 space-y-3">
            <div className="flex justify-between"><span>Flat</span><b>{residentCurrentBill.flat}</b></div>
            <div className="flex justify-between"><span>Resident</span><b>{residentCurrentBill.name}</b></div>
            <div className="flex justify-between"><span>Maintenance</span><b>₹{residentCurrentBill.amount.toLocaleString("en-IN")}</b></div>
            <div className="flex justify-between"><span>Late Fee</span><b>{residentCurrentBill.status === "overdue" ? "₹250" : "₹0"}</b></div>
          </Card>

          {!isPaid && (
            <Card className="p-4 mt-4">
              <p className="font-black text-slate-950">Select Payment Method</p>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {["UPI", "Card", "Net Banking"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`rounded-2xl border p-3 text-xs font-bold ${paymentMethod === m ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 border-slate-200"}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <Button onClick={payMaintenanceBill} className="w-full mt-4" variant="success">
                <CreditCard size={18} /> Pay ₹{residentCurrentBill.amount.toLocaleString("en-IN")}
              </Button>
            </Card>
          )}

          {(isPaid || lastPaymentReceipt) && (
            <Card className="p-4 mt-4 bg-emerald-50 border-emerald-100">
              <div className="flex gap-3">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={28} />
                <div>
                  <p className="font-black text-emerald-900">Payment Receipt</p>
                  <p className="text-sm text-slate-700 mt-1">Receipt: {(lastPaymentReceipt || residentCurrentBill).receiptId || "RCPT-A1204-0626"}</p>
                  <p className="text-xs text-slate-500 mt-1">TXN: {(lastPaymentReceipt || residentCurrentBill).txId || "TXN-A1204-0626"} • {(lastPaymentReceipt || residentCurrentBill).method || "UPI"}</p>
                  <Button onClick={() => notify("Receipt download simulated")} variant="ghost" className="mt-3 py-2 text-xs">
                    <Download size={14} /> Download Receipt
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4 mt-4">
            <h3 className="font-black text-slate-950">Bill History</h3>
            <div className="mt-3 space-y-2">
              {residentBillHistory.map((b) => (
                <div key={`${b.flat}-${b.month}`} className="rounded-2xl bg-slate-50 p-3 flex justify-between items-center text-sm">
                  <div>
                    <b>{b.month}</b>
                    <p className="text-xs text-slate-500">₹{b.amount.toLocaleString("en-IN")} • {b.dueDate}</p>
                  </div>
                  <span className={`text-xs rounded-full px-3 py-1 font-bold ${b.status === "paid" ? "bg-emerald-100 text-emerald-700" : b.status === "overdue" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </PhoneShell>
    );
  }

  if (screen === "complaints") {
    return (
      <PhoneShell>
        <div className="h-full p-5 overflow-y-auto sg-scroll">
          <HeaderBack title="Complaints" subtitle="Raise and track tickets" onBack={() => setScreen("dashboard")} />
          <Button onClick={() => setScreen("complaintForm")} className="w-full"><Plus size={18} /> Raise New Complaint</Button>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[[Wrench, "Lift"], [AlertTriangle, "Security"], [MessageSquareWarning, "Housekeeping"], [Settings, "Electrical"]].map(([Icon, t]) => (
              <Card key={t} className="p-4"><Icon className="text-blue-600" /><p className="font-bold mt-2">{t}</p></Card>
            ))}
          </div>
          <Card className="p-4 mt-4">
            <div className="flex justify-between">
              <div><p className="font-black">SG-1024 • Lift Issue</p><p className="text-sm text-slate-500">Assigned: Maintenance Team</p></div>
              <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full h-fit">In Progress</span>
            </div>
          </Card>
          {complaintRaised && <Card className="p-4 mt-3 border-emerald-200 bg-emerald-50"><p className="font-black">SG-1031 • Water Leakage</p><p className="text-sm text-slate-500">Status: New • Assigned soon</p></Card>}
        </div>
      </PhoneShell>
    );
  }

  if (screen === "complaintForm") {
    return (
      <PhoneShell>
        <div className="h-full p-5 overflow-y-auto sg-scroll">
          <HeaderBack title="New Complaint" subtitle="Demo ticket creation" onBack={() => setScreen("complaints")} />
          <div className="space-y-3">
            <input className="w-full rounded-2xl border p-4" defaultValue="Water Leakage" />
            <textarea className="w-full rounded-2xl border p-4 h-28" defaultValue="Water leakage near parking area B2." />
            <Button onClick={() => { setComplaintRaised(true); addLog("Resident raised complaint SG-1031"); notify("Complaint SG-1031 created"); setScreen("complaints"); }} className="w-full">
              <Send size={18} /> Submit Complaint
            </Button>
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screen === "preapprove") {
    return (
      <PhoneShell>
        <div className="h-full p-5 overflow-y-auto sg-scroll">
          <HeaderBack title="Pre-Approve Visitor" subtitle="Create instant gate approval" onBack={() => setScreen("dashboard")} />
          <Card className="p-4 bg-blue-50 border-blue-100">
            <p className="font-black text-blue-900">Resident Convenience</p>
            <p className="text-sm text-slate-600 mt-1">Pre-approved visitors can be verified at the gate without waiting for a new approval call.</p>
          </Card>

          <div className="space-y-3 mt-4">
            <div>
              <label className="text-xs text-slate-500">Visitor Name</label>
              <input className="mt-1 w-full rounded-2xl border border-slate-200 p-4 outline-none text-slate-900" value={preApprovalForm.name} onChange={(e) => setPreApprovalForm((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-slate-500">Mobile Number</label>
              <input className="mt-1 w-full rounded-2xl border border-slate-200 p-4 outline-none text-slate-900" value={preApprovalForm.mobile} onChange={(e) => setPreApprovalForm((p) => ({ ...p, mobile: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-slate-500">Purpose</label>
              <input className="mt-1 w-full rounded-2xl border border-slate-200 p-4 outline-none text-slate-900" value={preApprovalForm.purpose} onChange={(e) => setPreApprovalForm((p) => ({ ...p, purpose: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-slate-500">Expected Arrival</label>
              <input className="mt-1 w-full rounded-2xl border border-slate-200 p-4 outline-none text-slate-900" value={preApprovalForm.arrival} onChange={(e) => setPreApprovalForm((p) => ({ ...p, arrival: e.target.value }))} />
            </div>
            <Button onClick={createPreApproval} className="w-full" variant="success">
              <BadgeCheck size={18} /> Generate Pre-Approval Pass
            </Button>
          </div>

          {lastPreApproval && (
            <Card className="p-5 mt-5 bg-gradient-to-r from-emerald-50 to-cyan-50 border-emerald-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-600 shrink-0" size={30} />
                <div>
                  <p className="font-black text-emerald-900">Visitor Pre-Approved</p>
                  <p className="text-sm text-slate-700 mt-1">{lastPreApproval.name} • {lastPreApproval.flat}</p>
                  <p className="text-xs text-slate-500 mt-1">{lastPreApproval.purpose} • Arrival: {lastPreApproval.arrival}</p>
                  <p className="mt-3 rounded-2xl bg-white border border-emerald-100 px-4 py-3 text-center font-black text-slate-950">{lastPreApproval.passId}</p>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4 mt-5">
            <h3 className="font-black text-slate-950">Today’s Pre-Approvals</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {Object.values(preApprovedVisitors).length ? Object.values(preApprovedVisitors).slice(0, 4).map((p) => (
                <div key={p.id} className="rounded-2xl bg-slate-50 p-3">
                  <b>{p.name}</b> • {p.mobile}<br />
                  <span className="text-xs">{p.purpose} • {p.arrival}</span>
                </div>
              )) : <p>No pre-approved visitors yet.</p>}
            </div>
          </Card>
        </div>
      </PhoneShell>
    );
  }

  if (screen === "notices") {
    return (
      <PhoneShell>
        <div className="h-full p-5 overflow-y-auto sg-scroll">
          <HeaderBack title="Notice Board" subtitle="Society announcements" onBack={() => setScreen("dashboard")} />

          <Card className="p-4 bg-blue-50 border-blue-100">
            <div className="flex gap-3">
              <Megaphone className="text-blue-600 shrink-0" size={26} />
              <div>
                <p className="font-black text-blue-900">Society Notices</p>
                <p className="text-sm text-slate-600 mt-1">{unreadNoticeCount} unread of {notices.length} notice(s)</p>
              </div>
            </div>
          </Card>

          <div className="mt-4 space-y-3">
            {notices.length ? notices.map((n) => {
              const isUnread = !seenNoticeIds.includes(n.id);
              return (
                <Card key={n.id} className={`p-4 ${isUnread ? "border-blue-200 bg-blue-50" : ""}`}>
                  <div className="flex gap-3">
                    <Megaphone className={isUnread ? "text-blue-600 shrink-0" : "text-slate-500 shrink-0"} size={22} />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-black text-slate-950">{n.title}</p>
                        {isUnread && <span className="text-[10px] rounded-full bg-blue-600 text-white px-2 py-1 font-bold">NEW</span>}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{n.body}</p>
                      <p className="text-xs text-slate-400 mt-2">{n.category} • {n.createdBy} • {n.createdAt}</p>
                      {isUnread && (
                        <Button onClick={() => markNoticeRead(n.id)} variant="ghost" className="mt-3 py-2 text-xs">
                          <CheckCircle2 size={14} /> Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            }) : <Card className="p-4"><p className="text-sm text-slate-500">No notices available.</p></Card>}
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screen === "polls") {
    return (
      <PhoneShell>
        <div className="h-full p-5 overflow-y-auto sg-scroll">
          <HeaderBack title="Community Polls" subtitle="Vote and view live results" onBack={() => setScreen("dashboard")} />

          <Card className="p-4 bg-emerald-50 border-emerald-100">
            <div className="flex gap-3">
              <BarChart3 className="text-emerald-600 shrink-0" size={26} />
              <div>
                <p className="font-black text-emerald-900">Community Decisions</p>
                <p className="text-sm text-slate-600 mt-1">{pendingPollCount} pending vote(s)</p>
              </div>
            </div>
          </Card>

          <div className="mt-4 space-y-3">
            {communityPolls.length ? communityPolls.map((poll) => {
              const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0) || 1;
              return (
                <Card key={poll.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-black text-slate-950">{poll.question}</p>
                      <p className="text-xs text-slate-400 mt-1">{poll.status} • {poll.createdBy}</p>
                    </div>
                    {!poll.votedOption && <span className="text-[10px] rounded-full bg-emerald-600 text-white px-2 py-1 font-bold">VOTE</span>}
                  </div>

                  <div className="mt-3 space-y-2">
                    {poll.options.map((opt) => {
                      const percent = Math.round((opt.votes / totalVotes) * 100);
                      return (
                        <button
                          key={opt.label}
                          onClick={() => voteCommunityPoll(poll.id, opt.label)}
                          className={`w-full rounded-2xl border p-3 text-left active:scale-[0.99] transition ${poll.votedOption === opt.label ? "bg-emerald-100 border-emerald-300" : "bg-white border-slate-200 hover:bg-slate-50"}`}
                        >
                          <div className="flex justify-between text-sm">
                            <b>{opt.label}</b>
                            <span>{percent}%</span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${percent}%` }} />
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{opt.votes} vote(s)</p>
                        </button>
                      );
                    })}
                  </div>
                  {poll.votedOption && <p className="text-xs text-emerald-700 font-bold mt-3">You voted: {poll.votedOption}. Tap another option to change your vote.</p>}
                </Card>
              );
            }) : <Card className="p-4"><p className="text-sm text-slate-500">No active polls.</p></Card>}
          </div>
        </div>
      </PhoneShell>
    );
  }

  if (screen === "sos") {
    return (
      <PhoneShell>
        <div className="h-full p-5 flex flex-col justify-center text-center">
          <Siren className={`mx-auto ${activeSosAlert ? "text-red-600 animate-pulse" : "text-red-500"}`} size={88} />
          <h2 className="text-3xl font-black mt-5">Emergency SOS</h2>
          <p className="text-slate-500 mt-2">{activeSosAlert ? "Active SOS already sent to guard and admin." : "This will alert guard, admin, and emergency contacts."}</p>
          {activeSosAlert && (
            <Card className="mt-6 p-4 bg-red-50 border-red-200 text-left">
              <p className="font-black text-red-700">Active Emergency</p>
              <p className="text-sm text-slate-700 mt-1">{activeSosAlert.message}</p>
              <p className="text-xs text-slate-500 mt-1">{activeSosAlert.flat} • {activeSosAlert.triggeredAt}</p>
            </Card>
          )}
          {!activeSosAlert ? (
            <Button onClick={triggerSosAlert} variant="danger" className="w-full mt-8"><Siren size={18} /> Send SOS Alert</Button>
          ) : (
            <Button onClick={resolveResidentSos} variant="success" className="w-full mt-8"><CheckCircle2 size={18} /> Mark SOS Resolved</Button>
          )}
          <Button onClick={() => setScreen("dashboard")} variant="ghost" className="w-full mt-3">Back</Button>
        </div>
      </PhoneShell>
    );
  }

  return (
    <PhoneShell>
      <div className="h-full bg-slate-50 flex flex-col relative">
        <div className="flex-1 overflow-y-auto sg-scroll p-5 pb-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-slate-500">Good Morning</p><h2 className="text-2xl font-black text-slate-950">Jagmeet</h2><p className="text-xs text-slate-500">Flat A-1204</p></div>
            <button onClick={() => activeVisitor?.status === "pending" ? setShowPopup(true) : notify("No pending visitor approval")} className="relative h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Bell className="text-blue-600" />
              {activeVisitor?.status === "pending" && <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 animate-pulse" />}
            </button>
          </div>

          <button onClick={() => setScreen("sos")} className="mt-5 w-full text-left rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-500 p-5 text-white shadow-xl shadow-blue-100 active:scale-[0.99]">
            <div className="flex justify-between items-center"><div><p className="text-sm text-blue-100">Emergency Ready</p><h3 className="text-xl font-black mt-1">Your society is secure</h3></div><Siren size={36} /></div>
          </button>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <DashboardCard Icon={UserCheck} title="Visitors" sub={activeVisitor ? activeVisitor.status : "All clear"} urgent={activeVisitor?.status === "pending"} onClick={() => activeVisitor?.status === "pending" ? setShowPopup(true) : notify("No pending visitor approval")} />
            <DashboardCard Icon={BadgeCheck} title="Pre-Approve" sub={`${Object.keys(preApprovedVisitors).length} active`} onClick={() => setScreen("preapprove")} />
            <DashboardCard Icon={Wallet} title="Bills" sub={residentCurrentBill.status === "paid" ? "All paid" : `₹${residentCurrentBill.amount.toLocaleString("en-IN")} due`} urgent={residentCurrentBill.status !== "paid"} onClick={() => setScreen("bills")} />
            <DashboardCard Icon={MessageSquareWarning} title="Complaints" sub={complaintRaised ? "2 active" : "1 active"} onClick={() => setScreen("complaints")} />
            <DashboardCard Icon={Megaphone} title="Notices" sub={`${unreadNoticeCount} unread`} urgent={unreadNoticeCount > 0} onClick={() => setScreen("notices")} />
            <DashboardCard Icon={BarChart3} title="Polls" sub={`${pendingPollCount} pending`} urgent={pendingPollCount > 0} onClick={() => setScreen("polls")} />
            <DashboardCard Icon={Siren} title="SOS" sub={activeSosAlert ? "Active emergency" : "Emergency ready"} urgent={!!activeSosAlert} onClick={() => setScreen("sos")} />
          </div>

          <Card className="mt-5 p-4 shadow-md border-slate-200">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-start">
                {latest?.photoUrl ? (
                  <img src={latest.photoUrl} alt="Visitor" className="h-12 w-12 rounded-2xl object-cover border border-blue-200" />
                ) : latest ? (
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white flex items-center justify-center font-black">
                    {initials(latest.name)}
                  </div>
                ) : null}
                <div>
                  <p className="text-sm text-slate-500">Visitor activity</p>
                  <h3 className="font-black mt-1 text-slate-950">{latest ? latest.name : "No visitor yet"}</h3>
                  <p className="text-xs text-slate-600">{latest ? `${latest.purpose} • ${latest.gate}` : "No active request"}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {latest ? (latest.exitTime !== "--" ? `Exit: ${latest.exitTime}` : latest.entryTime !== "--" ? `Entered: ${latest.entryTime}` : latest.approvedAt !== "--" ? `Approved: ${latest.approvedAt}` : latest.status) : "All clear"}
                  </p>
                </div>
              </div>
              <span className={`text-xs rounded-full px-3 py-1 ${residentDisplayBadge(latest?.status)}`}>{residentDisplayStatus(latest?.status)}</span>
            </div>

            {latest && latest.faceVerified && (
              <div className="mt-4 rounded-2xl bg-blue-50 border border-blue-100 p-3 text-sm">
                <p className="font-bold text-blue-900">AI Verified Visitor</p>
                <p className="text-slate-600">Face Match: {latest.faceConfidence} • Risk Score: {latest.riskScore}%</p>
              </div>
            )}

            {latest && ["approved", "inside"].includes(latest.status) && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button onClick={callVisitor} variant="ghost" className="py-2 text-sm">
                  <PhoneCall size={15} /> Call Visitor
                </Button>
                <Button onClick={wrongEntry} variant="danger" className="py-2 text-sm">
                  Wrong Entry
                </Button>
              </div>
            )}

            {latest && ["exited", "auto closed", "wrong entry"].includes(latest.status) && (
              <div className="grid grid-cols-1 gap-2 mt-4">
                <Button onClick={callVisitor} variant="ghost" className="py-2 text-sm">
                  <PhoneCall size={15} /> Call Visitor
                </Button>
              </div>
            )}

            {activeVisitor?.status === "pending" && <Button onClick={() => setShowPopup(true)} className="w-full mt-4">Review Visitor Request</Button>}
          </Card>

          <Card className="mt-4 p-4">
            <h3 className="font-black text-slate-950">Resident Live Feed</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {visitorHistory.length ? visitorHistory.slice(0, 3).map((v) => (
                <div key={v.id}>• {v.name}: {residentDisplayStatus(v.status)}{v.entryTime !== "--" ? ` • Entry ${v.entryTime}` : ""}{v.exitTime !== "--" ? ` • Exit ${v.exitTime}` : ""}</div>
              )) : <p>No visitor activity yet.</p>}
            </div>
          </Card>
        </div>

        <div className="shrink-0 bg-slate-950 border-t border-slate-800 px-3 py-3 flex justify-around text-slate-300 shadow-2xl">
          {[[Home, "dashboard", "Home"], [Megaphone, "notices", "Notices"], [BarChart3, "polls", "Polls"], [Wallet, "bills", "Bills"], [MessageSquareWarning, "complaints", "Complaints"]].map(([Icon, target, label], i) => (
            <button key={target} onClick={() => setScreen(target)} className="flex flex-col items-center gap-1 min-w-12">
              <Icon size={22} className={i === 0 ? "text-blue-400" : "text-slate-300"} />
              <span className={`text-[10px] font-semibold ${i === 0 ? "text-blue-400" : "text-slate-300"}`}>{label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence>
          {latestUnreadNotice && screen === "dashboard" && (
            <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} className="absolute inset-x-4 top-6 rounded-3xl bg-white shadow-2xl border-2 border-blue-100 p-5 z-40">
              <div className="flex justify-between">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">New Notice</p>
                <button onClick={() => markNoticeRead(latestUnreadNotice.id)}><X size={18} /></button>
              </div>
              <h3 className="text-xl font-black mt-2">{latestUnreadNotice.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{latestUnreadNotice.body}</p>
              <div className="grid grid-cols-2 gap-2 mt-5">
                <Button onClick={() => openNoticeFromPopup(latestUnreadNotice.id)} className="py-3">View Notice</Button>
                <Button onClick={() => markNoticeRead(latestUnreadNotice.id)} variant="ghost" className="py-3">Later</Button>
              </div>
            </motion.div>
          )}

          {!latestUnreadNotice && latestPendingPoll && screen === "dashboard" && (
            <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} className="absolute inset-x-4 top-6 rounded-3xl bg-white shadow-2xl border-2 border-emerald-100 p-5 z-40">
              <div className="flex justify-between">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">New Community Poll</p>
                <button onClick={() => setDismissedPollIds((prev) => Array.from(new Set([...prev, latestPendingPoll.id])))}><X size={18} /></button>
              </div>
              <h3 className="text-xl font-black mt-2">{latestPendingPoll.question}</h3>
              <p className="text-sm text-slate-600 mt-1">Your vote helps the society committee make better decisions.</p>
              <div className="grid grid-cols-2 gap-2 mt-5">
                <Button onClick={() => openPollFromPopup(latestPendingPoll.id)} variant="success" className="py-3">Vote Now</Button>
                <Button onClick={() => setDismissedPollIds((prev) => Array.from(new Set([...prev, latestPendingPoll.id])))} variant="ghost" className="py-3">Later</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPopup && activeVisitor?.status === "pending" && (
            <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} className="absolute inset-x-4 top-6 rounded-3xl bg-white shadow-2xl border-2 border-blue-100 p-5 z-40">
              <div className="flex justify-between"><p className="text-xs font-bold text-blue-600 uppercase tracking-wide">New Visitor Notification</p><button onClick={() => setShowPopup(false)}><X size={18} /></button></div>
              <h3 className="text-xl font-black mt-2">{activeVisitor.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{activeVisitor.purpose} • {activeVisitor.flat} • {activeVisitor.requestTime}</p>
              {(activeVisitor?.blacklisted || activeVisitor?.suspicious) && (
                <div className="mt-4 rounded-2xl bg-red-50 border border-red-200 p-4">
                  <div className="flex gap-3">
                    <ShieldAlert className="text-red-600 shrink-0" size={24} />
                    <div>
                      <p className="font-black text-red-700">Security Warning</p>
                      <p className="text-sm text-red-700 mt-1">{activeVisitor.blacklisted ? "Visitor appears on watchlist." : activeVisitor.suspiciousType}</p>
                      <p className="text-xs text-red-600 mt-1">Risk Score: {activeVisitor.riskScore}% • {activeVisitor.securityRecommendation || "Security verification recommended"}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 mt-5">
                <Button onClick={approve} variant="success" className="py-3">Approve</Button>
                <Button onClick={reject} variant="danger" className="py-3">Reject</Button>
                <Button onClick={callVisitor} variant="ghost" className="py-3"><PhoneCall size={17} /></Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PhoneShell>
  );
}

function GuardApp({ activeVisitor, setActiveVisitor, saveVisitor, activeVehicle, setActiveVehicle, saveVehicle, knownVisitors = {}, setKnownVisitors, visitorAttempts = {}, setVisitorAttempts, knownVehicles = {}, setKnownVehicles, preApprovedVisitors = {}, sosAlerts = [], resetSerial, addLog, notify }) {
  const [screen, setScreen] = useState("login");
  const [visitorForm, setVisitorForm] = useState({
    name: "Ramesh Kumar",
    mobile: "9998887776",
    flat: "A-1204",
    purpose: "Food Delivery",
    gate: "Main Gate",
  });
  const [vehicleForm, setVehicleForm] = useState({
    number: "MH 12 AB 4587",
    flat: "B-804",
    purpose: "Guest Parking",
    gate: "Main Gate",
  });
  const [autoCloseSeconds, setAutoCloseSeconds] = useState(40);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [cameraFacing, setCameraFacing] = useState("environment");
  const activeGuardSosAlert = sosAlerts.find((s) => s.status === "active");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const normalizedVehicleNumber = normalizeVehicleNumber(vehicleForm.number);
  const knownVehicleProfile =
    normalizedVehicleNumber.length >= 6 &&
    knownVehicles?.[normalizedVehicleNumber]?.completedProfile === true
      ? knownVehicles[normalizedVehicleNumber]
      : undefined;

  const vehicleSecurityRisk = getVehicleSecurityRisk(vehicleForm.number);
  const isWatchlistVehicle = vehicleSecurityRisk.watchlisted;

  const normalizedVisitorMobile = normalizeMobile(visitorForm.mobile);
  const knownProfile =
    normalizedVisitorMobile.length === 10 &&
    knownVisitors?.[normalizedVisitorMobile]?.completedProfile === true
      ? knownVisitors[normalizedVisitorMobile]
      : undefined;

  const preApprovedProfile =
    normalizedVisitorMobile.length === 10 &&
    preApprovedVisitors?.[normalizedVisitorMobile]
      ? preApprovedVisitors[normalizedVisitorMobile]
      : undefined;

  const isCurrentDraftVisitor =
    activeVisitor?.status === "draft" &&
    normalizeMobile(activeVisitor?.mobile) === normalizedVisitorMobile;

  const showCurrentFaceCard =
    activeVisitor?.photoCaptured === true &&
    isCurrentDraftVisitor;

  const securityRisk = getSecurityRisk(visitorForm.mobile);
  const isBlacklistedVisitor = securityRisk.blacklisted;

  const currentAttemptProfile = visitorAttempts?.[normalizedVisitorMobile];
  const attemptedFlats = currentAttemptProfile?.flats || [];
  const rejectedFlats = currentAttemptProfile?.rejectedFlats || [];
  const isMultipleFlatAttempt =
    normalizedVisitorMobile.length === 10 &&
    attemptedFlats.length > 0 &&
    !attemptedFlats.includes(visitorForm.flat);
  const isRejectedRetry =
    normalizedVisitorMobile.length === 10 &&
    rejectedFlats.length > 0;

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const isMobileDevice = () =>
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "");

  const startCamera = async (facingMode = cameraFacing) => {
    setCameraError("");
    stopCamera();

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Camera is not supported in this browser.");
        setCameraOpen(true);
        return;
      }

      const preferredFacing = isMobileDevice() ? facingMode : "user";

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: preferredFacing } },
          audio: false,
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      streamRef.current = stream;
      setCameraFacing(preferredFacing);
      setCameraOpen(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    } catch {
      setCameraError("Camera permission denied or camera not available.");
      setCameraOpen(true);
    }
  };

  const openCamera = async () => {
    await startCamera(isMobileDevice() ? "environment" : "user");
  };

  const flipCamera = async () => {
    await startCamera(cameraFacing === "environment" ? "user" : "environment");
  };

  const closeCamera = () => {
    stopCamera();
    setCameraOpen(false);
  };

  const takeSnapshot = () => {
    const video = videoRef.current;

    if (!video || !video.videoWidth) {
      setCameraError("Camera preview not ready. Please try again.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const photoUrl = canvas.toDataURL("image/png");
    captureFaceDemo(photoUrl);
    closeCamera();
  };


  const captureFaceDemo = (photoUrl = "") => {
    const mobileKey = normalizeMobile(visitorForm.mobile);
    const draft = {
      id: Date.now(),
      name: visitorForm.name,
      mobile: mobileKey,
      flat: visitorForm.flat,
      purpose: visitorForm.purpose,
      gate: visitorForm.gate,
      status: "draft",
      requestTime: "11:45 AM",
      approvedBy: "--",
      approvedAt: "--",
      entryTime: "--",
      exitTime: "--",
      passId: `SG-${Date.now().toString().slice(-5)}`,
      photoCaptured: true,
      photoUrl,
      faceVerified: true,
      faceConfidence: "98%",
      faceType: securityRisk.blacklisted
        ? "Blacklisted Visitor"
        : isMultipleFlatAttempt
        ? "Suspicious Visitor"
        : isRejectedRetry
        ? "Previously Rejected Visitor"
        : preApprovedProfile
        ? "Trusted Pre-Approved Visitor"
        : "First Time Visitor",
      riskScore: securityRisk.blacklisted ? securityRisk.riskScore : isMultipleFlatAttempt ? 75 : isRejectedRetry ? 65 : preApprovedProfile ? 5 : 30,
      riskLabel: securityRisk.blacklisted ? securityRisk.riskLabel : isMultipleFlatAttempt ? "High Risk" : isRejectedRetry ? "Medium Risk" : preApprovedProfile ? "Very Low Risk" : "Medium Risk",
      preApproved: !!preApprovedProfile,
      preApprovalPassId: preApprovedProfile?.passId || "",
      blacklisted: securityRisk.blacklisted,
      suspicious: isMultipleFlatAttempt || isRejectedRetry,
      suspiciousType: isMultipleFlatAttempt ? "Multiple Flat Attempts" : isRejectedRetry ? "Rejected Visitor Retry" : "",
      attemptedFlats,
      rejectedFlats,
      securityReason: securityRisk.blacklisted
        ? securityRisk.securityReason
        : isMultipleFlatAttempt
        ? `Visitor already attempted ${attemptedFlats.join(", ")} and is now trying ${visitorForm.flat}`
        : isRejectedRetry
        ? `Visitor was previously rejected for ${rejectedFlats.join(", ")}`
        : "",
      securityRecommendation: securityRisk.blacklisted
        ? securityRisk.securityRecommendation
        : isMultipleFlatAttempt || isRejectedRetry
        ? "Security verification recommended"
        : "",
    };

    setActiveVisitor(draft);
    addLog(`AI Face Recognition completed for ${draft.name}: 98% confidence, Medium Risk`);
    notify(photoUrl ? "Photo captured and face verified" : "Face captured and verified");
  };


  const applyKnownVisitorProfile = () => {
    const profile = knownProfile;
    const profileSecurityRisk = getSecurityRisk(profile?.mobile || visitorForm.mobile);
    const profileBlacklisted = profileSecurityRisk.blacklisted;
    if (!profile) {
      notify("No saved visitor profile found for this mobile");
      return;
    }

    const updatedDraft = {
      id: Date.now(),
      name: profile.name || visitorForm.name,
      mobile: profile.mobile || normalizeMobile(visitorForm.mobile),
      flat: profile.flat || visitorForm.flat,
      purpose: profile.purpose || visitorForm.purpose,
      gate: profile.gate || visitorForm.gate,
      status: "draft",
      requestTime: "11:45 AM",
      approvedBy: "--",
      approvedAt: "--",
      entryTime: "--",
      exitTime: "--",
      passId: `SG-${Date.now().toString().slice(-5)}`,
      photoCaptured: true,
      photoUrl: profile.photoUrl || "",
      faceVerified: true,
      faceConfidence: profile.faceConfidence || "98%",
      faceType: profileBlacklisted ? "Blacklisted Visitor" : "Known Visitor",
      riskScore: profileBlacklisted ? 95 : profile.riskScore || 10,
      riskLabel: profileBlacklisted ? "High Risk" : profile.riskLabel || "Low Risk",
      blacklisted: profileBlacklisted,
      securityReason: profileSecurityRisk.securityReason,
      securityRecommendation: profileSecurityRisk.securityRecommendation,
      repeatVisitor: true,
    };

    setVisitorForm((prev) => ({
      ...prev,
      name: updatedDraft.name,
      mobile: updatedDraft.mobile,
      flat: updatedDraft.flat,
      purpose: updatedDraft.purpose,
      gate: updatedDraft.gate,
    }));

    setActiveVisitor(updatedDraft);
    addLog(`Known visitor auto-fetched by mobile ${normalizeMobile(visitorForm.mobile)}: ${updatedDraft.name}`);
    notify("Known visitor profile auto-fetched");
  };

  const saveCompletedKnownVisitorProfile = (visitor) => {
    const mobileKey = normalizeMobile(visitor?.mobile);
    if (!visitor?.faceVerified || mobileKey.length !== 10) return;

    setKnownVisitors((prev) => ({
      ...prev,
      [mobileKey]: {
        name: visitor.name,
        mobile: mobileKey,
        flat: visitor.flat,
        purpose: visitor.purpose,
        gate: visitor.gate,
        faceConfidence: visitor.faceConfidence || "98%",
        photoUrl: visitor.photoUrl || "",
        faceType: "Known Visitor",
        riskScore: 10,
        riskLabel: "Low Risk",
        completedProfile: true,
      },
    }));

    if (visitor.blacklisted) {
      addLog(`🚨 Blacklisted visitor detected: ${visitor.name} (${mobileKey}) • Risk Score 95%`);
    } else if (visitor.suspicious) {
      addLog(`⚠ Suspicious visitor activity: ${visitor.name} (${mobileKey}) • ${visitor.suspiciousType || "Security verification recommended"}`);
    } else {
      addLog(`Known visitor profile saved for ${visitor.name} (${mobileKey})`);
    }
  };

  useEffect(() => {
    if (screen !== "add" || !knownProfile) return;
    if (activeVisitor?.repeatVisitor && normalizeMobile(activeVisitor?.mobile) === normalizedVisitorMobile) return;

    const autoSecurityRisk = getSecurityRisk(knownProfile?.mobile || visitorForm.mobile);
    const autoBlacklisted = autoSecurityRisk.blacklisted;

    const updatedDraft = {
      id: Date.now(),
      name: knownProfile.name || visitorForm.name,
      mobile: knownProfile.mobile || normalizedVisitorMobile,
      flat: knownProfile.flat || visitorForm.flat,
      purpose: knownProfile.purpose || visitorForm.purpose,
      gate: knownProfile.gate || visitorForm.gate,
      status: "draft",
      requestTime: "11:45 AM",
      approvedBy: "--",
      approvedAt: "--",
      entryTime: "--",
      exitTime: "--",
      passId: `SG-${Date.now().toString().slice(-5)}`,
      photoCaptured: true,
      photoUrl: knownProfile.photoUrl || "",
      faceVerified: true,
      faceConfidence: knownProfile.faceConfidence || "98%",
      faceType: autoBlacklisted ? "Blacklisted Visitor" : "Known Visitor",
      riskScore: autoBlacklisted ? 95 : knownProfile.riskScore || 10,
      riskLabel: autoBlacklisted ? "High Risk" : knownProfile.riskLabel || "Low Risk",
      blacklisted: autoBlacklisted,
      securityReason: autoSecurityRisk.securityReason,
      securityRecommendation: autoSecurityRisk.securityRecommendation,
      repeatVisitor: true,
    };

    setVisitorForm((prev) => ({
      ...prev,
      name: updatedDraft.name,
      mobile: updatedDraft.mobile,
      flat: updatedDraft.flat,
      purpose: updatedDraft.purpose,
      gate: updatedDraft.gate,
    }));

    setActiveVisitor(updatedDraft);
  }, [screen, normalizedVisitorMobile, knownProfile?.completedProfile]);

  useEffect(() => {
    setScreen("login");
    setActiveVisitor(null);
    stopCamera();
  }, [resetSerial]);

  useEffect(() => {
    if (screen === "visitorPass" && activeVisitor?.status === "inside" && activeVisitor?.purpose.toLowerCase().includes("delivery")) {
      setAutoCloseSeconds(40);
      const timer = setInterval(() => {
        setAutoCloseSeconds((sec) => {
          if (sec <= 1) {
            clearInterval(timer);
            const updated = { ...activeVisitor, status: "auto closed", exitTime: "12:25 PM" };
            setActiveVisitor(updated);
            saveVisitor(updated);
            saveCompletedKnownVisitorProfile(updated);
            addLog(`${updated.name} auto closed by system after demo timer`);
            notify("Delivery auto closed");
            return 0;
          }
          return sec - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [screen, activeVisitor?.id, activeVisitor?.status]);

  const createVisitor = () => {
    const profile = knownProfile;
    const requestSecurityRisk = getSecurityRisk(visitorForm.mobile);
    const requestBlacklisted = requestSecurityRisk.blacklisted;
    const requestPreApprovedProfile = preApprovedVisitors?.[normalizeMobile(visitorForm.mobile)];
    const requestAttemptProfile = visitorAttempts?.[normalizeMobile(visitorForm.mobile)] || { flats: [], rejectedFlats: [] };
    const requestAttemptedFlats = requestAttemptProfile.flats || [];
    const requestRejectedFlats = requestAttemptProfile.rejectedFlats || [];
    const requestMultipleFlatAttempt =
      normalizeMobile(visitorForm.mobile).length === 10 &&
      requestAttemptedFlats.length > 0 &&
      !requestAttemptedFlats.includes(visitorForm.flat);
    const requestRejectedRetry =
      normalizeMobile(visitorForm.mobile).length === 10 &&
      requestRejectedFlats.length > 0;
    const draftSource =
      activeVisitor?.status === "draft" &&
      normalizeMobile(activeVisitor?.mobile) === normalizeMobile(visitorForm.mobile)
        ? activeVisitor
        : null;

    const hasCapturedFace = draftSource?.photoCaptured === true || !!profile;

    const visitor = {
      id: Date.now(),
      ...visitorForm,
      name: profile?.name || draftSource?.name || visitorForm.name,
      mobile: profile?.mobile || draftSource?.mobile || normalizeMobile(visitorForm.mobile),
      flat: profile?.flat || draftSource?.flat || visitorForm.flat,
      purpose: profile?.purpose || draftSource?.purpose || visitorForm.purpose,
      gate: profile?.gate || draftSource?.gate || visitorForm.gate,
      photoCaptured: hasCapturedFace,
      photoUrl: profile?.photoUrl || draftSource?.photoUrl || "",
      faceVerified: hasCapturedFace,
      faceConfidence: hasCapturedFace ? (profile?.faceConfidence || draftSource?.faceConfidence || "98%") : "--",
      faceType: requestBlacklisted
        ? "Blacklisted Visitor"
        : requestMultipleFlatAttempt
        ? "Suspicious Visitor"
        : requestRejectedRetry
        ? "Previously Rejected Visitor"
        : requestPreApprovedProfile
        ? "Trusted Pre-Approved Visitor"
        : profile
        ? "Known Visitor"
        : hasCapturedFace
        ? (draftSource?.faceType || "First Time Visitor")
        : "Not Scanned",
      riskScore: requestBlacklisted ? 95 : requestMultipleFlatAttempt ? 75 : requestRejectedRetry ? 65 : requestPreApprovedProfile ? 5 : profile ? (profile.riskScore || 10) : hasCapturedFace ? (draftSource?.riskScore || 30) : 30,
      riskLabel: requestBlacklisted ? "High Risk" : requestMultipleFlatAttempt ? "High Risk" : requestRejectedRetry ? "Medium Risk" : requestPreApprovedProfile ? "Very Low Risk" : profile ? (profile.riskLabel || "Low Risk") : hasCapturedFace ? (draftSource?.riskLabel || "Medium Risk") : "Medium Risk",
      preApproved: !!requestPreApprovedProfile && !requestBlacklisted,
      preApprovalPassId: requestPreApprovedProfile?.passId || "",
      blacklisted: requestBlacklisted,
      suspicious: requestMultipleFlatAttempt || requestRejectedRetry,
      suspiciousType: requestMultipleFlatAttempt ? "Multiple Flat Attempts" : requestRejectedRetry ? "Rejected Visitor Retry" : "",
      attemptedFlats: requestAttemptedFlats,
      rejectedFlats: requestRejectedFlats,
      securityReason: requestBlacklisted
        ? requestSecurityRisk.securityReason
        : requestMultipleFlatAttempt
        ? `Visitor already attempted ${requestAttemptedFlats.join(", ")} and is now trying ${visitorForm.flat}`
        : requestRejectedRetry
        ? `Visitor was previously rejected for ${requestRejectedFlats.join(", ")}`
        : requestSecurityRisk.securityReason,
      securityRecommendation: requestBlacklisted
        ? requestSecurityRisk.securityRecommendation
        : requestMultipleFlatAttempt || requestRejectedRetry
        ? "Security verification recommended"
        : requestSecurityRisk.securityRecommendation,
      repeatVisitor: !!profile,
      status: requestPreApprovedProfile && !requestBlacklisted ? "approved" : "pending",
      requestTime: "11:45 AM",
      approvedBy: requestPreApprovedProfile && !requestBlacklisted ? requestPreApprovedProfile.approvedBy : "--",
      approvedAt: requestPreApprovedProfile && !requestBlacklisted ? "Pre-approved" : "--",
      entryTime: "--",
      exitTime: "--",
      passId: `SG-${Date.now().toString().slice(-5)}`,
    };

    setActiveVisitor(visitor);
    saveVisitor(visitor);
    if (setVisitorAttempts && normalizeMobile(visitor.mobile).length === 10) {
      setVisitorAttempts((prev) => {
        const key = normalizeMobile(visitor.mobile);
        const existing = prev[key] || { flats: [], rejectedFlats: [] };
        return {
          ...prev,
          [key]: {
            ...existing,
            flats: Array.from(new Set([...(existing.flats || []), visitor.flat])),
            lastName: visitor.name,
            lastFlat: visitor.flat,
          },
        };
      });
    }
    addLog(
      requestBlacklisted
        ? `🚨 Blacklisted visitor approval request: ${visitor.name} (${visitor.mobile}) • Risk Score 95%`
        : visitor.suspicious
        ? `⚠ Suspicious visitor approval request: ${visitor.name} (${visitor.mobile}) • ${visitor.suspiciousType}`
        : requestPreApprovedProfile
        ? `Pre-approved visitor verified at gate: ${visitor.name} (${visitor.mobile}) • ${visitor.preApprovalPassId}`
        : profile
        ? `Known visitor approval request: ${visitor.name} (${visitor.flat})`
        : `Guard sent visitor approval request for ${visitor.name} (${visitor.flat})`
    );
    notify(requestPreApprovedProfile && !requestBlacklisted ? "Pre-approved visitor verified" : profile ? "Known visitor request sent" : "Approval request sent");
    setScreen("waiting");
  };

  const markEntry = () => {
    if (!activeVisitor) return;
    const updated = { ...activeVisitor, status: "inside", entryTime: "11:47 AM" };
    setActiveVisitor(updated);
    saveVisitor(updated);
    addLog(`${updated.name} entered society at ${updated.gate}`);
    setScreen("visitorPass");
  };

  const markExit = () => {
    if (!activeVisitor) return;
    const updated = { ...activeVisitor, status: "exited", exitTime: "12:25 PM" };
    setActiveVisitor(updated);
    saveVisitor(updated);
    saveCompletedKnownVisitorProfile(updated);
    addLog(`${updated.name} exited society at ${updated.gate}`);
    notify("Visitor exit marked");
  };

  const autoCloseNow = () => {
    if (!activeVisitor) return;
    const updated = { ...activeVisitor, status: "auto closed", exitTime: "12:25 PM" };
    setActiveVisitor(updated);
    saveVisitor(updated);
    saveCompletedKnownVisitorProfile(updated);
    addLog(`${updated.name} auto closed manually for demo`);
    notify("Visitor auto closed");
  };

  const saveCompletedKnownVehicleProfile = (vehicle) => {
    const vehicleKey = normalizeVehicleNumber(vehicle?.number);
    if (!vehicleKey || vehicleKey.length < 6) return;

    const vehicleRisk = getVehicleSecurityRisk(vehicleKey);
    setKnownVehicles((prev) => ({
      ...prev,
      [vehicleKey]: {
        number: vehicleKey,
        flat: vehicle.flat,
        purpose: vehicle.purpose,
        gate: vehicle.gate,
        vehicleType: vehicleRisk.watchlisted ? "Watchlist Vehicle" : "Known Vehicle",
        riskScore: vehicleRisk.watchlisted ? 95 : 10,
        riskLabel: vehicleRisk.watchlisted ? "High Risk" : "Low Risk",
        watchlisted: vehicleRisk.watchlisted,
        securityReason: vehicleRisk.securityReason,
        securityRecommendation: vehicleRisk.securityRecommendation,
        completedProfile: true,
      },
    }));
    if (vehicle.watchlisted || vehicleRisk.watchlisted) {
      addLog(`🚨 Watchlist vehicle detected: ${vehicleKey} • Risk Score 95%`);
    } else {
      addLog(`Known vehicle profile saved for ${vehicleKey} (${vehicle.flat})`);
    }
  };

  const applyKnownVehicleProfile = () => {
    const profile = knownVehicleProfile;
    if (!profile) {
      notify("No saved vehicle profile found");
      return;
    }
    setVehicleForm((prev) => ({
      ...prev,
      number: profile.number || prev.number,
      flat: profile.flat || prev.flat,
      purpose: profile.purpose || prev.purpose,
      gate: profile.gate || prev.gate,
    }));
    notify("Known vehicle auto-fetched");
    addLog(`Known vehicle auto-fetched: ${profile.number} for ${profile.flat}`);
  };

  useEffect(() => {
    if (screen !== "vehicle" || !knownVehicleProfile) return;
    setVehicleForm((prev) => ({
      ...prev,
      number: knownVehicleProfile.number || prev.number,
      flat: knownVehicleProfile.flat || prev.flat,
      purpose: knownVehicleProfile.purpose || prev.purpose,
      gate: knownVehicleProfile.gate || prev.gate,
    }));
  }, [screen, normalizedVehicleNumber, knownVehicleProfile?.completedProfile]);

  const createVehicle = () => {
    const vehicleRisk = getVehicleSecurityRisk(vehicleForm.number);
    const vehicleProfile = knownVehicleProfile;
    const vehicle = {
      id: Date.now(),
      ...vehicleForm,
      number: normalizeVehicleNumber(vehicleProfile?.number || vehicleForm.number),
      flat: vehicleProfile?.flat || vehicleForm.flat,
      purpose: vehicleProfile?.purpose || vehicleForm.purpose,
      gate: vehicleProfile?.gate || vehicleForm.gate,
      status: "in",
      inTime: "11:10 AM",
      outTime: "--",
      passId: `VH-${Date.now().toString().slice(-5)}`,
      knownVehicle: !!vehicleProfile && !vehicleRisk.watchlisted,
      watchlisted: vehicleRisk.watchlisted,
      vehicleType: vehicleRisk.watchlisted ? "Watchlist Vehicle" : vehicleProfile ? "Known Vehicle" : "First Time Vehicle",
      riskScore: vehicleRisk.watchlisted ? 95 : vehicleProfile ? 10 : 30,
      riskLabel: vehicleRisk.watchlisted ? "High Risk" : vehicleProfile ? "Low Risk" : "Medium Risk",
      securityReason: vehicleRisk.securityReason,
      securityRecommendation: vehicleRisk.securityRecommendation,
    };
    setActiveVehicle(vehicle);
    saveVehicle(vehicle);
    addLog(
      vehicleRisk.watchlisted
        ? `🚨 Watchlist vehicle entry attempted: ${vehicle.number} for ${vehicle.flat} • Risk Score 95%`
        : vehicleProfile
        ? `Known vehicle entered: ${vehicle.number} for ${vehicle.flat}`
        : `Vehicle ${vehicle.number} entered for ${vehicle.flat}`
    );
    notify(vehicleRisk.watchlisted ? "Watchlist vehicle detected" : vehicleProfile ? "Known vehicle pass created" : "Vehicle pass created");
    setScreen("vehiclePass");
  };

  const markVehicleOut = () => {
    if (!activeVehicle) return;
    const updated = { ...activeVehicle, status: "out", outTime: "12:05 PM" };
    setActiveVehicle(updated);
    saveVehicle(updated);
    saveCompletedKnownVehicleProfile(updated);
    addLog(`Vehicle ${updated.number} marked OUT`);
    notify("Vehicle exit marked");
  };

  if (screen === "login") return (
    <PhoneShell dark>
      <div className="h-full bg-slate-950 text-white p-5 overflow-y-auto sg-scroll">
        <Logo dark />
        <div className="mt-12"><h2 className="text-2xl font-black">Security Login</h2><p className="text-slate-400 text-sm mt-1">Start your gate duty securely.</p></div>
        <div className="mt-8 space-y-4">
          <input className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-4 outline-none" defaultValue="Suresh Yadav" />
          <input className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-4 outline-none" defaultValue="Main Gate" />
          <Button onClick={() => setScreen("dashboard")} className="w-full" variant="success">Start Gate Duty</Button>
        </div>
      </div>
    </PhoneShell>
  );

  if (screen === "add") return (
    <PhoneShell dark>
      <div className="h-full bg-slate-950 text-white p-5 overflow-y-auto sg-scroll relative">
        <HeaderBack title="Add Visitor" subtitle="Create approval request" dark onBack={() => setScreen("dashboard")} />
        <div className="space-y-3">
          <DarkTextInput label="Visitor Name" value={visitorForm.name} onChange={(v) => setVisitorForm((p) => ({ ...p, name: v }))} />
          <DarkTextInput label="Mobile" value={visitorForm.mobile} onChange={(v) => setVisitorForm((p) => ({ ...p, mobile: v }))} />

          {knownProfile?.completedProfile && (
            <Card className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 border-emerald-400/30 text-white shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {knownProfile.photoUrl ? (
                    <img src={knownProfile.photoUrl} alt="Known visitor" className="h-12 w-12 rounded-2xl object-cover border border-emerald-300/40" />
                  ) : (
                    <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center font-black text-emerald-300">
                      {initials(knownProfile.name)}
                    </div>
                  )}
                  <div>
                    <p className={getSecurityRisk(knownProfile.mobile).blacklisted ? "font-black text-red-300" : "font-black text-emerald-300"}>
                      {getSecurityRisk(knownProfile.mobile).blacklisted ? "Known Visitor Found • Watchlist Match" : "Known Visitor Found"}
                    </p>
                    <p className="text-sm text-slate-300">{knownProfile.name} • {knownProfile.flat}</p>
                    <p className={getSecurityRisk(knownProfile.mobile).blacklisted ? "text-xs text-red-200 mt-1" : "text-xs text-cyan-300 mt-1"}>
                      {getSecurityRisk(knownProfile.mobile).blacklisted ? "Blacklisted Visitor • Risk 95%" : `Face Match: ${knownProfile.faceConfidence} • No recapture needed`}
                    </p>
                  </div>
                </div>
                <Button onClick={applyKnownVisitorProfile} variant="success" className="py-2 px-3 text-xs">
                  Auto Fetch
                </Button>
              </div>
            </Card>
          )}

          {preApprovedProfile && !isBlacklistedVisitor && (
            <Card className="p-4 bg-gradient-to-r from-emerald-950 via-slate-950 to-cyan-950 border-emerald-400/30 text-white shadow-xl">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <BadgeCheck className="text-emerald-300" size={24} />
                </div>
                <div>
                  <p className="font-black text-emerald-300">PRE-APPROVED VISITOR</p>
                  <p className="text-sm text-white mt-1">{preApprovedProfile.name} • {preApprovedProfile.flat}</p>
                  <p className="text-xs text-cyan-200 mt-1">Resident approval already granted • Risk Score: 5%</p>
                  <p className="text-xs text-slate-300 mt-1">Pass: {preApprovedProfile.passId} • Arrival: {preApprovedProfile.arrival}</p>
                </div>
              </div>
            </Card>
          )}

          {preApprovedProfile && isBlacklistedVisitor && (
            <Card className="p-4 bg-gradient-to-r from-red-950 via-slate-950 to-red-950 border-red-500/40 text-white shadow-xl shadow-red-950/30">
              <div className="flex items-start gap-3">
                <ShieldAlert className="text-red-300 animate-pulse shrink-0" size={28} />
                <div>
                  <p className="font-black text-red-300">PRE-APPROVAL OVERRIDDEN</p>
                  <p className="text-sm text-white mt-1">Visitor is pre-approved but security watchlist has higher priority.</p>
                  <p className="text-xs text-red-200 mt-1">Final Risk Score: 95% • Reject recommended</p>
                </div>
              </div>
            </Card>
          )}

          {isBlacklistedVisitor && (
            <Card className="p-4 bg-gradient-to-r from-red-950 via-slate-950 to-red-950 border-red-500/40 text-white shadow-xl shadow-red-950/30">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <ShieldAlert className="text-red-300 animate-pulse" size={24} />
                </div>
                <div>
                  <p className="font-black text-red-300">SECURITY ALERT</p>
                  <p className="text-sm text-white mt-1">Blacklisted Visitor Detected</p>
                  <p className="text-xs text-red-200 mt-1">Risk Score: 95% • Approval not recommended</p>
                </div>
              </div>
            </Card>
          )}

          {!isBlacklistedVisitor && (isMultipleFlatAttempt || isRejectedRetry) && (
            <Card className="p-4 bg-gradient-to-r from-amber-950 via-slate-950 to-orange-950 border-amber-500/40 text-white shadow-xl shadow-amber-950/30">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="text-amber-300 animate-pulse" size={24} />
                </div>
                <div>
                  <p className="font-black text-amber-300">SUSPICIOUS ACTIVITY</p>
                  <p className="text-sm text-white mt-1">{isMultipleFlatAttempt ? "Multiple Flat Attempts Detected" : "Previously Rejected Visitor"}</p>
                  <p className="text-xs text-amber-200 mt-1">
                    Risk Score: {isMultipleFlatAttempt ? "75%" : "65%"} • Security verification recommended
                  </p>
                  {attemptedFlats.length > 0 && (
                    <p className="text-xs text-slate-300 mt-1">Previous flats: {attemptedFlats.join(", ")}</p>
                  )}
                </div>
              </div>
            </Card>
          )}

          <DarkTextInput label="Flat No." value={visitorForm.flat} onChange={(v) => setVisitorForm((p) => ({ ...p, flat: v }))} />
          <DarkTextInput label="Purpose" value={visitorForm.purpose} onChange={(v) => setVisitorForm((p) => ({ ...p, purpose: v }))} />
          <button onClick={openCamera} className="rounded-2xl border border-dashed border-slate-700 p-6 text-center text-slate-400 w-full hover:border-cyan-400/60 hover:bg-slate-900 transition">
            <div className="flex items-center justify-center gap-2"><Camera size={20} /> Capture Visitor Image</div>
          </button>

          {showCurrentFaceCard && (
            <Card className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border-cyan-400/30 text-white shadow-xl">
              <div className="flex items-center gap-4">
                {activeVisitor?.photoUrl ? (
                  <img
                    src={activeVisitor.photoUrl}
                    alt="Captured visitor"
                    className="h-16 w-16 rounded-2xl object-cover border border-cyan-300/40"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-2xl font-black">
                    {initials(activeVisitor?.name || visitorForm.name)}
                  </div>
                )}
                <div>
                  <p className="font-black">AI Face Recognition</p>
                  <p className="text-sm text-slate-300">Visitor image captured</p>
                  <p className="text-sm text-cyan-300 font-bold mt-1">Face Match: {activeVisitor?.faceConfidence || "98%"}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
                <div className="rounded-2xl bg-slate-950 p-3">
                  <p className="text-slate-500">Status</p>
                  <b className="text-emerald-300">Verified</b>
                </div>
                <div className="rounded-2xl bg-slate-950 p-3">
                  <p className="text-slate-500">Type</p>
                  <b className="text-cyan-300">{activeVisitor?.faceType || "First Time Visitor"}</b>
                </div>
                <div className="rounded-2xl bg-slate-950 p-3">
                  <p className="text-slate-500">Risk</p>
                  <b className={activeVisitor?.riskScore > 20 ? "text-amber-300" : "text-emerald-300"}>
                    {activeVisitor?.riskScore || 30}%
                  </b>
                </div>
              </div>
            </Card>
          )}

          <AnimatePresence>
            {cameraOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 bg-slate-950/95 p-5 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-cyan-300 font-bold uppercase">Live Camera</p>
                    <h3 className="text-xl font-black text-white">
                      {cameraFacing === "environment" ? "Back Camera" : "Front Camera"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Mobile opens back camera first. Laptop opens front camera.
                    </p>
                  </div>
                  <button onClick={closeCamera} className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                    <X size={18} />
                  </button>
                </div>

                <div className="flex-1 rounded-3xl overflow-hidden border border-cyan-400/30 bg-slate-900 flex items-center justify-center">
                  {cameraError ? (
                    <div className="text-center p-5">
                      <AlertTriangle className="mx-auto text-amber-300" size={42} />
                      <p className="text-white font-bold mt-3">{cameraError}</p>
                      <p className="text-slate-400 text-sm mt-2">You can continue with demo verification.</p>
                    </div>
                  ) : (
                    <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <Button onClick={closeCamera} variant="ghost">Cancel</Button>
                  <Button onClick={flipCamera} variant="navy">Flip</Button>
                  <Button
                    onClick={cameraError ? () => { captureFaceDemo(""); closeCamera(); } : takeSnapshot}
                    variant="success"
                  >
                    <Camera size={16} /> {cameraError ? "Use Demo" : "Snapshot"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button onClick={createVisitor} className="w-full" variant="success">Send Approval Request</Button>
        </div>
      </div>
    </PhoneShell>
  );

  if (screen === "waiting") return (
    <PhoneShell dark>
      <div className="h-full bg-slate-950 text-white p-5 flex flex-col justify-center text-center">
        {activeVisitor?.status === "approved" ? (
          <>
            <CheckCircle2 className="mx-auto text-emerald-400" size={82} />
            <h2 className="text-3xl font-black mt-5">Entry Approved</h2>
            <p className="text-slate-400 mt-2">Gate Pass ID: {activeVisitor.passId}</p>
            <Card className="p-4 mt-7 text-left bg-slate-900 border-slate-800 text-white">
              <p className="font-bold">{activeVisitor.name}</p>
              <p className="text-sm text-slate-400">{activeVisitor.purpose} • {activeVisitor.flat}</p>
            </Card>
            <Button onClick={markEntry} className="mt-8 w-full" variant="success">Allow Entry & View Pass</Button>
          </>
        ) : activeVisitor?.status === "wrong entry" ? (
          <>
            <AlertTriangle className="mx-auto text-red-400" size={82} />
            <h2 className="text-3xl font-black mt-5">Wrong Entry Alert</h2>
            <p className="text-slate-400 mt-2">Resident reported this visitor as wrong entry.</p>
            <Card className="p-4 mt-7 text-left bg-gradient-to-r from-red-950 via-slate-950 to-red-950 border-red-500/30 text-white shadow-xl shadow-red-950/30">
              <p className="font-bold">{activeVisitor.name}</p>
              <p className="text-sm text-red-200">{activeVisitor.purpose} • {activeVisitor.flat}</p>
            </Card>
            <div className="grid grid-cols-2 gap-3 mt-8">
              <Button onClick={() => setScreen("visitorPass")} variant="navy">View Pass</Button>
              <Button onClick={() => setScreen("dashboard")} variant="danger">Close</Button>
            </div>
          </>
        ) : activeVisitor?.status === "rejected" ? (
          <>
            <X className="mx-auto text-red-400" size={82} />
            <h2 className="text-3xl font-black mt-5">Entry Rejected</h2>
            <p className="text-slate-400 mt-2">Resident rejected the visitor request.</p>
            <Button onClick={() => setScreen("dashboard")} className="mt-8 w-full" variant="danger">Close Request</Button>
          </>
        ) : (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="mx-auto h-24 w-24 rounded-full border-4 border-slate-700 border-t-cyan-400" />
            <h2 className="text-2xl font-black mt-7">Waiting for Approval</h2>
            <p className="text-slate-400 mt-2">Request sent to resident of {visitorForm.flat}.</p>
            <Button onClick={() => notify("Calling resident...")} className="mt-8 w-full bg-gradient-to-r from-slate-800 to-slate-900 border border-cyan-400/20 text-white shadow-lg" variant="navy"><PhoneCall size={18} /> Call Resident</Button>
          </>
        )}
      </div>
    </PhoneShell>
  );

  if (screen === "visitorPass") return (
    <PhoneShell dark>
      <div className="h-full bg-slate-950 text-white p-5 overflow-y-auto sg-scroll relative">
        <HeaderBack title="Visitor Pass" subtitle="Approved visitor details" dark onBack={() => setScreen("dashboard")} />
        {activeVisitor && (
          <>
            <Card className="p-5 bg-slate-900 border-slate-800 text-white">
              <div className="flex items-center gap-4">
                {activeVisitor.photoUrl ? (
                  <img
                    src={activeVisitor.photoUrl}
                    alt="Visitor"
                    className="h-16 w-16 rounded-full object-cover border border-cyan-300/40"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-2xl font-black">{initials(activeVisitor.name)}</div>
                )}
                <div>
                  <h3 className="text-xl font-black">{activeVisitor.name}</h3>
                  <p className="text-slate-400 text-sm">{activeVisitor.purpose} • {activeVisitor.flat}</p>
                  <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${activeVisitor.status === "inside" ? "bg-emerald-500/20 text-emerald-300" : activeVisitor.status === "wrong entry" ? "bg-red-500/20 text-red-300" : activeVisitor.status === "auto closed" ? "bg-purple-500/20 text-purple-300" : "bg-slate-700 text-slate-300"}`}>{activeVisitor.status}</span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">Approved By</p><b>{activeVisitor.approvedBy}</b></div>
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">Gate</p><b>{activeVisitor.gate}</b></div>
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">Entry</p><b>{activeVisitor.entryTime}</b></div>
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">Exit</p><b>{activeVisitor.exitTime}</b></div>
              </div>
              <div className="mt-5 rounded-3xl bg-white p-5 text-center text-slate-950">
                <QrCode className="mx-auto" size={82} />
                <p className="font-black mt-2">{activeVisitor.passId}</p>
                <p className="text-xs text-slate-500">Digital visitor pass</p>
              </div>
            </Card>

            <Card className="mt-5 p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 border-blue-400/30 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-white">AI Verification</p>
                  <p className="text-sm text-slate-300">Face recognition and visitor risk analysis</p>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <ShieldCheck className="text-cyan-300" size={30} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
                <div className="rounded-2xl bg-slate-950 p-3">
                  <p className="text-slate-500">Face Match</p>
                  <b className="text-cyan-300">{activeVisitor.faceVerified ? (activeVisitor.faceConfidence || "98%") : "--"}</b>
                </div>
                <div className="rounded-2xl bg-slate-950 p-3">
                  <p className="text-slate-500">Status</p>
                  <b className={activeVisitor.faceVerified ? "text-emerald-300" : "text-amber-300"}>{activeVisitor.faceVerified ? "Verified" : "Pending"}</b>
                </div>
                <div className="rounded-2xl bg-slate-950 p-3">
                  <p className="text-slate-500">Risk</p>
                  <b className={activeVisitor.riskScore > 70 ? "text-red-300" : activeVisitor.riskScore > 30 ? "text-amber-300" : "text-emerald-300"}>{activeVisitor.faceVerified ? (activeVisitor.riskScore || 12) : (activeVisitor.riskScore || 30)}%</b>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3">AI Result: {activeVisitor.faceVerified ? (activeVisitor.faceType || "Known Visitor") : "Not Scanned"} • {activeVisitor.faceVerified ? (activeVisitor.riskLabel || "Low Risk") : (activeVisitor.riskLabel || "Medium Risk")}</p>
              {activeVisitor.preApproved && !activeVisitor.blacklisted && !activeVisitor.suspicious && (
                <div className="mt-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3">
                  <p className="text-sm font-black text-emerald-300">Pre-Approved Visitor</p>
                  <p className="text-xs text-emerald-200 mt-1">Resident approval already granted • Pass ID: {activeVisitor.preApprovalPassId}</p>
                </div>
              )}

              {(activeVisitor.blacklisted || activeVisitor.suspicious) && (
                <div className={`mt-4 rounded-2xl p-3 ${activeVisitor.blacklisted ? "bg-red-500/10 border border-red-500/30" : "bg-amber-500/10 border border-amber-500/30"}`}>
                  <p className={`text-sm font-black ${activeVisitor.blacklisted ? "text-red-300" : "text-amber-300"}`}>{activeVisitor.blacklisted ? "Blacklisted Visitor Alert" : "Suspicious Activity Alert"}</p>
                  <p className={`text-xs mt-1 ${activeVisitor.blacklisted ? "text-red-200" : "text-amber-200"}`}>{activeVisitor.securityReason || "Security verification recommended."}</p>
                </div>
              )}
            </Card>

            {activeVisitor.status === "inside" && activeVisitor.purpose.toLowerCase().includes("delivery") && (
              <Card className="mt-5 p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 border-amber-400/30 text-white shadow-xl shadow-amber-950/30">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-black text-white">Delivery Auto-Close Timer</p>
                    <p className="text-sm text-slate-300">Demo auto-close triggers in 40 seconds.</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-xl font-black shadow-lg">{autoCloseSeconds}s</div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-300 to-orange-400 transition-all" style={{ width: `${(autoCloseSeconds / 40) * 100}%` }} />
                </div>
              </Card>
            )}

            {activeVisitor.status === "inside" ? (
              <div className="grid grid-cols-2 gap-3 mt-5">
                <Button onClick={markExit} variant="success"><LogOut size={16} /> Mark Exit</Button>
                <Button onClick={autoCloseNow} variant="ghost">Auto Close Now</Button>
              </div>
            ) : (
              <GuardStatusCard status={activeVisitor.status} exitTime={activeVisitor.exitTime} />
            )}
          </>
        )}
      </div>
    </PhoneShell>
  );

  if (screen === "vehicle") return (
    <PhoneShell dark>
      <div className="h-full bg-slate-950 text-white p-5 overflow-y-auto sg-scroll">
        <HeaderBack title="Vehicle Entry" subtitle="Create vehicle pass" dark onBack={() => setScreen("dashboard")} />
        <div className="space-y-3">
          <DarkTextInput label="Vehicle Number" value={vehicleForm.number} onChange={(v) => setVehicleForm((p) => ({ ...p, number: v }))} />

          {knownVehicleProfile?.completedProfile && (
            <Card className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 border-emerald-400/30 text-white shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={isWatchlistVehicle ? "font-black text-red-300" : "font-black text-emerald-300"}>{isWatchlistVehicle ? "Known Vehicle Found • Watchlist Match" : "Known Vehicle Found"}</p>
                  <p className="text-sm text-slate-300">{knownVehicleProfile.number} • {knownVehicleProfile.flat}</p>
                  <p className={isWatchlistVehicle ? "text-xs text-red-200 mt-1" : "text-xs text-cyan-300 mt-1"}>{isWatchlistVehicle ? "Watchlist Vehicle • Risk 95%" : "Auto fetch enabled • Low Risk"}</p>
                </div>
                <Button onClick={applyKnownVehicleProfile} variant="success" className="py-2 px-3 text-xs">Auto Fetch</Button>
              </div>
            </Card>
          )}

          {isWatchlistVehicle && (
            <Card className="p-4 bg-gradient-to-r from-red-950 via-slate-950 to-red-950 border-red-500/40 text-white shadow-xl shadow-red-950/30">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-2xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <ShieldAlert className="text-red-300 animate-pulse" size={24} />
                </div>
                <div>
                  <p className="font-black text-red-300">VEHICLE SECURITY ALERT</p>
                  <p className="text-sm text-white mt-1">Watchlist Vehicle Detected</p>
                  <p className="text-xs text-red-200 mt-1">Risk Score: 95% • Security verification required</p>
                </div>
              </div>
            </Card>
          )}

          <DarkTextInput label="Flat No." value={vehicleForm.flat} onChange={(v) => setVehicleForm((p) => ({ ...p, flat: v }))} />
          <DarkTextInput label="Purpose" value={vehicleForm.purpose} onChange={(v) => setVehicleForm((p) => ({ ...p, purpose: v }))} />
          <Button onClick={createVehicle} className="w-full" variant="success">Create Vehicle Pass</Button>
        </div>
      </div>
    </PhoneShell>
  );

  if (screen === "vehiclePass") return (
    <PhoneShell dark>
      <div className="h-full bg-slate-950 text-white p-5 overflow-y-auto sg-scroll">
        <HeaderBack title="Vehicle Pass" subtitle="Vehicle in/out details" dark onBack={() => setScreen("dashboard")} />
        {activeVehicle && (
          <>
            <Card className="p-5 bg-slate-900 border-slate-800 text-white">
              <Car className="text-cyan-300" size={42} />
              <h3 className="text-2xl font-black mt-3">{activeVehicle.number}</h3>
              <p className="text-slate-400 text-sm">{activeVehicle.purpose} • {activeVehicle.flat}</p>
              <span className={`inline-block mt-3 text-xs px-3 py-1 rounded-full ${activeVehicle.status === "out" ? "bg-slate-700 text-slate-300" : "bg-emerald-500/20 text-emerald-300"}`}>{activeVehicle.status === "out" ? "out" : "inside"}</span>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">In Time</p><b>{activeVehicle.inTime}</b></div>
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">Out Time</p><b>{activeVehicle.outTime}</b></div>
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">Gate</p><b>{activeVehicle.gate}</b></div>
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">Pass ID</p><b>{activeVehicle.passId}</b></div>
              </div>
              <div className="mt-5 rounded-3xl bg-white p-5 text-center text-slate-950">
                <QrCode className="mx-auto" size={82} />
                <p className="font-black mt-2">{activeVehicle.passId}</p>
                <p className="text-xs text-slate-500">Vehicle QR pass</p>
              </div>
            </Card>

            <Card className={`mt-5 p-5 text-white shadow-xl ${activeVehicle.watchlisted ? "bg-gradient-to-r from-red-950 via-slate-950 to-red-950 border-red-500/30 shadow-red-950/30" : "bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border-cyan-400/30"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-black text-white">Vehicle Intelligence</p>
                  <p className="text-sm text-slate-300">AI vehicle risk and repeat detection</p>
                </div>
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${activeVehicle.watchlisted ? "bg-red-500/20" : "bg-cyan-500/20"}`}>
                  <Car className={activeVehicle.watchlisted ? "text-red-300" : "text-cyan-300"} size={30} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">Type</p><b className={activeVehicle.watchlisted ? "text-red-300" : "text-cyan-300"}>{activeVehicle.vehicleType || "First Time Vehicle"}</b></div>
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">Risk</p><b className={activeVehicle.riskScore > 70 ? "text-red-300" : activeVehicle.riskScore > 30 ? "text-amber-300" : "text-emerald-300"}>{activeVehicle.riskScore || 30}%</b></div>
                <div className="rounded-2xl bg-slate-950 p-3"><p className="text-slate-500">Status</p><b className={activeVehicle.watchlisted ? "text-red-300" : "text-emerald-300"}>{activeVehicle.watchlisted ? "Watchlist" : "Verified"}</b></div>
              </div>
              {activeVehicle.watchlisted && (
                <div className="mt-4 rounded-2xl bg-red-500/10 border border-red-500/30 p-3">
                  <p className="text-sm font-black text-red-300">Watchlist Vehicle Alert</p>
                  <p className="text-xs text-red-200 mt-1">{activeVehicle.securityReason || "Vehicle is present in watchlist."}</p>
                </div>
              )}
            </Card>

            {activeVehicle.status === "in" ? (
              <Button onClick={markVehicleOut} className="w-full mt-5" variant="success"><LogOut size={16} /> Mark Vehicle Out</Button>
            ) : (
              <VehicleStatusCard outTime={activeVehicle.outTime} />
            )}
          </>
        )}
      </div>
    </PhoneShell>
  );

  if (screen === "qr") return (
    <PhoneShell dark>
      <div className="h-full bg-slate-950 text-white p-5 flex flex-col justify-center text-center">
        <QrCode className="mx-auto text-cyan-300" size={110} />
        <h2 className="text-2xl font-black mt-6">QR Scanner</h2>
        <p className="text-slate-400 mt-2">Demo scanner for pre-approved guests.</p>
        <Button onClick={() => { addLog("QR pass scanned for Priya Sharma guest"); notify("QR pass verified"); setScreen("dashboard"); }} className="w-full mt-8" variant="success">Scan Demo QR</Button>
        <Button onClick={() => setScreen("dashboard")} className="w-full mt-3" variant="ghost">Cancel</Button>
      </div>
    </PhoneShell>
  );

  return (
    <PhoneShell dark>
      <div className="h-full bg-slate-950 text-white p-5 overflow-y-auto sg-scroll">
        <div className="flex justify-between items-center">
          <div><p className="text-emerald-400 text-sm">Online</p><h2 className="text-2xl font-black">Main Gate</h2><p className="text-xs text-slate-400">Suresh Yadav • 8 AM – 8 PM</p></div>
          <ShieldCheck className="text-cyan-300" size={38} />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-8">
          {[[Users, "Add Visitor", () => { setActiveVisitor(null); setScreen("add"); }], [Truck, "Delivery", () => { setActiveVisitor(null); setScreen("add"); }], [Car, "Vehicle", () => setScreen("vehicle")], [QrCode, "Scan QR", () => setScreen("qr")], [PhoneCall, "Call Resident", () => notify("Calling resident...")], [Siren, "Emergency", () => { addLog("Guard triggered emergency alert"); notify("Emergency alert sent"); }]].map(([Icon, title, onClick]) => (
            <button key={title} onClick={onClick} className="rounded-3xl bg-slate-900 border border-slate-800 p-5 h-28 text-left active:scale-[0.98]">
              <Icon className="text-cyan-300" />
              <p className="font-bold mt-4">{title}</p>
            </button>
          ))}
        </div>
        {activeGuardSosAlert && (
          <Card className="p-4 mt-5 bg-gradient-to-r from-red-950 via-slate-950 to-red-950 border-red-500/40 text-white shadow-xl shadow-red-950/30">
            <div className="flex items-start gap-3">
              <Siren className="text-red-300 animate-pulse shrink-0" size={30} />
              <div>
                <p className="font-black text-red-300">EMERGENCY SOS ACTIVE</p>
                <p className="text-sm text-white mt-1">{activeGuardSosAlert.flat} • {activeGuardSosAlert.resident}</p>
                <p className="text-xs text-red-200 mt-1">{activeGuardSosAlert.message}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-3 mt-6">
          <Card className="p-4 bg-slate-900 border-slate-800 text-white"><p className="text-slate-400 text-sm">Visitor Status</p><p className="text-xl font-black mt-1">{activeVisitor?.status || "none"}</p></Card>
          <Card className="p-4 bg-slate-900 border-slate-800 text-white"><p className="text-slate-400 text-sm">Vehicle</p><p className="text-xl font-black mt-1">{activeVehicle?.watchlisted ? "watchlist" : activeVehicle?.knownVehicle ? "known" : activeVehicle?.status || "none"}</p></Card>
        </div>
        {activeVisitor && ["approved", "inside", "exited", "auto closed", "wrong entry"].includes(activeVisitor.status) && (
          <Button onClick={() => activeVisitor.status === "approved" ? setScreen("waiting") : setScreen("visitorPass")} className="w-full mt-5" variant="success">
            {activeVisitor.status === "approved" ? "Allow Entry" : "View Visitor Pass"}
          </Button>
        )}
        {activeVehicle && <Button onClick={() => setScreen("vehiclePass")} className="w-full mt-4" variant="ghost">View Vehicle Pass</Button>}
      </div>
    </PhoneShell>
  );
}

function AdminDashboard({ activeVisitor, setActiveVisitor, visitorHistory, setVisitorHistory, activeVehicle, setActiveVehicle, vehicleHistory, setVehicleHistory, visitorAttempts = {}, knownVehicles = {}, preApprovedVisitors = {}, sosAlerts = [], setSosAlerts, notices = [], setNotices, communityPolls = [], setCommunityPolls, billingLedger = [], setBillingLedger, logs, addLog, notify, billPaid }) {
  const [section, setSection] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [showResidentForm, setShowResidentForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [aiAnswer, setAiAnswer] = useState("Click any AI question to see the answer here.");
  const [newResident, setNewResident] = useState({ flat: "D-1101", name: "Neha Gupta", type: "Owner", due: "₹0", status: "Active" });
  const [newNotice, setNewNotice] = useState({ title: "Festival Celebration", body: "Society cultural evening at clubhouse this Saturday 7 PM.", category: "Event" });
  const [newPoll, setNewPoll] = useState({ question: "Should we extend gym timing?", option1: "Yes", option2: "No", option3: "Weekend Only" });
  const [editingResident, setEditingResident] = useState(null);
  const [residents, setResidents] = useState([
    { flat: "A-1204", name: "Jagmeet Singh", type: "Owner", due: "₹4,500", status: "Active" },
    { flat: "B-804", name: "Priya Sharma", type: "Tenant", due: "₹4,500", status: "Active" },
    { flat: "C-502", name: "Rohit Verma", type: "Owner", due: "₹0", status: "Active" },
  ]);

  const allSecurityVisitors = [
    ...(activeVisitor ? [activeVisitor] : []),
    ...visitorHistory.filter((v) => !activeVisitor || v.id !== activeVisitor.id),
  ];
  const allSecurityVehicles = [
    ...(activeVehicle ? [activeVehicle] : []),
    ...vehicleHistory.filter((v) => !activeVehicle || v.id !== activeVehicle.id),
  ];
  const blacklistedVisitorCount = allSecurityVisitors.filter((v) => v.blacklisted).length;
  const suspiciousVisitorCount = allSecurityVisitors.filter((v) => v.suspicious).length;
  const watchlistVehicleCount = allSecurityVehicles.filter((v) => v.watchlisted).length;
  const totalSecurityAlerts = blacklistedVisitorCount + suspiciousVisitorCount + watchlistVehicleCount;
  const lastSecurityAlert =
    allSecurityVehicles.find((v) => v.watchlisted)?.number ||
    allSecurityVisitors.find((v) => v.blacklisted || v.suspicious)?.name ||
    "None";
  const suspiciousAiAnswer =
    totalSecurityAlerts > 0
      ? `Yes. ${blacklistedVisitorCount} blacklisted visitor(s), ${suspiciousVisitorCount} suspicious visitor attempt(s), and ${watchlistVehicleCount} watchlist vehicle alert(s) detected. Last alert: ${lastSecurityAlert}.`
      : "No critical suspicious activity right now.";
  const knownVehicleCount = Object.keys(knownVehicles || {}).length;
  const activeVehicleCount = allSecurityVehicles.filter((v) => v.status === "in").length;
  const preApprovedCount = Object.keys(preApprovedVisitors || {}).length;
  const trustedVisitorCount = allSecurityVisitors.filter((v) => v.preApproved).length;
  const activeSosCount = sosAlerts.filter((s) => s.status === "active").length;
  const resolvedSosCount = sosAlerts.filter((s) => s.status === "resolved").length;
  const totalSosCount = sosAlerts.length;
  const latestSosAlert = sosAlerts.find((s) => s.status === "active") || sosAlerts[0];
  const noticeCount = notices.length;
  const activePollCount = communityPolls.filter((p) => p.status === "active").length;
  const totalPollVotes = communityPolls.reduce((sum, poll) => sum + poll.options.reduce((s, o) => s + o.votes, 0), 0);
  const totalBilledAmount = billingLedger.reduce((sum, b) => sum + b.amount, 0);
  const collectedBillingAmount = billingLedger.filter((b) => b.status === "paid").reduce((sum, b) => sum + b.amount, 0);
  const pendingBillingAmount = totalBilledAmount - collectedBillingAmount;
  const paidFlatCount = billingLedger.filter((b) => b.status === "paid").length;
  const pendingFlatCount = billingLedger.filter((b) => b.status !== "paid").length;
  const collectionRate = totalBilledAmount ? Math.round((collectedBillingAmount / totalBilledAmount) * 100) : 0;
  const visitorsToday = 42 + visitorHistory.length;
  const collectionTrendData = [
    { month: "Jan", billed: 16500, collected: 13200 },
    { month: "Feb", billed: 17200, collected: 14800 },
    { month: "Mar", billed: 18100, collected: 15900 },
    { month: "Apr", billed: 18800, collected: 17100 },
    { month: "May", billed: 19300, collected: 16500 },
    { month: "Jun", billed: totalBilledAmount, collected: collectedBillingAmount },
  ];
  const maxTrendAmount = Math.max(...collectionTrendData.map((m) => m.billed || 1));
  const visitorTrendData = [
    { day: "Mon", visitors: 24 },
    { day: "Tue", visitors: 31 },
    { day: "Wed", visitors: 28 },
    { day: "Thu", visitors: visitorsToday },
    { day: "Fri", visitors: 36 },
    { day: "Sat", visitors: 51 },
    { day: "Sun", visitors: 33 },
  ];
  const maxVisitorTrend = Math.max(...visitorTrendData.map((d) => d.visitors || 1));
  const collectedAmount = `₹${collectedBillingAmount.toLocaleString("en-IN")}`;
  const pendingAmount = `₹${pendingBillingAmount.toLocaleString("en-IN")}`;
  const overdueFlats = String(pendingFlatCount);
  const menu = [["dashboard", LayoutDashboard, "Dashboard"], ["residents", Building2, "Residents"], ["visitors", Users, "Visitors"], ["billing", ReceiptText, "Billing"], ["complaints", ClipboardList, "Complaints"], ["reports", BarChart3, "Reports"], ["notices", Megaphone, "Notices"], ["polls", BarChart3, "Polls"], ["ai", Bot, "AI Copilot"], ["settings", Settings, "Settings"]];
  const SectionTitle = ({ title, sub }) => <div className="mb-5"><h2 className="text-2xl font-black text-slate-950">{title}</h2><p className="text-sm text-slate-500">{sub}</p></div>;

  const filteredResidents = residents
    .map((r) => r.flat === "A-1204" ? { ...r, due: billPaid ? "₹0" : "₹4,500" } : r)
    .filter((r) => `${r.flat} ${r.name} ${r.type} ${r.due} ${r.status}`.toLowerCase().includes(searchTerm.toLowerCase()));

  const createAdminNotice = () => {
    const notice = {
      id: Date.now(),
      title: newNotice.title || "Society Notice",
      body: newNotice.body || "New society announcement.",
      category: newNotice.category || "General",
      createdBy: "Admin",
      createdAt: "Now",
    };
    if (typeof setNotices === "function") setNotices((prev) => [notice, ...prev]);
    addLog(`Admin published notice: ${notice.title}`);
    notify("Notice published");
  };

  const createAdminPoll = () => {
    const poll = {
      id: Date.now(),
      question: newPoll.question || "Community Poll",
      options: [
        { label: newPoll.option1 || "Yes", votes: 0 },
        { label: newPoll.option2 || "No", votes: 0 },
        { label: newPoll.option3 || "Need Discussion", votes: 0 },
      ],
      votedOption: "",
      status: "active",
      createdBy: "Admin",
      createdAt: "Now",
    };
    if (typeof setCommunityPolls === "function") setCommunityPolls((prev) => [poll, ...prev]);
    addLog(`Admin created community poll: ${poll.question}`);
    notify("Community poll created");
  };

  const resolveSosAlert = (id) => {
    if (typeof setSosAlerts !== "function") return;
    setSosAlerts((prev) => prev.map((s) => s.id === id ? { ...s, status: "resolved", resolvedAt: "Now" } : s));
    addLog("Admin resolved SOS alert");
    notify("SOS alert resolved");
  };

  const updateVisitor = (updated) => {
    setActiveVisitor(updated);
    setVisitorHistory((prev) => [updated, ...prev.filter((v) => v.id !== updated.id)]);
  };
  const updateVehicle = (updated) => {
    setActiveVehicle(updated);
    setVehicleHistory((prev) => [updated, ...prev.filter((v) => v.id !== updated.id)]);
  };

  return (
    <div className="w-full max-w-[1180px] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 bg-white min-h-[640px] flex flex-col lg:flex-row mx-auto">
      <aside className="lg:w-64 bg-slate-950 text-white p-4 lg:p-5">
        <div className="flex items-center justify-between"><Logo dark /><Menu className="lg:hidden text-white" /></div>
        <nav className="mt-5 lg:mt-10 flex lg:block overflow-x-auto gap-2 lg:space-y-2 pb-2 sg-scroll">
          {menu.map(([key, Icon, text]) => (
            <button key={key} onClick={() => setSection(key)} className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 transition ${section === key ? (key === "ai" ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-cyan-900/30" : "bg-blue-600") : "text-slate-300 hover:bg-slate-900"}`}>
              {key === "ai" ? (
                <span className="relative flex items-center">
                  <Sparkles size={18} className="text-cyan-200 animate-pulse" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-cyan-300 animate-ping" />
                </span>
              ) : (
                <Icon size={18} />
              )}{text}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-slate-50 p-4 sm:p-6 overflow-y-auto sg-scroll max-h-[760px] lg:max-h-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div><h1 className="text-2xl sm:text-3xl font-black text-slate-950">Green Meadows Society</h1><p className="text-slate-500">Admin ERP Dashboard</p></div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-white border border-slate-100 px-4 py-3 flex items-center gap-2 text-slate-500">
              <Search size={18} /><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search residents..." className="outline-none bg-transparent w-36 text-sm" />
            </div>
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center relative">
                <Bell size={20} /><span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">3</span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-100 shadow-2xl p-3 z-50">
                  <p className="font-black text-slate-950 mb-2">Notifications</p>
                  <div className="space-y-2 text-sm">
                    <div className="rounded-xl bg-blue-50 p-3">Visitor status: {activeVisitor?.status || "none"}</div>
                    <div className="rounded-xl bg-emerald-50 p-3">Payment status: {billPaid ? "paid" : "pending"}</div>
                    <div className="rounded-xl bg-amber-50 p-3">Vehicle status: {activeVehicle?.status || "none"}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {section === "dashboard" && (
          <div className="mt-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[
                ["Total Flats", "248", "Registered units", "bg-blue-50", "text-blue-700"],
                ["Active Residents", "612", "+12 this month", "bg-emerald-50", "text-emerald-700"],
                ["Visitors Today", visitorsToday, "Live gate entries", "bg-cyan-50", "text-cyan-700"],
                ["Security Alerts", totalSecurityAlerts, totalSecurityAlerts ? "Needs review" : "All clear", "bg-red-50", "text-red-700"],
                ["Monthly Collection", `₹${collectedBillingAmount.toLocaleString("en-IN")}`, `${collectionRate}% collected`, "bg-amber-50", "text-amber-700"],
                ["Staff On Duty", "6", "Main gate active", "bg-purple-50", "text-purple-700"],
              ].map(([title, value, sub, bg, text]) => (
                <Card key={title} className={`p-5 ${bg} border-slate-100 min-h-[118px]`}>
                  <p className={`text-sm font-bold ${text}`}>{title}</p>
                  <h3 className="text-3xl font-black mt-2 text-slate-950">{value}</h3>
                  <p className="text-xs text-slate-500 mt-1">{sub}</p>
                </Card>
              ))}
            </div>
            {totalSecurityAlerts > 0 && (
              <Card className="p-5 mt-5 bg-gradient-to-r from-red-950 via-slate-950 to-red-950 border-red-500/30 text-white shadow-xl shadow-red-950/30">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-red-300 animate-pulse" size={30} />
                  <div>
                    <h3 className="font-black text-white">Security Intelligence Alert</h3>
                    <p className="text-sm text-red-200">
                      Security intelligence detected visitor or vehicle watchlist activity
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
                  <div className="rounded-2xl bg-slate-950/70 p-3"><p className="text-red-200">Blacklisted</p><b>{blacklistedVisitorCount}</b></div>
                  <div className="rounded-2xl bg-slate-950/70 p-3"><p className="text-red-200">Suspicious</p><b>{suspiciousVisitorCount}</b></div>
                  <div className="rounded-2xl bg-slate-950/70 p-3"><p className="text-red-200">Vehicle Watchlist</p><b>{watchlistVehicleCount}</b></div>
                  <div className="rounded-2xl bg-slate-950/70 p-3"><p className="text-red-200">Last Alert</p><b>{lastSecurityAlert}</b></div>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">
              <Card className="p-5 xl:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-slate-950">Visitor Trend</h3>
                    <p className="text-sm text-slate-500 mt-1">Weekly gate entries across all visitor categories</p>
                  </div>
                  <span className="text-xs rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 font-bold">Live</span>
                </div>

                <div className="mt-5 h-72 rounded-3xl bg-gradient-to-r from-slate-50 to-blue-50 p-5">
                  <div className="h-56 flex items-end gap-4 border-b border-slate-200 pb-1">
                    {visitorTrendData.map((d) => {
                      const heightPx = Math.max(42, Math.round((d.visitors / maxVisitorTrend) * 170));
                      return (
                        <div key={d.day} className="flex-1 flex flex-col items-center justify-end">
                          <div className="text-xs font-black text-slate-700 mb-2">{d.visitors}</div>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: heightPx }}
                            transition={{ duration: 0.45 }}
                            className="w-full max-w-[42px] rounded-t-2xl bg-gradient-to-t from-blue-700 to-cyan-300 shadow-lg shadow-blue-100"
                          />
                          <div className="mt-2 text-xs font-bold text-slate-500">{d.day}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-slate-950">Billing Collection</h3>
                    <p className="text-sm text-slate-500 mt-1">Current month recovery</p>
                  </div>
                  <IndianRupee className="text-emerald-600" />
                </div>

                <div className="mt-6 flex flex-col items-center">
                  <div className="relative h-40 w-40 rounded-full bg-slate-100 flex items-center justify-center">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ background: `conic-gradient(#2563eb ${collectionRate * 3.6}deg, #e2e8f0 0deg)` }}
                    />
                    <div className="relative h-28 w-28 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
                      <b className="text-3xl text-slate-950">{collectionRate}%</b>
                      <span className="text-[11px] text-slate-500">Collected</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full mt-6 text-sm">
                    <div className="rounded-2xl bg-emerald-50 p-3">
                      <p className="text-emerald-700 text-xs">Collected</p>
                      <b className="text-emerald-900">₹{collectedBillingAmount.toLocaleString("en-IN")}</b>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-3">
                      <p className="text-amber-700 text-xs">Pending</p>
                      <b className="text-amber-900">₹{pendingBillingAmount.toLocaleString("en-IN")}</b>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-4">Total billed: ₹{totalBilledAmount.toLocaleString("en-IN")}</p>
                </div>
              </Card>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">
              <Card className="p-5">
                <h3 className="font-black text-slate-950">AI Society Insights</h3>
                <div className="mt-4 space-y-3">
                  {activeVisitor?.status === "wrong entry" && (
                    <div className="rounded-2xl bg-red-50 p-3 border border-red-100">
                      <p className="font-bold text-sm text-red-900">Wrong Entry Alert</p>
                      <p className="text-xs text-slate-500 mt-1">Resident A-1204 reported incorrect visitor entry. Guard verification required.</p>
                    </div>
                  )}
                  <div className="rounded-2xl bg-blue-50 p-3"><p className="font-bold text-sm text-blue-900">Lifecycle sync active</p><p className="text-xs text-slate-500 mt-1">Visitor, resident, guard and ERP use same state.</p></div>
                  <div className="rounded-2xl bg-emerald-50 p-3"><p className="font-bold text-sm text-emerald-900">Billing recovery</p><p className="text-xs text-slate-500 mt-1">A-1204 status: {billPaid ? "Paid" : "Pending"}.</p></div>
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-black text-slate-950">Live Entry Logs</h3>
                <div className="mt-4 space-y-3">
                  {visitorHistory.slice(0, 2).map((v) => (
                    <div key={v.id} className="rounded-2xl bg-blue-50 p-3">
                      <p className="font-bold text-sm">{v.name} • {v.flat}</p>
                      <p className="text-xs text-slate-500">{v.purpose} • {v.status} • Entry {v.entryTime} • Exit {v.exitTime}</p>
                    </div>
                  ))}
                  {!visitorHistory.length && <p className="text-slate-500 text-sm">No visitor logs yet.</p>}
                </div>
              </Card>
              <Card className="p-5">
                <h3 className="font-black text-slate-950">System Activity</h3>
                <div className="mt-4 space-y-3">
                  {logs.slice(-6).reverse().map((log, i) => <div key={i} className="flex gap-3 text-sm"><Clock size={16} className="text-blue-600 mt-.5" /><span className="text-slate-600">{log}</span></div>)}
                  {!logs.length && <p className="text-slate-500 text-sm">Start visitor flow from Guard App.</p>}
                </div>
              </Card>
            </div>
          </div>
        )}

        {section === "residents" && (
          <div className="mt-7">
            <SectionTitle title="Resident Management" sub="Manage flats, owners, tenants and dues" />
            <Button onClick={() => setShowResidentForm(true)}><UserPlus size={18} /> Add Resident</Button>
            {showResidentForm && (
              <Card className="mt-4 p-5 border-blue-200 shadow-md">
                <div className="flex items-center justify-between mb-4"><h3 className="font-black text-slate-950">Add New Resident</h3><button onClick={() => setShowResidentForm(false)}><X size={18} /></button></div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <input className="rounded-xl border p-3" value={newResident.flat} onChange={(e) => setNewResident({ ...newResident, flat: e.target.value })} placeholder="Flat No." />
                  <input className="rounded-xl border p-3" value={newResident.name} onChange={(e) => setNewResident({ ...newResident, name: e.target.value })} placeholder="Resident Name" />
                  <select className="rounded-xl border p-3" value={newResident.type} onChange={(e) => setNewResident({ ...newResident, type: e.target.value })}><option>Owner</option><option>Tenant</option></select>
                  <input className="rounded-xl border p-3" value={newResident.due} onChange={(e) => setNewResident({ ...newResident, due: e.target.value })} placeholder="Due Amount" />
                  <select className="rounded-xl border p-3" value={newResident.status} onChange={(e) => setNewResident({ ...newResident, status: e.target.value })}><option>Active</option><option>Inactive</option></select>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button onClick={() => { setResidents((prev) => [...prev, newResident]); setShowResidentForm(false); notify(`Resident ${newResident.name} added`); }} variant="success">Save Resident</Button>
                  <Button onClick={() => setShowResidentForm(false)} variant="ghost">Cancel</Button>
                </div>
              </Card>
            )}
            <Card className="mt-4 p-4 overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead><tr className="text-left text-slate-500 border-b"><th className="py-3">Flat No.</th><th>Resident Name</th><th>Category</th><th>Due Amount</th><th>Status</th><th className="text-right">Action</th></tr></thead>
                <tbody>{filteredResidents.map((r, i) => (
                  <tr key={`${r.flat}-${i}`} className="border-b last:border-0">
                    <td className="py-3 font-bold">{r.flat}</td><td>{r.name}</td><td>{r.type}</td><td>{r.due}</td><td><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">{r.status}</span></td>
                    <td className="text-right"><button onClick={() => setEditingResident({ ...r })} className="text-blue-600 font-bold text-xs px-3 py-2 rounded-xl hover:bg-blue-50 mr-2">Edit</button><button onClick={() => setResidents((prev) => prev.filter((x) => x.flat !== r.flat))} className="text-red-600 font-bold text-xs px-3 py-2 rounded-xl hover:bg-red-50">Delete</button></td>
                  </tr>
                ))}</tbody>
              </table>
              {!filteredResidents.length && <p className="text-center text-slate-500 py-6">No resident found for “{searchTerm}”.</p>}
            </Card>
            {editingResident && (
              <Card className="mt-4 p-5 border-cyan-200 shadow-md">
                <div className="flex items-center justify-between mb-4"><h3 className="font-black text-slate-950">Edit Resident</h3><button onClick={() => setEditingResident(null)}><X size={18} /></button></div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <input className="rounded-xl border p-3 bg-slate-50" value={editingResident.flat} readOnly />
                  <input className="rounded-xl border p-3" value={editingResident.name} onChange={(e) => setEditingResident({ ...editingResident, name: e.target.value })} />
                  <select className="rounded-xl border p-3" value={editingResident.type} onChange={(e) => setEditingResident({ ...editingResident, type: e.target.value })}><option>Owner</option><option>Tenant</option></select>
                  <input className="rounded-xl border p-3" value={editingResident.due} onChange={(e) => setEditingResident({ ...editingResident, due: e.target.value })} />
                  <select className="rounded-xl border p-3" value={editingResident.status} onChange={(e) => setEditingResident({ ...editingResident, status: e.target.value })}><option>Active</option><option>Inactive</option></select>
                </div>
                <div className="flex gap-3 mt-4">
                  <Button onClick={() => { setResidents((prev) => prev.map((r) => r.flat === editingResident.flat ? editingResident : r)); setEditingResident(null); notify("Resident updated"); }} variant="success">Save Changes</Button>
                  <Button onClick={() => setEditingResident(null)} variant="ghost">Cancel</Button>
                </div>
              </Card>
            )}
          </div>
        )}

        {section === "visitors" && (
          <div className="mt-7">
            <SectionTitle title="Visitor & Vehicle Analytics" sub="Complete in/out lifecycle reports" />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
              <Card className="p-4"><p className="text-xs text-slate-500">Visitors Today</p><p className="text-3xl font-black mt-1">{visitorsToday}</p></Card>
              <Card className="p-4"><p className="text-xs text-slate-500">Current Visitor</p><p className="text-2xl font-black mt-1 capitalize">{activeVisitor?.status || "none"}</p></Card>
              <Card className="p-4"><p className="text-xs text-slate-500">Active Vehicle</p><p className="text-2xl font-black mt-1 capitalize">{activeVehicle?.status || "none"}</p></Card>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <Card className="p-4 overflow-x-auto">
                <h3 className="font-black text-slate-950 mb-3">Visitor Table</h3>
                <table className="w-full text-sm min-w-[760px]">
                  <thead><tr className="text-left text-slate-500 border-b"><th className="py-3">Visitor</th><th>Flat</th><th>Purpose</th><th>Status</th><th>Entry</th><th>Exit</th><th>Action</th></tr></thead>
                  <tbody>{visitorHistory.length ? visitorHistory.map((v) => (
                    <tr key={v.id} className="border-b last:border-0">
                      <td className="py-3 font-bold">{v.name}</td><td>{v.flat}</td><td>{v.purpose}</td><td><span className={`px-2 py-1 rounded-full text-xs ${visitorBadge(v.status)}`}>{v.status}</span></td><td>{v.entryTime}</td><td>{v.exitTime}</td>
                      <td>{v.status === "inside" ? <button onClick={() => updateVisitor({ ...v, status: "exited", exitTime: "12:25 PM" })} className="text-blue-600 font-bold text-xs px-3 py-2 rounded-xl hover:bg-blue-50">Mark Exit</button> : <span className="text-slate-400 text-xs">Closed</span>}</td>
                    </tr>
                  )) : <tr><td colSpan="7" className="py-4 text-slate-500">No visitor records yet.</td></tr>}</tbody>
                </table>
              </Card>
              <Card className="p-5">
                <h3 className="font-black text-slate-950">Visitor History Timeline</h3>
                <div className="mt-4 space-y-4">{visitorHistory.length ? visitorHistory.slice(0, 4).map((v) => (
                  <div key={v.id} className="flex gap-3"><div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"><Check size={16} /></div><div><p className="text-xs text-slate-500">{v.exitTime !== "--" ? v.exitTime : v.entryTime !== "--" ? v.entryTime : v.requestTime}</p><p className="font-bold text-slate-950">{v.name}</p><p className="text-sm text-slate-500">{v.purpose} • {v.flat} • {v.status}</p></div></div>
                )) : <p className="text-slate-500 text-sm">No visitor history yet.</p>}</div>
              </Card>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
              <Card className="p-4 overflow-x-auto">
                <h3 className="font-black text-slate-950 mb-3">Vehicle In/Out Report</h3>
                <table className="w-full text-sm min-w-[680px]">
                  <thead><tr className="text-left text-slate-500 border-b"><th className="py-3">Vehicle</th><th>Flat</th><th>Purpose</th><th>Status</th><th>In</th><th>Out</th><th>Action</th></tr></thead>
                  <tbody>{vehicleHistory.length ? vehicleHistory.map((v) => (
                    <tr key={v.id} className="border-b last:border-0">
                      <td className="py-3 font-bold">{v.number}</td><td>{v.flat}</td><td>{v.purpose}</td><td>{v.status}</td><td>{v.inTime}</td><td>{v.outTime}</td>
                      <td>{v.status === "in" ? <button onClick={() => updateVehicle({ ...v, status: "out", outTime: "12:05 PM" })} className="text-blue-600 font-bold text-xs px-3 py-2 rounded-xl hover:bg-blue-50">Mark Out</button> : <span className="text-slate-400 text-xs">Closed</span>}</td>
                    </tr>
                  )) : <tr><td colSpan="7" className="py-4 text-slate-500">No vehicle records yet.</td></tr>}</tbody>
                </table>
              </Card>
              <Card className="p-5">
                <h3 className="font-black text-slate-950">Exit Rule Logic</h3>
                <div className="mt-4 space-y-3 text-sm">
                  <div className="rounded-2xl bg-blue-50 p-3"><b>Delivery:</b> Auto-close demo after 40 seconds.</div>
                  <div className="rounded-2xl bg-emerald-50 p-3"><b>Guests:</b> Manual exit by guard/admin.</div>
                  <div className="rounded-2xl bg-amber-50 p-3"><b>Vehicles:</b> Vehicle QR pass + mark out timestamp.</div>
                </div>
              </Card>
            </div>
          </div>
        )}

                {section === "billing" && (
          <div className="space-y-5">
            <SectionTitle title="Smart Billing & Payments" sub="Flat-wise maintenance collection and payment tracking" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-5"><p className="text-slate-500">Total Billed</p><h3 className="text-2xl font-black mt-1">₹{totalBilledAmount.toLocaleString("en-IN")}</h3></Card>
              <Card className="p-5"><p className="text-slate-500">Collected</p><h3 className="text-2xl font-black mt-1 text-emerald-600">₹{collectedBillingAmount.toLocaleString("en-IN")}</h3></Card>
              <Card className="p-5"><p className="text-slate-500">Pending</p><h3 className="text-2xl font-black mt-1 text-amber-600">₹{pendingBillingAmount.toLocaleString("en-IN")}</h3></Card>
              <Card className="p-5"><p className="text-slate-500">Collection Rate</p><h3 className="text-2xl font-black mt-1 text-blue-600">{collectionRate}%</h3></Card>
            </div>

            <Card className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-slate-950">Collection Trend</h3>
                  <p className="text-sm text-slate-500 mt-1">Month-wise billed vs collected amount</p>
                </div>
                <span className="text-xs rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 font-bold">Live</span>
              </div>

              <div className="mt-5 rounded-3xl bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
                <div className="h-56 flex items-end gap-4">
                  {collectionTrendData.map((m) => {
                    const collectedHeightPx = Math.max(24, Math.round((m.collected / maxTrendAmount) * 150));
                    const billedHeightPx = Math.max(28, Math.round((m.billed / maxTrendAmount) * 150));
                    const rate = m.billed ? Math.round((m.collected / m.billed) * 100) : 0;
                    return (
                      <div key={m.month} className="flex-1 flex flex-col items-center justify-end">
                        <div className="text-[11px] font-bold text-slate-700 mb-2">₹{(m.collected / 1000).toFixed(1)}K</div>
                        <div className="relative w-full h-40 flex items-end justify-center">
                          <div className="absolute bottom-0 w-full max-w-[34px] rounded-t-2xl bg-slate-200" style={{ height: billedHeightPx }} />
                          <div className="absolute bottom-0 w-full max-w-[34px] rounded-t-2xl bg-blue-600 shadow-lg shadow-blue-200" style={{ height: collectedHeightPx }} />
                        </div>
                        <div className="mt-2 text-xs font-black text-slate-950">{m.month}</div>
                        <div className="text-[10px] text-slate-500">{rate}%</div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-blue-600" /> Collected</div>
                  <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-slate-200" /> Billed</div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-black text-slate-950">Flat-wise Billing Ledger</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 border-b">
                      <th className="py-3">Flat</th>
                      <th>Resident</th>
                      <th>Amount</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingLedger.map((b) => (
                      <tr key={`${b.flat}-${b.month}`} className="border-b last:border-0">
                        <td className="py-3 font-bold">{b.flat}</td>
                        <td>{b.name}</td>
                        <td>₹{b.amount.toLocaleString("en-IN")}</td>
                        <td>{b.dueDate}</td>
                        <td>
                          <span className={`text-xs rounded-full px-3 py-1 font-bold ${b.status === "paid" ? "bg-emerald-100 text-emerald-700" : b.status === "overdue" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>{b.receiptId || "--"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            
          </div>
        )}

        {section === "complaints" && (
          <div className="mt-7">
            <SectionTitle title="Complaint Board" sub="SLA tracking and staff assignment" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">{["New", "In Progress", "Pending Resident", "Resolved"].map((col, i) => <Card key={col} className="p-4 min-h-44"><h3 className="font-black">{col}</h3>{i === 1 && <div onClick={() => notify("Ticket SG-1024 opened")} className="mt-4 rounded-2xl bg-amber-50 p-3 cursor-pointer"><p className="font-bold">SG-1024</p><p className="text-xs text-slate-500">Lift Issue • B-804</p></div>}</Card>)}</div>
          </div>
        )}

        {section === "reports" && (
          <div className="mt-7">
            <SectionTitle title="Reports" sub="Export committee-ready reports" />
            <div className="grid md:grid-cols-4 gap-4">{[[FileText, "Visitor Report"], [Car, "Vehicle Report"], [ReceiptText, "Billing Report"], [ClipboardList, "Complaint Report"]].map(([Icon, t]) => <Card key={t} className="p-5"><Icon className="text-blue-600" /><h3 className="font-black mt-3">{t}</h3><Button onClick={() => notify(`${t} downloaded`)} className="mt-4 w-full" variant="ghost">Download</Button></Card>)}</div>
          </div>
        )}

        {section === "ai" && (
          <div className="mt-7 space-y-5">
            <div className="rounded-[2rem] bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white p-6 shadow-xl shadow-blue-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <p className="text-blue-100 text-sm font-bold uppercase tracking-wide">Phase 4.1</p>
                  <h2 className="text-3xl lg:text-4xl font-black mt-1 flex items-center gap-3">
                    <Bot size={36} /> SocioGate AI Copilot
                  </h2>
                  <p className="text-blue-50 mt-2 max-w-2xl">
                    AI-powered security, billing and operations intelligence for premium society management.
                  </p>
                </div>
                <div className="rounded-3xl bg-white/15 border border-white/20 p-4 min-w-[180px]">
                  <p className="text-blue-100 text-sm">AI Readiness</p>
                  <p className="text-3xl font-black">Live</p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white border-blue-500/20 shadow-xl">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                <div>
                  <p className="text-blue-200 text-sm font-bold">Society Health Score</p>
                  <h2 className="text-6xl font-black mt-3">92</h2>
                  <p className="text-slate-300 text-sm mt-1">out of 100</p>
                  <p className="text-slate-400 text-sm mt-4">
                    Overall operational health based on visitor lifecycle, billing, complaints and security events.
                  </p>
                </div>

                <div className="xl:col-span-2 grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm"><span>Security</span><b className="text-emerald-300">96%</b></div>
                    <div className="h-2 bg-slate-800 rounded-full mt-2"><div className="h-full w-[96%] bg-emerald-400 rounded-full" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm"><span>Billing</span><b className="text-cyan-300">88%</b></div>
                    <div className="h-2 bg-slate-800 rounded-full mt-2"><div className="h-full w-[88%] bg-cyan-400 rounded-full" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm"><span>Complaints</span><b className="text-amber-300">90%</b></div>
                    <div className="h-2 bg-slate-800 rounded-full mt-2"><div className="h-full w-[90%] bg-amber-400 rounded-full" /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm"><span>Operations</span><b className="text-purple-300">94%</b></div>
                    <div className="h-2 bg-slate-800 rounded-full mt-2"><div className="h-full w-[94%] bg-purple-400 rounded-full" /></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-black text-slate-950 flex items-center gap-2">
                <IndianRupee className="text-emerald-600" /> Billing Snapshot
              </h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-4">
                  <p className="text-sm text-emerald-700">Collected</p>
                  <h3 className="text-2xl font-black text-emerald-900 mt-1">₹{collectedBillingAmount.toLocaleString("en-IN")}</h3>
                </div>
                <div className="rounded-3xl bg-amber-50 border border-amber-100 p-4">
                  <p className="text-sm text-amber-700">Pending</p>
                  <h3 className="text-2xl font-black text-amber-900 mt-1">₹{pendingBillingAmount.toLocaleString("en-IN")}</h3>
                </div>
                <div className="rounded-3xl bg-blue-50 border border-blue-100 p-4">
                  <p className="text-sm text-blue-700">Collection Rate</p>
                  <h3 className="text-2xl font-black text-blue-900 mt-1">{collectionRate}%</h3>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-black text-slate-950 flex items-center gap-2">
                <Bot className="text-blue-600" /> AI Command Center
              </h3>
              <p className="text-sm text-slate-500 mt-1">Live recommendations based on current demo data.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-4 mt-5 items-start">
                <div className="rounded-3xl bg-red-50 border border-red-100 p-4 min-h-[150px]">
                  <div className="flex items-center gap-2"><ShieldAlert className="text-red-600" /><b className="text-red-900">Security Insight</b></div>
                  <p className="text-sm text-slate-600 mt-2">
                    {activeVisitor?.status === "wrong entry"
                      ? "Wrong entry reported by resident. Guard verification recommended immediately."
                      : activeVisitor?.status === "inside"
                      ? "Delivery visitor is currently inside. Auto-exit timer is recommended for delivery category."
                      : "No active high-risk visitor detected right now."}
                  </p>
                </div>

                <div className="rounded-3xl bg-blue-50 border border-blue-100 p-4 min-h-[150px]">
                  <div className="flex items-center gap-2"><IndianRupee className="text-blue-600" /><b className="text-blue-900">Billing Recovery</b></div>
                  <p className="text-sm text-slate-600 mt-2">
                    Collected: ₹{collectedBillingAmount.toLocaleString("en-IN")} of ₹{totalBilledAmount.toLocaleString("en-IN")}. Collection rate: {collectionRate}%.
                  </p>
                </div>

                <div className="rounded-3xl bg-amber-50 border border-amber-100 p-4 min-h-[150px]">
                  <div className="flex items-center gap-2"><Wrench className="text-amber-600" /><b className="text-amber-900">Complaint Prediction</b></div>
                  <p className="text-sm text-slate-600 mt-2">
                    Lift issue trend detected. AI predicts 3 more complaints in next 7 days if preventive maintenance is delayed.
                  </p>
                </div>

                <div className="rounded-3xl bg-purple-50 border border-purple-100 p-4 min-h-[150px]">
                  <div className="flex items-center gap-2"><Car className="text-purple-600" /><b className="text-purple-900">Vehicle Intelligence</b></div>
                  <p className="text-sm text-slate-600 mt-2">
                    Known Vehicles: {knownVehicleCount}<br />
                    Active Vehicles: {activeVehicleCount}<br />
                    Watchlist Vehicles: {watchlistVehicleCount}
                  </p>
                </div>

                <div className="rounded-3xl bg-purple-50 border border-purple-100 p-4 min-h-[150px]">
                  <div className="flex items-center gap-2"><ShieldCheck className="text-purple-600" /><b className="text-purple-900">Face Recognition</b></div>
                  <p className="text-sm text-slate-600 mt-2">
                    Known Faces: 143<br />
                    New Visitors: 8<br />
                    Suspicious Faces: {activeVisitor?.status === "wrong entry" ? 2 : 1}
                  </p>
                </div>

                <div className="rounded-3xl bg-emerald-50 border border-emerald-100 p-4 min-h-[150px]">
                  <div className="flex items-center gap-2"><BadgeCheck className="text-emerald-600" /><b className="text-emerald-900">Resident Experience</b></div>
                  <p className="text-sm text-slate-600 mt-2">
                    Pre-Approved: {preApprovedCount}<br />
                    Trusted Entries: {trustedVisitorCount}<br />
                    SOS Alerts: {totalSosCount}<br />
                    Active SOS: {activeSosCount}<br />
                    Resolved SOS: {resolvedSosCount}
                  </p>
                </div>

                <div className="rounded-3xl bg-cyan-50 border border-cyan-100 p-4 min-h-[150px]">
                  <div className="flex items-center gap-2"><Megaphone className="text-cyan-600" /><b className="text-cyan-900">Community Hub</b></div>
                  <p className="text-sm text-slate-600 mt-2">
                    Notices: {noticeCount}<br />
                    Active Polls: {activePollCount}<br />
                    Total Votes: {totalPollVotes}
                  </p>
                </div>
              </div>
            </Card>

            {latestSosAlert && (
              <Card className={`p-5 ${activeSosCount > 0 ? "bg-gradient-to-r from-red-950 via-slate-950 to-red-950 border-red-500/40 text-white shadow-xl shadow-red-950/30" : "bg-slate-50 border-slate-200"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Siren className={activeSosCount > 0 ? "text-red-300 animate-pulse shrink-0" : "text-slate-500 shrink-0"} size={32} />
                    <div>
                      <h3 className={`font-black ${activeSosCount > 0 ? "text-white" : "text-slate-950"}`}>Emergency SOS Monitor</h3>
                      <p className={`text-sm mt-1 ${activeSosCount > 0 ? "text-red-200" : "text-slate-600"}`}>{latestSosAlert.flat} • {latestSosAlert.resident} • {latestSosAlert.status}</p>
                      <p className={`text-xs mt-1 ${activeSosCount > 0 ? "text-red-100" : "text-slate-500"}`}>{latestSosAlert.message}</p>
                    </div>
                  </div>
                  {latestSosAlert.status === "active" && <Button onClick={() => resolveSosAlert(latestSosAlert.id)} variant="success" className="py-2 px-3 text-xs">Resolve</Button>}
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                  <div className="rounded-2xl bg-white/10 p-3"><p className={activeSosCount > 0 ? "text-red-200" : "text-slate-600"}>Active SOS</p><b>{activeSosCount}</b></div>
                  <div className="rounded-2xl bg-white/10 p-3"><p className={activeSosCount > 0 ? "text-red-200" : "text-slate-600"}>Resolved SOS</p><b>{resolvedSosCount}</b></div>
                </div>
              </Card>
            )}

            <Card className="p-5 bg-slate-950 text-white border-slate-800 shadow-xl">
              <h3 className="font-black text-2xl flex items-center gap-2"><Bot className="text-cyan-300" /> Ask SocioGate AI</h3>
              <p className="text-sm text-slate-400 mt-1">Demo AI answers for client pitch. Click any question to show instant AI response.</p>

              <div className="mt-5 rounded-3xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-400/20 p-4">
                <p className="text-xs uppercase tracking-wide text-cyan-300 font-bold">AI Response</p>
                <p className="mt-2 text-white font-semibold">{aiAnswer}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                {[
                  ["How many visitors today?", `${visitorsToday} visitors logged today. ${preApprovedCount} visitor(s) are pre-approved.`],
                  ["Any suspicious activity?", activeSosCount > 0 ? `Critical: ${activeSosCount} active SOS alert(s). Immediate guard response required.` : suspiciousAiAnswer],
                  ["Which flats have dues?", `${overdueFlats} flats are overdue. A-1204 is ${billPaid ? "paid" : "pending"}.`],
                  ["What should admin do next?", "Review security logs, send billing reminders, and schedule lift maintenance."]
                ].map(([q, a]) => (
                  <button
                    key={q}
                    onClick={() => { setAiAnswer(a); }}
                    className="w-full text-left rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 p-4 transition"
                  >
                    <p className="font-bold text-cyan-200">{q}</p>
                    <p className="text-xs text-slate-400 mt-1">Click to show AI answer</p>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="font-black text-slate-950 flex items-center gap-2">
                <Sparkles className="text-blue-600" /> Smart Recommendations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4 text-sm">
                <div className="rounded-2xl bg-slate-50 p-4"><b>Security:</b><br />Enable 30-minute auto-close for all delivery visitors.</div>
                <div className="rounded-2xl bg-slate-50 p-4"><b>Billing:</b><br />Send reminder to overdue flats with payment link.</div>
                <div className="rounded-2xl bg-slate-50 p-4"><b>Operations:</b><br />Schedule lift preventive maintenance before weekend.</div>
                <div className="rounded-2xl bg-slate-50 p-4"><b>Admin:</b><br />Export visitor and vehicle reports before committee meeting.</div>
              </div>
            </Card>
          </div>
        )}

        {section === "notices" && (
          <div className="space-y-5">
            <SectionTitle title="Notice Board" sub="Publish and manage society announcements" />

            <Card className="p-5">
              <h3 className="font-black text-slate-950 flex items-center gap-2">
                <Megaphone className="text-cyan-600" /> Publish New Notice
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
                <input className="rounded-2xl border border-slate-200 p-3 text-sm" value={newNotice.title} onChange={(e) => setNewNotice((p) => ({ ...p, title: e.target.value }))} />
                <input className="rounded-2xl border border-slate-200 p-3 text-sm" value={newNotice.category} onChange={(e) => setNewNotice((p) => ({ ...p, category: e.target.value }))} />
                <Button onClick={createAdminNotice} variant="success">
                  <Send size={16} /> Publish Notice
                </Button>
              </div>
              <textarea className="mt-3 w-full rounded-2xl border border-slate-200 p-3 text-sm h-24" value={newNotice.body} onChange={(e) => setNewNotice((p) => ({ ...p, body: e.target.value }))} />
            </Card>

            <Card className="p-5">
              <h3 className="font-black text-slate-950">Live Notices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {notices.map((n) => (
                  <div key={n.id} className="rounded-3xl bg-cyan-50 border border-cyan-100 p-4">
                    <p className="font-black text-cyan-950">{n.title}</p>
                    <p className="text-sm text-slate-600 mt-1">{n.body}</p>
                    <p className="text-xs text-slate-400 mt-2">{n.category} • {n.createdBy} • {n.createdAt}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {section === "polls" && (
          <div className="space-y-5">
            <SectionTitle title="Community Polls" sub="Create polls and track resident voting" />

            <Card className="p-5">
              <h3 className="font-black text-slate-950 flex items-center gap-2">
                <BarChart3 className="text-emerald-600" /> Create New Poll
              </h3>
              <input className="mt-4 w-full rounded-2xl border border-slate-200 p-3 text-sm" value={newPoll.question} onChange={(e) => setNewPoll((p) => ({ ...p, question: e.target.value }))} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                <input className="rounded-2xl border border-slate-200 p-3 text-sm" value={newPoll.option1} onChange={(e) => setNewPoll((p) => ({ ...p, option1: e.target.value }))} />
                <input className="rounded-2xl border border-slate-200 p-3 text-sm" value={newPoll.option2} onChange={(e) => setNewPoll((p) => ({ ...p, option2: e.target.value }))} />
                <input className="rounded-2xl border border-slate-200 p-3 text-sm" value={newPoll.option3} onChange={(e) => setNewPoll((p) => ({ ...p, option3: e.target.value }))} />
              </div>
              <Button onClick={createAdminPoll} className="mt-3">
                <BarChart3 size={16} /> Create Poll
              </Button>
            </Card>

            <Card className="p-5">
              <h3 className="font-black text-slate-950">Poll Results</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                {communityPolls.map((poll) => {
                  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0) || 1;
                  return (
                    <div key={poll.id} className="rounded-3xl bg-emerald-50 border border-emerald-100 p-4">
                      <p className="font-black text-emerald-950">{poll.question}</p>
                      <p className="text-xs text-slate-500 mt-1">{poll.status} • {poll.createdAt}</p>
                      <div className="mt-3 space-y-2">
                        {poll.options.map((opt) => {
                          const percent = Math.round((opt.votes / totalVotes) * 100);
                          return (
                            <div key={opt.label} className="rounded-2xl bg-white border border-emerald-100 p-3">
                              <div className="flex justify-between text-sm">
                                <b>{opt.label}</b>
                                <span>{opt.votes} vote(s) • {percent}%</span>
                              </div>
                              <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${percent}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {section === "settings" && (
          <div className="mt-7">
            <SectionTitle title="Settings" sub="Society, gates, roles and permissions" />
            <Card className="p-5 space-y-3"><p><b>Society:</b> Green Meadows Society</p><p><b>Gates:</b> Main Gate, Basement Gate</p><p><b>Plan:</b> Professional</p><Button onClick={() => notify("Settings saved")}>Save Settings</Button></Card>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SocioGateClickableDemo() {
  const [mode, setMode] = useState("overview");
  const [activeVisitor, setActiveVisitor] = useState(null);
  const [visitorHistory, setVisitorHistory] = useState([]);
  const [activeVehicle, setActiveVehicle] = useState(null);
  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [knownVisitors, setKnownVisitors] = useState({});
  const [visitorAttempts, setVisitorAttempts] = useState({});
  const [knownVehicles, setKnownVehicles] = useState({});
  const [preApprovedVisitors, setPreApprovedVisitors] = useState({});
  const [sosAlerts, setSosAlerts] = useState([]);
  const [notices, setNotices] = useState([
    { id: 1, title: "Water Tank Cleaning", body: "Water tank cleaning tomorrow from 10 AM to 1 PM.", category: "Maintenance", createdBy: "Admin", createdAt: "Today" },
    { id: 2, title: "AGM Meeting", body: "AGM meeting on Sunday, 6 PM at clubhouse.", category: "Meeting", createdBy: "Admin", createdAt: "Today" },
    { id: 3, title: "Parking Stickers", body: "New parking stickers are available from admin office.", category: "Parking", createdBy: "Admin", createdAt: "Today" },
  ]);
  const [billingLedger, setBillingLedger] = useState([
    { flat: "A-1204", name: "Jagmeet Singh", month: "June 2026", amount: 4500, dueDate: "10 June 2026", status: "pending", paidAt: "", txId: "", method: "", receiptId: "" },
    { flat: "B-804", name: "Priya Sharma", month: "June 2026", amount: 3200, dueDate: "10 June 2026", status: "paid", paidAt: "02 June 2026", txId: "TXN-B804-0626", method: "UPI", receiptId: "RCPT-B804-0626" },
    { flat: "C-502", name: "Rohit Verma", month: "June 2026", amount: 2800, dueDate: "10 June 2026", status: "paid", paidAt: "01 June 2026", txId: "TXN-C502-0626", method: "Card", receiptId: "RCPT-C502-0626" },
    { flat: "D-1101", name: "Neha Gupta", month: "June 2026", amount: 5200, dueDate: "10 June 2026", status: "pending", paidAt: "", txId: "", method: "", receiptId: "" },
    { flat: "E-303", name: "Amit Malhotra", month: "June 2026", amount: 3600, dueDate: "10 June 2026", status: "overdue", paidAt: "", txId: "", method: "", receiptId: "" },
  ]);
  const [communityPolls, setCommunityPolls] = useState([
    {
      id: 1,
      question: "Should society install EV charging points?",
      options: [
        { label: "Yes", votes: 18 },
        { label: "No", votes: 5 },
        { label: "Need Discussion", votes: 7 },
      ],
      votedOption: "",
      status: "active",
      createdBy: "Admin",
      createdAt: "Today",
    },
  ]);
  const [billPaid, setBillPaid] = useState(false);
  const [logs, setLogs] = useState([]);
  const [toast, setToast] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [resetSerial, setResetSerial] = useState(0);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const addLog = (log) => setLogs((prev) => [...prev, log]);

  const saveVisitor = (updated) => {
    setVisitorHistory((prev) => [updated, ...prev.filter((v) => v.id !== updated.id)]);
  };

  const saveVehicle = (updated) => {
    setVehicleHistory((prev) => [updated, ...prev.filter((v) => v.id !== updated.id)]);
  };

  const steps = useMemo(() => ["Guard: Add Visitor", "Resident: Approve", "Guard: Allow Entry", "Exit / Auto Close", "ERP Sync"], []);

  const resetDemo = () => {
    setActiveVisitor(null);
    setVisitorHistory([]);
    setActiveVehicle(null);
    setVehicleHistory([]);
    setKnownVisitors({});
    setVisitorAttempts({});
    setKnownVehicles({});
    setPreApprovedVisitors({});
    setSosAlerts([]);
    setNotices([
      { id: 1, title: "Water Tank Cleaning", body: "Water tank cleaning tomorrow from 10 AM to 1 PM.", category: "Maintenance", createdBy: "Admin", createdAt: "Today" },
      { id: 2, title: "AGM Meeting", body: "AGM meeting on Sunday, 6 PM at clubhouse.", category: "Meeting", createdBy: "Admin", createdAt: "Today" },
      { id: 3, title: "Parking Stickers", body: "New parking stickers are available from admin office.", category: "Parking", createdBy: "Admin", createdAt: "Today" },
    ]);
    setBillingLedger([
      { flat: "A-1204", name: "Jagmeet Singh", month: "June 2026", amount: 4500, dueDate: "10 June 2026", status: "pending", paidAt: "", txId: "", method: "", receiptId: "" },
      { flat: "B-804", name: "Priya Sharma", month: "June 2026", amount: 3200, dueDate: "10 June 2026", status: "paid", paidAt: "02 June 2026", txId: "TXN-B804-0626", method: "UPI", receiptId: "RCPT-B804-0626" },
      { flat: "C-502", name: "Rohit Verma", month: "June 2026", amount: 2800, dueDate: "10 June 2026", status: "paid", paidAt: "01 June 2026", txId: "TXN-C502-0626", method: "Card", receiptId: "RCPT-C502-0626" },
      { flat: "D-1101", name: "Neha Gupta", month: "June 2026", amount: 5200, dueDate: "10 June 2026", status: "pending", paidAt: "", txId: "", method: "", receiptId: "" },
      { flat: "E-303", name: "Amit Malhotra", month: "June 2026", amount: 3600, dueDate: "10 June 2026", status: "overdue", paidAt: "", txId: "", method: "", receiptId: "" },
    ]);
    setCommunityPolls([
      {
        id: 1,
        question: "Should society install EV charging points?",
        options: [
          { label: "Yes", votes: 18 },
          { label: "No", votes: 5 },
          { label: "Need Discussion", votes: 7 },
        ],
        votedOption: "",
        status: "active",
        createdBy: "Admin",
        createdAt: "Today",
      },
    ]);
    setBillPaid(false);
    setLogs([]);
    setResetKey((k) => k + 1);
    setResetSerial((s) => s + 1);
    notify("Demo fully reset");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe,transparent_32%),linear-gradient(135deg,#f8fafc,#eef6ff)] p-3 sm:p-5 lg:p-6 text-slate-900 overflow-x-hidden">
      <style>{`
        .sg-scroll{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;scroll-behavior:smooth}
        .sg-scroll::-webkit-scrollbar{display:none}
        .phone-polish{box-shadow:0 25px 80px rgba(15,23,42,.28), inset 0 0 0 1px rgba(255,255,255,.08)}
        .glass-card{backdrop-filter:blur(18px)}
        html,body,#root{width:100%;overflow-x:hidden}
        @media(max-width:640px){.demo-title{font-size:2.25rem;line-height:1.05}.demo-mode-btn{flex:1 1 calc(50% - .5rem)}.demo-step{font-size:10px}}
      `}</style>
      <Toast toast={toast} clear={() => setToast("")} />
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div><Logo /><h1 className="demo-title mt-5 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">SocioGate Clickable Demo</h1><p className="mt-3 text-slate-600 max-w-2xl">Stable demo with synchronized visitor, vehicle, resident and ERP lifecycle.</p></div>
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">{[["overview", "All Views"], ["resident", "Resident"], ["guard", "Guard"], ["erp", "ERP"]].map(([key, label]) => <Button key={key} onClick={() => setMode(key)} variant={mode === key ? "primary" : "ghost"} className="demo-mode-btn">{label}</Button>)}</div>
        </div>
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-white/80 glass-card border border-blue-100 p-4 shadow-sm"><p className="text-xs text-slate-500">Prototype Status</p><div className="mt-2 flex items-center gap-2 font-black text-emerald-600"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" /> Stable Build</div></div>
          <div className="rounded-2xl bg-white/80 glass-card border border-blue-100 p-4 shadow-sm"><p className="text-xs text-slate-500">Active Visitor</p><div className="mt-2 font-black text-slate-950">{activeVisitor ? `${activeVisitor.name} • ${activeVisitor.status}` : "None"}</div></div>
          <div className="rounded-2xl bg-white/80 glass-card border border-blue-100 p-4 shadow-sm"><p className="text-xs text-slate-500">Active Vehicle</p><div className="mt-2 font-black text-slate-950">{activeVehicle ? `${activeVehicle.number} • ${activeVehicle.status}` : "None"}</div></div>
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-4 shadow-lg text-white"><p className="text-xs text-blue-100">Pitch Mode</p><div className="mt-2 font-black">Investor-Level Preview</div></div>
        </div>
        <Card className="mt-4 p-4 flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">{steps.map((s) => <span key={s} className="demo-step rounded-full bg-blue-50 text-blue-700 text-xs font-bold px-3 py-2">{s}</span>)}</div>
          <Button onClick={resetDemo} variant="danger">Reset Demo</Button>
        </Card>
        <div className={`mt-8 gap-6 lg:gap-8 items-start ${mode === "overview" ? "grid grid-cols-1 md:grid-cols-2" : "flex flex-wrap justify-center"}`}>
          {(mode === "overview" || mode === "resident") && <div className="mx-auto"><ResidentApp key={`resident-${resetKey}`} activeVisitor={activeVisitor} visitorHistory={visitorHistory} setActiveVisitor={setActiveVisitor} saveVisitor={saveVisitor} preApprovedVisitors={preApprovedVisitors} setPreApprovedVisitors={setPreApprovedVisitors} sosAlerts={sosAlerts} setSosAlerts={setSosAlerts} notices={notices} communityPolls={communityPolls} setCommunityPolls={setCommunityPolls} billingLedger={billingLedger} setBillingLedger={setBillingLedger} addLog={addLog} notify={notify} billPaid={billPaid} setBillPaid={setBillPaid} /></div>}
          {(mode === "overview" || mode === "guard") && <div className="mx-auto"><GuardApp key={`guard-${resetKey}`} activeVisitor={activeVisitor} setActiveVisitor={setActiveVisitor} saveVisitor={saveVisitor} activeVehicle={activeVehicle} setActiveVehicle={setActiveVehicle} saveVehicle={saveVehicle} knownVisitors={knownVisitors} setKnownVisitors={setKnownVisitors} visitorAttempts={visitorAttempts} setVisitorAttempts={setVisitorAttempts} knownVehicles={knownVehicles} setKnownVehicles={setKnownVehicles} preApprovedVisitors={preApprovedVisitors} sosAlerts={sosAlerts} resetSerial={resetSerial} addLog={addLog} notify={notify} /></div>}
          {(mode === "overview" || mode === "erp") && <div className={mode === "overview" ? "md:col-span-2 w-full" : "w-full flex justify-center"}><AdminDashboard key={`erp-${resetKey}`} activeVisitor={activeVisitor} setActiveVisitor={setActiveVisitor} visitorHistory={visitorHistory} setVisitorHistory={setVisitorHistory} activeVehicle={activeVehicle} setActiveVehicle={setActiveVehicle} vehicleHistory={vehicleHistory} setVehicleHistory={setVehicleHistory} visitorAttempts={visitorAttempts} knownVehicles={knownVehicles} preApprovedVisitors={preApprovedVisitors} sosAlerts={sosAlerts} setSosAlerts={setSosAlerts} notices={notices} setNotices={setNotices} communityPolls={communityPolls} setCommunityPolls={setCommunityPolls} billingLedger={billingLedger} setBillingLedger={setBillingLedger} logs={logs} addLog={addLog} notify={notify} billPaid={billPaid} /></div>}
        </div>
      </div>
    </div>
  );
}
