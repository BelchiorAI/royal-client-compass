import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, Pill, btn } from "@/components/shared/primitives";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Royal Square Financial" },
      { name: "description", content: "Connect insurers, platforms, messaging and identity providers." },
      { property: "og:title", content: "Integrations — Royal Square Financial" },
      { property: "og:description", content: "Connect insurers, platforms, messaging and identity providers." },
    ],
  }),
  component: IntegrationsPage,
});

const seed = [
  { name: "Astute FSE", desc: "Policy and portfolio data feeds from insurers.", cat: "Data", on: true },
  { name: "WhatsApp Business", desc: "Two-way client messaging with templates.", cat: "Messaging", on: true },
  { name: "Microsoft 365", desc: "Email, calendar and contact sync.", cat: "Productivity", on: true },
  { name: "Allan Gray Platform", desc: "Investment platform mandates and valuations.", cat: "Platform", on: false },
  { name: "Signiflow", desc: "Advanced Electronic Signatures.", cat: "E-signature", on: true },
  { name: "DocFox", desc: "Automated FICA and KYC verification.", cat: "Compliance", on: false },
  { name: "Xero", desc: "Commission reconciliation.", cat: "Finance", on: false },
  { name: "Clickatell", desc: "SMS reminders and OTPs.", cat: "Messaging", on: true },
];

function IntegrationsPage() {
  const [items, setItems] = useState(seed);
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader title="Integrations" description={`${items.filter((i) => i.on).length} of ${items.length} connected.`} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((it) => (
          <article key={it.name} className="surface flex flex-col p-4">
            <div className="flex items-start justify-between">
              <span className="flex size-10 items-center justify-center rounded-lg bg-navy text-[13px] font-bold text-navy-foreground">
                {it.name.slice(0, 2).toUpperCase()}
              </span>
              <Switch
                checked={it.on}
                aria-label={`Toggle ${it.name}`}
                onCheckedChange={(v) => {
                  setItems((p) => p.map((x) => (x.name === it.name ? { ...x, on: v } : x)));
                  toast.success(v ? `${it.name} connected` : `${it.name} disconnected`);
                }}
              />
            </div>
            <h3 className="mt-3 text-[14px] font-semibold">{it.name}</h3>
            <p className="mt-0.5 flex-1 text-[12.5px] text-muted-foreground">{it.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <Pill>{it.cat}</Pill>
              <button className={btn.ghost} onClick={() => toast(it.name, { description: "Settings coming soon." })}>
                Configure
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
