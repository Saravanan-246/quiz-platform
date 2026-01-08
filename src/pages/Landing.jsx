import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";
import "../styles/landing.css";

export default function Landing() {
  const [teamName, setTeamName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { switchTeam } = useContext(EventContext);

  /* Auto-focus */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* Persist on refresh */
  useEffect(() => {
    const saved = localStorage.getItem("landingTeamName");
    if (saved?.trim()) setTeamName(saved);
  }, []);

  useEffect(() => {
    if (teamName.trim()) {
      localStorage.setItem("landingTeamName", teamName);
    }
  }, [teamName]);

  const handleStartClick = () => {
    const name = teamName.trim();

    if (!name) {
      inputRef.current?.focus();
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmStart = async () => {
    const name = teamName.trim();
    setShowConfirm(false);
    setIsLoading(true);

    try {
      localStorage.removeItem("landingTeamName");
      await switchTeam(name);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Start error:", error);
      alert("Failed to start. Try again.");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading && teamName.trim()) {
      handleStartClick();
    }
  };

  return (
    <div className="landing-layout">
      {/* LEFT */}
      <div className="landing-left">
        <h1>Event Entry</h1>
        <p>Enter your team name to continue</p>

        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isLoading}
          maxLength={25}
          autoComplete="off"
        />

        <button
          onClick={handleStartClick}
          disabled={!teamName.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span>Starting</span>
              <span className="spinner"></span>
            </>
          ) : (
            "Start Event"
          )}
        </button>
      </div>

      {/* RIGHT PREVIEW */}
      {teamName.trim() && (
        <div className="landing-right">
          <div className="team-preview-box">
            <h2 className="team-name-text">{teamName.trim()}</h2>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRM MODAL */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <h3 className="confirm-title">Start Event?</h3>
            <p className="confirm-text">
              Start event as team "<strong>{teamName.trim()}</strong>"?
            </p>
            <p className="confirm-subtext">This will begin your session.</p>
            <div className="confirm-actions">
              <button
                className="confirm-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button className="confirm-ok" onClick={handleConfirmStart}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
