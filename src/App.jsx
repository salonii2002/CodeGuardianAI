
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AppLayout from "./layouts/AppLayout";

// Public pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Agents from "./pages/public/Agents";
import Contact from "./pages/public/Contact";
import Docs from "./pages/public/Docs";
import Features from "./pages/public/Features";
import HowItWorks from "./pages/public/HowItWorks";
import Security from "./pages/public/Security";
import Technology from "./pages/public/Technology";
import NotFound from "./pages/public/NotFound";

// Application pages
import Dashboard from "./pages/app/Dashboard";
import Repositories from "./pages/app/Repositories";
import PullRequests from "./pages/app/PullRequests";
import LiveAnalysis from "./pages/app/LiveAnalysis";
import ReviewReports from "./pages/app/ReviewReports";
import PRCommentPreview from "./pages/app/PRCommentPreview";
import AgentManagement from "./pages/app/AgentManagement";
import KnowledgeBase from "./pages/app/KnowledgeBase";
import Evaluation from "./pages/app/Evaluation";
import CostUsage from "./pages/app/CostUsage";
import Integrations from "./pages/app/Integrations";
import SimilarityCheck from "./pages/app/SimilarityCheck";
import ActivityLog from "./pages/app/ActivityLog";
import Reports from "./pages/app/Reports";
import Team from "./pages/app/Team";
import Settings from "./pages/app/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC WEBSITE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/security" element={<Security />} />
          <Route path="/technology" element={<Technology />} />
        </Route>

        {/* APPLICATION */}
        <Route path="/app" element={<AppLayout />}>

          <Route
            index
            element={<Navigate to="dashboard" replace />}
          />

          <Route path="dashboard" element={<Dashboard />} />

          <Route path="repositories" element={<Repositories />} />

          <Route path="pull-requests" element={<PullRequests />} />

          <Route path="live-analysis" element={<LiveAnalysis />} />

          <Route path="review-reports" element={<ReviewReports />} />

          <Route path="pr-comment-preview" element={<PRCommentPreview />} />

          <Route path="agents" element={<AgentManagement />} />

          <Route path="knowledge-base" element={<KnowledgeBase />} />

          <Route path="evaluation" element={<Evaluation />} />

          <Route path="cost-usage" element={<CostUsage />} />

          <Route path="integrations" element={<Integrations />} />

          <Route path="similarity-check" element={<SimilarityCheck />} />

          <Route path="activity-log" element={<ActivityLog />} />

          <Route path="reports" element={<Reports />} />

          <Route path="team" element={<Team />} />

          <Route path="settings" element={<Settings />} />

          {/* Backward-compatible paths */}
          <Route
            path="similarity"
            element={<Navigate to="/app/similarity-check" replace />}
          />

          <Route
            path="activity"
            element={<Navigate to="/app/activity-log" replace />}
          />
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
