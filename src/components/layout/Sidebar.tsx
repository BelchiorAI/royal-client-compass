import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Bell,
  Users,
  ShieldCheck,
  TrendingUp,
  Coins,
  FileText,
  Target,
  FolderOpen,
  MessageSquare,
  Shield,
  Calendar,
  BarChart3,
  Link2,
  ChevronDown,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { CURRENT_USER } from "@/api/mock";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Today", icon: Home },
  { to: "/action-centre", label: "Action Centre", icon: Bell, badge: 5 },
  { to: "/clients", label: "Clients", icon: Users },
  { to: "/claims", label: "Claims", icon: ShieldCheck },
  { to: "/financial-planning", label: "Financial Planning", icon: TrendingUp },
  { to: "/investments", label: "Investments", icon: Coins },
  { to: "/policies", label: "Policies", icon: FileText },
  { to: "/goals", label: "Goals", icon: Target },
] as const;

const NAV_AFTER = [
  { to: "/communications", label: "Communications", icon: MessageSquare },
  { to: "/compliance", label: "Compliance", icon: Shield },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/integrations", label: "Integrations", icon: Link2 },
] as const;

const DOC_CHILDREN = [
  { to: "/documents", label: "Documents" },
  { to: "/documents/templates", label: "Templates" },
  { to: "/documents/e-signatures", label: "E-signatures" },
] as const;

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-8 shrink-0 grid-cols-2 gap-[3px] rounded-lg bg-primary p-[6px]">
        <span className="rounded-[2px] bg-primary-foreground" />
        <span className="rounded-[2px] bg-primary-foreground/60" />
        <span className="rounded-[2px] bg-primary-foreground/60" />
        <span className="rounded-[2px] bg-primary-foreground" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block text-[15px] font-bold tracking-tight text-foreground">Royal Square</span>
          <span className="mt-0.5 block text-[9.5px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Financial
          </span>
        </span>
      )}
    </div>
  );
}

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const docsActive = pathname.startsWith("/documents");
  const [docsOpen, setDocsOpen] = useState(true);

  return (
    <aside className="fixed inset-y-0 left-0 top-16 z-30 flex w-60 flex-col bg-navy text-navy-foreground">
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="nav-item"
            activeOptions={{ exact: item.to === "/" }}
            activeProps={{ "data-active": "true" }}
          >
            <item.icon className="size-4 shrink-0" strokeWidth={1.75} />
            <span className="flex-1">{item.label}</span>
            {"badge" in item && item.badge && (
              <span className="rounded-full bg-danger px-1.5 py-0.5 text-[10px] font-bold leading-none text-primary-foreground">
                {item.badge}
              </span>
            )}
          </Link>
        ))}

        <button
          type="button"
          onClick={() => setDocsOpen((o) => !o)}
          className="nav-item w-full"
          data-active={docsActive && !docsOpen ? "true" : undefined}
          aria-expanded={docsOpen}
        >
          <FolderOpen className="size-4 shrink-0" strokeWidth={1.75} />
          <span className="flex-1 text-left">Documents</span>
          {docsOpen ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
        </button>
        {docsOpen && (
          <div className="relative ml-[22px] space-y-0.5 border-l border-sidebar-border pl-3 animate-fade-up">
            {DOC_CHILDREN.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                activeOptions={{ exact: true }}
                className="group flex h-8 items-center gap-2 rounded-md px-2 text-[13px] text-navy-muted transition-colors hover:text-navy-foreground"
                activeProps={{ className: "text-navy-foreground font-medium" }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        "size-1.5 rounded-full transition-colors",
                        isActive ? "bg-primary" : "bg-navy-muted/40 group-hover:bg-navy-muted",
                      )}
                    />
                    {c.label}
                  </>
                )}
              </Link>
            ))}
          </div>
        )}

        {NAV_AFTER.map((item) => (
          <Link key={item.to} to={item.to} className="nav-item" activeProps={{ "data-active": "true" }}>
            <item.icon className="size-4 shrink-0" strokeWidth={1.75} />
            <span className="flex-1">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg bg-navy-light/60 p-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-info-bg text-xs font-semibold text-info">
            {CURRENT_USER.initials}
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[13px] font-medium">{CURRENT_USER.name}</p>
            <p className="text-[11px] text-navy-muted">{CURRENT_USER.role}</p>
          </div>
          <ChevronDown className="size-4 text-navy-muted" />
        </div>
        <button
          type="button"
          onClick={() => toast("Signed out", { description: "This is a demo — you're still here." })}
          className="mt-2 flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-[12.5px] text-navy-muted transition-colors hover:bg-navy-light hover:text-navy-foreground"
        >
          <LogOut className="size-3.5" /> Sign out
        </button>
      </div>
    </aside>
  );
}
