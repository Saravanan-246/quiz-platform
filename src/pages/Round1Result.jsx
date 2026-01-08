import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { EventContext } from "../context/EventContext";
import "../styles/result.css";

export default function Round1Result() {
  const navigate = useNavigate();
  const { eventData, teamName } = useContext(EventContext);

  const r1 = eventData?.round1;

  /* Safety */
  useEffect(() => {
    if (!r1 || r1.attempts === 0) {
      navigate("/home", { replace: true });
    }
  }, [r1, navigate]);

  useEffect(() => {
    if (!teamName) {
      navigate("/", { replace: true });
    }
  }, [teamName, navigate]);

  if (!r1) return null;

  const percentage = r1.total > 0 ? Math.round((r1.score / r1.total) * 100) : 0;

  return (
    <div className="result-wrapper">
      <div className="result-card">
        <h2 className="result-title">Round 1 Result</h2>

        <div className={`result-status ${r1.passed ? "success" : "error"}`}>
          {r1.passed ? "✓ Passed" : "✗ Failed"}
        </div>

        <div className="final-score">
          <span className="score-main">{r1.score}</span>
          <span className="score-divider">/</span>
          <span className="score-total">{r1.total}</span>
        </div>

        <p className="final-percentage">{percentage}%</p>

        <p className="result-attempts">
          Attempts: <strong>{r1.attempts}</strong>
        </p>

        <div className="result-actions">
          <button className="home-btn" onClick={() => navigate("/home")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
