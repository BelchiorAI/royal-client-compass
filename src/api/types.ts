export interface ClientPersonal {
  full_name: string;
  date_of_birth: string | null;
  employment_title: string;
  background: string;
  status: string;
  id_number?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface ClientFinancial {
  income: number;
  assets: number;
  liabilities: number;
  investments: number;
  net_worth: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  sub: string;
  category: "Identity" | "Address" | "Legal" | "Policy" | "Financial" | "Claims" | "Investments";
  type: string;
  iconType: "pdf" | "green" | "blue" | "purple" | "orange";
  status: "Verified" | "Pending" | "Signed" | "Awaiting signature" | "Draft" | "Expired";
  updatedDate: string;
  updatedBy: string;
  expiryDate?: string;
}

export interface CommunicationEntry {
  id: string;
  channel: "email" | "sms" | "whatsapp" | "push";
  direction: "inbound" | "outbound";
  client_id: number | null;
  client_name: string;
  sender: string;
  subject: string | null;
  preview: string;
  timestamp: string | null;
  ai_assisted: boolean;
}

export interface ComplianceSummary {
  total_clients: number;
  fica_pct: number;
  compliant: number;
  awaiting_documents: number;
  requiring_review: number;
  exceptions: {
    client_id: number;
    client_name: string;
    issue: string;
    severity: "high" | "medium" | "low";
  }[];
}

/* ---- App-level composite shapes (extend the contracts above) ---- */

export interface ClientRecord {
  id: number;
  code: string;
  personal: ClientPersonal;
  financial: ClientFinancial;
  adviser: string;
  client_since: string;
  health: "healthy" | "attention" | "at_risk";
  fica: "verified" | "pending" | "expired";
}

export interface PolicyRecord {
  id: string;
  number: string;
  client_id: number;
  client_name: string;
  insurer: string;
  product: string;
  premium: number;
  status: "Active" | "Lapsed" | "Pending" | "Cancelled";
  renewal: string;
}

export interface ClaimRecord {
  id: string;
  number: string;
  client_id: number;
  client_name: string;
  type: string;
  amount: number;
  status: "Open" | "In review" | "Approved" | "Paid" | "Declined";
  opened: string;
  days_open: number;
}

export interface TaskRecord {
  id: string;
  title: string;
  client_id: number | null;
  client_name: string | null;
  due: string;
  priority: "high" | "medium" | "low";
  kind: "document" | "review" | "signature" | "call" | "compliance";
  done: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: "claim" | "document" | "signature" | "compliance" | "message";
}
