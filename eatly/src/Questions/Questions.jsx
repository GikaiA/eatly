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
  const handleAnswer = (question, answer) => {
    setAnswers({
      ...answers,
      [question]: answer,
    });
  };

  //see results, including navigation
  const handleSubmit = () => {
    navigate("/results", { state: { answers } });
  };
  return (
    <div className="questions">
      <h2>Questions</h2>
      <h3>How are you feeling right now?</h3>
      <div className="button-group">
        {/* button group with handleAnswer function. updates mood field */}
        <button
          onClick={() => handleAnswer("mood", "Happy")}
          //classname has iternary operator for when selected
          className={answers.mood === "Happy" ? "selected" : ""}
        >
          Happy
        </button>
        <button
          onClick={() => handleAnswer("mood", "Sad")}
          className={answers.mood === "Sad" ? "selected" : ""}
        >
          Sad
        </button>
        <button
          onClick={() => handleAnswer("mood", "Tired")}
          className={answers.mood === "Tired" ? "selected" : ""}
        >
          Tired
        </button>
      </div>
      <br></br>
      <h3>How much time do you have?</h3>
      <div className="button-group">
        {/* button group with similar funciton, updates time field */}
        <button
          onClick={() => handleAnswer("time", "Quick")}
          className={answers.mood === "Quick bite" ? "selected" : ""}
        >
          Quick bite (under 30 mins)
        </button>
        <button
          onClick={() => handleAnswer("time", "Moderate")}
          className={answers.mood === "Moderate" ? "selected" : ""}
        >
          Moderate (30 mins - 1 hour)
        </button>
        <button
          onClick={() => handleAnswer("time", "Leisure")}
          className={answers.mood === "Leisure" ? "selected" : ""}
        >
          Leisurely (over 1 hour)
        </button>
      </div>
      <h3>What's your budget?</h3>
      <div className="button-group">
        {/* button group with similar function, updates budget field */}
        <button
          onClick={() => handleAnswer("budget", "Cheap")}
          className={answers.mood === "Cheap" ? "selected" : ""}
        >
          Cheap
        </button>
        <button
          onClick={() => handleAnswer("budget", "Moderate")}
          className={answers.mood === "Moderate" ? "selected" : ""}
        >
          Moderate
        </button>
        <button
          onClick={() => handleAnswer("budget", "Expensive")}
          className={answers.mood === "Expensive" ? "selected" : ""}
        >
          Expensive
        </button>
      </div>
      <h3>Who are you dining with?</h3>
      <div className="button-group">
        {/* button group with previous function, updates company field */}
        <button
          onClick={() => handleAnswer("company", "Solo")}
          className={answers.mood === "Stressed" ? "selected" : ""}
        >
          Solo
        </button>
        <button
          onClick={() => handleAnswer("company", "Date")}
          className={answers.mood === "Stressed" ? "selected" : ""}
        >
          Partner/Date
        </button>
        <button
          onClick={() => handleAnswer("company", "Family")}
          className={answers.mood === "Stressed" ? "selected" : ""}
        >
          Family/Friends
        </button>
        <button
          onClick={() => handleAnswer("company", "Group")}
          className={answers.mood === "Stressed" ? "selected" : ""}
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
      <button onClick={handleSubmit}>Find Resurantants</button>
    </div>
  );
}

export default Questions;
