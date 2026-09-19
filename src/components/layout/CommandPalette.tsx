import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Users, FileText, ShieldCheck, ArrowRight, CornerDownLeft } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { claims, clients, policies } from "@/api/mock";
import { cn } from "@/lib/utils";

type Item = { id: string; group: string; label: string; hint?: string; icon: typeof Users; go: () => void };

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const items = useMemo<Item[]>(() => {
    const nav = (to: string) => () => {
      onOpenChange(false);
      navigate({ to });
    };
    const pages: [string, string][] = [
      ["Today", "/"],
      ["Action Centre", "/action-centre"],
      ["Clients", "/clients"],
      ["Claims", "/claims"],
      ["Financial Planning", "/financial-planning"],
      ["Investments", "/investments"],
      ["Policies", "/policies"],
      ["Goals", "/goals"],
      ["Documents", "/documents"],
      ["Communications", "/communications"],
      ["Compliance", "/compliance"],
      ["Calendar", "/calendar"],
      ["Reports", "/reports"],
      ["Integrations", "/integrations"],
    ];
    const shortcuts: Item[] = pages.map(([label, to]) => ({ id: `nav-${to}`, group: "Navigate", label, hint: to, icon: ArrowRight, go: nav(to) }));

    const cl: Item[] = clients.map((c) => ({
      id: `c-${c.id}`,
      group: "Clients",
      label: c.personal.full_name,
      hint: c.code,
      icon: Users,
      go: () => {
        onOpenChange(false);
        navigate({ to: "/clients/$id", params: { id: String(c.id) } });
      },
    }));
    const po: Item[] = policies.map((p) => ({
      id: `p-${p.id}`,
      group: "Policies",
      label: `${p.product} — ${p.client_name}`,
      hint: p.number,
      icon: FileText,
      go: nav("/policies"),
    }));
    const cm: Item[] = claims.map((c) => ({
      id: `cl-${c.id}`,
      group: "Claims",
      label: `${c.type} — ${c.client_name}`,
      hint: c.number,
      icon: ShieldCheck,
      go: nav("/claims"),
    }));
    return [...cl, ...po, ...cm, ...shortcuts];
  }, [navigate, onOpenChange]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items.slice(0, 14);
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group}`.toLowerCase().includes(s)).slice(0, 20);
  }, [q, items]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    if (!open) setQ("");
  }, [open]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.go();
    }
  };

  let lastGroup = "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[15%] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl shadow-float [&>button:last-child]:hidden">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="size-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search clients, policies, claims or jump to a page…"
            className="h-12 flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground/70"
            aria-label="Command search"
          />
          <span className="kbd">Esc</span>
        </div>
        <ul ref={listRef} role="listbox" className="max-h-[380px] overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-8 text-center text-[13px] text-muted-foreground">No results for “{q}”</li>}
          {filtered.map((it, i) => {
            const showGroup = it.group !== lastGroup;
            lastGroup = it.group;
            return (
              <li key={it.id}>
                {showGroup && (
                  <p className="px-2 pb-1 pt-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">{it.group}</p>
                )}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  onMouseEnter={() => setActive(i)}
                  onClick={it.go}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-[13px] transition-colors",
                    i === active ? "bg-primary-wash text-primary" : "hover:bg-canvas",
                  )}
                >
                  <it.icon className="size-4 shrink-0 opacity-70" />
                  <span className="flex-1 truncate">{it.label}</span>
                  {it.hint && <span className="numeric text-[11px] text-muted-foreground">{it.hint}</span>}
                  {i === active && <CornerDownLeft className="size-3.5 opacity-60" />}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-4 border-t bg-canvas px-4 py-2 text-[11px] text-muted-foreground">
          <span>
            <span className="kbd">↑</span> <span className="kbd">↓</span> navigate
          </span>
          <span>
            <span className="kbd">↵</span> open
          </span>
          <span>
            <span className="kbd">Esc</span> close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
