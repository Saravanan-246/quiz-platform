import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../context/EventContext";
import questions from "../data/r1";
import "../styles/round1.css";

export default function Round1() {
  const navigate = useNavigate();
  const { updateRound1 } = useContext(EventContext);

  /* LOAD SAVED STATE (REFRESH SAFE) */
  const saved = JSON.parse(sessionStorage.getItem("round1_state")) || {};

  const [current, setCurrent] = useState(saved.current ?? 0);
  const [answers, setAnswers] = useState(saved.answers ?? {});
  const [review, setReview] = useState(saved.review ?? {});

  const q = questions[current];

  /* SAVE STATE ON CHANGE */
  useEffect(() => {
    sessionStorage.setItem(
      "round1_state",
      JSON.stringify({ current, answers, review })
    );
  }, [current, answers, review]);

  /* INPUT */
  const handleChange = (e) => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: e.target.value,
    }));
  };

  /* SUBMIT ROUND */
  const handleSubmitRound = () => {
    let correct = 0;

    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (
        userAnswer &&
        userAnswer.trim().toLowerCase() ===
          question.correctAnswer.toLowerCase()
      ) {
        correct++;
      }
    });

    const passed = correct >= Math.ceil(questions.length / 2);

    /* ✅ UPDATE CONTEXT (HOME USES THIS) */
    updateRound1({
      passed,
      score: correct,
      total: questions.length,
      attempts: 1,
    });

    /* CLEAR SAVED DATA */
    sessionStorage.removeItem("round1_state");

    /* GO RESULT */
    navigate("/round1-result", {
      replace: true,
      state: {
        score: correct,
        total: questions.length,
        passed,
      },
    });
  };

  const answeredCount = Object.keys(answers).length;
  const markedCount = Object.values(review).filter(Boolean).length;

  return (
    <div className="round-page animated-bg">
      <div className="round-layout">

        {/* LEFT – QUESTION */}
        <div className="round-left">
          <h2 className="round-title">Round 1</h2>

          <p className="round-question">{q.question}</p>

          <input
            className="round-input"
            placeholder={q.placeholder || "Type your answer"}
            value={answers[q.id] || ""}
            onChange={handleChange}
          />

          <button
            className={`mark-btn ${review[q.id] ? "marked" : ""}`}
            onClick={() =>
              setReview((p) => ({ ...p, [q.id]: !p[q.id] }))
            }
          >
            {review[q.id] ? "★ Marked" : "☆ Mark for Review"}
          </button>

          <div className="round-actions">
            <button
              className="secondary"
              disabled={current === 0}
              onClick={() => setCurrent((p) => p - 1)}
            >
              Back
            </button>

            {current < questions.length - 1 ? (
              <button onClick={() => setCurrent((p) => p + 1)}>
                Next
              </button>
            ) : (
              <button onClick={handleSubmitRound}>
                Submit Round
              </button>
            )}
          </div>
        </div>

        {/* RIGHT – QUESTION PANEL (STATIC) */}
        <div className="round-panel">
          <h3 className="panel-title">Questions</h3>

          <div className="panel-stats">
            <span>Answered: {answeredCount}</span>
            <span>Marked: {markedCount}</span>
            <span>
              Remaining: {questions.length - answeredCount}
            </span>
          </div>

          <div className="question-grid">
            {questions.map((item) => {
              const isAnswered = answers[item.id];
              const isMarked = review[item.id];
              const isCurrent = current === item.id - 1;

              return (
                <button
                  key={item.id}
                  className={`q-box
                    ${isCurrent ? "current" : ""}
                    ${isAnswered ? "answered" : ""}
                    ${isMarked ? "marked" : ""}
                  `}
                  onClick={() => setCurrent(item.id - 1)}
                >
                  {item.id}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
