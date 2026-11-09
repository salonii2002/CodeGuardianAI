
function Tabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-slate-800">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
            activeTab === tab.value
              ? "border-blue-500 text-blue-400"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
