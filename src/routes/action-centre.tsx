import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, PenLine, Phone, ShieldAlert, ClipboardCheck, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { tasks as seed, formatDate } from "@/api/mock";
import { PageHeader, Pill, btn, statusTone } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/action-centre")({
  head: () => ({
    meta: [
      { title: "Action Centre — Royal Square Financial" },
      { name: "description", content: "Every task that needs your attention, prioritised by urgency and client impact." },
      { property: "og:title", content: "Action Centre — Royal Square Financial" },
      { property: "og:description", content: "Every task that needs your attention, prioritised." },
    ],
  }),
  component: ActionCentre,
});

const kindIcon = { document: FileText, signature: PenLine, call: Phone, compliance: ShieldAlert, review: ClipboardCheck };

function ActionCentre() {
  const [tasks, setTasks] = useState(seed);
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const open = tasks.filter((t) => !t.done && (filter === "all" || t.priority === filter));

  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader
        title="Action Centre"
        description={`${tasks.filter((t) => !t.done).length} items need your attention.`}
        actions={
          <div className="flex rounded-lg border bg-card p-0.5">
            {(["all", "high", "medium", "low"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "h-8 rounded-md px-3 text-[12.5px] font-medium capitalize transition-colors",
                  filter === f ? "bg-navy text-navy-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        }
      />
      <ul className="grid gap-3">
        {open.length === 0 && <li className="surface p-12 text-center text-[13px] text-muted-foreground">All clear. Nothing outstanding.</li>}
        {open.map((t) => {
          const Icon = kindIcon[t.kind];
          return (
            <li key={t.id} className="surface flex items-center gap-4 p-4">
              <span className={cn("flex size-10 items-center justify-center rounded-lg", t.priority === "high" ? "bg-danger-bg text-danger" : t.priority === "medium" ? "bg-warning-bg text-warning" : "bg-info-bg text-info")}>
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-medium">{t.title}</p>
                <p className="text-[12px] text-muted-foreground">
                  {t.client_name && t.client_id ? (
                    <Link to="/clients/$id" params={{ id: String(t.client_id) }} className="hover:text-primary">
                      {t.client_name}
                    </Link>
                  ) : (
                    "Practice-wide"
                  )}
                  {" · "}
                  <span className="capitalize">{t.kind}</span>
                </p>
              </div>
              <Pill tone={statusTone(t.priority)}>{t.priority}</Pill>
              <span className="numeric w-24 text-right text-[12px] text-muted-foreground">Due {formatDate(t.due)}</span>
              <button
                className={cn(btn.secondary, "h-8 px-2.5 text-[12px]")}
                onClick={() => {
                  setTasks((p) => p.map((x) => (x.id === t.id ? { ...x, done: true } : x)));
                  toast.success("Marked done", { description: t.title });
                }}
              >
                <Check className="size-3.5" /> Done
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
