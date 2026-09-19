import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, FileClock, AlertTriangle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { compliance } from "@/api/mock";
import { MetricCard, PageHeader, Pill, ProgressBar, SectionCard, btn, statusTone, Avatar } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance Centre — Royal Square Financial" },
      { name: "description", content: "FICA verification, screening progress and a live exceptions queue for your client book." },
      { property: "og:title", content: "Compliance Centre — Royal Square Financial" },
      { property: "og:description", content: "FICA verification, screening progress and exceptions." },
    ],
  }),
  component: CompliancePage,
});

function CompliancePage() {
  const [severity, setSeverity] = useState("All severities");
  const [q, setQ] = useState("");
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const rows = useMemo(
    () =>
      compliance.exceptions.filter(
        (e) =>
          !resolved.has(e.client_id) &&
          (severity === "All severities" || e.severity === severity.toLowerCase()) &&
          `${e.client_name} ${e.issue}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [severity, q, resolved],
  );

  const act = (id: number, name: string, action: "resolve" | "request") => {
    setResolved((s) => new Set(s).add(id));
    if (action === "resolve") toast.success("Exception resolved", { description: name });
    else toast.success("Document request sent", { description: `${name} will receive a secure upload link.` });
  };

  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader title="Compliance Centre" description="FICA & screening overview across your client book." />

      <SectionCard title="FICA & Screening Overview">
        <div className="flex items-end justify-between">
          <div>
            <p className="numeric text-3xl font-semibold">{compliance.fica_pct}%</p>
            <p className="text-[12.5px] text-muted-foreground">
              of {compliance.total_clients} clients fully verified
            </p>
          </div>
          <p className="text-[12px] text-muted-foreground">Target 95% by Q4</p>
        </div>
        <ProgressBar value={compliance.fica_pct} tone="success" className="mt-3 h-2.5" />
      </SectionCard>

      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard label="Compliant clients" value={compliance.compliant} tone="success" icon={<ShieldCheck className="size-4" />} />
        <MetricCard label="Awaiting documents" value={compliance.awaiting_documents} tone="warning" icon={<FileClock className="size-4" />} />
        <MetricCard label="Requiring review" value={compliance.requiring_review} tone="danger" icon={<AlertTriangle className="size-4" />} />
      </div>

      <div className="surface overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b bg-background/60 p-3">
          <h3 className="mr-auto px-1 text-[13px] font-semibold">Exceptions ({rows.length})</h3>
          <div className="relative w-64">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input className={cn(btn.input, "pl-8")} placeholder="Filter exceptions..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className={cn(btn.input, "w-auto")} value={severity} onChange={(e) => setSeverity(e.target.value)} aria-label="Severity">
            {["All severities", "High", "Medium", "Low"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b bg-background/60 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-2.5 font-semibold">Client</th>
              <th className="px-4 py-2.5 font-semibold">Issue</th>
              <th className="px-4 py-2.5 font-semibold">Severity</th>
              <th className="px-4 py-2.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                  No exceptions — your book is clean.
                </td>
              </tr>
            )}
            {rows.map((e) => (
              <tr key={e.client_id} className="border-b last:border-0 transition-colors hover:bg-background">
                <td className="px-4 py-3">
                  <Link to="/clients/$id" params={{ id: String(e.client_id) }} className="flex items-center gap-2.5 font-medium hover:text-primary">
                    <Avatar name={e.client_name} size="sm" /> {e.client_name}
                  </Link>
                </td>
                <td className="max-w-md px-4 py-3 text-muted-foreground">{e.issue}</td>
                <td className="px-4 py-3">
                  <Pill dot tone={statusTone(e.severity)}>
                    {e.severity[0]!.toUpperCase() + e.severity.slice(1)}
                  </Pill>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1.5">
                    <button className={cn(btn.secondary, "h-8 px-2.5 text-[12px]")} onClick={() => act(e.client_id, e.client_name, "request")}>
                      Request
                    </button>
                    <button className={cn(btn.primary, "h-8 px-2.5 text-[12px]")} onClick={() => act(e.client_id, e.client_name, "resolve")}>
                      Resolve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
