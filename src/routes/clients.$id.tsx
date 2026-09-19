import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, UserRound, CalendarDays } from "lucide-react";
import { z } from "zod";
import { getClient, formatDate } from "@/api/mock";
import { Avatar, Pill, statusTone } from "@/components/shared/primitives";
import { ClientTabContent, TABS, type Tab } from "@/components/clients/ClientTabs";

const searchSchema = z.object({ tab: z.enum(TABS).optional() });

export const Route = createFileRoute("/clients/$id")({
  validateSearch: searchSchema,
  loader: ({ params }) => {
    const client = getClient(Number(params.id));
    if (!client) throw notFound();
    return { client };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.client.personal.full_name ?? "Client";
    return {
      meta: [
        { title: `${name} — Client 360 | Royal Square Financial` },
        { name: "description", content: `Client 360 view for ${name}: documents, policies, claims, financials and communications.` },
        { property: "og:title", content: `${name} — Client 360 | Royal Square Financial` },
        { property: "og:description", content: `Full advisory profile for ${name}.` },
      ],
    };
  },
  component: ClientPage,
});

function ClientPage() {
  const { client } = Route.useLoaderData();
  const { tab = "Documents" } = Route.useSearch();
  const p = client.personal;

  return (
    <div className="space-y-4 animate-fade-up">
      <Link to="/clients" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="size-4" /> Back to Clients
      </Link>

      <section className="surface flex flex-wrap items-center gap-5 p-5">
        <Avatar name={p.full_name} size="xl" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl font-semibold tracking-tight">{p.full_name}</h1>
            <Pill dot tone={statusTone(p.status)}>
              {p.status}
            </Pill>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
            <span className="numeric">Client #{client.code}</span>
            <span className="text-border">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="size-3.5" /> <span className="numeric">{p.phone}</span>
            </span>
            <span className="text-border">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="size-3.5" /> {p.email}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 text-[13px] text-muted-foreground sm:text-right">
          <span className="inline-flex items-center gap-1.5 sm:justify-end">
            <UserRound className="size-3.5" /> Adviser: <span className="font-medium text-foreground">{client.adviser}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 sm:justify-end">
            <CalendarDays className="size-3.5" /> Client since <span className="font-medium text-foreground">{formatDate(client.client_since)}</span>
          </span>
        </div>
      </section>

      <nav className="flex gap-5 overflow-x-auto border-b" role="tablist" aria-label="Client sections">
        {TABS.map((t) => (
          <Link
            key={t}
            to="/clients/$id"
            params={{ id: String(client.id) }}
            search={{ tab: t }}
            role="tab"
            aria-selected={t === tab}
            className="tab-underline"
            data-active={t === tab ? "true" : undefined}
          >
            {t}
          </Link>
        ))}
      </nav>

      <div key={tab} className="animate-fade-up">
        <ClientTabContent tab={tab as Tab} client={client} />
      </div>
    </div>
  );
}
