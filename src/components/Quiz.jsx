import React, { useState } from "react";
import { data } from "../assets/data";
import "../App.css";

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const question = data[current];

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === question.answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    if (current < data.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowScore(false);
  };

  return (
    <div className="quiz-container">
      <h1>🧠 React Quiz</h1>
      <div className="quiz-card">
        {showScore ? (
          <div className="result">
            <h2>
              You scored {score} out of {data.length}
            </h2>
            <button onClick={restartQuiz}>Restart Quiz</button>
          </div>
        ) : (
          <>
            <h2>
              Q{current + 1}. {question.question}
            </h2>
            <ul>
              {question.options.map((option, index) => (
                <li
                  key={index}
                  className={
                    selected
                      ? option === question.answer
                        ? "correct"
                        : option === selected
                        ? "wrong"
                        : ""
                      : ""
                  }
                  onClick={() => !selected && handleAnswer(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <button onClick={nextQuestion} disabled={!selected}>
              {current === data.length - 1 ? "Finish" : "Next"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
