import { createContext, useState, useEffect } from "react";

export const EventContext = createContext();

/* ===============================
   DEFAULT DATA STRUCTURE (ROUND 1 ONLY)
================================ */
const getInitialData = () => ({
  round1: {
    attempts: 0,
    passed: null,
    score: 0,
    total: 0,
  },
});

export function EventProvider({ children }) {
  /* ===============================
     TEAM NAME (SESSION STORAGE)
  ================================ */
  const [teamName, setTeamName] = useState(() => {
    return sessionStorage.getItem("currentTeam");
  });

  /* ===============================
     EVENT DATA (LOCAL STORAGE)
  ================================ */
  const [eventData, setEventData] = useState(() => {
    const team = sessionStorage.getItem("currentTeam");
    if (!team) return getInitialData();

    const saved = localStorage.getItem(`eventData_${team}`);
    return saved ? JSON.parse(saved) : getInitialData();
  });

  /* ===============================
     LOAD DATA WHEN TEAM CHANGES
  ================================ */
  useEffect(() => {
    if (!teamName) {
      setEventData(getInitialData());
      return;
    }

    const saved = localStorage.getItem(`eventData_${teamName}`);
    setEventData(saved ? JSON.parse(saved) : getInitialData());
  }, [teamName]);

  /* ===============================
     AUTO SAVE DATA
  ================================ */
  useEffect(() => {
    if (!teamName) return;

    localStorage.setItem(
      `eventData_${teamName}`,
      JSON.stringify(eventData)
    );
  }, [eventData, teamName]);

  /* ===============================
     UPDATE ROUND 1 RESULT
  ================================ */
  const updateRound1 = ({ score, total, passed }) => {
    setEventData((prev) => ({
      ...prev,
      round1: {
        attempts: prev.round1.attempts + 1,
        score,
        total,
        passed,
      },
    }));
  };

  /* ===============================
     SWITCH TEAM (NEW GAME)
  ================================ */
  const switchTeam = (newTeam) => {
    sessionStorage.setItem("currentTeam", newTeam);
    setTeamName(newTeam);
  };

  /* ===============================
     RESET EVENT
  ================================ */
  const resetEvent = () => {
    sessionStorage.removeItem("currentTeam");
    setTeamName(null);
    setEventData(getInitialData());
  };

  return (
    <EventContext.Provider
      value={{
        teamName,
        eventData,
        updateRound1,
        switchTeam,
        resetEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
