import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  GitBranch,
  Star,
  ShieldCheck,
  ShieldAlert,
  Clock3,
  X,
  FolderGit2,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  LockKeyhole,
  RotateCcw,
  Play,
  Code2,
} from "lucide-react";

const initialRepositories = [
  {
    id: 1,
    fullName: "company/payment-service",
    name: "payment-service",
    owner: "company",
    description: "Payment processing and transaction management API.",
    language: "Python",
    color: "#3572A5",
    branch: "main",
    stars: 128,
    branches: 8,
    findings: 5,
    health: "Needs attention",
    updated: "2 hours ago",
    visibility: "Private",
  },
  {
    id: 2,
    fullName: "company/auth-service",
    name: "auth-service",
    owner: "company",
    description: "Authentication, authorization and user session management.",
    language: "JavaScript",
    color: "#F1E05A",
    branch: "main",
    stars: 94,
    branches: 5,
    findings: 2,
    health: "Needs attention",
    updated: "5 hours ago",
    visibility: "Private",
  },
  {
    id: 3,
    fullName: "company/backend-api",
    name: "backend-api",
    owner: "company",
    description: "Core backend services and database operations.",
    language: "Python",
    color: "#3572A5",
    branch: "develop",
    stars: 76,
    branches: 12,
    findings: 1,
    health: "Needs attention",
    updated: "Yesterday",
    visibility: "Private",
  },
  {
    id: 4,
    fullName: "company/frontend-dashboard",
    name: "frontend-dashboard",
    owner: "company",
    description: "Developer dashboard and application interface.",
    language: "TypeScript",
    color: "#3178C6",
    branch: "main",
    stars: 61,
    branches: 4,
    findings: 0,
    health: "Healthy",
    updated: "Yesterday",
    visibility: "Public",
  },
  {
    id: 5,
    fullName: "company/notification-engine",
    name: "notification-engine",
    owner: "company",
    description: "Email and event notification processing service.",
    language: "Go",
    color: "#00ADD8",
    branch: "main",
    stars: 42,
    branches: 3,
    findings: 0,
    health: "Healthy",
    updated: "2 days ago",
    visibility: "Private",
  },
  {
    id: 6,
    fullName: "company/data-analytics",
    name: "data-analytics",
    owner: "company",
    description: "Data processing and reporting utilities.",
    language: "Java",
    color: "#B07219",
    branch: "develop",
    stars: 35,
    branches: 6,
    findings: 3,
    health: "Needs attention",
    updated: "3 days ago",
    visibility: "Private",
  },
];

const languageOptions = [
  "All languages",
  "Python",
  "JavaScript",
  "TypeScript",
  "Go",
  "Java",
  "Unknown",
];

const statusOptions = [
  "All statuses",
  "Healthy",
  "Needs attention",
];

function SummaryCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#111B2E] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-slate-400">{title}</p>
        <Icon size={19} className={color} />
      </div>
      <p className="mt-4 text-3xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function RepositoryCard({ repository, selected, onSelect, onDetails }) {
  const hasFindings = repository.findings > 0;

  return (
    <article
      className={`rounded-2xl border bg-[#111B2E] p-5 transition duration-200 hover:-translate-y-1 hover:bg-[#142139] ${
        selected
          ? "border-cyan-400/50 ring-1 ring-cyan-400/20"
          : "border-white/[0.08] hover:border-cyan-400/30"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0B1423]">
            <FolderGit2 size={21} className="text-cyan-400" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-white">
              {repository.name}
            </h3>
            <p className="mt-1 truncate text-[11px] text-slate-500">
              {repository.owner}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full border px-2 py-1 text-[10px] ${
            repository.visibility === "Private"
              ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
              : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
          }`}
        >
          {repository.visibility}
        </span>
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
        <span
          className={`flex items-center gap-1.5 text-xs ${
            hasFindings ? "text-amber-400" : "text-emerald-400"
          }`}
        >
          {hasFindings ? (
            <ShieldAlert size={14} />
          ) : (
            <ShieldCheck size={14} />
          )}
          {repository.health}
        </span>

        <span className="text-xs text-slate-500">
          {repository.findings} sample findings
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Clock3 size={13} />
          {repository.updated}
        </span>

        <button
          type="button"
          onClick={() => onDetails(repository)}
          className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
        >
          Details <ArrowUpRight size={14} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => onSelect(repository)}
        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
          selected
            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
            : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-300"
        }`}
      >
        {selected ? (
          <>
            <CheckCircle2 size={16} /> Selected
          </>
        ) : (
          <>
            <Plus size={16} /> Select repository
          </>
        )}
      </button>
    </article>
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

function DetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0B1423] p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}

function Repositories() {
  const navigate = useNavigate();

  const [repositories, setRepositories] = useState(initialRepositories);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All languages");
  const [health, setHealth] = useState("All statuses");
  const [selectedRepository, setSelectedRepository] = useState(null);
  const [detailsRepository, setDetailsRepository] = useState(null);
  const [connectOpen, setConnectOpen] = useState(false);
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const filteredRepositories = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return repositories.filter((repository) => {
      const matchesSearch =
        repository.name.toLowerCase().includes(searchText) ||
        repository.owner.toLowerCase().includes(searchText) ||
        repository.fullName.toLowerCase().includes(searchText) ||
        repository.description.toLowerCase().includes(searchText);

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

  const healthyCount = repositories.filter(
    (repository) => repository.health === "Healthy"
  ).length;

  const totalBranches = repositories.reduce(
    (total, repository) => total + repository.branches,
    0
  );

  const resetFilters = () => {
    setSearch("");
    setLanguage("All languages");
    setHealth("All statuses");
  };

  const handleConnect = (event) => {
    event.preventDefault();
    setFormError("");
    setNotice("");

    const trimmedUrl = repositoryUrl.trim().replace(/\/$/, "");
    const match = trimmedUrl.match(
      /^https:\/\/github\.com\/([A-Za-z0-9-]+)\/([A-Za-z0-9_.-]+)$/
    );

    if (!match) {
      setFormError(
        "Enter a valid GitHub URL, such as https://github.com/owner/repository"
      );
      return;
    }

    const [, owner, name] = match;
    const fullName = `${owner}/${name}`;

    const alreadyExists = repositories.some(
      (repository) =>
        repository.fullName.toLowerCase() === fullName.toLowerCase()
    );

    if (alreadyExists) {
      setFormError("This repository is already listed in the demo workspace.");
      return;
    }

    const newRepository = {
      id: Date.now(),
      fullName,
      name,
      owner,
      description: "Added as a local demo entry. GitHub data is not imported.",
      language: "Unknown",
      color: "#94A3B8",
      branch: "Unknown",
      stars: 0,
      branches: 0,
      findings: 0,
      health: "Not scanned",
      updated: "Just added",
      visibility: "Unknown",
    };

    setRepositories((current) => [newRepository, ...current]);
    setRepositoryUrl("");
    setConnectOpen(false);
    setNotice(`${fullName} was added as a local demo entry.`);
  };

  const startReview = () => {
    if (!selectedRepository) return;

    navigate("/app/pull-requests", {
      state: {
        repository: selectedRepository.fullName,
        demo: true,
      },
    });
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-7">
      {/* PAGE HEADER */}
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
            Manage code repositories, select a project and prepare it for
            security analysis.
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
          Add Repository
        </button>
      </section>

      {/* DEMO MODE NOTICE */}
      <div className="flex items-start gap-3 rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05] p-4">
        <GitBranch size={19} className="mt-0.5 shrink-0 text-cyan-300" />
        <div>
          <p className="text-sm font-medium text-slate-200">
            Demo repository workspace
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            These are illustrative repositories and sample security values.
            GitHub sign-in and live repository synchronization will be enabled
            after the backend integration is ready.
          </p>
        </div>
      </div>

      {/* NOTIFICATION */}
      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 text-sm text-emerald-300">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={17} />
            {notice}
          </span>
          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
            className="rounded-lg p-1 hover:bg-white/10"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total repositories"
          value={repositories.length}
          icon={FolderGit2}
          color="text-blue-400"
          description="In this demo workspace"
        />
        <SummaryCard
          title="Total branches"
          value={totalBranches}
          icon={GitBranch}
          color="text-cyan-400"
          description="Illustrative branch count"
        />
        <SummaryCard
          title="Security findings"
          value={totalFindings}
          icon={ShieldAlert}
          color="text-rose-400"
          description="Sample findings only"
        />
        <SummaryCard
          title="Healthy repositories"
          value={healthyCount}
          icon={ShieldCheck}
          color="text-emerald-400"
          description="Based on sample data"
        />
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="rounded-2xl border border-white/[0.08] bg-[#111B2E] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by repository name, owner or description..."
              aria-label="Search repositories"
              className="w-full rounded-xl border border-white/10 bg-[#0B1423] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label="Filter by language"
              className="rounded-xl border border-white/10 bg-[#0B1423] px-4 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50"
            >
              {languageOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={health}
              onChange={(event) => setHealth(event.target.value)}
              aria-label="Filter by security status"
              className="rounded-xl border border-white/10 bg-[#0B1423] px-4 py-3 text-sm text-slate-300 outline-none focus:border-cyan-400/50"
            >
              {statusOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <Filter size={13} />
            Showing {filteredRepositories.length} of {repositories.length}{" "}
            repositories
          </span>

          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1.5 font-medium text-cyan-400 hover:text-cyan-300"
          >
            <RotateCcw size={13} />
            Clear filters
          </button>
        </div>
      </section>

      {/* SELECTED REPOSITORY ACTION */}
      {selectedRepository && (
        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.06] p-5 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
              <CheckCircle2 size={20} className="text-cyan-300" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-cyan-300">Selected repository</p>
              <p className="mt-1 truncate font-semibold text-white">
                {selectedRepository.fullName}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => setSelectedRepository(null)}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
            >
              Clear selection
            </button>
            <button
              type="button"
              onClick={startReview}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Play size={15} />
              Start Review
            </button>
          </div>
        </section>
      )}

      {/* REPOSITORY GRID */}
      <section>
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-white">Your repositories</h2>
            <p className="mt-1 text-xs text-slate-500">
              Select a repository to continue to the review workspace.
            </p>
          </div>

          <span className="flex items-center gap-2 text-xs text-slate-500">
            <Code2 size={14} />
            Sample data
          </span>
        </div>

        {filteredRepositories.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredRepositories.map((repository) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
                selected={selectedRepository?.id === repository.id}
                onSelect={setSelectedRepository}
                onDetails={setDetailsRepository}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#111B2E] px-5 py-16 text-center">
            <Search size={30} className="mx-auto text-slate-600" />
            <h3 className="mt-4 font-semibold text-white">
              No repositories found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try a different search term or update your filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      {/* REPOSITORY DETAILS */}
      {detailsRepository && (
        <Modal onClose={() => setDetailsRepository(null)}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                <FolderGit2 size={23} className="text-cyan-300" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-bold text-white">
                  {detailsRepository.name}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {detailsRepository.fullName}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setDetailsRepository(null)}
              aria-label="Close repository details"
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X size={19} />
            </button>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-400">
            {detailsRepository.description}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <DetailItem
              label="Primary language"
              value={detailsRepository.language}
            />
            <DetailItem
              label="Default branch"
              value={detailsRepository.branch}
            />
            <DetailItem label="Branches" value={detailsRepository.branches} />
            <DetailItem label="Stars" value={detailsRepository.stars} />
            <DetailItem
              label="Sample findings"
              value={detailsRepository.findings}
            />
            <DetailItem
              label="Last activity"
              value={detailsRepository.updated}
            />
          </div>

          <div className="mt-5 rounded-xl border border-amber-400/15 bg-amber-400/[0.05] p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-amber-300">
              <AlertTriangle size={16} />
              Demo security information
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              The displayed security status and findings are sample values.
              They are not generated by a live scan.
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setSelectedRepository(detailsRepository);
                setDetailsRepository(null);
              }}
              className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Select repository
            </button>
            <button
              type="button"
              onClick={() => setDetailsRepository(null)}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* ADD DEMO REPOSITORY */}
      {connectOpen && (
        <Modal onClose={() => setConnectOpen(false)}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                <GitBranch size={24} className="text-blue-300" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">
                Add a repository
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Add a GitHub URL as a local demo entry.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setConnectOpen(false)}
              aria-label="Close add repository dialog"
              className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <X size={19} />
            </button>
          </div>

          <form onSubmit={handleConnect} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="repository-url"
                className="mb-2 block text-xs font-medium text-slate-300"
              >
                GitHub repository URL
              </label>
              <input
                id="repository-url"
                type="url"
                value={repositoryUrl}
                onChange={(event) => setRepositoryUrl(event.target.value)}
                placeholder="https://github.com/owner/repository"
                className="w-full rounded-xl border border-white/10 bg-[#0B1423] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50"
                required
              />
            </div>

            {formError && (
              <p
                role="alert"
                className="rounded-lg border border-rose-400/20 bg-rose-400/[0.06] p-3 text-xs leading-5 text-rose-300"
              >
                {formError}
              </p>
            )}

            <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.05] p-3">
              <p className="flex items-center gap-2 text-xs font-medium text-amber-200">
                <LockKeyhole size={14} />
                Demo mode only
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                This does not connect to GitHub, check repository permissions
                or import real repository data.
              </p>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <Plus size={16} />
              Add demo entry
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

export default Repositories;