import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  GitBranch,
  Star,
  ShieldCheck,
  ShieldAlert,
  Clock3,
  MoreHorizontal,
  X,
  Activity,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  Filter,
  ArrowUpRight
} from "lucide-react";

const initialRepositories = [
  {
    id: 1,
    name: "payment-service",
    description: "Payment processing and transaction management API.",
    language: "Python",
    color: "#3572A5",
    branch: "main",
    stars: 128,
    branches: 8,
    findings: 5,
    health: "Needs attention",
    updated: "2 hours ago",
    visibility: "Private"
  },
  {
    id: 2,
    name: "auth-service",
    description: "Authentication, authorization and user session management.",
    language: "JavaScript",
    color: "#F1E05A",
    branch: "main",
    stars: 94,
    branches: 5,
    findings: 2,
    health: "Needs attention",
    updated: "5 hours ago",
    visibility: "Private"
  },
  {
    id: 3,
    name: "backend-api",
    description: "Core backend services and database operations.",
    language: "Python",
    color: "#3572A5",
    branch: "develop",
    stars: 76,
    branches: 12,
    findings: 1,
    health: "Needs attention",
    updated: "Yesterday",
    visibility: "Private"
  },
  {
    id: 4,
    name: "frontend-dashboard",
    description: "Developer dashboard and application interface.",
    language: "TypeScript",
    color: "#3178C6",
    branch: "main",
    stars: 61,
    branches: 4,
    findings: 0,
    health: "Healthy",
    updated: "Yesterday",
    visibility: "Public"
  },
  {
    id: 5,
    name: "notification-engine",
    description: "Email and event notification processing service.",
    language: "Go",
    color: "#00ADD8",
    branch: "main",
    stars: 42,
    branches: 3,
    findings: 0,
    health: "Healthy",
    updated: "2 days ago",
    visibility: "Private"
  },
  {
    id: 6,
    name: "data-analytics",
    description: "Data processing and reporting utilities.",
    language: "Java",
    color: "#B07219",
    branch: "develop",
    stars: 35,
    branches: 6,
    findings: 3,
    health: "Needs attention",
    updated: "3 days ago",
    visibility: "Private"
  }
];

const languages = [
  "All languages",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "Java",
  "Unknown"
];
const healthFilters = ["All statuses", "Healthy", "Protected", "Needs attention"];

function RepositoryCard({ repository, onOpen }) {
  const isRisky = repository.findings > 0;

  return (
    <article className="group rounded-2xl border border-white/[0.08] bg-[#111B2E] p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-[#142139]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B1423]">
            <FolderGit2 size={21} className="text-cyan-400" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">{repository.name}</h3>
            <p className="mt-1 text-[11px] text-slate-500">
              {repository.visibility} repository
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label={`More options for ${repository.name}`}
          onClick={() => onOpen(repository)}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-white/10 hover:text-white"
        >
          <MoreHorizontal size={19} />
        </button>
      </div>

      <p className="mt-5 min-h-[42px] text-sm leading-6 text-slate-400">
        {repository.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-4 border-b border-white/[0.07] pb-4 text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: repository.color }}
          />
          {repository.language}
        </span>

        <span className="flex items-center gap-1">
          <Star size={13} /> {repository.stars}
        </span>

        <span className="flex items-center gap-1">
          <GitBranch size={13} /> {repository.branches} branches
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className={`flex items-center gap-1.5 text-xs ${
          isRisky ? "text-amber-400" : "text-emerald-400"
        }`}>
          {isRisky ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
          {repository.health}
        </span>

        <span className="text-xs text-slate-500">
          {repository.findings} findings
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Clock3 size={13} /> {repository.updated}
        </span>

        <button
          type="button"
          onClick={() => onOpen(repository)}
          className="flex items-center gap-1 text-xs font-semibold text-cyan-400 transition hover:text-cyan-300"
        >
          View details <ArrowUpRight size={14} />
        </button>
      </div>
    </article>
  );
}

