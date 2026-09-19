import type {
  ClaimRecord,
  ClientRecord,
  CommunicationEntry,
  ComplianceSummary,
  DocumentItem,
  NotificationItem,
  PolicyRecord,
  TaskRecord,
} from "./types";

export const CURRENT_USER = { name: "Nadia Fourie", role: "Advisor", initials: "NF" };

export const clients: ClientRecord[] = [
  {
    id: 1028,
    code: "RS-1028",
    personal: {
      full_name: "Ayesha van Wyk",
      date_of_birth: "1984-06-14",
      employment_title: "Operations Director, Meridian Logistics",
      background: "Long-standing client with a diversified portfolio and two active life policies.",
      status: "Active",
      id_number: "8406140123086",
      email: "ayesha@company.co.za",
      phone: "+27 82 123 4567",
      address: "14 Rosebank Lane, Johannesburg, 2196",
    },
    financial: { income: 1450000, assets: 6820000, liabilities: 1240000, investments: 3150000, net_worth: 5580000 },
    adviser: "Nadia Fourie",
    client_since: "2023-03-12",
    health: "healthy",
    fica: "verified",
  },
  {
    id: 1031,
    code: "RS-1031",
    personal: {
      full_name: "Thabo Mokoena",
      date_of_birth: "1979-11-02",
      employment_title: "Managing Partner, Mokoena & Partners",
      background: "High-net-worth client. Estate planning review scheduled this quarter.",
      status: "Active",
      email: "thabo.m@mokoenapartners.co.za",
      phone: "+27 83 555 0192",
    },
    financial: { income: 2900000, assets: 15400000, liabilities: 2100000, investments: 8900000, net_worth: 13300000 },
    adviser: "Nadia Fourie",
    client_since: "2021-08-04",
    health: "attention",
    fica: "pending",
  },
  {
    id: 1044,
    code: "RS-1044",
    personal: {
      full_name: "Lerato Dlamini",
      date_of_birth: "1991-02-22",
      employment_title: "Software Engineer, Takealot",
      background: "Young professional building a first investment portfolio.",
      status: "Active",
      email: "lerato.d@gmail.com",
      phone: "+27 71 402 8871",
    },
    financial: { income: 780000, assets: 1120000, liabilities: 640000, investments: 410000, net_worth: 480000 },
    adviser: "Sipho Ndlovu",
    client_since: "2024-01-19",
    health: "healthy",
    fica: "verified",
  },
  {
    id: 1052,
    code: "RS-1052",
    personal: {
      full_name: "Pieter Botha",
      date_of_birth: "1962-09-30",
      employment_title: "Retired",
      background: "Living annuity drawdown; annual review overdue.",
      status: "Review",
      email: "pbotha@outlook.com",
      phone: "+27 82 998 1204",
    },
    financial: { income: 520000, assets: 9800000, liabilities: 0, investments: 8700000, net_worth: 9800000 },
    adviser: "Nadia Fourie",
    client_since: "2019-05-23",
    health: "at_risk",
    fica: "expired",
  },
  {
    id: 1067,
    code: "RS-1067",
    personal: {
      full_name: "Naledi Khumalo",
      date_of_birth: "1988-04-11",
      employment_title: "Medical Specialist, Netcare",
      background: "Income protection and medical gap cover in place.",
      status: "Active",
      email: "naledi.k@netcare.co.za",
      phone: "+27 84 301 7752",
    },
    financial: { income: 2100000, assets: 4300000, liabilities: 1900000, investments: 1600000, net_worth: 2400000 },
    adviser: "Sipho Ndlovu",
    client_since: "2022-11-07",
    health: "healthy",
    fica: "verified",
  },
  {
    id: 1073,
    code: "RS-1073",
    personal: {
      full_name: "Johan Pretorius",
      date_of_birth: "1975-01-18",
      employment_title: "Farm Owner",
      background: "Agricultural asset cover with seasonal cashflow.",
      status: "Active",
      email: "johan@pretoriusboerdery.co.za",
      phone: "+27 82 777 3310",
    },
    financial: { income: 1900000, assets: 22000000, liabilities: 6500000, investments: 2400000, net_worth: 15500000 },
    adviser: "Amara Naidoo",
    client_since: "2020-02-14",
    health: "attention",
    fica: "pending",
  },
  {
    id: 1081,
    code: "RS-1081",
    personal: {
      full_name: "Zanele Mthembu",
      date_of_birth: "1995-07-05",
      employment_title: "Marketing Manager, Discovery",
      background: "Onboarding in progress; FICA docs outstanding.",
      status: "Onboarding",
      email: "zanele.mthembu@discovery.co.za",
      phone: "+27 76 220 4419",
    },
    financial: { income: 650000, assets: 450000, liabilities: 320000, investments: 90000, net_worth: 130000 },
    adviser: "Amara Naidoo",
    client_since: "2026-08-28",
    health: "attention",
    fica: "pending",
  },
  {
    id: 1090,
    code: "RS-1090",
    personal: {
      full_name: "Rajesh Pillay",
      date_of_birth: "1970-12-09",
      employment_title: "CFO, Coastal Holdings",
      background: "Complex trust structure; multiple offshore holdings.",
      status: "Active",
      email: "r.pillay@coastalholdings.com",
      phone: "+27 83 118 9903",
    },
    financial: { income: 3800000, assets: 31000000, liabilities: 4200000, investments: 19500000, net_worth: 26800000 },
    adviser: "Nadia Fourie",
    client_since: "2018-10-01",
    health: "healthy",
    fica: "verified",
  },
];

