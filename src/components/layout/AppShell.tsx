import { useEffect, useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { CommandPalette } from "./CommandPalette";

export function AppShell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenPalette={() => setPaletteOpen(true)} />
      <Sidebar />
      <main className="ml-60 pt-16">
        <div className="mx-auto max-w-[1400px] px-6 py-6">{children}</div>
      </main>
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </div>
  );
}