function Repositories() {
  const [repositories, setRepositories] = useState(initialRepositories);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All languages");
  const [health, setHealth] = useState("All statuses");
  const [selectedRepository, setSelectedRepository] = useState(null);
  const [connectOpen, setConnectOpen] = useState(false);
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const filteredRepositories = useMemo(() => {
    return repositories.filter((repository) => {
      const matchesSearch =
        repository.name.toLowerCase().includes(search.toLowerCase()) ||
        repository.description.toLowerCase().includes(search.toLowerCase());

      const matchesLanguage =
        language === "All languages" || repository.language === language;

      const matchesHealth =
        health === "All statuses" || repository.health === health;

      return matchesSearch && matchesLanguage && matchesHealth;
    });
  }, [repositories, search, language, health]);

  const totalFindings = repositories.reduce(
    (total, repository) => total + repository.findings,
    0
  );

  const handleConnect = (event) => {
    event.preventDefault();
    setFormError("");
    setNotice("");

    const trimmedUrl = repositoryUrl.trim();

    if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(trimmedUrl)) {
      setFormError("Enter a valid GitHub repository URL, such as https://github.com/owner/repository");
      return;
    }

    const parts = trimmedUrl.replace(/\/$/, "").split("/");
    const repositoryName = parts[parts.length - 1];

    const alreadyExists = repositories.some(
      (repository) => repository.name.toLowerCase() === repositoryName.toLowerCase()
    );

    if (alreadyExists) {
      setFormError("A repository with this name already exists in this demo workspace.");
      return;
    }

    const newRepository = {
      id: Date.now(),
      name: repositoryName,
      description: "New repository added to this local demo workspace.",
      language: "Unknown",
      color: "#94A3B8",
      branch: "main",
      stars: 0,
      branches: 1,
      findings: 0,
      health: "Healthy",
      updated: "Just added",
      visibility: "Private"
    };

    setRepositories((previous) => [newRepository, ...previous]);
    setRepositoryUrl("");
    setConnectOpen(false);
    setNotice(`${repositoryName} was added to the local demo workspace.`);
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-7">

      {/* HEADER */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
            <FolderGit2 size={15} />
            DEVELOPMENT WORKSPACE
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Repositories
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Manage your codebases, monitor repository security and explore review activity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormError("");
            setConnectOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
        >
          <Plus size={17} />
          Connect Repository
        </button>
      </section>

      {/* DEMO NOTICE */}
      <div className="flex items-start gap-3 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05] p-4">
        <GitBranch size={19} className="mt-0.5 shrink-0 text-cyan-300" />
        <div>
          <p className="text-sm font-medium text-slate-200">Repository demo workspace</p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            The repositories below use illustrative data. Adding a GitHub URL creates a local demo entry only; GitHub authentication and repository synchronization are not connected yet.
          </p>
        </div>
      </div>

      {/* NOTIFICATION */}
      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 text-sm text-emerald-300">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={17} /> {notice}
          </span>
          <button type="button" onClick={() => setNotice("")} aria-label="Dismiss notification">
            <X size={17} />
          </button>
        </div>
      )}

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Total repositories" value={repositories.length} icon={FolderGit2} color="text-blue-400" />
        <SummaryCard title="Total branches" value={repositories.reduce((sum, item) => sum + item.branches, 0)} icon={GitBranch} color="text-cyan-400" />
        <SummaryCard title="Security findings" value={totalFindings} icon={ShieldAlert} color="text-rose-400" />
        <SummaryCard
              title="Healthy repositories"
              value={repositories.filter((item) => item.health === "Healthy").length}
              icon={ShieldCheck}
              color="text-emerald-400"
        />      
        </section>

      {/* FILTERS */}
      <section className="rounded-2xl border border-white/[0.08] bg-[#111B2E] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search repositories..."
              className="w-full rounded-xl border border-white/10 bg-[#0B1423] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#0B1423] px-4 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50"
            >
              {languages.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>

            <select
              value={health}
              onChange={(event) => setHealth(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#0B1423] px-4 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50"
            >
              {healthFilters.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <Filter size={13} />
            Showing {filteredRepositories.length} of {repositories.length} repositories
          </span>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setLanguage("All languages");
              setHealth("All statuses");
            }}
            className="font-medium text-cyan-400 hover:text-cyan-300"
          >
            Clear filters
          </button>
        </div>
      </section>

      {/* REPOSITORY GRID */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Your repositories</h2>
            <p className="mt-1 text-xs text-slate-500">
              Repository security and development overview
            </p>
          </div>

          <span className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <Activity size={14} /> Demo data
          </span>
        </div>

        {filteredRepositories.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredRepositories.map((repository) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
                onOpen={setSelectedRepository}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#111B2E] px-5 py-16 text-center">
            <Search size={30} className="mx-auto text-slate-600" />
            <h3 className="mt-4 font-semibold text-white">No repositories found</h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another search term or change your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setLanguage("All languages");
                setHealth("All statuses");
              }}
              className="mt-5 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* REPOSITORY DETAILS MODAL */}
      {selectedRepository && (
        <Modal onClose={() => setSelectedRepository(null)}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                <FolderGit2 size={23} className="text-cyan-300" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{selectedRepository.name}</h2>
                <p className="mt-1 text-xs text-slate-500">{selectedRepository.visibility} repository</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedRepository(null)}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              aria-label="Close repository details"
            >
              <X size={19} />
            </button>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-400">
            {selectedRepository.description}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <DetailItem label="Primary language" value={selectedRepository.language} />
            <DetailItem label="Default branch" value={selectedRepository.branch} />
            <DetailItem label="Branches" value={selectedRepository.branches} />
            <DetailItem label="Stars" value={selectedRepository.stars} />
            <DetailItem label="Security findings" value={selectedRepository.findings} />
            <DetailItem label="Last activity" value={selectedRepository.updated} />
          </div>

          <div className="mt-5 rounded-xl border border-white/[0.08] bg-[#0B1423] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Security status
            </p>
            <p className={`mt-2 flex items-center gap-2 text-sm font-medium ${
              selectedRepository.findings > 0 ? "text-amber-400" : "text-emerald-400"
            }`}>
              {selectedRepository.findings > 0 ? <AlertTriangle size={16} /> : <ShieldCheck size={16} />}
              {selectedRepository.health}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              This status is based on illustrative demo data, not a live security scan.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSelectedRepository(null)}
            className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
          >
            Close details
          </button>
        </Modal>
      )}

      {/* CONNECT REPOSITORY MODAL */}
      {connectOpen && (
        <Modal onClose={() => setConnectOpen(false)}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <GitBranch size={24} className="text-blue-300" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">Connect a repository</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Enter a GitHub repository URL to add a local demo entry.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setConnectOpen(false)}
              aria-label="Close connect dialog"
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X size={19} />
            </button>
          </div>

          <form onSubmit={handleConnect} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-slate-300">
                GitHub repository URL
              </label>
              <input
                type="url"
                value={repositoryUrl}
                onChange={(event) => setRepositoryUrl(event.target.value)}
                placeholder="https://github.com/owner/repository"
                className="w-full rounded-xl border border-white/10 bg-[#0B1423] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
                required
              />
            </div>

            {formError && (
              <p className="rounded-lg border border-rose-400/20 bg-rose-400/[0.06] p-3 text-xs leading-5 text-rose-300">
                {formError}
              </p>
            )}

            <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.05] p-3">
              <p className="text-xs leading-5 text-amber-200">
                Demo mode: this does not authenticate with GitHub or import actual repository data.
              </p>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Plus size={16} /> Add demo repository
            </button>
          </form>
        </Modal>
      )}

      <p className="pb-3 text-center text-[10px] text-slate-600">
        CodeGuardian AI · Repository workspace · Illustrative sample data
      </p>
    </div>
  );
}

function SummaryCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111B2E] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>
        <Icon size={19} className={color} />
      </div>
      <p className="mt-4 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0B1423] p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 break-words text-sm font-semibold text-slate-200">{value}</p>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="my-auto w-full max-w-lg rounded-2xl border border-white/10 bg-[#111B2E] p-5 shadow-2xl sm:p-6">
        {children}
      </div>
    </div>
  );
}

export default Repositories;
