import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { clients, formatDate, formatZAR } from "@/api/mock";
import { MetricCard, PageHeader, Pill, SectionCard, btn, statusTone } from "@/components/shared/primitives";
import { SimpleTable } from "@/components/clients/ClientTabs";

export const Route = createFileRoute("/financial-planning")({
  head: () => ({
    meta: [
      { title: "Financial Planning — Royal Square Financial" },
      { name: "description", content: "Financial needs analyses, review schedules and planning status per client." },
      { property: "og:title", content: "Financial Planning — Royal Square Financial" },
      { property: "og:description", content: "Financial needs analyses and review schedules." },
    ],
  }),
  component: PlanningPage,
});

const reviews = ["2026-10-02", "2026-09-25", "2027-01-19", "2026-08-30", "2026-11-14", "2026-12-01", "2026-10-20", "2026-09-29"];
const fnaStatus = ["Signed", "Draft", "Signed", "Expired", "Signed", "Pending", "Pending", "Signed"];

function PlanningPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader
        title="Financial Planning"
        description="Needs analyses, annual reviews and plan health."
        actions={
          <button className={btn.primary} onClick={() => toast("New FNA", { description: "FNA builder coming soon." })}>
            New FNA
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard label="Reviews due (30 days)" value={3} tone="warning" />
        <MetricCard label="FNAs signed" value="5 / 8" tone="success" />
        <MetricCard label="Overdue reviews" value={1} tone="danger" />
      </div>
      <SectionCard title="Planning status" padded={false}>
        <SimpleTable
          head={["Client", "Net worth", "Annual income", "FNA", "Next review"]}
          rows={clients.map((c, i) => [
            <Link to="/clients/$id" params={{ id: String(c.id) }} className="font-medium hover:text-primary">
              {c.personal.full_name}
            </Link>,
            <span className="numeric">{formatZAR(c.financial.net_worth)}</span>,
            <span className="numeric">{formatZAR(c.financial.income)}</span>,
            <Pill dot tone={statusTone(fnaStatus[i]!)}>
              {fnaStatus[i]}
            </Pill>,
            <span className="numeric">{formatDate(reviews[i]!)}</span>,
          ])}
        />
      </SectionCard>
    </div>
  );
}
