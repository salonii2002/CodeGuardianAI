
export const agents = [
  {
    id: "security",
    name: "Security Agent",
    description: "Identifies security risks and suspicious code patterns.",
    category: "Security",
    status: "Live",
    color: "red",
    icon: "shield",
    version: "1.0.0",
    responsibilities: [
      "Secret exposure detection",
      "Unsafe input handling",
      "Vulnerability investigation",
      "Security evidence review"
    ],
    tools: ["Semgrep", "Bandit", "Gitleaks"]
  },
  {
    id: "quality",
    name: "Code Quality Agent",
    description: "Reviews maintainability, complexity and code structure.",
    category: "Quality",
    status: "Beta",
    color: "blue",
    icon: "code",
    version: "0.8.0",
    responsibilities: [
      "Code complexity review",
      "Maintainability suggestions",
      "Duplicate pattern detection",
      "Code structure analysis"
    ],
    tools: ["Static analysis", "Code metrics"]
  },
  {
    id: "testing",
    name: "Test Gap Agent",
    description: "Highlights changed code paths that may need more tests.",
    category: "Testing",
    status: "Beta",
    color: "emerald",
    icon: "test",
    version: "0.7.0",
    responsibilities: [
      "Test coverage review",
      "Missing test identification",
      "Edge case suggestions",
      "Regression risk analysis"
    ],
    tools: ["Pytest", "Test coverage analysis"]
  },
  {
    id: "documentation",
    name: "Documentation Agent",
    description: "Identifies documentation updates needed after code changes.",
    category: "Documentation",
    status: "Beta",
    color: "amber",
    icon: "book",
    version: "0.6.0",
    responsibilities: [
      "README update suggestions",
      "API documentation review",
      "Missing comments identification",
      "Documentation consistency"
    ],
    tools: ["Markdown analysis", "API schema review"]
  }
];

export const agentSummary = {
  total: agents.length,
  live: agents.filter((agent) => agent.status === "Live").length,
  beta: agents.filter((agent) => agent.status === "Beta").length,
  preview: 0
};
