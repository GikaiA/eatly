import React, { useState } from "react";
import "./Questions.css";
import { useNavigate } from "react-router-dom";

function Questions() {
  //navigate function
  const navigate = useNavigate();

  // use state to hold answer choices
  const [answers, setAnswers] = useState({
    mood: "",
    time: "",
    budget: "",
    company: "",
    dietary: "",
  });

  //function to handle answer selection (question, answer is parameters)
  const handleAnswer = (question, value) => {
    // If they click the same button that's already selected, clear it
  if (answers[question] === value) {
    setAnswers({
      ...answers,
      [question]: '' // Deselect by setting to empty string
    });
  } else {
    // Otherwise, select the new button
    setAnswers({
      ...answers,
      [question]: value
    });
  }
};

  //see results, including navigation
  const handleSubmit = () => {
    navigate("/results", { state: { answers } });
  };
  return (
    <div className="questions">
      <h2 className="question-title">Questions</h2>
      <h3>How are you feeling right now?</h3>
      <div className="button-group">
        {/* button group with handleAnswer function. updates mood field */}
        <button
          onClick={() => handleAnswer("mood", "Happy")}
          //classname has iternary operator for when selected
          className={answers.mood === "Happy" ? "selected" : "question-button"}
        >
          Happy
        </button>
        <button
          onClick={() => handleAnswer("mood", "Sad")}
          className={answers.mood === "Sad" ? "selected" : "  question-button"}
        >
          Sad
        </button>
        <button
          onClick={() => handleAnswer("mood", "Tired")}
          className={answers.mood === "Tired" ? "selected" : "question-button"}
        >
          Tired
        </button>
      </div>
      <h3>How much time do you have?</h3>
      <div className="button-group">
        {/* button group with similar funciton, updates time field */}
        <button
          onClick={() => handleAnswer("time", "Quick")}
          className={answers.time === "Quick" ? "selected" : "question-button"}
        >
          Quick bite (under 30 mins)
        </button>
        <button
          onClick={() => handleAnswer("time", "Moderate")}
          className={answers.time === "Moderate" ? "selected" : "question-button"}
        >
          Moderate (30 mins - 1 hour)
        </button>
        <button
          onClick={() => handleAnswer("time", "Leisure")}
          className={answers.time === "Leisure" ? "selected" : "question-button"}
        >
          Leisurely (over 1 hour)
        </button>
      </div>
      <h3>What's your budget?</h3>
      <div className="button-group">
        {/* button group with similar function, updates budget field */}
        <button
          onClick={() => handleAnswer("budget", "Cheap")}
          className={answers.budget === "Cheap" ? "selected" : "question-button"}
        >
          Cheap
        </button>
        <button
          onClick={() => handleAnswer("budget", "Moderate")}
          className={answers.budget === "Moderate" ? "selected" : "question-button"}
        >
          Moderate
        </button>
        <button
          onClick={() => handleAnswer("budget", "Expensive")}
          className={answers.budget === "Expensive" ? "selected" : "question-button"}
        >
          Expensive
        </button>
      </div>
      <h3>Who are you dining with?</h3>
      <div className="button-group">
        {/* button group with previous function, updates company field */}
        <button
          onClick={() => handleAnswer("company", "Solo")}
          className={answers.company === "Solo" ? "selected" : "question-button"}
        >
          Solo
        </button>
        <button
          onClick={() => handleAnswer("company", "Date")}
          className={answers.company === "Date" ? "selected" : "question-button"}
        >
          Partner/Date
        </button>
        <button
          onClick={() => handleAnswer("company", "Family")}
          className={answers.company === "Family" ? "selected" : "question-button"}
        >
          Family/Friends
        </button>
        <button
          onClick={() => handleAnswer("company", "Group")}
          className={answers.company === "Group" ? "selected" : "question-button"}
        >
          Large group
        </button>
      </div>
      {/* <h3>Any dietary restrictions?</h3>
      <div className="button-group">
        <button>None</button>
        <button>Vegetarian</button>
        <button>Vegan</button>
        <button>Gluten-free</button>
      </div> */}
      <button onClick={handleSubmit} className="find-restaurants-button">Find Resurantants</button>
    </div>
  );
}

export default Questions;
