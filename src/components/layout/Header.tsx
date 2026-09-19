import { Bell, Search, ChevronDown, CheckCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CURRENT_USER, notifications as seed } from "@/api/mock";
import { Logo } from "./Sidebar";
import { cn } from "@/lib/utils";

export function Header({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [items, setItems] = useState(seed);
  const unread = items.filter((n) => !n.read).length;

  const markAll = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center gap-6 border-b bg-card px-5">
      <div className="w-[220px] shrink-0">
        <Logo />
      </div>

      <div className="flex flex-1 justify-center">
        <button
          type="button"
          onClick={onOpenPalette}
          className="flex h-9 w-full max-w-xl items-center gap-2.5 rounded-lg border bg-background px-3 text-left text-[13px] text-muted-foreground transition-colors hover:border-primary/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Search className="size-4" />
          <span className="flex-1 truncate">Search clients, policies, claims, documents...</span>
          <span className="kbd">Ctrl</span>
          <span className="kbd">K</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label={`Notifications, ${unread} unread`}
              className="relative inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-canvas hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Bell className="size-[18px]" strokeWidth={1.75} />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-primary-foreground ring-2 ring-card">
                  {unread}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={8} className="w-[380px] p-0 shadow-float">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <p className="text-[13px] font-semibold">
                Notifications{" "}
                {unread > 0 && <span className="ml-1 rounded-full bg-danger-bg px-1.5 text-[11px] text-danger">{unread}</span>}
              </p>
              <button type="button" onClick={markAll} className="inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:underline">
                <CheckCheck className="size-3.5" /> Mark all read
              </button>
            </div>
            <ul className="max-h-[420px] divide-y overflow-y-auto">
              {items.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => setItems((p) => p.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                    className={cn("flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-canvas", !n.read && "bg-primary-wash/60")}
                  >
                    <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", n.read ? "bg-transparent" : "bg-primary")} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className={cn("text-[13px]", !n.read ? "font-semibold" : "font-medium")}>{n.title}</span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">{n.time}</span>
                      </span>
                      <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">{n.body}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        <button
          type="button"
          onClick={() => toast("Profile", { description: "Profile settings coming soon." })}
          className="flex items-center gap-2.5 rounded-full border py-1 pl-1 pr-3 transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-info-bg text-xs font-semibold text-info">
            {CURRENT_USER.initials}
          </span>
          <span className="text-left leading-tight">
            <span className="block text-[13px] font-medium">{CURRENT_USER.name}</span>
            <span className="block text-[11px] text-muted-foreground">{CURRENT_USER.role}</span>
          </span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
