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
      <div className="button-group">
        <button>Quick bite (under 30 mins)</button>
        <button>Moderate (30 mins - 1 hour)</button>
        <button>Leisurely (over 1 hour)</button>
      </div>
      <h3>What's your budget?</h3>
      <div className="button-group">
        <button>Quick bite (under 30 mins)</button>
        <button>Moderate (30 mins - 1 hour)</button>
        <button>Leisurely (over 1 hour)</button>
      </div>
       <h3>Who are you dining with?</h3>
      <div className="button-group">
        <button>Solo</button>
        <button>Partner/Date</button>
        <button>Family/Friends</button>
        <button>Large group</button>
      </div>
    </div>
  );
}

export default Questions;
