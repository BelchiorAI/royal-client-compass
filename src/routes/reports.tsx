import { createFileRoute } from "@tanstack/react-router";
import { Users, FileText, ShieldCheck, ListTodo, Download } from "lucide-react";
import { toast } from "sonner";
import { advisers, compliance } from "@/api/mock";
import { MetricCard, PageHeader, ProgressBar, SectionCard, btn, Pill, statusTone } from "@/components/shared/primitives";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Analytics — Royal Square Financial" },
      { name: "description", content: "Book-level metrics, completion progress and adviser distribution for Royal Square Financial." },
      { property: "og:title", content: "Reports & Analytics — Royal Square Financial" },
      { property: "og:description", content: "Book-level metrics and adviser distribution." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader
        title="Reports & Analytics"
        description="Performance and health across the whole practice."
        actions={
          <button className={btn.secondary} onClick={() => toast.success("Export queued", { description: "You'll get an email when the PDF is ready." })}>
            <Download className="size-4" /> Export
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Clients" value={compliance.total_clients} delta="+12 this quarter" tone="info" icon={<Users className="size-4" />} />
        <MetricCard label="Active Policies" value={412} delta="R 2.1m monthly premium" tone="success" icon={<FileText className="size-4" />} />
        <MetricCard label="Open Claims" value={17} delta="Avg 18 days to settle" tone="warning" icon={<ShieldCheck className="size-4" />} />
        <MetricCard label="Outstanding Tasks" value={43} delta="9 overdue" tone="danger" icon={<ListTodo className="size-4" />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {[
          ["FICA verification", compliance.fica_pct, "success"],
          ["Documents complete", 74, "info"],
          ["Reviews complete", 61, "warning"],
        ].map(([l, v, t]) => (
          <SectionCard key={l as string} title={l as string}>
            <p className="numeric text-3xl font-semibold">{v}%</p>
            <ProgressBar value={v as number} tone={t as "info"} className="mt-3" />
          </SectionCard>
        ))}
      </div>

      <SectionCard title="Adviser distribution" padded={false}>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b bg-background/60 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {["Adviser", "Clients", "Avg claim duration", "Book health"].map((h) => (
                <th key={h} className="px-4 py-2.5 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {advisers.map((a) => (
              <tr key={a.name} className="border-b last:border-0 hover:bg-background">
                <td className="px-4 py-3 font-medium">{a.name}</td>
                <td className="numeric px-4 py-3">{a.clients}</td>
                <td className="numeric px-4 py-3">{a.avg_claim_days} days</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ProgressBar value={a.health} tone={a.health > 85 ? "success" : a.health > 75 ? "warning" : "danger"} className="w-40" />
                    <Pill tone={statusTone(a.health > 85 ? "healthy" : a.health > 75 ? "attention" : "at_risk")}>{a.health}%</Pill>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
