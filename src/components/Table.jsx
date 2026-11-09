
function Table({ columns = [], data = [], rowKey = "id", emptyMessage = "No records found." }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead className="bg-[#17243A] text-xs uppercase tracking-wide text-slate-400">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-5 py-4 font-semibold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-[#111B2E]">
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item[rowKey] ?? index}
                className="transition hover:bg-slate-800/40"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-5 py-4 text-slate-300">
                    {column.render
                      ? column.render(item)
                      : item[column.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length || 1}
                className="px-5 py-10 text-center text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
