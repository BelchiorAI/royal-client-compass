import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, ShieldAlert, FileSignature, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { claims, clients, communications, formatDate, formatZAR, tasks as seed, CURRENT_USER } from "@/api/mock";
import { Avatar, MetricCard, PageHeader, Pill, SectionCard, btn, statusTone } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Royal Square Financial" },
      { name: "description", content: "Your daily advisory workbench: priorities, open claims, and client activity at a glance." },
      { property: "og:title", content: "Today — Royal Square Financial" },
      { property: "og:description", content: "Your daily advisory workbench: priorities, open claims, and client activity at a glance." },
    ],
  }),
  component: Today,
});

function Today() {
  const [tasks, setTasks] = useState(seed);
  const open = tasks.filter((t) => !t.done);
  const complete = (id: string) => {
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, done: true } : t)));
    toast.success("Task completed");
  };
  const [today, setToday] = useState("Today");
  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }));
  }, []);

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader
        eyebrow={today}
        title={`Good afternoon, ${CURRENT_USER.name.split(" ")[0]}`}
        description={`You have ${open.length} open tasks, ${claims.filter((c) => c.status === "Open" || c.status === "In review").length} claims in progress and 3 unread client messages.`}
        actions={
          <Link to="/action-centre" className={btn.primary}>
            Open Action Centre <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Due today" value={open.filter((t) => t.due === "2026-09-19").length} tone="danger" icon={<Clock className="size-4" />} />
        <MetricCard label="Awaiting signature" value={3} tone="info" icon={<FileSignature className="size-4" />} />
        <MetricCard label="Compliance exceptions" value={6} tone="warning" icon={<ShieldAlert className="size-4" />} />
        <MetricCard label="Book AUM" value="R 72.4m" delta="+2.1% this quarter" tone="success" icon={<CheckCircle2 className="size-4" />} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <SectionCard title="Priorities" action={<span className="text-[12px] text-muted-foreground">{open.length} open</span>} padded={false}>
            <ul className="divide-y">
              {tasks.map((t) => (
                <li key={t.id} className={cn("flex items-center gap-3 px-4 py-3 transition-opacity", t.done && "opacity-40")}>
                  <button
                    aria-label={t.done ? "Completed" : `Complete ${t.title}`}
                    disabled={t.done}
                    onClick={() => complete(t.id)}
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border-2 transition-colors",
                      t.done ? "border-success bg-success text-primary-foreground" : "border-border hover:border-primary",
                    )}
                  >
                    {t.done && <CheckCircle2 className="size-4" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-[13px] font-medium", t.done && "line-through")}>{t.title}</p>
                    {t.client_name && t.client_id && (
                      <Link to="/clients/$id" params={{ id: String(t.client_id) }} className="text-[12px] text-muted-foreground hover:text-primary">
                        {t.client_name}
                      </Link>
                    )}
                  </div>
                  <Pill tone={statusTone(t.priority)}>{t.priority}</Pill>
                  <span className="numeric w-24 text-right text-[12px] text-muted-foreground">{formatDate(t.due)}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Claims in progress" action={<Link to="/claims" className="text-[12px] font-medium text-primary hover:underline">View all</Link>} padded={false}>
            <ul className="divide-y">
              {claims
                .filter((c) => ["Open", "In review"].includes(c.status))
                .map((c) => (
                  <li key={c.id} className="flex items-center gap-3 px-4 py-3 text-[13px]">
                    <span className="numeric font-medium text-primary">{c.number}</span>
                    <span className="flex-1 truncate">
                      {c.type} · <span className="text-muted-foreground">{c.client_name}</span>
                    </span>
                    <span className="numeric">{formatZAR(c.amount)}</span>
                    <Pill dot tone={statusTone(c.status)}>
                      {c.status}
                    </Pill>
                  </li>
                ))}
            </ul>
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="Recent client activity" padded={false}>
            <ul className="divide-y">
              {communications.slice(0, 5).map((c) => (
                <li key={c.id} className="flex gap-3 px-4 py-3">
                  <Avatar name={c.client_name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-medium">{c.client_name}</p>
                    <p className="line-clamp-2 text-[12px] text-muted-foreground">{c.preview}</p>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
          <SectionCard title="Clients needing attention" padded={false}>
            <ul className="divide-y">
              {clients
                .filter((c) => c.health !== "healthy")
                .map((c) => (
                  <li key={c.id}>
                    <Link to="/clients/$id" params={{ id: String(c.id) }} className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-background">
                      <Avatar name={c.personal.full_name} size="sm" />
                      <span className="flex-1 text-[13px] font-medium">{c.personal.full_name}</span>
                      <Pill dot tone={statusTone(c.health)}>
                        {c.health === "attention" ? "Attention" : "At risk"}
                      </Pill>
                    </Link>
                  </li>
                ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
