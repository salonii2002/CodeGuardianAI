
function Input({
  label,
  error,
  icon: Icon,
  className = "",
  id,
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        )}

        <input
          id={id}
          {...props}
          className={`w-full rounded-lg border border-slate-700 bg-[#080D18] px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500 ${
            Icon ? "pl-10" : ""
          } ${className}`}
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default Input;
