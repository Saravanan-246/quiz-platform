import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { EventContext } from "../context/EventContext";
import { MdPending, MdCheckCircle, MdError, MdDashboard, MdAnalytics } from "react-icons/md";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();
  const { eventData, teamName, switchTeam } = useContext(EventContext);
  const [ready, setReady] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (teamName !== undefined) setReady(true);
  }, [teamName]);

  useEffect(() => {
    if (ready && !teamName && !isLoggingOut) {
      navigate("/", { replace: true });
    }
  }, [ready, teamName, isLoggingOut, navigate]);

  if (!ready || !eventData?.round1) {
    return (
      <div className="home-page animated-bg">
        <div className="loading-container">
          <MdDashboard className="loading-icon" />
          <p>Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const r1 = eventData.round1;

  const getStatusConfig = () => {
    if (r1.attempts === 0) {
      return { text: "Pending", icon: MdPending, class: "status-pending" };
    }
    if (r1.passed) {
      return { text: "Passed", icon: MdCheckCircle, class: "status-passed" };
    }
    return { text: "Failed", icon: MdError, class: "status-failed" };
  };

  const status = getStatusConfig();
  const buttonText = r1.attempts === 0 ? "Start Round 1" : "View Result";

  const handleRound1Click = () => {
    if (r1.attempts === 0) {
      navigate("/round1");
    } else {
      navigate("/round1-result");
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleConfirmLogout = () => {
    if (isLoggingOut) return;
    setShowLogoutConfirm(false);
    setIsLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem("landingTeamName");
      switchTeam(null);
      navigate("/", { replace: true });
    }, 400);
  };

  return (
    <div className={`home-page animated-bg ${isLoggingOut ? "logout-fade" : ""}`}>
      <header className="home-header">
        <div className="header-content">
          <h1>
            <MdDashboard className="header-icon" /> Event Dashboard
          </h1>
          <p>
            Team: <span className="team-name-highlight">{teamName}</span>
          </p>
        </div>
        <button
          className="logout-btn"
          onClick={handleLogoutClick}
          type="button"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </header>

      <section className="round-section">
        <div className="round-card">
          <div className="round-info">
            <h2>Round 1</h2>
            <div className={`status-display ${status.class}`}>
              <status.icon className="status-icon" />
              <span>{status.text}</span>
            </div>
          </div>
          <button onClick={handleRound1Click} className="cta-btn" type="button">
            {buttonText}
          </button>
        </div>
      </section>

      {r1.attempts > 0 && (
        <section className="result-section">
          <div className="result-content">
            <h2>
              <MdAnalytics /> Performance Summary
            </h2>
            <div className="summary-stats">
              <div className="stat-item">
                <strong>Status:</strong> <span>{status.text}</span>
              </div>
              <div className="stat-item">
                <strong>Attempts:</strong> <span>{r1.attempts}</span>
              </div>
              <div className="stat-item">
                <strong>Score:</strong>{" "}
                <span>
                  {r1.score || 0}/{r1.total || 10}
                </span>
              </div>
            </div>
            <button
              className="home-btn"
              onClick={() => navigate("/round1-result")}
              type="button"
            >
              View Detailed Results
            </button>
          </div>
        </section>
      )}

      {/* 🔥 Logout Confirm Modal */}
      {showLogoutConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h2 className="confirm-title">Logout?</h2>
            <p className="confirm-text">
              Are you sure you want to <strong>logout</strong> from this event?
            </p>
            <p className="confirm-subtext">
              Your current session will end and you will be redirected to the team entry page.
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="confirm-cancel"
                onClick={handleCancelLogout}
              >
                Cancel
              </button>
              <button
                type="button"
                className="confirm-ok"
                onClick={handleConfirmLogout}
              >
                Yes, logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
