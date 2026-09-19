# Royal Finance Hub

Build a world-class, enterprise financial advisory & brokerage CRM platform named "Royal Square Financial". 

### 🌟 Brand & Aesthetics
- **Theme**: Ultra-clean, modern, high-density executive fintech workbench (Linear/Stripe-tier aesthetic).
- **Color Palette**:
  - Primary Brand / Deep Navy: `#0d1738` / `#16265c`
  - Royal Accent Blue: `#2563eb` (hover: `#1d4ed8`, wash: `#eff6ff`)
  - Background Canvas: `#f8fafc` / `#f1f5f9`
  - Surface Cards: `#ffffff` with subtle borders (`#e2e8f0`) and soft shadows (`0 1px 3px rgba(0,0,0,0.02)`)
  - Status Indicators:
    - Success/Verified/Clear: `#15803d` / bg `#dcfce7`
    - Warning/Pending: `#b45309` / bg `#fef3c7`
    - Flagged/Urgent/Expired: `#dc2626` / bg `#fee2e2`
    - Info/Awaiting: `#1d4ed8` / bg `#dbeafe`
- **Typography**: Inter or IBM Plex Sans with IBM Plex Mono for account codes, claim numbers, and financial values.

---

### 🧱 1. Global Shell & Layout Structure
1. **Top Header Bar (Sticky, 64px height, White)**:
   - **Left**: Royal Square Financial logo mark (4-square grid emblem) + "Royal Square" (bold) + "FINANCIAL" (small uppercase tracking).
   - **Center**: Global Search Input (`Search clients, policies, claims, documents...`) with `Ctrl + K` badge triggering a Command Palette modal.
   - **Right**:
     - Notification Bell button with red badge counter (`5`), clicking opens a notification flyout with unread/read items and "Mark all read".
     - User Profile pill: Circle initials avatar (`NF` in `#dbeafe`), User Name (`Nadia Fourie`), Role subtitle (`Advisor`).

2. **Left Navigation Sidebar (Dark Navy `#0d1738`, 240px wide)**:
   - **Navigation items with clean icons and active capsule highlights**:
     - 🏠 **Today** (`/`)
     - 🔔 **Action Centre** (`/action-centre`) — with red badge count `5`
     - 👥 **Clients** (`/clients`) — active highlighted in royal blue
     - 🛡️ **Claims** (`/claims`)
     - 📈 **Financial Planning** (`/financial-planning`)
     - 🪙 **Investments** (`/investments`)
     - 📄 **Policies** (`/policies`)
     - 🎯 **Goals** (`/goals`)
     - 📁 **Documents** (`/documents`) — expandable accordion containing:
       - `Documents` (active indicator)
       - `Templates`
       - `E-signatures`
     - 💬 **Communications** (`/communications`)
     - 🛡️ **Compliance** (`/compliance`)
     - 📅 **Calendar** (`/calendar`)
     - 📊 **Reports** (`/reports`)
     - 🔗 **Integrations** (`/integrations`)
   - **Bottom Profile Card**: Avatar `NF`, `Nadia Fourie`, `Advisor`, dropdown chevron, and `Sign out` link.

---

### 👤 2. Client 360 Page (`/clients/:id`)
1. **Top Bar**: `← Back to Clients` link.
2. **Client Hero Strip Card**:
   - Large circular avatar (`AV` initials in light blue).
   - Name: `Ayesha van Wyk` + green status badge `● Active`.
   - Meta strip: `Client #RS-1028` | `+27 82 123 4567` | `ayesha@company.co.za`.
   - Right statistics: `👤 Adviser: Nadia Fourie` and `📅 Client since 12 Mar 2023`.
3. **Underline Tab Navigation Bar (11 Tabs)**:
   - `Overview` | `Financial` | `Policies` | `Investments` | `Goals` | `Claims` | `Documents` (Default Active) | `Requests` | `Communications` | `Timeline` | `Activity`.
