
import { useState } from "react";
import { Check, Copy } from "lucide-react";

function CodeBlock({
  code = "",
  language = "javascript",
  title = "Code",
  className = ""
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`overflow-hidden rounded-xl border border-slate-700 bg-[#080D18] ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-700 bg-[#17243A] px-4 py-3">
        <div>
          <p className="text-sm font-medium text-slate-200">{title}</p>
          <p className="mt-0.5 text-xs uppercase text-slate-500">{language}</p>
        </div>

        <button
          type="button"
          onClick={copyCode}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-slate-700"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-6 text-cyan-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default CodeBlock;
