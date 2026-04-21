import { cn } from "@/lib/utils";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { BookOpen, Calendar, Dumbbell, History, Zap } from "lucide-react";

const NAV_ITEMS = [
  {
    to: "/library",
    label: "Library",
    icon: BookOpen,
    ocid: "nav.library_link",
  },
  {
    to: "/schedule",
    label: "Schedule",
    icon: Calendar,
    ocid: "nav.schedule_link",
  },
  { to: "/workout", label: "Workout", icon: Zap, ocid: "nav.workout_link" },
  { to: "/history", label: "History", icon: History, ocid: "nav.history_link" },
] as const;

export default function Layout() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col bg-card border-r border-border">
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-foreground">
            Home<span className="text-primary">Gains</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
          {NAV_ITEMS.map(({ to, label, icon: Icon, ocid }) => {
            const isActive = pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                data-ocid={ocid}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                />
                {label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        <Outlet />
      </main>
    </div>
  );
}
