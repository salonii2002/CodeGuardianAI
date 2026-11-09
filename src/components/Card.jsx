
function Card({
  children,
  title,
  description,
  action,
  className = "",
  contentClassName = ""
}) {
  return (
    <section
      className={`rounded-xl border border-slate-800 bg-[#111B2E] ${className}`}
    >
      {(title || description || action) && (
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 px-5 py-4">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-white">{title}</h2>
            )}
            {description && (
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            )}
          </div>
          {action}
        </div>
      )}

      <div className={`p-5 ${contentClassName}`}>{children}</div>
    </section>
  );
}

export default Card;