export const getClient = (id: number) => clients.find((c) => c.id === id);

export const documents: DocumentItem[] = [
  { id: "d1", name: "South African ID Document", sub: "Smart ID card — front & back", category: "Identity", type: "Identity Document", iconType: "green", status: "Verified", updatedDate: "2026-09-02", updatedBy: "System", expiryDate: "2027-03-18" },
  { id: "d2", name: "Proof of Residential Address", sub: "Municipal account, Aug 2026", category: "Address", type: "Proof of Address", iconType: "blue", status: "Verified", updatedDate: "2026-08-29", updatedBy: "Client", expiryDate: "2026-11-27" },
  { id: "d3", name: "Financial Needs Analysis", sub: "FNA 2026 — signed", category: "Financial", type: "PDF", iconType: "pdf", status: "Signed", updatedDate: "2026-08-15", updatedBy: "Adviser" },
  { id: "d4", name: "Record of Advice", sub: "Retirement annuity top-up", category: "Legal", type: "E-signature", iconType: "purple", status: "Awaiting signature", updatedDate: "2026-09-16", updatedBy: "Adviser" },
  { id: "d5", name: "Life Cover Policy Schedule", sub: "Liberty — LC-8841203", category: "Policy", type: "PDF", iconType: "pdf", status: "Verified", updatedDate: "2026-07-21", updatedBy: "System", expiryDate: "2026-12-03" },
  { id: "d6", name: "Medical Aid Membership Card", sub: "Discovery Health — Classic Comp", category: "Claims", type: "Identity Document", iconType: "orange", status: "Pending", updatedDate: "2026-09-10", updatedBy: "Client", expiryDate: "2026-11-12" },
  { id: "d7", name: "Investment Mandate", sub: "Discretionary mandate — Allan Gray", category: "Investments", type: "Form", iconType: "blue", status: "Draft", updatedDate: "2026-09-18", updatedBy: "Adviser" },
  { id: "d8", name: "Tax Clearance Certificate", sub: "SARS — 2025 tax year", category: "Financial", type: "PDF", iconType: "pdf", status: "Expired", updatedDate: "2026-03-30", updatedBy: "System", expiryDate: "2026-08-31" },
];

export const documentSummary = { total: 28, verified: 18, pending: 6, draft: 2, expired: 2 };

