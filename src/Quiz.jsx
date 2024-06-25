import React, { useState } from "react";

import "./App.css";
import "./Quiz.css";
import QuizData, { quizData } from "./QuizData";
import userEvent from "@testing-library/user-event";
import Stars from "./Stars";
import Stars1 from "./Stars";
import starArray from "./Stars";

export default function Header() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  let [score, setScore] = useState(0);
  let [selectedAnswer, setSelectedAnswer] = useState(null);
  let [correctAnswer, setCorrectAnswer] = useState(null);

  function handleOptionClick(getanswer) {
    setSelectedAnswer(getanswer);
    setCorrectAnswer(quizData[currentQuestionIndex].answer);
    if (getanswer === quizData[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  }

  const getClass = (answer) => {
    if (!selectedAnswer) return "";
  
    if (answer === correctAnswer) {
    
      return "correct";
    } else {
      return "incorrect";
    }
  };

  const gotoNextQuestion = () => {
    setSelectedAnswer(null);
    setCorrectAnswer(null);

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const totalQuestion = quizData.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestion) * 100;
  const scorePercent = (score / totalQuestion) * 100;
  console.log(scorePercent);

  function getStarRating(scorePercent) {
    if (scorePercent < 0) return 0;
    if (scorePercent <= 20) return 1;
    if (scorePercent <= 40) return 2;
    if (scorePercent <= 60) return 3;
    if (scorePercent <= 80) return 4;
    if (scorePercent <= 100) return 5;
  }

  const starRating = getStarRating(scorePercent);

  if (currentQuestionIndex >= quizData.length) {
    // End of quiz

    return (
      <div  className="quizComplete mainContainer">
        <div className="starDiv">
          {[...Array(5)].map((_, index) => (
            <Stars key={index} filled={index < starRating ? true : false} />
          ))}
        </div>
        <h1>Quiz Completed</h1>
        <h2>Final Score: {score}</h2>
      </div>
    );
  }
  const answerOptions = quizData[currentQuestionIndex].options;

  return (
    <div className="mainContainer">
      {currentQuestionIndex >= quizData.length ? (
        <h1>Quiz completed</h1>
      ) : (
        <div className="quizContainer">
          <h1 className="score">Score: {score}</h1>
          <hr></hr>
          <div className="progressBarContainer">
            <div className="progressBar" style={{ width: `${progress}%` }}>
              <h1></h1>
            </div>
          </div>
          <h1>
            Ques. {currentQuestionIndex + 1} out of {quizData.length}
          </h1>
          <h1 className="quest">{quizData[currentQuestionIndex].question}</h1>
          <ul className="options">
            {answerOptions.map((answer, index) => (
              <button 
                key={index}
                className={getClass(answer)} 
                onClick={() => handleOptionClick(answer)}
                disabled={selectedAnswer !== null}
              >
                {answer}
              </button>
            ))}
          </ul>
          <button onClick={gotoNextQuestion} className="nextBtn">
            Next
          </button>
        </div>
      )}
    </div>
  );
}
