import { createFileRoute, Link } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { formatZAR } from "@/api/mock";
import { PageHeader, ProgressBar, Pill } from "@/components/shared/primitives";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "Goals — Royal Square Financial" },
      { name: "description", content: "Client financial goals and progress toward each target." },
      { property: "og:title", content: "Goals — Royal Square Financial" },
      { property: "og:description", content: "Client financial goals and progress." },
    ],
  }),
  component: GoalsPage,
});

const goals = [
  { client_id: 1028, client: "Ayesha van Wyk", name: "Retirement at 60", target: 18000000, current: 3150000, horizon: "2044" },
  { client_id: 1044, client: "Lerato Dlamini", name: "First property deposit", target: 450000, current: 310000, horizon: "2027" },
  { client_id: 1067, client: "Naledi Khumalo", name: "Children's education fund", target: 2400000, current: 1600000, horizon: "2035" },
  { client_id: 1031, client: "Thabo Mokoena", name: "Business succession reserve", target: 12000000, current: 8900000, horizon: "2030" },
  { client_id: 1052, client: "Pieter Botha", name: "Sustainable drawdown (4%)", target: 9800000, current: 8700000, horizon: "Ongoing" },
  { client_id: 1081, client: "Zanele Mthembu", name: "Emergency fund (6 months)", target: 325000, current: 90000, horizon: "2027" },
];

function GoalsPage() {
  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader title="Goals" description="Every client goal, its funding progress and horizon." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {goals.map((g) => {
          const pct = Math.round((g.current / g.target) * 100);
          return (
            <article key={g.name} className="surface p-4 animate-fade-up">
              <div className="flex items-start justify-between gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary-wash text-primary">
                  <Target className="size-4" />
                </span>
                <Pill tone={pct >= 75 ? "success" : pct >= 40 ? "info" : "warning"}>{pct}% funded</Pill>
              </div>
              <h3 className="mt-3 text-[14px] font-semibold">{g.name}</h3>
              <Link to="/clients/$id" params={{ id: String(g.client_id) }} className="text-[12.5px] text-muted-foreground hover:text-primary">
                {g.client}
              </Link>
              <ProgressBar value={pct} tone={pct >= 75 ? "success" : "info"} className="mt-3" />
              <div className="mt-2 flex justify-between text-[12px] text-muted-foreground">
                <span className="numeric">{formatZAR(g.current)}</span>
                <span className="numeric">of {formatZAR(g.target)}</span>
              </div>
              <p className="mt-2 text-[11.5px] text-muted-foreground">Horizon: {g.horizon}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