4. **Documents Tab Layout (2-Column Grid: 1fr Main + 280px Right Sidebar)**:
   - **Main Content**:
     - Header: Title `Documents`, description `Manage client documents, track status and handle e-signatures.`, and two CTA buttons: `☁ Upload Document` (primary blue) and `📄 Request Document` (secondary white).
     - Filter Bar: Search input (`Search documents...`), Category dropdown (`All categories`, `Identity`, `Address`, `Legal`, `Policy`, `Financial`, `Claims`, `Investments`), Status dropdown (`All status`, `Verified`, `Pending`, `Signed`, `Awaiting signature`, `Draft`, `Expired`), Type dropdown (`All types`, `Identity Document`, `Proof of Address`, `E-signature`, `PDF`, `Form`).
     - Interactive Table:
       - Columns: `[Checkbox]` | `Document` (with red PDF, green, blue, purple, orange icon badges + document title + subtitle) | `Category` (pill badge) | `Type` | `Status` (colored dot pill) | `Updated` (date + by System/Client/Adviser) | `Expiry Date` | `Actions (···)`
       - Full interactive row selection (select all / select one).
       - Contextual `···` action menu (View Document, Download, Send for Signature, Delete).
     - Table Footer: `Showing 8 of 28 documents` + Pagination controls (`‹ 1 2 3 4 ›`).
   - **Right Widget Sidebar (Stacked Cards)**:
     - **Client Health Card**: `💚 Client Health >` showing `💚 Healthy`.
     - **Quick Actions Card**: 4 buttons: `☁ Upload Document`, `📄 Request Document`, `✏ Send for Signature`, `⬇ Download All`.
     - **Document Summary Card**: Real-time breakdown: `Total: 28`, `● Verified: 18` (green), `● Pending: 6` (amber), `● Draft: 2` (gray), `● Expired: 2` (red).
     - **Upcoming Expiry Card**: Header `📅 Upcoming Expiry` with `View all` link; items with days countdown badges (`ID Document: 180 days`, `Medical Aid Card: 54 days`, `Policy Document: 75 days`).
     - **E-signatures Promo Card**: Gradient card with `🛡 E-signatures`, description, and `Learn more →` link.
5. **Interactive Modals**:
   - `Upload Document Modal`: Drag & drop file area, title input, category selector, file upload action.
   - `Request Document Modal`: Required doc input, custom note textarea, due date picker.
   - `Send for Signature Modal`: Document picker, signer email, AES security toggle.

---

### 💬 3. Communications Hub (`/communications`)
- **Filter Toolbar**:
  - Channel filter tabs with counters: `All Channels (14)`, `✉ Email (6)`, `💬 WhatsApp (5)`, `📱 SMS (3)`.
  - Direction toggles: `All`, `↓ Inbound`, `↑ Outbound`.
  - Live search input for clients, senders, or message content.
- **Communication Cards**:
  - Client initials avatar circle with gradient background.
  - Client name link leading to `/clients/:id`.
  - Channel badge (Email blue, WhatsApp green `#047857`, SMS purple `#6d28d9`).
  - Direction tag (`↓ Inbound` green, `↑ Outbound` slate).
  - `✨ AI Drafted` badge for AI-triaged messages.
  - Click-to-inspect modal opening the full message body with quick reply / view actions.

---

### 🛡️ 4. Compliance Centre (`/compliance`)
- **FICA & Screening Overview**: Progress bar showing % verified.
- **Summary Cards**: Compliant clients, Awaiting documents, Requiring review.
- **Exceptions Table**: Filterable list of clients with compliance issues, severity tags (`High`, `Medium`, `Low`), and one-click "Resolve / Request" actions.

---

### 📊 5. Reports & Analytics (`/reports`)
- **Top Metric Cards Grid**: Total Clients, Active Policies, Open Claims, Outstanding Tasks.
- **Progress Breakdown**: FICA verification %, Documents complete %, Reviews complete %.
- **Adviser Distribution Table**: Clients per adviser, average claim duration, and book health.

---

### ⌨️ 6. Command Palette (`Ctrl + K` Modal)
- Instant keyboard search across clients, policies, claims, and navigation shortcuts.
- Arrow key navigation + `Enter` to navigate + `Esc` to dismiss.

---

### 💻 Tech Stack & Output Requirements
- React 18 + TypeScript + TailwindCSS / Clean CSS.
- Keep components modular and export clean, reusable files.
- Use native HTML inputs, full keyboard accessibility, smooth animations, and toast feedback for all interactive buttons.
ypeScript Data Contracts (For 100% Backend Compatibility)

When Lovable generates mock data or API services, ensure it adheres to these data shapes so you can drop the code straight into royal_square/web/src/api/types.ts:

typescript

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

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d348d0e8-756d-5a97-8546-1e67461209f1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
