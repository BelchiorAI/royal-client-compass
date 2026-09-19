import { useMemo, useState } from "react";
import {
  CloudUpload,
  FileText,
  PenLine,
  Download,
  MoreHorizontal,
  Search,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Heart,
  ChevronRight as Chevron,
  CalendarDays,
  ShieldCheck,
  FileCheck2,
  FileBadge,
  FileSignature,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { documents as seed, documentSummary, upcomingExpiry, formatDate } from "@/api/mock";
import type { ClientRecord, DocumentItem } from "@/api/types";
import { Pill, btn, statusTone, type Tone } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";
import { UploadDocumentModal, RequestDocumentModal, SendForSignatureModal, type DocModal } from "./DocumentModals";

const CATEGORIES = ["All categories", "Identity", "Address", "Legal", "Policy", "Financial", "Claims", "Investments"];
const STATUSES = ["All status", "Verified", "Pending", "Signed", "Awaiting signature", "Draft", "Expired"];
const TYPES = ["All types", "Identity Document", "Proof of Address", "E-signature", "PDF", "Form"];

const iconStyles: Record<DocumentItem["iconType"], { cls: string; Icon: typeof FileText }> = {
  pdf: { cls: "bg-danger-bg text-danger", Icon: FileText },
  green: { cls: "bg-success-bg text-success", Icon: FileCheck2 },
  blue: { cls: "bg-info-bg text-info", Icon: FileBadge },
  purple: { cls: "bg-purple-bg text-purple", Icon: FileSignature },
  orange: { cls: "bg-orange-bg text-orange", Icon: FileSpreadsheet },
};

const categoryTone: Record<DocumentItem["category"], Tone> = {
  Identity: "success",
  Address: "info",
  Legal: "purple",
  Policy: "neutral",
  Financial: "orange",
  Claims: "warning",
  Investments: "info",
};

export function DocumentsTab({ client }: { client: ClientRecord }) {
  const [docs, setDocs] = useState(seed);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(CATEGORIES[0]!);
  const [status, setStatus] = useState(STATUSES[0]!);
  const [type, setType] = useState(TYPES[0]!);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<DocModal>(null);
  const [signDoc, setSignDoc] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      docs.filter(
        (d) =>
          (cat === CATEGORIES[0] || d.category === cat) &&
          (status === STATUSES[0] || d.status === status) &&
          (type === TYPES[0] || d.type === type) &&
          `${d.name} ${d.sub}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [docs, q, cat, status, type],
  );

  const allSelected = filtered.length > 0 && filtered.every((d) => selected.has(d.id));
  const someSelected = filtered.some((d) => selected.has(d.id));

  const toggleAll = () =>
    setSelected((s) => {
      const n = new Set(s);
      if (allSelected) filtered.forEach((d) => n.delete(d.id));
      else filtered.forEach((d) => n.add(d.id));
      return n;
    });
  const toggle = (id: string) =>
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const remove = (id: string) => {
    const d = docs.find((x) => x.id === id);
    setDocs((p) => p.filter((x) => x.id !== id));
    setSelected((s) => {
      const n = new Set(s);
      n.delete(id);
      return n;
    });
    toast("Document deleted", {
      description: d?.name,
      action: { label: "Undo", onClick: () => d && setDocs((p) => [...p, d].sort((a, b) => seed.indexOf(a) - seed.indexOf(b))) },
    });
  };

  const openSign = (id?: string) => {
    setSignDoc(id);
    setModal("sign");
  };

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
        {/* Main */}
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Documents</h2>
              <p className="mt-0.5 text-[13px] text-muted-foreground">Manage client documents, track status and handle e-signatures.</p>
            </div>
            <div className="flex gap-2">
              <button className={btn.primary} onClick={() => setModal("upload")}>
                <CloudUpload className="size-4" /> Upload Document
              </button>
              <button className={btn.secondary} onClick={() => setModal("request")}>
                <FileText className="size-4" /> Request Document
              </button>
            </div>
          </div>

          <div className="surface overflow-hidden">
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-2 border-b bg-background/60 p-3">
              <div className="relative min-w-[220px] flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  className={cn(btn.input, "pl-8")}
                  placeholder="Search documents..."
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    setPage(1);
                  }}
                  aria-label="Search documents"
                />
              </div>
              {[
                [cat, setCat, CATEGORIES, "Category"],
                [status, setStatus, STATUSES, "Status"],
                [type, setType, TYPES, "Type"],
              ].map(([val, set, opts, label]) => (
                <select
                  key={label as string}
                  aria-label={label as string}
                  className={cn(btn.input, "w-auto min-w-[140px] pr-8")}
                  value={val as string}
                  onChange={(e) => (set as (v: string) => void)(e.target.value)}
                >
                  {(opts as string[]).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ))}
              {selected.size > 0 && (
                <div className="ml-auto flex items-center gap-2 animate-scale-in">
                  <span className="text-[12px] text-muted-foreground">{selected.size} selected</span>
                  <button className={btn.ghost} onClick={() => toast.success(`Downloading ${selected.size} documents`)}>
                    <Download className="size-3.5" /> Download
                  </button>
                  <button
                    className={cn(btn.ghost, "text-danger hover:text-danger")}
                    onClick={() => {
                      setDocs((p) => p.filter((d) => !selected.has(d.id)));
                      toast(`${selected.size} documents deleted`);
                      setSelected(new Set());
                    }}
                  >
                    <Trash2 className="size-3.5" /> Delete
                  </button>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b bg-background/60 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="w-10 px-3 py-2.5">
                      <Checkbox
                        checked={allSelected ? true : someSelected ? "indeterminate" : false}
                        onCheckedChange={toggleAll}
                        aria-label="Select all documents"
                      />
                    </th>
                    <th className="px-3 py-2.5 font-semibold">Document</th>
                    <th className="px-3 py-2.5 font-semibold">Category</th>
                    <th className="px-3 py-2.5 font-semibold">Type</th>
                    <th className="px-3 py-2.5 font-semibold">Status</th>
                    <th className="px-3 py-2.5 font-semibold">Updated</th>
                    <th className="whitespace-nowrap px-3 py-2.5 font-semibold">Expiry Date</th>
                    <th className="w-12 px-3 py-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-3 py-12 text-center text-muted-foreground">
                        No documents match your filters.
                      </td>
                    </tr>
                  )}
                  {filtered.map((d) => {
                    const { cls, Icon } = iconStyles[d.iconType];
                    const isSel = selected.has(d.id);
                    return (
                      <tr
                        key={d.id}
                        data-state={isSel ? "selected" : undefined}
                        className="group border-b last:border-0 transition-colors hover:bg-background data-[state=selected]:bg-primary-wash/50"
                      >
                        <td className="px-3 py-3">
                          <Checkbox checked={isSel} onCheckedChange={() => toggle(d.id)} aria-label={`Select ${d.name}`} />
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg", cls)}>
                              <Icon className="size-4" strokeWidth={1.75} />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-foreground">{d.name}</p>
                              <p className="truncate text-[12px] text-muted-foreground">{d.sub}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <Pill tone={categoryTone[d.category]}>{d.category}</Pill>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-muted-foreground">{d.type}</td>
                        <td className="px-3 py-3">
                          <Pill dot tone={statusTone(d.status)}>
                            {d.status}
                          </Pill>
                        </td>
                        <td className="px-3 py-3">
                          <p className="numeric whitespace-nowrap text-[12.5px]">{formatDate(d.updatedDate)}</p>
                          <p className="text-[11.5px] text-muted-foreground">by {d.updatedBy}</p>
                        </td>
                        <td className="px-3 py-3">
                          {d.expiryDate ? (
                            <span className={cn("numeric whitespace-nowrap text-[12.5px]", d.status === "Expired" && "text-danger")}>{formatDate(d.expiryDate)}</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="px-3 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className={btn.icon} aria-label={`Actions for ${d.name}`}>
                                <MoreHorizontal className="size-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                              <DropdownMenuItem onClick={() => toast(`Opening ${d.name}`)}>
                                <Eye className="size-4" /> View Document
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success(`Downloading ${d.name}`)}>
                                <Download className="size-4" /> Download
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openSign(d.id)}>
                                <PenLine className="size-4" /> Send for Signature
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-danger focus:text-danger" onClick={() => remove(d.id)}>
                                <Trash2 className="size-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t px-4 py-3 text-[12.5px] text-muted-foreground">
              <span>
                Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
                <span className="font-medium text-foreground">{documentSummary.total}</span> documents
              </span>
              <nav className="flex items-center gap-1" aria-label="Pagination">
                <button className={btn.icon} disabled={page === 1} onClick={() => setPage((p) => p - 1)} aria-label="Previous page">
                  <ChevronLeft className="size-4" />
                </button>
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setPage(n);
                      if (n !== 1) toast("Demo dataset", { description: "Only the first page contains sample documents." });
                    }}
                    aria-current={page === n ? "page" : undefined}
                    className={cn(
                      "size-8 rounded-md text-[12.5px] font-medium transition-colors",
                      page === n ? "bg-primary text-primary-foreground" : "hover:bg-canvas",
                    )}
                  >
                    {n}
                  </button>
                ))}
                <button className={btn.icon} disabled={page === 4} onClick={() => setPage((p) => p + 1)} aria-label="Next page">
                  <ChevronRight className="size-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="space-y-4">
          <button
            onClick={() => toast("Client health", { description: "Engagement, compliance and portfolio signals are all positive." })}
            className="surface flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-background"
          >
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Heart className="size-3.5 text-success" /> Client Health
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-[15px] font-semibold text-success">
                <span className="size-2 rounded-full bg-success" />
                {client.health === "healthy" ? "Healthy" : client.health === "attention" ? "Needs attention" : "At risk"}
              </p>
            </div>
            <Chevron className="size-4 text-muted-foreground" />
          </button>

          <section className="surface p-4">
            <h3 className="text-[13px] font-semibold">Quick Actions</h3>
            <div className="mt-3 grid gap-2">
              {[
                { label: "Upload Document", icon: CloudUpload, go: () => setModal("upload") },
                { label: "Request Document", icon: FileText, go: () => setModal("request") },
                { label: "Send for Signature", icon: PenLine, go: () => openSign() },
                { label: "Download All", icon: Download, go: () => toast.success("Preparing archive", { description: "28 documents · ZIP" }) },
              ].map((a) => (
                <button
                  key={a.label}
                  onClick={a.go}
                  className="flex h-9 items-center gap-2.5 rounded-lg border bg-card px-3 text-[13px] font-medium transition-colors hover:border-primary/40 hover:bg-primary-wash hover:text-primary"
                >
                  <a.icon className="size-4" strokeWidth={1.75} /> {a.label}
                </button>
              ))}
            </div>
          </section>

          <section className="surface p-4">
            <h3 className="text-[13px] font-semibold">Document Summary</h3>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-[13px] text-muted-foreground">Total</span>
              <span className="numeric text-lg font-semibold">{documentSummary.total}</span>
            </div>
            <ul className="mt-2 space-y-2 text-[13px]">
              {[
                ["Verified", documentSummary.verified, "bg-success"],
                ["Pending", documentSummary.pending, "bg-warning"],
                ["Draft", documentSummary.draft, "bg-neutral"],
                ["Expired", documentSummary.expired, "bg-danger"],
              ].map(([l, v, c]) => (
                <li key={l as string} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className={cn("size-2 rounded-full", c as string)} /> {l}
                  </span>
                  <span className="numeric font-medium">{v}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-canvas">
              <span className="bg-success" style={{ width: `${(documentSummary.verified / documentSummary.total) * 100}%` }} />
              <span className="bg-warning" style={{ width: `${(documentSummary.pending / documentSummary.total) * 100}%` }} />
              <span className="bg-neutral" style={{ width: `${(documentSummary.draft / documentSummary.total) * 100}%` }} />
              <span className="bg-danger" style={{ width: `${(documentSummary.expired / documentSummary.total) * 100}%` }} />
            </div>
          </section>

          <section className="surface p-4">
            <header className="flex items-center justify-between">
              <h3 className="flex items-center gap-1.5 text-[13px] font-semibold">
                <CalendarDays className="size-4 text-muted-foreground" /> Upcoming Expiry
              </h3>
              <button className="text-[12px] font-medium text-primary hover:underline" onClick={() => setStatus("Expired")}>
                View all
              </button>
            </header>
            <ul className="mt-3 space-y-2">
              {upcomingExpiry.map((e) => (
                <li key={e.name} className="flex items-center justify-between text-[13px]">
                  <span>{e.name}</span>
                  <Pill tone={e.days < 60 ? "warning" : "info"} className="numeric">
                    {e.days} days
                  </Pill>
                </li>
              ))}
            </ul>
          </section>

          <section className="gradient-royal relative overflow-hidden rounded-xl p-4">
            <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary-foreground/10" />
            <h3 className="flex items-center gap-1.5 text-[13px] font-semibold">
              <ShieldCheck className="size-4" /> E-signatures
            </h3>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-foreground/80">
              Send documents for legally binding electronic signature with identity verification and full audit trail.
            </p>
            <button
              onClick={() => toast("E-signatures", { description: "AES signatures are ECT Act compliant and fully audited." })}
              className="mt-3 text-[12.5px] font-semibold text-primary-foreground hover:underline"
            >
              Learn more →
            </button>
          </section>
        </aside>
      </div>

      <UploadDocumentModal open={modal === "upload"} onClose={() => setModal(null)} clientName={client.personal.full_name.split(" ")[0]!} />
      <RequestDocumentModal open={modal === "request"} onClose={() => setModal(null)} clientName={client.personal.full_name.split(" ")[0]!} />
      {modal === "sign" && (
        <SendForSignatureModal
          open
          onClose={() => setModal(null)}
          {...(signDoc ? { defaultDocId: signDoc } : {})}
          {...(client.personal.email ? { defaultEmail: client.personal.email } : {})}
        />
      )}
    </>
  );
}
