
export function downloadReport(report, filename = "codeguardian-report.txt") {
  const content =
    typeof report === "string"
      ? report
      : JSON.stringify(report, null, 2);

  const blob = new Blob([content], {
    type: "text/plain;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export function downloadJSON(data, filename = "codeguardian-report.json") {
  const content = JSON.stringify(data, null, 2);

  const blob = new Blob([content], {
    type: "application/json;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}
