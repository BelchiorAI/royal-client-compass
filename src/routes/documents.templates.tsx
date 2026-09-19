import { createFileRoute } from "@tanstack/react-router";
import { FileText, Copy } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Pill, btn } from "@/components/shared/primitives";

export const Route = createFileRoute("/documents/templates")({
  head: () => ({
    meta: [
      { title: "Document Templates — Royal Square Financial" },
      { name: "description", content: "Reusable advice, mandate and compliance templates." },
      { property: "og:title", content: "Document Templates — Royal Square Financial" },
      { property: "og:description", content: "Reusable advice, mandate and compliance templates." },
    ],
  }),
  component: TemplatesPage,
});

const templates = [
  { name: "Record of Advice", cat: "Legal", uses: 212 },
  { name: "Financial Needs Analysis", cat: "Financial", uses: 189 },
  { name: "Discretionary Investment Mandate", cat: "Investments", uses: 64 },
  { name: "FICA Declaration", cat: "Identity", uses: 301 },
  { name: "Claim Notification Form", cat: "Claims", uses: 88 },
  { name: "Policy Replacement Disclosure", cat: "Policy", uses: 41 },
];

function TemplatesPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader title="Templates" description="Standardised documents ready to merge with client data." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => (
          <article key={t.name} className="surface flex flex-col p-4">
            <div className="flex items-start justify-between">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary-wash text-primary">
                <FileText className="size-4" />
              </span>
              <Pill>{t.cat}</Pill>
            </div>
            <h3 className="mt-3 text-[14px] font-semibold">{t.name}</h3>
            <p className="numeric text-[12px] text-muted-foreground">Used {t.uses} times</p>
            <button className={`${btn.secondary} mt-4 h-8 self-start text-[12.5px]`} onClick={() => toast.success(`Created from ${t.name}`)}>
              <Copy className="size-3.5" /> Use template
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
