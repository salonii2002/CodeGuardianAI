
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Menu,
  Search,
  Bell,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/useAuth";

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
  { name: "PR Comment Preview", path: "/app/pr-comment-preview" },
];

function Topbar({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, status, authEnabled, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const searchRef = useRef(null);

  const currentPage = navigationPages.find(
    (page) => page.path === location.pathname
  );

  const pageTitle = currentPage?.name || "Workspace";

  const filteredPages = navigationPages.filter((page) =>
    page.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyboard(event) {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        setSearchOpen(true);
        setNotificationsOpen(false);

        requestAnimationFrame(() => {
          searchRef.current?.focus();
        });
      }

      if (event.key === "Escape") {
        setSearch("");
        setSearchOpen(false);
        setNotificationsOpen(false);
        searchRef.current?.blur();
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  // Navigate to selected page
  function openPage(path) {
    navigate(path);

    setSearch("");
    setSearchOpen(false);
    setNotificationsOpen(false);

    searchRef.current?.blur();
  }

  // Logout
  async function handleLogout() {
    if (logoutLoading) return;

    setLogoutLoading(true);
    setLogoutError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setLogoutError("Unable to sign out. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  }

  const displayName = user?.name || user?.login || "Developer";

  return (
    <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-2 border-b border-white/[0.07] bg-[#0B1423]/95 px-3 py-3 backdrop-blur-xl sm:px-6 lg:px-8">

      {/* LEFT SECTION */}
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="shrink-0 rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/5 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <span>Workspace</span>
            <ChevronRight size={13} />
            <span className="truncate text-slate-300">
              {pageTitle}
            </span>
          </div>

          <h2 className="truncate text-base font-bold text-white sm:mt-1 sm:text-xl">
            {pageTitle}
          </h2>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">

        {/* DESKTOP SEARCH */}
        <div className="relative hidden md:block">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111B2E] px-3 py-2">
            <Search
              size={16}
              className="shrink-0 text-slate-500"
            />

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
              className="w-28 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-500 lg:w-48"
            />

            <span className="hidden rounded border border-white/10 px-1.5 py-1 text-[10px] text-slate-500 lg:inline">
              Ctrl K
            </span>
          </div>

          {search.trim() && (
            <div className="absolute right-0 top-14 z-50 max-h-80 w-64 overflow-y-auto rounded-xl border border-white/10 bg-[#111B2E] p-2 shadow-2xl">
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Search results
              </p>

              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <button
                    key={page.path}
                    type="button"
                    onClick={() => openPage(page.path)}
                    className="flex w-full items-center rounded-lg px-3 py-2.5 text-left text-sm text-slate-300 transition hover:bg-blue-500/10 hover:text-white"
                  >
                    <Search
                      size={14}
                      className="mr-3 shrink-0 text-slate-500"
                    />
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

        {/* MOBILE SEARCH */}
        <button
          type="button"
          onClick={() => {
            setSearchOpen((previous) => !previous);
            setNotificationsOpen(false);
            setSearch("");
          }}
          aria-label="Open search"
          aria-expanded={searchOpen}
          className="rounded-xl border border-white/10 bg-[#111B2E] p-2.5 text-slate-400 transition hover:text-white md:hidden"
        >
          {searchOpen ? <X size={18} /> : <Search size={18} />}
        </button>

        {/* NOTIFICATIONS */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen((previous) => !previous);
              setSearch("");
              setSearchOpen(false);
            }}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            className="relative rounded-xl border border-white/10 bg-[#111B2E] p-2.5 text-slate-400 transition hover:text-white"
          >
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-14 z-50 w-[min(19rem,calc(100vw-1.5rem))] rounded-xl border border-white/10 bg-[#111B2E] p-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">
                  Notifications
                </h3>

                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  aria-label="Close notifications"
                  className="text-slate-500 transition hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 rounded-lg border border-cyan-400/10 bg-cyan-400/5 p-3">
                <p className="text-sm font-medium text-cyan-300">
                  Demo workspace
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Notifications are sample information. Connect the backend
                  to receive real review and security alerts.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* USER PROFILE */}
        <div className="flex shrink-0 items-center gap-2 border-l border-white/10 pl-2 sm:pl-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              displayName.slice(0, 2).toUpperCase()
            )}
          </div>

          <div className="hidden sm:block">
            <p className="max-w-32 truncate text-xs font-semibold text-white">
              {displayName}
            </p>

            <p className="text-[10px] text-slate-500">
              {status === "authenticated"
                ? "GitHub connected"
                : "Demo workspace"}
            </p>
          </div>

          {authEnabled && status === "authenticated" && (
            <button
              type="button"
              onClick={handleLogout}
              disabled={logoutLoading}
              title={logoutLoading ? "Signing out..." : "Sign out"}
              aria-label="Sign out"
              className="ml-1 rounded-lg border border-white/10 p-2 text-slate-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH PANEL */}
      {searchOpen && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-white/10 bg-[#0B1423] p-3 shadow-xl md:hidden">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111B2E] px-3 py-3">
            <Search
              size={17}
              className="shrink-0 text-slate-500"
            />

            <input
              ref={searchRef}
              autoFocus
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && filteredPages.length > 0) {
                  openPage(filteredPages[0].path);
                }
              }}
              placeholder="Search application pages..."
              aria-label="Search application pages"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
            />
          </div>

          {search.trim() && (
            <div className="mt-2 max-h-64 overflow-y-auto rounded-xl border border-white/10 bg-[#111B2E] p-2">
              {filteredPages.length > 0 ? (
                filteredPages.map((page) => (
                  <button
                    key={page.path}
                    type="button"
                    onClick={() => openPage(page.path)}
                    className="flex w-full items-center rounded-lg px-3 py-3 text-left text-sm text-slate-300 hover:bg-blue-500/10 hover:text-white"
                  >
                    <Search
                      size={14}
                      className="mr-3 shrink-0 text-slate-500"
                    />
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
      )}

      {/* LOGOUT ERROR */}
      {logoutError && (
        <div
          role="alert"
          className="absolute right-3 top-full z-50 mt-2 max-w-xs rounded-lg border border-red-500/20 bg-[#21131B] px-4 py-3 text-xs text-red-300 shadow-xl"
        >
          {logoutError}
        </div>
      )}
    </header>
  );
}

export default Topbar;
