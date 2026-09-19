import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { clients, formatDate, formatZAR } from "@/api/mock";
import { Avatar, PageHeader, Pill, btn, statusTone } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/clients/")({
  head: () => ({
    meta: [
      { title: "Clients — Royal Square Financial" },
      { name: "description", content: "Browse and manage your client book with health, FICA status and net worth at a glance." },
      { property: "og:title", content: "Clients — Royal Square Financial" },
      { property: "og:description", content: "Browse and manage your client book." },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  const [q, setQ] = useState("");
  const [adviser, setAdviser] = useState("All advisers");
  const advisers = ["All advisers", ...Array.from(new Set(clients.map((c) => c.adviser)))];
  const rows = useMemo(
    () =>
      clients.filter(
        (c) =>
          (adviser === "All advisers" || c.adviser === adviser) &&
          `${c.personal.full_name} ${c.code} ${c.personal.email}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q, adviser],
  );

  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader
        title="Clients"
        description={`${clients.length} clients across 3 advisers.`}
        actions={
          <button className={btn.primary} onClick={() => toast("New client", { description: "Onboarding wizard coming soon." })}>
            <Plus className="size-4" /> New client
          </button>
        }
      />
      <div className="surface overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b bg-background/60 p-3">
          <div className="relative min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input className={cn(btn.input, "pl-8")} placeholder="Search by name, code or email..." value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <select className={cn(btn.input, "w-auto min-w-[160px]")} value={adviser} onChange={(e) => setAdviser(e.target.value)} aria-label="Adviser">
            {advisers.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b bg-background/60 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {["Client", "Status", "Adviser", "Net worth", "FICA", "Health", "Client since"].map((h) => (
                <th key={h} className="px-4 py-2.5 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b last:border-0 transition-colors hover:bg-background">
                <td className="px-4 py-3">
                  <Link to="/clients/$id" params={{ id: String(c.id) }} className="flex items-center gap-3">
                    <Avatar name={c.personal.full_name} />
                    <span>
                      <span className="block font-medium hover:text-primary">{c.personal.full_name}</span>
                      <span className="numeric block text-[11.5px] text-muted-foreground">{c.code}</span>
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Pill dot tone={statusTone(c.personal.status)}>
                    {c.personal.status}
                  </Pill>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{c.adviser}</td>
                <td className="numeric px-4 py-3 font-medium">{formatZAR(c.financial.net_worth)}</td>
                <td className="px-4 py-3">
                  <Pill tone={statusTone(c.fica)}>{c.fica}</Pill>
                </td>
                <td className="px-4 py-3">
                  <Pill dot tone={statusTone(c.health)}>
                    {c.health === "healthy" ? "Healthy" : c.health === "attention" ? "Attention" : "At risk"}
                  </Pill>
                </td>
                <td className="numeric px-4 py-3 text-muted-foreground">{formatDate(c.client_since)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
