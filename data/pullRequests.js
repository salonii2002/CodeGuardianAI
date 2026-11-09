
export const pullRequests = [
  {
    id: "PR-142",
    number: 142,
    title: "Add payment validation",
    repository: "payment-service",
    author: "Alex Morgan",
    branch: "feature/payment-validation",
    targetBranch: "main",
    status: "Open",
    reviewStatus: "Completed",
    risk: "High",
    findings: 4,
    createdAt: "2026-11-08T08:00:00Z"
  },
  {
    id: "PR-139",
    number: 139,
    title: "Improve authentication flow",
    repository: "auth-service",
    author: "Sarah Chen",
    branch: "feature/auth-update",
    targetBranch: "main",
    status: "Open",
    reviewStatus: "In Review",
    risk: "Medium",
    findings: 2,
    createdAt: "2026-11-07T12:30:00Z"
  },
  {
    id: "PR-136",
    number: 136,
    title: "Refactor API response handling",
    repository: "backend-api",
    author: "Daniel Kim",
    branch: "refactor/api-response",
    targetBranch: "develop",
    status: "Open",
    reviewStatus: "Pending",
    risk: "Low",
    findings: 1,
    createdAt: "2026-11-06T09:15:00Z"
  },
  {
    id: "PR-131",
    number: 131,
    title: "Update dashboard components",
    repository: "frontend-dashboard",
    author: "Emma Wilson",
    branch: "feature/dashboard-ui",
    targetBranch: "main",
    status: "Merged",
    reviewStatus: "Completed",
    risk: "Low",
    findings: 0,
    createdAt: "2026-11-04T14:20:00Z"
  }
];

export const pullRequestSummary = {
  total: pullRequests.length,
  open: pullRequests.filter((pr) => pr.status === "Open").length,
  merged: pullRequests.filter((pr) => pr.status === "Merged").length,
  highRisk: pullRequests.filter((pr) => pr.risk === "High").length
};