export const upcomingExpiry = [
  { name: "ID Document", days: 180 },
  { name: "Medical Aid Card", days: 54 },
  { name: "Policy Document", days: 75 },
];

export const communications: CommunicationEntry[] = [
  { id: "c1", channel: "email", direction: "inbound", client_id: 1028, client_name: "Ayesha van Wyk", sender: "ayesha@company.co.za", subject: "Updated proof of address attached", preview: "Hi Nadia, please find my latest municipal statement attached for the FICA refresh. Let me know if you need anything else.", timestamp: "2026-09-19T08:42:00Z", ai_assisted: true },
  { id: "c2", channel: "whatsapp", direction: "inbound", client_id: 1031, client_name: "Thabo Mokoena", sender: "+27 83 555 0192", subject: null, preview: "Morning — can we move Thursday's estate review to 15:00? Something came up at the office.", timestamp: "2026-09-19T07:15:00Z", ai_assisted: true },
  { id: "c3", channel: "sms", direction: "outbound", client_id: 1052, client_name: "Pieter Botha", sender: "Royal Square", subject: null, preview: "Reminder: your annual review is overdue. Reply YES and we'll call to schedule a time that suits you.", timestamp: "2026-09-18T15:30:00Z", ai_assisted: false },
  { id: "c4", channel: "email", direction: "outbound", client_id: 1090, client_name: "Rajesh Pillay", sender: "nadia.fourie@royalsquare.co.za", subject: "Q3 portfolio performance summary", preview: "Rajesh, attached is the Q3 summary across your discretionary and offshore mandates. Overall return 6.4% vs benchmark 5.1%.", timestamp: "2026-09-18T11:05:00Z", ai_assisted: true },
  { id: "c5", channel: "whatsapp", direction: "outbound", client_id: 1081, client_name: "Zanele Mthembu", sender: "Royal Square", subject: null, preview: "Hi Zanele! Welcome aboard. To finish onboarding we still need your ID and proof of address — you can upload them via the secure link here.", timestamp: "2026-09-18T09:20:00Z", ai_assisted: false },
  { id: "c6", channel: "email", direction: "inbound", client_id: 1067, client_name: "Naledi Khumalo", sender: "naledi.k@netcare.co.za", subject: "Gap cover claim — hospital invoice", preview: "Please see attached invoice from Sunninghill for the procedure on 9 Sept. Medical aid has paid their portion.", timestamp: "2026-09-17T16:48:00Z", ai_assisted: true },
  { id: "c7", channel: "sms", direction: "inbound", client_id: 1073, client_name: "Johan Pretorius", sender: "+27 82 777 3310", subject: null, preview: "Hail damage on the north fields last night. Need to lodge a claim urgently please.", timestamp: "2026-09-17T06:02:00Z", ai_assisted: true },
  { id: "c8", channel: "whatsapp", direction: "inbound", client_id: 1044, client_name: "Lerato Dlamini", sender: "+27 71 402 8871", subject: null, preview: "Is now a good time to increase my monthly TFSA debit order to R3 000?", timestamp: "2026-09-16T18:22:00Z", ai_assisted: false },
  { id: "c9", channel: "email", direction: "outbound", client_id: 1031, client_name: "Thabo Mokoena", sender: "nadia.fourie@royalsquare.co.za", subject: "Documents required for FICA refresh", preview: "Thabo, as part of our regulatory refresh we need an updated proof of address dated within 3 months.", timestamp: "2026-09-16T10:10:00Z", ai_assisted: false },
  { id: "c10", channel: "email", direction: "inbound", client_id: 1052, client_name: "Pieter Botha", sender: "pbotha@outlook.com", subject: "Living annuity drawdown rate", preview: "I'd like to discuss reducing my drawdown to 4% from March. What are the implications?", timestamp: "2026-09-15T13:40:00Z", ai_assisted: true },
  { id: "c11", channel: "whatsapp", direction: "outbound", client_id: 1067, client_name: "Naledi Khumalo", sender: "Royal Square", subject: null, preview: "Received, thank you Naledi. Claim CL-3391 has been lodged with the insurer — expect an update within 5 working days.", timestamp: "2026-09-17T17:05:00Z", ai_assisted: true },
  { id: "c12", channel: "sms", direction: "outbound", client_id: 1044, client_name: "Lerato Dlamini", sender: "Royal Square", subject: null, preview: "Your e-signature request for the Investment Mandate is ready. Secure link expires in 72 hours.", timestamp: "2026-09-15T09:00:00Z", ai_assisted: false },
  { id: "c13", channel: "email", direction: "inbound", client_id: 1090, client_name: "Rajesh Pillay", sender: "r.pillay@coastalholdings.com", subject: "Re: Q3 portfolio performance summary", preview: "Thanks Nadia. Let's rebalance the offshore allocation — happy to sign the revised mandate this week.", timestamp: "2026-09-18T14:12:00Z", ai_assisted: false },
  { id: "c14", channel: "whatsapp", direction: "inbound", client_id: 1073, client_name: "Johan Pretorius", sender: "+27 82 777 3310", subject: null, preview: "Photos of the hail damage attached. Assessor can come any day this week.", timestamp: "2026-09-17T07:30:00Z", ai_assisted: false },
];

