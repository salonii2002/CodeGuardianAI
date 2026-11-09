
export const repositories = [
  {
    id: "repo-001",
    name: "payment-service",
    fullName: "demo-org/payment-service",
    description: "Payment processing service and transaction APIs.",
    language: "Python",
    branch: "main",
    visibility: "Private",
    status: "Connected",
    pullRequests: 12,
    findings: 8,
    lastActivity: "2026-11-08T08:30:00Z"
  },
  {
    id: "repo-002",
    name: "auth-service",
    fullName: "demo-org/auth-service",
    description: "Authentication, sessions and access management.",
    language: "Python",
    branch: "main",
    visibility: "Private",
    status: "Connected",
    pullRequests: 9,
    findings: 3,
    lastActivity: "2026-11-07T13:20:00Z"
  },
  {
    id: "repo-003",
    name: "backend-api",
    fullName: "demo-org/backend-api",
    description: "Core backend APIs and business logic.",
    language: "JavaScript",
    branch: "develop",
    visibility: "Private",
    status: "Connected",
    pullRequests: 15,
    findings: 6,
    lastActivity: "2026-11-06T10:00:00Z"
  },
  {
    id: "repo-004",
    name: "frontend-dashboard",
    fullName: "demo-org/frontend-dashboard",
    description: "Developer dashboard and user interface.",
    language: "JavaScript",
    branch: "main",
    visibility: "Public",
    status: "Connected",
    pullRequests: 7,
    findings: 2,
    lastActivity: "2026-11-05T15:10:00Z"
  },
  {
    id: "repo-005",
    name: "notification-engine",
    fullName: "demo-org/notification-engine",
    description: "Email and event notification services.",
    language: "Python",
    branch: "main",
    visibility: "Private",
    status: "Pending",
    pullRequests: 3,
    findings: 1,
    lastActivity: "2026-11-04T09:45:00Z"
  },
  {
    id: "repo-006",
    name: "data-analytics",
    fullName: "demo-org/data-analytics",
    description: "Analytics and reporting services.",
    language: "Python",
    branch: "main",
    visibility: "Private",
    status: "Connected",
    pullRequests: 2,
    findings: 0,
    lastActivity: "2026-11-03T11:00:00Z"
  }
];

export const repositorySummary = {
  total: repositories.length,
  connected: repositories.filter((repo) => repo.status === "Connected").length,
  pending: repositories.filter((repo) => repo.status === "Pending").length,
  pullRequests: repositories.reduce((sum, repo) => sum + repo.pullRequests, 0)
};
