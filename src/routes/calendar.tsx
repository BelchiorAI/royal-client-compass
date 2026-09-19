import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader, Pill, SectionCard, btn } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Royal Square Financial" },
      { name: "description", content: "Client meetings, reviews and compliance deadlines for the week." },
      { property: "og:title", content: "Calendar — Royal Square Financial" },
      { property: "og:description", content: "Client meetings, reviews and compliance deadlines." },
    ],
  }),
  component: CalendarPage,
});

const days = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18", "Sat 19", "Sun 20"];
const events: Record<number, { t: string; title: string; tone: "info" | "success" | "warning" | "danger" | "purple" }[]> = {
  0: [{ t: "09:00", title: "Team pipeline review", tone: "purple" }],
  1: [{ t: "11:00", title: "Lerato Dlamini — TFSA increase", tone: "info" }],
  2: [{ t: "14:30", title: "Rajesh Pillay — Q3 portfolio call", tone: "info" }],
  3: [
    { t: "10:00", title: "Naledi Khumalo — Claim CL-3391", tone: "warning" },
    { t: "15:00", title: "Thabo Mokoena — Estate review", tone: "info" },
  ],
  4: [{ t: "09:30", title: "Johan Pretorius — Hail assessor", tone: "danger" }],
  5: [{ t: "All day", title: "Pieter Botha — Review overdue", tone: "danger" }],
  6: [],
};

function CalendarPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader
        title="Calendar"
        description="Week of 14 – 20 September 2026"
        actions={
          <button className={btn.primary} onClick={() => toast("New event", { description: "Scheduler coming soon." })}>
            New event
          </button>
        }
      />
      <div className="grid gap-3 md:grid-cols-7">
        {days.map((d, i) => (
          <SectionCard key={d} className={cn(i === 5 && "ring-2 ring-primary/40")} padded={false}>
            <div className={cn("border-b px-3 py-2 text-[12px] font-semibold", i === 5 ? "text-primary" : "text-muted-foreground")}>{d}</div>
            <ul className="min-h-[180px] space-y-1.5 p-2">
              {events[i]?.map((e) => (
                <li key={e.title}>
                  <button className="w-full rounded-md p-0 text-left" onClick={() => toast(e.title, { description: `${d} · ${e.t}` })}>
                    <Pill tone={e.tone} className="w-full whitespace-normal rounded-md py-1.5 text-left leading-snug">
                      <span className="numeric text-[10.5px] opacity-80">{e.t}</span> {e.title}
                    </Pill>
                  </button>
                </li>
              ))}
            </ul>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
