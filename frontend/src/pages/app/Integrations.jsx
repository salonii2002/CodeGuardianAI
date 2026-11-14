
import { useState } from "react";
import {
  GitBranch,
  ShieldCheck,
  Code2,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Settings,
  PlugZap,
} from "lucide-react";

const initialIntegrations = [
  {
    id: "github",
    name: "GitHub",
    description:
      "Repository access, pull request events, and review comments.",
    category: "Source control",
    icon: GitBranch,
    status: "Not connected",
    fields: ["Repository URL", "Personal access token"],
  },
  {
    id: "semgrep",
    name: "Semgrep",
    description:
      "Static analysis for code patterns and security issues.",
    category: "Static analysis",
    icon: Code2,
    status: "Demo ready",
    fields: ["Semgrep API URL", "Access token"],
  },
  {
    id: "bandit",
    name: "Bandit",
    description: "Python source-code security scanning.",
    category: "Security scanner",
    icon: ShieldCheck,
    status: "Demo ready",
    fields: ["Executable path", "Configuration file"],
  },
  {
    id: "gitleaks",
    name: "Gitleaks",
    description:
      "Detect secrets and credentials committed to repositories.",
    category: "Secret scanning",
    icon: KeyRound,
    status: "Demo ready",
    fields: ["Executable path", "Configuration file"],
  },
];

function Integration() {
  const [selected, setSelected] = useState(initialIntegrations[0]);
  const [values, setValues] = useState({});
  const [message, setMessage] = useState("");

  const testConnection = () => {
    if (
      selected.id === "github" &&
      !values["github-Repository URL"]?.trim()
    ) {
      setMessage("Please enter a GitHub repository URL first.");
      return;
    }

    if (selected.id === "github") {
      const repositoryUrl = values["github-Repository URL"].trim();

      const githubPattern =
        /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/;

      if (!githubPattern.test(repositoryUrl)) {
        setMessage(
          "Enter a valid GitHub repository URL, such as https://github.com/owner/repository."
        );
        return;
      }
    }

    setMessage(
      `${selected.name}: demo configuration check completed. A real connection is not established.`
    );
  };

  const clearFields = () => {
    setValues((current) => {
      const updated = { ...current };

      selected.fields.forEach((field) => {
        delete updated[`${selected.id}-${field}`];
      });

      return updated;
    });

    setMessage("Selected integration fields cleared.");
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-cyan-400">
          WORKSPACE / CONNECTIONS
        </p>

        <h1 className="mt-1 text-3xl font-bold text-white">
          Integrations
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Configure source control and security scanning tools.
        </p>
      </div>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
        Demo integration screen. No access tokens are sent or saved.
        GitHub webhook verification and scanner execution must be
        implemented securely on the backend.
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {initialIntegrations.map((item) => {
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setSelected(item);
                setMessage("");
              }}
              className={`rounded-2xl border p-5 text-left transition ${
                selected.id === item.id
                  ? "border-cyan-400/60 bg-[#17243A]"
                  : "border-slate-700 bg-[#111B2E] hover:border-slate-500"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-300">
                  <Icon size={23} />
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs ${
                    item.status === "Connected"
                      ? "bg-emerald-500/10 text-emerald-300"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h2 className="mt-4 font-semibold text-white">
                {item.name}
              </h2>

              <p className="mt-1 text-xs text-cyan-300">
                {item.category}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.description}
              </p>
            </button>
          );
        })}
      </div>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-3 text-blue-300">
              <Settings size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-white">
                {selected.name} configuration
              </h2>

              <p className="text-xs text-slate-500">
                Set up the integration details
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {selected.fields.map((field) => {
              const key = `${selected.id}-${field}`;
              const isSecret = /token|key|password/i.test(field);

              return (
                <div key={key}>
                  <label className="mb-2 block text-sm text-slate-300">
                    {field}
                  </label>

                  <input
                    type={isSecret ? "password" : "text"}
                    value={values[key] || ""}
                    onChange={(e) => {
                      setValues((current) => ({
                        ...current,
                        [key]: e.target.value,
                      }));

                      setMessage("");
                    }}
                    placeholder={
                      field === "Repository URL"
                        ? "https://github.com/owner/repository"
                        : `Enter ${field.toLowerCase()}`
                    }
                    className="w-full rounded-lg border border-slate-700 bg-[#080D18] px-3 py-3 text-sm text-white outline-none focus:border-cyan-400"
                  />
                </div>
              );
            })}
          </div>

          {message && (
            <div
              role="status"
              className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200"
            >
              {message}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={testConnection}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500"
            >
              <PlugZap size={16} />
              Test configuration
            </button>

            <button
              type="button"
              onClick={clearFields}
              className="rounded-lg border border-slate-600 px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800"
            >
              Clear fields
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-[#111B2E] p-5">
          <h2 className="font-semibold text-white">
            Connection checklist
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            What a production integration will require.
          </p>

          <div className="mt-5 space-y-4">
            {[
              [
                "Authentication",
                "Store credentials securely on the server.",
              ],
              [
                "Permissions",
                "Request only the repository permissions required.",
              ],
              [
                "Webhook security",
                "Verify GitHub webhook signatures on the backend.",
              ],
              [
                "Scanner execution",
                "Run scanner processes in an isolated environment.",
              ],
              [
                "Audit history",
                "Record connection and configuration changes.",
              ],
            ].map(([title, description]) => (
              <div key={title} className="flex gap-3">
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0 text-cyan-300"
                />

                <div>
                  <p className="text-sm font-medium text-slate-200">
                    {title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-[#17243A] p-3 text-xs leading-5 text-slate-400">
            <AlertCircle
              size={15}
              className="mb-2 text-amber-300"
            />

            Never put GitHub tokens, webhook secrets, or scanner
            credentials in React frontend code.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Integration;
