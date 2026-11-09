import { useState } from "react";
import {
  Bell,
  ShieldCheck,
  SlidersHorizontal,
  Save,
  RotateCcw,
  CheckCircle2
} from "lucide-react";

const initialSettings = {
  workspaceName: "CodeGuardian AI Workspace",
  timezone: "Asia/Kolkata",
  requireApproval: true,
  autoReview: false,
  showEvidence: true,
  blockHighRisk: true,
  emailAlerts: false,
  reviewComplete: true,
  highSeverity: true,
  weeklySummary: false
};

// Keep Toggle outside Settings to satisfy React hooks lint rules.
function Toggle({ label, description, value, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-700 py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-200">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          value ? "bg-cyan-500" : "bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            value ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("review");
  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    // Demo only: settings are stored in the current React state.
    setSaved(true);
  };

  const resetSettings = () => {
    setSettings(initialSettings);
    setSaved(false);
  };

  const tabs = [
    { id: "workspace", label: "Workspace", icon: SlidersHorizontal },
    { id: "review", label: "Review Policy", icon: ShieldCheck },
    { id: "notifications", label: "Notifications", icon: Bell }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-cyan-400">Configuration</p>
          <h1 className="mt-1 text-2xl font-bold text-white">
            Workspace Settings
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage your workspace preferences, review rules and notifications.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={resetSettings}
            className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
          >
            <RotateCcw size={16} />
            Reset
          </button>

          <button
            type="button"
            onClick={saveSettings}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400">
          <CheckCircle2 size={18} />
          Settings saved in this demo session.
        </div>
      )}

      {/* Demo notice */}
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <p className="text-sm text-amber-300">
          Demo configuration: these preferences are currently held in the
          frontend. Persistent storage and backend policy enforcement are not
          connected yet.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
        {/* Sidebar tabs */}
        <div className="h-fit rounded-xl border border-slate-800 bg-[#111B2E] p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                  activeTab === tab.id
                    ? "bg-blue-600/15 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Settings content */}
        <div className="rounded-xl border border-slate-800 bg-[#111B2E] p-5 sm:p-6">
          {activeTab === "workspace" && (
            <div>
              <h2 className="text-lg font-semibold text-white">
                Workspace Preferences
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Basic information about your CodeGuardian workspace.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Workspace name
                  </label>
                  <input
                    type="text"
                    value={settings.workspaceName}
                    onChange={(event) =>
                      update("workspaceName", event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-[#080D18] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Time zone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(event) =>
                      update("timezone", event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-700 bg-[#080D18] px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
                  >
                    <option value="Asia/Kolkata">India Standard Time</option>
                    <option value="UTC">UTC</option>
                    <option value="Europe/London">London</option>
                    <option value="America/New_York">New York</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "review" && (
            <div>
              <h2 className="text-lg font-semibold text-white">
                Review Policy
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Configure how code review recommendations should be handled.
              </p>

              <div className="mt-5">
                <Toggle
                  label="Require human approval"
                  description="Require a developer to approve proposed changes before publishing."
                  value={settings.requireApproval}
                  onChange={(value) => update("requireApproval", value)}
                />

                <Toggle
                  label="Automatic review on new PR"
                  description="Enable the planned automatic review trigger for new pull requests."
                  value={settings.autoReview}
                  onChange={(value) => update("autoReview", value)}
                />

                <Toggle
                  label="Show scanner evidence"
                  description="Display scanner evidence separately from AI explanations."
                  value={settings.showEvidence}
                  onChange={(value) => update("showEvidence", value)}
                />

                <Toggle
                  label="Block high-risk merge"
                  description="A future backend policy to prevent merging when high-risk findings remain."
                  value={settings.blockHighRisk}
                  onChange={(value) => update("blockHighRisk", value)}
                />
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 className="text-lg font-semibold text-white">
                Notification Preferences
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Choose which workspace events you want to receive notifications
                about.
              </p>

              <div className="mt-5">
                <Toggle
                  label="Email notifications"
                  description="Allow email alerts when notification delivery is connected."
                  value={settings.emailAlerts}
                  onChange={(value) => update("emailAlerts", value)}
                />

                <Toggle
                  label="Review completed"
                  description="Notify when a pull request review is completed."
                  value={settings.reviewComplete}
                  onChange={(value) => update("reviewComplete", value)}
                />

                <Toggle
                  label="High-severity findings"
                  description="Notify when a high-severity finding is detected."
                  value={settings.highSeverity}
                  onChange={(value) => update("highSeverity", value)}
                />

                <Toggle
                  label="Weekly summary"
                  description="Receive a weekly workspace activity summary."
                  value={settings.weeklySummary}
                  onChange={(value) => update("weeklySummary", value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;