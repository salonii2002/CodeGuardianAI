
export const activities = [
  {
    id: "ACT-001",
    type: "review",
    title: "Pull request review completed",
    description: "Sample review completed for payment-service PR #142.",
    actor: "Security Agent",
    target: "PR #142",
    status: "Completed",
    timestamp: "2026-11-08T08:30:00Z"
  },
  {
    id: "ACT-002",
    type: "finding",
    title: "High-severity finding identified",
    description: "A possible hardcoded API secret was identified.",
    actor: "Security Agent",
    target: "SEC-1042",
    status: "Open",
    timestamp: "2026-11-08T08:20:00Z"
  },
  {
    id: "ACT-003",
    type: "repository",
    title: "Repository connected in demo",
    description: "auth-service appears in the sample workspace.",
    actor: "Workspace Admin",
    target: "auth-service",
    status: "Connected",
    timestamp: "2026-11-07T13:20:00Z"
  },
  {
    id: "ACT-004",
    type: "approval",
    title: "Review recommendation approved",
    description: "A sample review comment was approved for preview.",
    actor: "Workspace Admin",
    target: "PR #131",
    status: "Approved",
    timestamp: "2026-11-07T10:00:00Z"
  },
  {
    id: "ACT-005",
    type: "agent",
    title: "Quality agent status updated",
    description: "Quality agent is shown as Beta in the demo.",
    actor: "System",
    target: "Code Quality Agent",
    status: "Beta",
    timestamp: "2026-11-06T15:00:00Z"
  }
];

export const activitySummary = {
  total: activities.length,
  reviews: activities.filter((item) => item.type === "review").length,
  findings: activities.filter((item) => item.type === "finding").length,
  approvals: activities.filter((item) => item.type === "approval").length
};
