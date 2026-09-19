import { createFileRoute, Link } from "@tanstack/react-router";
import { clients, formatZAR } from "@/api/mock";
import { MetricCard, PageHeader, ProgressBar, SectionCard } from "@/components/shared/primitives";
import { SimpleTable } from "@/components/clients/ClientTabs";

export const Route = createFileRoute("/investments")({
  head: () => ({
    meta: [
      { title: "Investments — Royal Square Financial" },
      { name: "description", content: "Assets under advice, allocation and client portfolio overview." },
      { property: "og:title", content: "Investments — Royal Square Financial" },
      { property: "og:description", content: "Assets under advice and portfolio overview." },
    ],
  }),
  component: InvestmentsPage,
});

function InvestmentsPage() {
  const total = clients.reduce((s, c) => s + c.financial.investments, 0);
  const alloc = [
    ["Local equity", 38, "info"],
    ["Offshore equity", 27, "purple"],
    ["Bonds & income", 21, "success"],
    ["Property", 9, "orange"],
    ["Cash", 5, "neutral"],
  ] as const;
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader title="Investments" description="Assets under advice across discretionary and platform mandates." />
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard label="Assets under advice" value={formatZAR(total)} tone="success" delta="+6.4% YTD" />
        <MetricCard label="Mandates" value={14} tone="info" />
        <MetricCard label="Rebalances due" value={3} tone="warning" />
      </div>
      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <SectionCard title="Book allocation">
          <ul className="space-y-3">
            {alloc.map(([l, v, t]) => (
              <li key={l}>
                <div className="mb-1 flex justify-between text-[12.5px]">
                  <span>{l}</span>
                  <span className="numeric font-medium">{v}%</span>
                </div>
                <ProgressBar value={v} tone={t} />
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Portfolios by client" padded={false}>
          <SimpleTable
            head={["Client", "Invested", "Share of book", "Adviser"]}
            rows={[...clients]
              .sort((a, b) => b.financial.investments - a.financial.investments)
              .map((c) => [
                <Link to="/clients/$id" params={{ id: String(c.id) }} className="font-medium hover:text-primary">
                  {c.personal.full_name}
                </Link>,
                <span className="numeric">{formatZAR(c.financial.investments)}</span>,
                <div className="flex items-center gap-2">
                  <ProgressBar value={(c.financial.investments / total) * 100} className="w-28" />
                  <span className="numeric text-[12px] text-muted-foreground">{((c.financial.investments / total) * 100).toFixed(1)}%</span>
                </div>,
                <span className="text-muted-foreground">{c.adviser}</span>,
              ])}
          />
        </SectionCard>
      </div>
    </div>
  );
}
