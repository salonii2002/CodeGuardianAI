
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function Logo({ compact = false, link = true, className = "" }) {
  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/15 text-cyan-400">
        <ShieldCheck size={24} strokeWidth={2.2} />
      </div>

      {!compact && (
        <div>
          <p className="text-base font-bold tracking-tight text-white">
            CodeGuardian<span className="text-cyan-400">AI</span>
          </p>
          <p className="text-[10px] tracking-[0.18em] text-slate-500">
            SECURE CODE. CONFIDENT RELEASES.
          </p>
        </div>
      )}
    </div>
  );

  if (!link) return content;

  return (
    <Link to="/" aria-label="CodeGuardian AI home">
      {content}
    </Link>
  );
}

export default Logo;
