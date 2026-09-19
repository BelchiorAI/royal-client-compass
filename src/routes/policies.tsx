import { createFileRoute, Link } from "@tanstack/react-router";
import { formatDate, formatZAR, policies } from "@/api/mock";
import { MetricCard, PageHeader, Pill, SectionCard, statusTone } from "@/components/shared/primitives";
import { SimpleTable } from "@/components/clients/ClientTabs";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Policies — Royal Square Financial" },
      { name: "description", content: "All in-force, pending and lapsed policies across insurers." },
      { property: "og:title", content: "Policies — Royal Square Financial" },
      { property: "og:description", content: "All in-force, pending and lapsed policies." },
    ],
  }),
  component: PoliciesPage,
});

function PoliciesPage() {
  const active = policies.filter((p) => p.status === "Active");
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader title="Policies" description="Policy book across life, risk and short-term cover." />
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard label="Active policies" value={active.length} tone="success" />
        <MetricCard label="Monthly premium" value={formatZAR(active.reduce((s, p) => s + p.premium, 0))} tone="info" />
        <MetricCard label="Renewals in 90 days" value={2} tone="warning" />
      </div>
      <SectionCard title="Policy book" padded={false}>
        <SimpleTable
          head={["Policy", "Client", "Insurer", "Product", "Premium / mo", "Status", "Renewal"]}
          rows={policies.map((p) => [
            <span className="numeric font-medium text-primary">{p.number}</span>,
            <Link to="/clients/$id" params={{ id: String(p.client_id) }} className="font-medium hover:text-primary">
              {p.client_name}
            </Link>,
            p.insurer,
            p.product,
            <span className="numeric">{p.premium ? formatZAR(p.premium) : "—"}</span>,
            <Pill dot tone={statusTone(p.status)}>
              {p.status}
            </Pill>,
            <span className="numeric">{formatDate(p.renewal)}</span>,
          ])}
        />
      </SectionCard>
    </div>
  );
}
