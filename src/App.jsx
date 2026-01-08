import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Round1 from "./pages/Round1";
import Round1Result from "./pages/Round1Result";
import Result from "./pages/Result";

/* protected route */
function ProtectedRoute({ children }) {
  const team = sessionStorage.getItem("currentTeam") || localStorage.getItem("landingTeamName");
  return team ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* landing */}
      <Route path="/" element={<Landing />} />

      {/* home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* round 1 */}
      <Route
        path="/round1"
        element={
          <ProtectedRoute>
            <Round1 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/round1-result"
        element={
          <ProtectedRoute>
            <Round1Result />
          </ProtectedRoute>
        }
      />

      {/* final result */}
      <Route
        path="/result"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
