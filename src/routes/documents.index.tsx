import { createFileRoute } from "@tanstack/react-router";
import { documents, formatDate } from "@/api/mock";
import { MetricCard, PageHeader, Pill, SectionCard, statusTone } from "@/components/shared/primitives";
import { SimpleTable } from "@/components/clients/ClientTabs";

export const Route = createFileRoute("/documents/")({
  head: () => ({
    meta: [
      { title: "Documents — Royal Square Financial" },
      { name: "description", content: "Practice-wide document vault: verification status, expiries and pending signatures." },
      { property: "og:title", content: "Documents — Royal Square Financial" },
      { property: "og:description", content: "Practice-wide document vault." },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader title="Documents" description="All client documents across the practice." />
      <div className="grid gap-3 sm:grid-cols-4">
        <MetricCard label="Total documents" value={1284} />
        <MetricCard label="Verified" value={982} tone="success" />
        <MetricCard label="Pending review" value={148} tone="warning" />
        <MetricCard label="Expiring in 60 days" value={37} tone="danger" />
      </div>
      <SectionCard title="Recently updated" padded={false}>
        <SimpleTable
          head={["Document", "Category", "Type", "Status", "Updated", "Expiry"]}
          rows={documents.map((d) => [
            <div>
              <p className="font-medium">{d.name}</p>
              <p className="text-[12px] text-muted-foreground">{d.sub}</p>
            </div>,
            <Pill>{d.category}</Pill>,
            <span className="text-muted-foreground">{d.type}</span>,
            <Pill dot tone={statusTone(d.status)}>
              {d.status}
            </Pill>,
            <span className="numeric">{formatDate(d.updatedDate)}</span>,
            <span className="numeric">{d.expiryDate ? formatDate(d.expiryDate) : "—"}</span>,
          ])}
        />
      </SectionCard>
    </div>
  );
}
