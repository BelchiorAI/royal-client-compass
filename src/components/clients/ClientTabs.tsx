import { toast } from "sonner";
import { ArrowDownLeft, ArrowUpRight, Sparkles } from "lucide-react";
import type { ClientRecord } from "@/api/types";
import { claims, communications, formatDate, formatZAR, policies, tasks } from "@/api/mock";
import { MetricCard, Pill, ProgressBar, SectionCard, btn, statusTone } from "@/components/shared/primitives";
import { DocumentsTab } from "./DocumentsTab";

export const TABS = [
  "Overview",
  "Financial",
  "Policies",
  "Investments",
  "Goals",
  "Claims",
  "Documents",
  "Requests",
  "Communications",
  "Timeline",
  "Activity",
] as const;
export type Tab = (typeof TABS)[number];

export function ClientTabContent({ tab, client }: { tab: Tab; client: ClientRecord }) {
  const f = client.financial;
  const cp = policies.filter((p) => p.client_id === client.id);
  const cc = claims.filter((c) => c.client_id === client.id);
  const comms = communications.filter((c) => c.client_id === client.id);
  const ct = tasks.filter((t) => t.client_id === client.id);

  switch (tab) {
    case "Documents":
      return <DocumentsTab client={client} />;

    case "Overview":
      return (
        <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Net worth" value={formatZAR(f.net_worth)} tone="success" />
              <MetricCard label="Investments" value={formatZAR(f.investments)} tone="info" />
              <MetricCard label="Active policies" value={cp.filter((p) => p.status === "Active").length} />
              <MetricCard label="Open claims" value={cc.filter((c) => !["Paid", "Declined"].includes(c.status)).length} tone="warning" />
            </div>
            <SectionCard title="Background">
              <p className="text-[13px] leading-relaxed text-muted-foreground">{client.personal.background}</p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-[13px]">
                {[
                  ["Occupation", client.personal.employment_title],
                  ["Date of birth", client.personal.date_of_birth ? formatDate(client.personal.date_of_birth) : "—"],
                  ["ID number", client.personal.id_number ?? "—"],
                  ["Address", client.personal.address ?? "—"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[11.5px] uppercase tracking-wider text-muted-foreground">{k}</dt>
                    <dd className="mt-0.5 font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </SectionCard>
            <SectionCard title="Open tasks">
              {ct.length === 0 ? (
                <p className="text-[13px] text-muted-foreground">No open tasks.</p>
              ) : (
                <ul className="divide-y">
                  {ct.map((t) => (
                    <li key={t.id} className="flex items-center justify-between py-2.5 text-[13px]">
                      <span>{t.title}</span>
                      <span className="flex items-center gap-2">
                        <Pill tone={statusTone(t.priority)}>{t.priority}</Pill>
                        <span className="numeric text-muted-foreground">{formatDate(t.due)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          </div>
          <aside className="space-y-4">
            <SectionCard title="FICA status">
              <Pill dot tone={statusTone(client.fica)}>
                {client.fica}
              </Pill>
              <p className="mt-2 text-[12.5px] text-muted-foreground">Next review due 12 Mar 2027.</p>
            </SectionCard>
            <SectionCard title="Recent messages">
              <ul className="space-y-3">
                {comms.slice(0, 3).map((c) => (
                  <li key={c.id} className="text-[12.5px]">
                    <p className="line-clamp-2 text-muted-foreground">{c.preview}</p>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </aside>
        </div>
      );

    case "Financial":
      return (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <MetricCard label="Annual income" value={formatZAR(f.income)} />
            <MetricCard label="Assets" value={formatZAR(f.assets)} tone="success" />
            <MetricCard label="Liabilities" value={formatZAR(f.liabilities)} tone="danger" />
            <MetricCard label="Investments" value={formatZAR(f.investments)} tone="info" />
            <MetricCard label="Net worth" value={formatZAR(f.net_worth)} tone="success" />
          </div>
          <SectionCard title="Balance sheet composition">
            <div className="space-y-3 text-[13px]">
              {[
                ["Investments", f.investments, "info"],
                ["Other assets", f.assets - f.investments, "success"],
                ["Liabilities", f.liabilities, "danger"],
              ].map(([l, v, t]) => (
                <div key={l as string}>
                  <div className="mb-1 flex justify-between">
                    <span>{l}</span>
                    <span className="numeric font-medium">{formatZAR(v as number)}</span>
                  </div>
                  <ProgressBar value={((v as number) / f.assets) * 100} tone={t as "info"} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      );

    case "Policies":
      return (
        <SectionCard title={`Policies (${cp.length})`} padded={false}>
          <SimpleTable
            head={["Policy", "Insurer", "Product", "Premium / mo", "Status", "Renewal"]}
            rows={cp.map((p) => [
              <span className="numeric font-medium">{p.number}</span>,
              p.insurer,
              p.product,
              <span className="numeric">{formatZAR(p.premium)}</span>,
              <Pill dot tone={statusTone(p.status)}>
                {p.status}
              </Pill>,
              <span className="numeric">{formatDate(p.renewal)}</span>,
            ])}
          />
        </SectionCard>
      );

    case "Claims":
      return (
        <SectionCard title={`Claims (${cc.length})`} padded={false}>
          <SimpleTable
            head={["Claim", "Type", "Amount", "Status", "Opened", "Days open"]}
            rows={cc.map((c) => [
              <span className="numeric font-medium">{c.number}</span>,
              c.type,
              <span className="numeric">{formatZAR(c.amount)}</span>,
              <Pill dot tone={statusTone(c.status)}>
                {c.status}
              </Pill>,
              <span className="numeric">{formatDate(c.opened)}</span>,
              <span className="numeric">{c.days_open}</span>,
            ])}
          />
        </SectionCard>
      );

    case "Communications":
      return (
        <SectionCard title={`Communications (${comms.length})`} padded={false}>
          <ul className="divide-y">
            {comms.map((c) => (
              <li key={c.id} className="flex gap-3 px-4 py-3">
                <span className={c.direction === "inbound" ? "text-success" : "text-muted-foreground"}>
                  {c.direction === "inbound" ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Pill tone={c.channel === "email" ? "info" : c.channel === "whatsapp" ? "whatsapp" : "purple"}>{c.channel}</Pill>
                    {c.subject && <span className="text-[13px] font-medium">{c.subject}</span>}
                    {c.ai_assisted && (
                      <Pill tone="purple">
                        <Sparkles className="size-3" /> AI Drafted
                      </Pill>
                    )}
                    <span className="ml-auto numeric text-[11.5px] text-muted-foreground">{c.timestamp && formatDate(c.timestamp)}</span>
                  </div>
                  <p className="mt-1 text-[12.5px] text-muted-foreground">{c.preview}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      );

    default:
      return (
        <SectionCard>
          <div className="flex flex-col items-center py-12 text-center">
            <p className="text-[15px] font-semibold">{tab}</p>
            <p className="mt-1 max-w-sm text-[13px] text-muted-foreground">
              {tab} data for {client.personal.full_name} will appear here once synced from the core platform.
            </p>
            <button className={`${btn.secondary} mt-4`} onClick={() => toast.success(`Sync requested for ${tab.toLowerCase()}`)}>
              Request sync
            </button>
          </div>
        </SectionCard>
      );
  }
}

export function SimpleTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b bg-background/60 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {head.map((h) => (
              <th key={h} className="px-4 py-2.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={head.length} className="px-4 py-10 text-center text-muted-foreground">
                Nothing to show.
              </td>
            </tr>
          )}
          {rows.map((r, i) => (
            <tr key={i} className="border-b last:border-0 transition-colors hover:bg-background">
              {r.map((c, j) => (
                <td key={j} className="px-4 py-3">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
