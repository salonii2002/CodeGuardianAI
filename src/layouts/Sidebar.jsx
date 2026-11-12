
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  GitBranch,
  GitPullRequest,
  Activity,
  FileSearch,
  Bot,
  BookOpen,
  BarChart3,
  Gauge,
  GitCompare,
  Users,
  ScrollText,
  Plug,
  Settings,
  ShieldCheck,
  X,
  ChevronRight,
} from "lucide-react";

const navigationGroups = [
  {
    title: "WORKSPACE",
    items: [
      { name: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
      { name: "Repositories", path: "/app/repositories", icon: GitBranch },
      { name: "Pull Requests", path: "/app/pull-requests", icon: GitPullRequest },
      { name: "Live Analysis", path: "/app/live-analysis", icon: Activity },
      { name: "Review Reports", path: "/app/review-reports", icon: FileSearch },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { name: "AI Agents", path: "/app/agents", icon: Bot },
      { name: "Knowledge Base", path: "/app/knowledge-base", icon: BookOpen },
      { name: "Evaluation", path: "/app/evaluation", icon: BarChart3 },
      { name: "Cost & Usage", path: "/app/cost-usage", icon: Gauge },
      { name: "Similarity Check", path: "/app/similarity-check", icon: GitCompare },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      { name: "Team", path: "/app/team", icon: Users },
      { name: "Activity Log", path: "/app/activity-log", icon: ScrollText },
      { name: "Integrations", path: "/app/integrations", icon: Plug },
      { name: "Settings", path: "/app/settings", icon: Settings },
    ],
  },
];

function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen, onClose]);

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 shrink-0 flex-col border-r border-white/[0.08] bg-[#0B1423] transition-transform duration-300 motion-reduce:transition-none lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* BRAND */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/[0.07] px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
              <ShieldCheck className="h-6 w-6 text-cyan-300" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                CodeGuardian<span className="text-cyan-400"> AI</span>
              </h1>
              <p className="text-[9px] tracking-[0.18em] text-slate-500">
                SECURE CODE INTELLIGENCE
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="min-h-0 flex-1 space-y-7 overflow-y-auto overscroll-contain px-4 py-6">
          {navigationGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.18em] text-slate-500">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                          isActive
                            ? "border border-blue-500/20 bg-blue-500/10 font-semibold text-blue-300"
                            : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="flex items-center gap-3">
                            <Icon
                              size={18}
                              className={
                                isActive
                                  ? "text-cyan-300"
                                  : "text-slate-500 group-hover:text-slate-300"
                              }
                            />
                            {item.name}
                          </span>

                          {isActive && (
                            <ChevronRight
                              size={15}
                              className="text-cyan-400"
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* BOTTOM STATUS */}
        <div className="shrink-0 border-t border-white/[0.07] p-4">
          <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] p-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300">
                Platform workspace
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              Frontend demonstration environment
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
