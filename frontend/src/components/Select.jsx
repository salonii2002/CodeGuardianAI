
function Select({
  label,
  options = [],
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

      <select
        id={id}
        {...props}
        className={`w-full rounded-lg border border-slate-700 bg-[#080D18] px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
