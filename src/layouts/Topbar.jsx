
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Menu,
  Search,
  Bell,
  ChevronRight,
  X
} from "lucide-react";

const navigationPages = [
  { name: "Dashboard", path: "/app/dashboard" },
  { name: "Repositories", path: "/app/repositories" },
  { name: "Pull Requests", path: "/app/pull-requests" },
  { name: "Live Analysis", path: "/app/live-analysis" },
  { name: "Review Reports", path: "/app/review-reports" },
  { name: "AI Agent Management", path: "/app/agents" },
  { name: "Knowledge Base", path: "/app/knowledge-base" },
  { name: "Evaluation", path: "/app/evaluation" },
  { name: "Cost & Usage", path: "/app/cost-usage" },
  { name: "Similarity Check", path: "/app/similarity-check" },
  { name: "Team Management", path: "/app/team" },
  { name: "Activity Log", path: "/app/activity-log" },
  { name: "Integrations", path: "/app/integrations" },
  { name: "Settings", path: "/app/settings" },
  { name: "Reports", path: "/app/reports" },
  { name: "PR Comment Preview", path: "/app/pr-comment-preview" }
];

function Topbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const searchRef = useRef(null);

  const currentPage = navigationPages.find(
    (page) => page.path === location.pathname
  );

  const pageTitle = currentPage?.name || "Workspace";

  const filteredPages = navigationPages.filter((page) =>
    page.name.toLowerCase().includes(search.toLowerCase())
  );

  // Ctrl + K opens the workspace search.
  useEffect(() => {
    function handleKeyboard(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.key === "Escape") {
        setSearch("");
        setNotificationsOpen(false);
        searchRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  function openPage(path) {
    navigate(path);
    setSearch("");
    setNotificationsOpen(false);
    searchRef.current?.blur();
  }

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/[0.07] bg-[#0B1423]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">

      {/* LEFT SECTION */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/5 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Workspace</span>
            <ChevronRight size={13} />
            <span className="truncate text-slate-300">{pageTitle}</span>
          </div>

          <h2 className="mt-1 truncate text-lg font-bold text-white sm:text-xl">
            {pageTitle}
          </h2>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* WORKSPACE SEARCH */}
        <div className="relative hidden md:block">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111B2E] px-3 py-2">
            <Search size={16} className="text-slate-500" />

            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onFocus={() => setNotificationsOpen(false)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && filteredPages.length > 0) {
                  openPage(filteredPages[0].path);
                }
              }}
              placeholder="Search pages..."
              aria-label="Search application pages"
              className="w-36 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-500 lg:w-48"
            />

            <span className="rounded border border-white/10 px-1.5 py-1 text-[10px] text-slate-500">
              Ctrl K
            </span>
          </div>

          {search.trim() && (
            <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-xl border border-white/10 bg-[#111B2E] p-2 shadow-2xl">
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Search results
              </p>

              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <button
                    key={page.path}
                    type="button"
                    onClick={() => openPage(page.path)}
                    className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 hover:bg-blue-500/10 hover:text-white"
                  >
                    <Search size={14} className="mr-3 text-slate-500" />
                    {page.name}
                  </button>
                ))
              ) : (
                <p className="px-3 py-4 text-sm text-slate-500">
                  No matching pages found.
                </p>
              )}
            </div>
          )}
        </div>

        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen((previous) => !previous);
              setSearch("");
            }}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            className="relative rounded-xl border border-white/10 bg-[#111B2E] p-2.5 text-slate-400 transition hover:text-white"
          >
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-14 z-50 w-72 rounded-xl border border-white/10 bg-[#111B2E] p-4 shadow-2xl sm:w-80">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Notifications</h3>

                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  aria-label="Close notifications"
                  className="text-slate-500 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 rounded-lg border border-cyan-400/10 bg-cyan-400/5 p-3">
                <p className="text-sm font-medium text-cyan-300">
                  Demo workspace
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Notifications are currently sample information. Connect the
                  backend to receive real review and security alerts.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* USER PROFILE */}
        <div className="flex items-center gap-2 border-l border-white/10 pl-3 sm:pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
            CG
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-white">Developer</p>
            <p className="text-[10px] text-slate-500">Demo workspace</p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Topbar;
