import { createFileRoute } from "@tanstack/react-router";
import { PenLine } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { formatDate } from "@/api/mock";
import { MetricCard, PageHeader, Pill, SectionCard, btn, statusTone } from "@/components/shared/primitives";
import { SimpleTable } from "@/components/clients/ClientTabs";
import { SendForSignatureModal } from "@/components/clients/DocumentModals";

export const Route = createFileRoute("/documents/e-signatures")({
  head: () => ({
    meta: [
      { title: "E-signatures — Royal Square Financial" },
      { name: "description", content: "Signature envelopes in flight, completed and expiring." },
      { property: "og:title", content: "E-signatures — Royal Square Financial" },
      { property: "og:description", content: "Signature envelopes in flight, completed and expiring." },
    ],
  }),
  component: EsigPage,
});

const envelopes = [
  { doc: "Record of Advice", client: "Ayesha van Wyk", signer: "ayesha@company.co.za", status: "Awaiting signature", sent: "2026-09-16" },
  { doc: "Investment Mandate", client: "Lerato Dlamini", signer: "lerato.d@gmail.com", status: "Awaiting signature", sent: "2026-09-15" },
  { doc: "Revised Offshore Mandate", client: "Rajesh Pillay", signer: "r.pillay@coastalholdings.com", status: "Draft", sent: "—" },
  { doc: "Income Protection Amendment", client: "Naledi Khumalo", signer: "naledi.k@netcare.co.za", status: "Signed", sent: "2026-09-10" },
  { doc: "FNA 2026", client: "Ayesha van Wyk", signer: "ayesha@company.co.za", status: "Signed", sent: "2026-08-12" },
];

function EsigPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader
        title="E-signatures"
        description="Advanced Electronic Signatures with full audit trail."
        actions={
          <button className={btn.primary} onClick={() => setOpen(true)}>
            <PenLine className="size-4" /> New envelope
          </button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard label="Awaiting signature" value={2} tone="info" />
        <MetricCard label="Signed this month" value={11} tone="success" />
        <MetricCard label="Avg time to sign" value="1.8 days" />
      </div>
      <SectionCard title="Envelopes" padded={false}>
        <SimpleTable
          head={["Document", "Client", "Signer", "Status", "Sent", ""]}
          rows={envelopes.map((e) => [
            <span className="font-medium">{e.doc}</span>,
            e.client,
            <span className="numeric text-muted-foreground">{e.signer}</span>,
            <Pill dot tone={statusTone(e.status)}>
              {e.status}
            </Pill>,
            <span className="numeric">{e.sent === "—" ? "—" : formatDate(e.sent)}</span>,
            e.status === "Awaiting signature" ? (
              <button className={`${btn.ghost} text-primary`} onClick={() => toast.success("Reminder sent", { description: e.signer })}>
                Remind
              </button>
            ) : null,
          ])}
        />
      </SectionCard>
      {open && <SendForSignatureModal open onClose={() => setOpen(false)} />}
    </div>
  );
}
