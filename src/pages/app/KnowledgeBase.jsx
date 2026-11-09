import { useMemo, useState } from "react";
import {
  BookOpen,
  FileText,
  ShieldCheck,
  Search,
  Plus,
  X,
  ExternalLink,
  Tag,
  Database,
  CheckCircle2,
  Pencil,
  Trash2,
  RotateCcw
} from "lucide-react";

const starterItems = [
  {
    id: 1,
    title: "OWASP Top 10",
    type: "Standard",
    category: "Security",
    severity: "High",
    status: "Available",
    value: "Security risk reference",
    description:
      "A reference list of common web application security risks. Use it to classify findings and guide remediation."
  },
  {
    id: 2,
    title: "CWE-89: SQL Injection",
    type: "Standard",
    category: "Injection",
    severity: "High",
    status: "Available",
    value: "Weakness classification",
    description:
      "Describes SQL injection weaknesses and common prevention approaches such as parameterized queries."
  },
  {
    id: 3,
    title: "CWE-798: Hardcoded Credentials",
    type: "Standard",
    category: "Secrets",
    severity: "High",
    status: "Available",
    value: "Credential security",
    description:
      "Explains risks caused by hardcoded passwords, API keys, and other authentication material."
  },
  {
    id: 4,
    title: "Secure Python Guidelines",
    type: "Document",
    category: "Python",
    severity: "Medium",
    status: "Pending",
    value: "Internal coding guide",
    description:
      "Example internal guide covering input validation, error handling, and safe Python practices."
  },
  {
    id: 5,
    title: "Pull Request Review Checklist",
    type: "Document",
    category: "Review",
    severity: "Low",
    status: "Available",
    value: "Review consistency",
    description:
      "Checklist for reviewers to verify correctness, security, tests, and documentation."
  },
  {
    id: 6,
    title: "How to prevent exposed secrets",
    type: "Post",
    category: "Secrets",
    severity: "High",
    status: "Available",
    value: "Developer guidance",
    description:
      "Do not commit credentials. Use environment variables or a managed secrets store and rotate any exposed credential."
  }
];

const emptyForm = {
  title: "",
  type: "Document",
  category: "Security",
  severity: "Medium",
  value: "",
  description: ""
};

