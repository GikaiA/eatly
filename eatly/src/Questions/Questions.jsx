import React from "react";
import "./Questions.css";

function Questions() {
  return (
    <div className="questions">
      <h2>Questions</h2>
      <h3>How are you feeling right now?</h3>
      <div className="button-group">
        <button>Happy</button>
        <button>Sad</button>
        <button>Excited</button>
        <button>Angry</button>
        <button>Anxious</button>
        <button>Relaxed</button>
      </div>
      <br></br>
      <h3>How much time do you have?</h3>
    </div>
  );
}

export default Questions;
