
import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import AppLayout from "./layouts/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
const Home = lazy(() => import("./pages/public/Home"));
const About = lazy(() => import("./pages/public/About"));
const Agents = lazy(() => import("./pages/public/Agents"));
const Contact = lazy(() => import("./pages/public/Contact"));
const Docs = lazy(() => import("./pages/public/Docs"));
const Features = lazy(() => import("./pages/public/Features"));
const HowItWorks = lazy(() => import("./pages/public/HowItWorks"));
const Security = lazy(() => import("./pages/public/Security"));
const Technology = lazy(() => import("./pages/public/Technology"));
const Login = lazy(() => import("./pages/public/Login"));
const AuthCallback = lazy(() => import("./pages/public/AuthCallback"));
const NotFound = lazy(() => import("./pages/public/NotFound"));

// Application pages
const Dashboard = lazy(() => import("./pages/app/Dashboard"));
const Repositories = lazy(() => import("./pages/app/Repositories"));
const PullRequests = lazy(() => import("./pages/app/PullRequests"));
const LiveAnalysis = lazy(() => import("./pages/app/LiveAnalysis"));
const ReviewReports = lazy(() => import("./pages/app/ReviewReports"));
const PRCommentPreview = lazy(() => import("./pages/app/PRCommentPreview"));
const AgentManagement = lazy(() => import("./pages/app/AgentManagement"));
const KnowledgeBase = lazy(() => import("./pages/app/KnowledgeBase"));
const Evaluation = lazy(() => import("./pages/app/Evaluation"));
const CostUsage = lazy(() => import("./pages/app/CostUsage"));
const Integrations = lazy(() => import("./pages/app/Integrations"));
const SimilarityCheck = lazy(() => import("./pages/app/SimilarityCheck"));
const ActivityLog = lazy(() => import("./pages/app/ActivityLog"));
const Reports = lazy(() => import("./pages/app/Reports"));
const Team = lazy(() => import("./pages/app/Team"));
const Settings = lazy(() => import("./pages/app/Settings"));

// Loading screen
function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#080D18]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-11 w-11">
          <div className="absolute inset-0 rounded-full border-4 border-[#263750]" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-500" />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-white">
            Loading CodeGuardian AI
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Preparing your workspace...
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
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

          {/* AUTHENTICATION */}
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* PROTECTED APPLICATION */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
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

            {/* BACKWARD-COMPATIBLE PATHS */}
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
