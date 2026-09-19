import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Smartphone, ArrowDownLeft, ArrowUpRight, Sparkles, Search, Reply, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { communications, formatDate } from "@/api/mock";
import type { CommunicationEntry } from "@/api/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, PageHeader, Pill, btn } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/communications")({
  head: () => ({
    meta: [
      { title: "Communications Hub — Royal Square Financial" },
      { name: "description", content: "Unified inbox for email, WhatsApp and SMS client conversations with AI-assisted triage." },
      { property: "og:title", content: "Communications Hub — Royal Square Financial" },
      { property: "og:description", content: "Unified inbox for email, WhatsApp and SMS client conversations." },
    ],
  }),
  component: CommsPage,
});

type Channel = "all" | "email" | "whatsapp" | "sms";
type Dir = "all" | "inbound" | "outbound";

const channelMeta = {
  email: { label: "Email", icon: Mail, tone: "info" as const },
  whatsapp: { label: "WhatsApp", icon: MessageCircle, tone: "whatsapp" as const },
  sms: { label: "SMS", icon: Smartphone, tone: "purple" as const },
  push: { label: "Push", icon: Smartphone, tone: "neutral" as const },
};

const fmtTime = (iso: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${formatDate(iso)}, ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
};

function CommsPage() {
  const [channel, setChannel] = useState<Channel>("all");
  const [dir, setDir] = useState<Dir>("all");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<CommunicationEntry | null>(null);

  const count = (c: Channel) => (c === "all" ? communications.length : communications.filter((x) => x.channel === c).length);

  const rows = useMemo(
    () =>
      communications
        .filter((c) => (channel === "all" || c.channel === channel) && (dir === "all" || c.direction === dir))
        .filter((c) => `${c.client_name} ${c.sender} ${c.subject ?? ""} ${c.preview}`.toLowerCase().includes(q.toLowerCase()))
        .sort((a, b) => (b.timestamp ?? "").localeCompare(a.timestamp ?? "")),
    [channel, dir, q],
  );

  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader title="Communications" description="Every client conversation across email, WhatsApp and SMS — triaged with AI." />

      <div className="surface flex flex-wrap items-center gap-3 p-3">
        <div className="flex rounded-lg border bg-background p-0.5">
          {(
            [
              ["all", "All Channels", null],
              ["email", "Email", Mail],
              ["whatsapp", "WhatsApp", MessageCircle],
              ["sms", "SMS", Smartphone],
            ] as const
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setChannel(key)}
              className={cn(
                "flex h-8 items-center gap-1.5 rounded-md px-3 text-[12.5px] font-medium transition-colors",
                channel === key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {Icon && <Icon className="size-3.5" />}
              {label} <span className="numeric text-[11px] text-muted-foreground">({count(key)})</span>
            </button>
          ))}
        </div>
        <div className="flex rounded-lg border bg-background p-0.5">
          {(
            [
              ["all", "All", null],
              ["inbound", "Inbound", ArrowDownLeft],
              ["outbound", "Outbound", ArrowUpRight],
            ] as const
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              onClick={() => setDir(key)}
              className={cn(
                "flex h-8 items-center gap-1 rounded-md px-3 text-[12.5px] font-medium transition-colors",
                dir === key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {Icon && <Icon className="size-3.5" />} {label}
            </button>
          ))}
        </div>
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input className={cn(btn.input, "pl-8")} placeholder="Search clients, senders or message content..." value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-3">
        {rows.length === 0 && <p className="surface p-10 text-center text-[13px] text-muted-foreground">No conversations match.</p>}
        {rows.map((c) => {
          const m = channelMeta[c.channel];
          return (
            <article
              key={c.id}
              onClick={() => setActive(c)}
              onKeyDown={(e) => e.key === "Enter" && setActive(c)}
              tabIndex={0}
              role="button"
              className="surface flex cursor-pointer gap-4 p-4 transition-all hover:-translate-y-px hover:border-primary/40 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Avatar name={c.client_name} size="lg" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to="/clients/$id"
                    params={{ id: String(c.client_id) }}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[13.5px] font-semibold hover:text-primary hover:underline"
                  >
                    {c.client_name}
                  </Link>
                  <Pill tone={m.tone}>
                    <m.icon className="size-3" /> {m.label}
                  </Pill>
                  <Pill tone={c.direction === "inbound" ? "success" : "neutral"}>
                    {c.direction === "inbound" ? <ArrowDownLeft className="size-3" /> : <ArrowUpRight className="size-3" />}
                    {c.direction === "inbound" ? "Inbound" : "Outbound"}
                  </Pill>
                  {c.ai_assisted && (
                    <Pill tone="purple">
                      <Sparkles className="size-3" /> AI Drafted
                    </Pill>
                  )}
                  <span className="numeric ml-auto text-[11.5px] text-muted-foreground">{fmtTime(c.timestamp)}</span>
                </div>
                {c.subject && <p className="mt-1.5 text-[13px] font-medium">{c.subject}</p>}
                <p className="mt-0.5 line-clamp-2 text-[12.5px] text-muted-foreground">{c.preview}</p>
                <p className="mt-1.5 text-[11.5px] text-muted-foreground/80">
                  From <span className="numeric">{c.sender}</span>
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="sm:max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <Avatar name={active.client_name} />
                  <div>
                    <DialogTitle className="text-[15px]">{active.subject ?? `${channelMeta[active.channel].label} from ${active.client_name}`}</DialogTitle>
                    <DialogDescription className="text-[12px]">
                      {active.sender} · {fmtTime(active.timestamp)}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                <Pill tone={channelMeta[active.channel].tone}>{channelMeta[active.channel].label}</Pill>
                <Pill tone={active.direction === "inbound" ? "success" : "neutral"}>{active.direction}</Pill>
                {active.ai_assisted && (
                  <Pill tone="purple">
                    <Sparkles className="size-3" /> AI Drafted
                  </Pill>
                )}
              </div>
              <p className="rounded-lg border bg-background p-4 text-[13.5px] leading-relaxed">{active.preview}</p>
              <div className="flex justify-end gap-2">
                <Link to="/clients/$id" params={{ id: String(active.client_id) }} className={btn.secondary}>
                  <ExternalLink className="size-4" /> View client
                </Link>
                <button
                  className={btn.primary}
                  onClick={() => {
                    toast.success("Reply drafted", { description: "AI suggested a reply in your outbox." });
                    setActive(null);
                  }}
                >
                  <Reply className="size-4" /> Quick reply
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