export const compliance: ComplianceSummary = {
  total_clients: 248,
  fica_pct: 87,
  compliant: 216,
  awaiting_documents: 21,
  requiring_review: 11,
  exceptions: [
    { client_id: 1052, client_name: "Pieter Botha", issue: "FICA verification expired — ID and proof of address older than 36 months", severity: "high" },
    { client_id: 1031, client_name: "Thabo Mokoena", issue: "Proof of address outstanding for regulatory refresh", severity: "medium" },
    { client_id: 1081, client_name: "Zanele Mthembu", issue: "Onboarding incomplete — ID document not received", severity: "high" },
    { client_id: 1073, client_name: "Johan Pretorius", issue: "Source of funds declaration missing for lump-sum deposit", severity: "medium" },
    { client_id: 1090, client_name: "Rajesh Pillay", issue: "PEP screening rescan due (annual)", severity: "low" },
    { client_id: 1044, client_name: "Lerato Dlamini", issue: "Record of Advice unsigned for TFSA increase", severity: "low" },
  ],
};

export const policies: PolicyRecord[] = [
  { id: "p1", number: "LC-8841203", client_id: 1028, client_name: "Ayesha van Wyk", insurer: "Liberty", product: "Life Cover", premium: 2450, status: "Active", renewal: "2026-12-03" },
  { id: "p2", number: "IP-2210987", client_id: 1067, client_name: "Naledi Khumalo", insurer: "Discovery Life", product: "Income Protection", premium: 3890, status: "Active", renewal: "2027-02-14" },
  { id: "p3", number: "SA-5510442", client_id: 1073, client_name: "Johan Pretorius", insurer: "Santam", product: "Agri Asset Cover", premium: 18400, status: "Active", renewal: "2026-10-30" },
  { id: "p4", number: "LA-7734001", client_id: 1052, client_name: "Pieter Botha", insurer: "Allan Gray", product: "Living Annuity", premium: 0, status: "Active", renewal: "2027-03-01" },
  { id: "p5", number: "RA-1190334", client_id: 1044, client_name: "Lerato Dlamini", insurer: "Sygnia", product: "Retirement Annuity", premium: 2500, status: "Pending", renewal: "2027-01-19" },
  { id: "p6", number: "DR-3300218", client_id: 1031, client_name: "Thabo Mokoena", insurer: "Momentum", product: "Dread Disease", premium: 1870, status: "Lapsed", renewal: "2026-08-04" },
  { id: "p7", number: "MG-4408811", client_id: 1090, client_name: "Rajesh Pillay", insurer: "Old Mutual", product: "Key Person Cover", premium: 6200, status: "Active", renewal: "2027-05-10" },
];

