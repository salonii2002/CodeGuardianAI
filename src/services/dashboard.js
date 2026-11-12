
const demoDashboardData = {
  stats: {
    repositories: 12,
    pull_requests: 48,
    security_findings: 15,
    completed_reviews: 36,
  },

  activity: [
    { day: "Mon", findings: 12, resolved: 8 },
    { day: "Tue", findings: 18, resolved: 12 },
    { day: "Wed", findings: 10, resolved: 7 },
    { day: "Thu", findings: 22, resolved: 16 },
    { day: "Fri", findings: 15, resolved: 11 },
    { day: "Sat", findings: 9, resolved: 6 },
    { day: "Sun", findings: 14, resolved: 10 },
  ],

  severity: [
    { name: "High", value: 10 },
    { name: "Medium", value: 4 },
    { name: "Low", value: 1 },
  ],

  recent_pull_requests: [
    {
      id: 1,
      number: 128,
      title: "Add payment validation",
      repository: "payment-service",
      author: "alex-dev",
      status: "Completed",
      risk: "High",
      time: "10 minutes ago",
    },
    {
      id: 2,
      number: 127,
      title: "Update authentication flow",
      repository: "auth-service",
      author: "sarah-dev",
      status: "In Review",
      risk: "Medium",
      time: "35 minutes ago",
    },
    {
      id: 3,
      number: 126,
      title: "Improve database queries",
      repository: "user-service",
      author: "john-dev",
      status: "Completed",
      risk: "Low",
      time: "1 hour ago",
    },
    {
      id: 4,
      number: 125,
      title: "Fix API error handling",
      repository: "api-gateway",
      author: "mike-dev",
      status: "Pending",
      risk: "Medium",
      time: "2 hours ago",
    },
  ],

  priority_findings: [
    {
      id: "SEC-001",
      title: "Potential SQL Injection",
      description: "User input may be passed into a database query without safe parameterization.",
      severity: "High",
      file: "src/database/query.py",
      line: 42,
      agent: "Security Agent",
      status: "Open",
    },
    {
      id: "SEC-002",
      title: "Hardcoded Secret Detected",
      description: "A possible hardcoded credential was found in the source code.",
      severity: "High",
      file: "src/config/settings.py",
      line: 18,
      agent: "Security Agent",
      status: "Open",
    },
    {
      id: "SEC-003",
      title: "Missing Input Validation",
      description: "An API endpoint may accept unexpected user input.",
      severity: "Medium",
      file: "src/api/routes.py",
      line: 76,
      agent: "Code Quality Agent",
      status: "Open",
    },
    {
      id: "SEC-004",
      title: "Insufficient Test Coverage",
      description: "Some important application paths do not have sufficient tests.",
      severity: "Low",
      file: "tests/test_payment.py",
      line: 1,
      agent: "Test Gap Agent",
      status: "Open",
    },
  ],

  agents: [
    {
      id: 1,
      name: "Security Agent",
      description: "Checks vulnerabilities and security risks.",
      status: "Completed",
      progress: 100,
    },
    {
      id: 2,
      name: "Code Quality Agent",
      description: "Reviews code structure and maintainability.",
      status: "Running",
      progress: 75,
    },
    {
      id: 3,
      name: "Test Gap Agent",
      description: "Identifies missing test cases and coverage gaps.",
      status: "Running",
      progress: 60,
    },
    {
      id: 4,
      name: "Documentation Agent",
      description: "Checks documentation and code explanations.",
      status: "Completed",
      progress: 100,
    },
  ],
};

/**
 * Demo Dashboard API
 *
 * This currently returns local demo data.
 * Later, this function can call the real backend endpoint.
 */
export async function getDashboardSummary(range = "7d") {
  const allowedRanges = ["7d", "30d", "90d"];

  if (!allowedRanges.includes(range)) {
    throw new Error("Invalid dashboard date range.");
  }

  // Simulate a small network delay.
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    ...demoDashboardData,
    range,
    source: "demo",
    last_updated: new Date().toISOString(),
  };
}
