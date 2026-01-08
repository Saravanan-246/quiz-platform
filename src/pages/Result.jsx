import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { EventContext } from "../context/EventContext";
import "../styles/result.css";

export default function Result() {
  const navigate = useNavigate();
  const { eventData } = useContext(EventContext);

  const r1 = eventData?.round1;

  /* safety redirect */
  useEffect(() => {
    if (!r1 || r1.attempts === 0) {
      navigate("/home", { replace: true });
    }
  }, [r1, navigate]);

  if (!r1) return null;

  const percentage =
    r1.total > 0
      ? Math.round((r1.score / r1.total) * 100)
      : 0;

  return (
    <div className="result-wrapper">
      <div className="result-card">
        <h2 className="result-title">Final Result</h2>

        {/* score */}
        <div className="final-score">
          <span className="score-main">{r1.score}</span>
          <span className="score-divider">/</span>
          <span className="score-total">{r1.total}</span>
        </div>

        <p className="final-percentage">
          {percentage}%
        </p>

        <div
          className={`result-status ${
            r1.passed ? "success" : "error"
          }`}
        >
          Overall Performance
        </div>

        <div className="result-actions">
          <button
            className="home-btn"
            onClick={() => navigate("/home")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
