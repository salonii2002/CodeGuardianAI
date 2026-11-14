
export const dashboardStats = [
  {
    id: 1,
    title: "Repositories",
    value: "12",
    change: "+2 this month",
    description: "Connected repositories",
    icon: "repositories",
  },
  {
    id: 2,
    title: "Pull Requests",
    value: "48",
    change: "+12 this week",
    description: "Total pull requests reviewed",
    icon: "pull-requests",
  },
  {
    id: 3,
    title: "Security Findings",
    value: "15",
    change: "5 high severity",
    description: "Findings identified",
    icon: "security",
  },
  {
    id: 4,
    title: "Completed Reviews",
    value: "36",
    change: "+8 this week",
    description: "Review reports generated",
    icon: "reviews",
  },
];

export const reviewTrend = [
  { day: "Mon", detected: 12, resolved: 8 },
  { day: "Tue", detected: 18, resolved: 12 },
  { day: "Wed", detected: 14, resolved: 10 },
  { day: "Thu", detected: 22, resolved: 16 },
  { day: "Fri", detected: 17, resolved: 14 },
  { day: "Sat", detected: 10, resolved: 9 },
  { day: "Sun", detected: 15, resolved: 12 },
];

export const severityDistribution = [
  { name: "High", value: 5 },
  { name: "Medium", value: 6 },
  { name: "Low", value: 3 },
  { name: "Info", value: 1 },
];

export const dashboardOverview = {
  title: "Project Overview",
  description:
    "Monitor repositories, review activity, security findings, and AI agent performance.",
  lastUpdated: "Demo data",
  environment: "Frontend demonstration",
};

export const recentPullRequests = [
  {
    id: 142,
    title: "Add payment processing API",
    repository: "payment-service",
    author: "Alex Morgan",
    status: "In Review",
    findings: 4,
    date: "Today",
  },
  {
    id: 139,
    title: "Improve authentication validation",
    repository: "auth-service",
    author: "Sarah Chen",
    status: "Completed",
    findings: 2,
    date: "Yesterday",
  },
  {
    id: 136,
    title: "Update API response handling",
    repository: "backend-api",
    author: "David Kim",
    status: "In Review",
    findings: 3,
    date: "2 days ago",
  },
];

export const priorityFindings = [
  {
    id: "SEC-1042",
    title: "Hardcoded API secret",
    severity: "High",
    category: "Security",
    repository: "payment-service",
    file: "src/config/payment.js",
    status: "Open",
  },
  {
    id: "SEC-1043",
    title: "Possible SQL injection",
    severity: "High",
    category: "Security",
    repository: "auth-service",
    file: "src/database/user.py",
    status: "Open",
  },
  {
    id: "QUAL-208",
    title: "Missing response validation",
    severity: "Medium",
    category: "Code Quality",
    repository: "payment-service",
    file: "src/services/payment.py",
    status: "Under Review",
  },
  {
    id: "TEST-104",
    title: "Missing invalid-login test",
    severity: "Low",
    category: "Test Gap",
    repository: "auth-service",
    file: "tests/test_auth.py",
    status: "Open",
  },
];

export const agentStatus = [
  {
    id: "security",
    name: "Security Agent",
    status: "Live",
    description: "Identifies security vulnerabilities",
  },
  {
    id: "quality",
    name: "Code Quality Agent",
    status: "Beta",
    description: "Reviews code quality and maintainability",
  },
  {
    id: "testing",
    name: "Test Gap Agent",
    status: "Beta",
    description: "Identifies missing test coverage",
  },
  {
    id: "documentation",
    name: "Documentation Agent",
    status: "Beta",
    description: "Checks documentation completeness",
  },
];