export const claims: ClaimRecord[] = [
  { id: "cl1", number: "CL-3391", client_id: 1067, client_name: "Naledi Khumalo", type: "Gap cover — hospital", amount: 48200, status: "In review", opened: "2026-09-17", days_open: 2 },
  { id: "cl2", number: "CL-3388", client_id: 1073, client_name: "Johan Pretorius", type: "Hail damage — crop", amount: 1250000, status: "Open", opened: "2026-09-17", days_open: 2 },
  { id: "cl3", number: "CL-3370", client_id: 1028, client_name: "Ayesha van Wyk", type: "Vehicle — accident", amount: 86400, status: "Approved", opened: "2026-08-22", days_open: 28 },
  { id: "cl4", number: "CL-3352", client_id: 1090, client_name: "Rajesh Pillay", type: "Household contents — theft", amount: 210000, status: "Paid", opened: "2026-07-30", days_open: 19 },
  { id: "cl5", number: "CL-3341", client_id: 1031, client_name: "Thabo Mokoena", type: "Dread disease", amount: 950000, status: "Declined", opened: "2026-07-11", days_open: 34 },
];

export const tasks: TaskRecord[] = [
  { id: "t1", title: "Countersign Record of Advice", client_id: 1028, client_name: "Ayesha van Wyk", due: "2026-09-19", priority: "high", kind: "signature", done: false },
  { id: "t2", title: "Chase proof of address for FICA refresh", client_id: 1031, client_name: "Thabo Mokoena", due: "2026-09-19", priority: "high", kind: "document", done: false },
  { id: "t3", title: "Lodge hail damage claim with Santam", client_id: 1073, client_name: "Johan Pretorius", due: "2026-09-19", priority: "high", kind: "review", done: false },
  { id: "t4", title: "Annual review call", client_id: 1052, client_name: "Pieter Botha", due: "2026-09-22", priority: "medium", kind: "call", done: false },
  { id: "t5", title: "PEP rescan", client_id: 1090, client_name: "Rajesh Pillay", due: "2026-09-30", priority: "low", kind: "compliance", done: false },
  { id: "t6", title: "Submit quarterly FAIS compliance report", client_id: null, client_name: null, due: "2026-09-30", priority: "medium", kind: "compliance", done: false },
];

export const notifications: NotificationItem[] = [
  { id: "n1", title: "New claim lodged", body: "Johan Pretorius — hail damage claim CL-3388 needs assessor booking.", time: "12 min ago", read: false, kind: "claim" },
  { id: "n2", title: "Document uploaded", body: "Ayesha van Wyk uploaded Proof of Residential Address.", time: "1 h ago", read: false, kind: "document" },
  { id: "n3", title: "Signature pending", body: "Record of Advice for Ayesha van Wyk awaits your countersignature.", time: "3 h ago", read: false, kind: "signature" },
  { id: "n4", title: "FICA expiring", body: "Pieter Botha's FICA verification expired on 31 Aug.", time: "Yesterday", read: false, kind: "compliance" },
  { id: "n5", title: "WhatsApp from Thabo Mokoena", body: "Request to reschedule Thursday's estate review.", time: "Yesterday", read: false, kind: "message" },
  { id: "n6", title: "Claim paid", body: "Rajesh Pillay — CL-3352 settled for R210 000.", time: "2 days ago", read: true, kind: "claim" },
  { id: "n7", title: "Mandate signed", body: "Naledi Khumalo signed the Income Protection amendment.", time: "3 days ago", read: true, kind: "signature" },
];

export const advisers = [
  { name: "Nadia Fourie", clients: 94, avg_claim_days: 14, health: 92 },
  { name: "Sipho Ndlovu", clients: 81, avg_claim_days: 19, health: 86 },
  { name: "Amara Naidoo", clients: 73, avg_claim_days: 22, health: 78 },
];

export const formatZAR = (n: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(n).replace("ZAR", "R");

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
