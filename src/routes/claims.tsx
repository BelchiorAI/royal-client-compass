import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { claims, formatDate, formatZAR } from "@/api/mock";
import { MetricCard, PageHeader, Pill, SectionCard, btn, statusTone } from "@/components/shared/primitives";
import { SimpleTable } from "@/components/clients/ClientTabs";

export const Route = createFileRoute("/claims")({
  head: () => ({
    meta: [
      { title: "Claims — Royal Square Financial" },
      { name: "description", content: "Track every client claim from lodgement to settlement." },
      { property: "og:title", content: "Claims — Royal Square Financial" },
      { property: "og:description", content: "Track every client claim from lodgement to settlement." },
    ],
  }),
  component: ClaimsPage,
});

function ClaimsPage() {
  const openClaims = claims.filter((c) => ["Open", "In review"].includes(c.status));
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader
        title="Claims"
        description="Lodge, track and settle claims across all insurers."
        actions={
          <button className={btn.primary} onClick={() => toast("New claim", { description: "Claim wizard coming soon." })}>
            <Plus className="size-4" /> Lodge claim
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard label="Open claims" value={openClaims.length} tone="warning" />
        <MetricCard label="Value in progress" value={formatZAR(openClaims.reduce((s, c) => s + c.amount, 0))} tone="info" />
        <MetricCard label="Avg days to settle" value={18} delta="Target: 14 days" />
      </div>
      <SectionCard title="All claims" padded={false}>
        <SimpleTable
          head={["Claim", "Client", "Type", "Amount", "Status", "Opened", "Days open"]}
          rows={claims.map((c) => [
            <span className="numeric font-medium text-primary">{c.number}</span>,
            <Link to="/clients/$id" params={{ id: String(c.client_id) }} className="font-medium hover:text-primary">
              {c.client_name}
            </Link>,
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
    </div>
  );
}