function KnowledgeBase() {
  const [items, setItems] = useState(starterItems);
  const [tab, setTab] = useState("All");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [severity, setSeverity] = useState("All");

  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesTab = tab === "All" || item.type === tab;

      const searchText =
        `${item.title} ${item.description} ${item.category} ${item.value}`.toLowerCase();

      const matchesQuery = searchText.includes(query.toLowerCase());
      const matchesCategory =
        category === "All" || item.category === category;
      const matchesSeverity =
        severity === "All" || item.severity === severity;

      return (
        matchesTab &&
        matchesQuery &&
        matchesCategory &&
        matchesSeverity
      );
    });
  }, [items, tab, query, category, severity]);

  const availableCount = items.filter(
    (item) => item.status === "Available"
  ).length;

  const pendingCount = items.filter(
    (item) => item.status === "Pending"
  ).length;

  const clearFilters = () => {
    setTab("All");
    setQuery("");
    setCategory("All");
    setSeverity("All");
    setNotice("All filters have been cleared.");
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowForm(true);
    setSelected(null);
    setNotice("");
  };

  const openEditForm = (item) => {
    setEditingId(item.id);

    setForm({
      title: item.title,
      type: item.type,
      category: item.category,
      severity: item.severity,
      value: item.value,
      description: item.description
    });

    setSelected(null);
    setShowForm(true);
    setNotice("");
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      setNotice("Please enter a title and description.");
      return;
    }

    if (editingId !== null) {
      const updatedItem = {
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        value: form.value.trim()
      };

      setItems((current) =>
        current.map((item) =>
          item.id === editingId
            ? { ...item, ...updatedItem }
            : item
        )
      );

      setNotice("Knowledge entry updated successfully in this demo.");
    } else {
      const newItem = {
        ...form,
        id: Date.now(),
        title: form.title.trim(),
        description: form.description.trim(),
        value: form.value.trim(),
        status: "Pending"
      };

      setItems((current) => [newItem, ...current]);

      setNotice("New knowledge entry added with Pending status.");
    }

    closeForm();
  };

  const markAvailable = (id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: "Available" } : item
      )
    );

    setSelected((current) =>
      current?.id === id
        ? { ...current, status: "Available" }
        : current
    );

    setNotice("Entry marked as available in this demo.");
  };

  const deleteItem = (id) => {
    const item = items.find((entry) => entry.id === id);

    if (!item) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.title}"?`
    );

    if (!confirmed) return;

    setItems((current) =>
      current.filter((entry) => entry.id !== id)
    );

    setSelected((current) =>
      current?.id === id ? null : current
    );

    setNotice("Knowledge entry deleted successfully.");
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  const getTypeIcon = (type) => {
    if (type === "Standard") return <ShieldCheck size={19} />;
    if (type === "Post") return <BookOpen size={19} />;
    return <FileText size={19} />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-cyan-400">
            WORKSPACE / KNOWLEDGE
          </p>

          <h1 className="mt-1 text-3xl font-bold text-white">
            Knowledge Base
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Organize security standards, technical documents, and developer guidance.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <Plus size={16} />
          Add knowledge
        </button>
      </div>

      {/* Demo notice */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
        Local demonstration knowledge base. File uploads, embeddings, vector search, and live RAG retrieval are not connected.
      </div>

      {/* Feedback */}
      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={17} />
            <span>{notice}</span>
          </div>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total entries",
            value: items.length,
            icon: Database
          },
          {
            label: "Available entries",
            value: availableCount,
            icon: CheckCircle2
          },
          {
            label: "Pending entries",
            value: pendingCount,
            icon: FileText
          }
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5"
            >
              <div className="flex justify-between text-sm text-slate-400">
                <span>{stat.label}</span>
                <Icon size={18} className="text-cyan-300" />
              </div>

              <p className="mt-3 text-3xl font-bold text-white">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Knowledge entries */}
      <section className="rounded-2xl border border-slate-700 bg-[#111B2E]">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-700 p-4">
          {["All", "Standard", "Document", "Post"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                tab === item
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-[#17243A]"
              }`}
            >
              {item === "All"
                ? "All knowledge"
                : item === "Standard"
                ? "Standards"
                : item === "Document"
                ? "Documents"
                : "Knowledge posts"}
            </button>
          ))}
        </div>

        {/* Search and filters */}
        <div className="grid gap-3 border-b border-slate-700 p-4 md:grid-cols-[1fr_180px_150px_auto]">
          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-slate-500"
              size={17}
            />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, category, or content..."
              className="w-full rounded-lg border border-slate-700 bg-[#080D18] py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-cyan-400"
            />
          </div>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-lg border border-slate-700 bg-[#080D18] px-3 py-2.5 text-sm text-white"
          >
            {["All", "Security", "Injection", "Secrets", "Python", "Review"].map(
              (item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All categories" : item}
                </option>
              )
            )}
          </select>

          <select
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
            className="rounded-lg border border-slate-700 bg-[#080D18] px-3 py-2.5 text-sm text-white"
          >
            {["All", "High", "Medium", "Low"].map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All severity" : item}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-600 px-3 py-2.5 text-sm text-slate-300 transition hover:bg-[#17243A]"
          >
            <RotateCcw size={14} />
            Clear
          </button>
        </div>

        {/* Entry cards */}
        <div className="grid gap-3 p-4 lg:grid-cols-2">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-700 bg-[#17243A] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="shrink-0 rounded-lg bg-cyan-500/10 p-2.5 text-cyan-300">
                    {getTypeIcon(item.type)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-medium text-white">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.type} · {item.category}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[11px] ${
                    item.status === "Available"
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-amber-500/10 text-amber-300"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">
                {item.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <Tag size={13} />
                  <span>{item.value || "No value description"}</span>
                  <span>·</span>
                  <span>{item.severity} relevance</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openEditForm(item)}
                    className="text-xs font-medium text-blue-300 hover:text-blue-200"
                    aria-label={`Edit ${item.title}`}
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteItem(item.id)}
                    className="text-xs font-medium text-red-400 hover:text-red-300"
                    aria-label={`Delete ${item.title}`}
                  >
                    <Trash2 size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelected(item)}
                    className="flex items-center gap-1 text-xs font-medium text-cyan-300 hover:text-cyan-200"
                  >
                    View details
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-10 text-center">
              <Database
                size={30}
                className="mx-auto text-slate-600"
              />
              <p className="mt-3 text-sm text-slate-400">
                No knowledge entries match these filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-3 text-sm text-cyan-300 hover:text-cyan-200"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Add / Edit form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
          <form
            onSubmit={handleSubmit}
            className="my-auto max-h-[90vh] w-full max-w-xl space-y-4 overflow-y-auto rounded-2xl border border-slate-700 bg-[#111B2E] p-6"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">
                {editingId !== null
                  ? "Edit knowledge entry"
                  : "Add knowledge entry"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                className="text-slate-400 hover:text-white"
                aria-label="Close form"
              >
                <X />
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Title
              </label>

              <input
                required
                value={form.title}
                onChange={(event) =>
                  updateForm("title", event.target.value)
                }
                className="w-full rounded-lg border border-slate-700 bg-[#080D18] p-3 text-sm text-white"
                placeholder="Enter title"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Entry type
                </label>

                <select
                  value={form.type}
                  onChange={(event) =>
                    updateForm("type", event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-[#080D18] p-3 text-sm text-white"
                >
                  <option>Document</option>
                  <option>Standard</option>
                  <option>Post</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Category
                </label>

                <select
                  value={form.category}
                  onChange={(event) =>
                    updateForm("category", event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-[#080D18] p-3 text-sm text-white"
                >
                  <option>Security</option>
                  <option>Injection</option>
                  <option>Secrets</option>
                  <option>Python</option>
                  <option>Review</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Severity
                </label>

                <select
                  value={form.severity}
                  onChange={(event) =>
                    updateForm("severity", event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-[#080D18] p-3 text-sm text-white"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Knowledge value
                </label>

                <input
                  value={form.value}
                  onChange={(event) =>
                    updateForm("value", event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-700 bg-[#080D18] p-3 text-sm text-white"
                  placeholder="e.g. OWASP reference"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Description / content
              </label>

              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(event) =>
                  updateForm("description", event.target.value)
                }
                className="w-full rounded-lg border border-slate-700 bg-[#080D18] p-3 text-sm text-white"
                placeholder="Write the knowledge content..."
              />
            </div>

            <p className="text-xs text-amber-300">
              This form stores a local demo entry. It does not upload or index a file.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
              >
                {editingId !== null ? "Save changes" : "Add entry"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Details modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
          <div className="my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-700 bg-[#111B2E] p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-cyan-300">
                  KNOWLEDGE ENTRY
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white">
                  {selected.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-white"
                aria-label="Close details"
              >
                <X />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-slate-700 px-3 py-1 text-slate-200">
                {selected.type}
              </span>

              <span className="rounded-full bg-slate-700 px-3 py-1 text-slate-200">
                {selected.category}
              </span>

              <span className="rounded-full bg-slate-700 px-3 py-1 text-slate-200">
                {selected.severity} relevance
              </span>

              <span
                className={`rounded-full px-3 py-1 ${
                  selected.status === "Available"
                    ? "bg-emerald-500/10 text-emerald-300"
                    : "bg-amber-500/10 text-amber-300"
                }`}
              >
                {selected.status}
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              {selected.description}
            </p>

            <div className="mt-5 rounded-lg bg-[#17243A] p-3">
              <p className="text-xs text-slate-500">
                Knowledge value
              </p>

              <p className="mt-1 text-sm text-white">
                {selected.value || "Not specified"}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {selected.status === "Pending" && (
                <button
                  type="button"
                  onClick={() => markAvailable(selected.id)}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
                >
                  Mark available (demo)
                </button>
              )}

              <button
                type="button"
                onClick={() => openEditForm(selected)}
                className="flex-1 rounded-lg border border-slate-600 px-4 py-2.5 text-sm text-slate-300 hover:bg-[#17243A]"
              >
                Edit entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KnowledgeBase;