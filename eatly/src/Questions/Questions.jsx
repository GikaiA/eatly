import React, { useState } from "react";
import "./Questions.css";
import { useNavigate } from "react-router-dom";
import { searchNearbyRestaurants } from "../foursqaure";

function Questions() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    location: "",
    foodType: "",
    budget: "",
    mood: "",
    company: "",
  });
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnswer = (question, value) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: prev[question] === value ? "" : value,
    }));
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ lat: latitude, lng: longitude });
        setAnswers((prev) => ({ ...prev, location: "My current location" }));
      },
      () => setError("Could not get your location.")
    );
  };

  const handleSubmit = async () => {
    if (!answers.location) {
      setError("Please enter a location or use your current location.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const restaurantData = await searchNearbyRestaurants({
        location: answers.location,
        foodType: answers.foodType,
        budget: answers.budget,
        coords,
      });
      navigate("/results", { state: { answers, restaurantData } });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to find restaurants. Check your location and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="questions">
      <h2 className="question-title">Find Your Next Meal</h2>

      <h3>Where are you?</h3>
      <div className="location-row">
        <input
          className="location-input"
          type="text"
          placeholder="City or neighborhood (e.g. Brooklyn, NY)"
          value={answers.location === "My current location" ? "" : answers.location}
          onChange={(e) => {
            setCoords(null);
            setAnswers((prev) => ({ ...prev, location: e.target.value }));
          }}
        />
        <button className="use-location-btn" onClick={handleUseLocation}>
          📍 Use My Location
        </button>
      </div>
      {answers.location === "My current location" && (
        <p className="location-confirmed">📍 Using your current location</p>
      )}

      <h3>What are you craving?</h3>
      <div className="button-group">
        {["American", "Italian", "Mexican", "Asian", "Healthy", "Anything"].map((type) => (
          <button
            key={type}
            onClick={() => handleAnswer("foodType", type)}
            className={answers.foodType === type ? "selected" : "question-button"}
          >
            {type}
          </button>
        ))}
      </div>

      <h3>What's your budget?</h3>
      <div className="button-group">
        {["Cheap", "Moderate", "Expensive"].map((b) => (
          <button
            key={b}
            onClick={() => handleAnswer("budget", b)}
            className={answers.budget === b ? "selected" : "question-button"}
          >
            {b}
          </button>
        ))}
      </div>

      <h3>How are you feeling?</h3>
      <div className="button-group">
        {["Happy", "Sad", "Tired"].map((m) => (
          <button
            key={m}
            onClick={() => handleAnswer("mood", m)}
            className={answers.mood === m ? "selected" : "question-button"}
          >
            {m}
          </button>
        ))}
      </div>

      <h3>Who are you dining with?</h3>
      <div className="button-group">
        {["Solo", "Date", "Family", "Group"].map((c) => (
          <button
            key={c}
            onClick={() => handleAnswer("company", c)}
            className={answers.company === c ? "selected" : "question-button"}
          >
            {c}
          </button>
        ))}
      </div>

      {error && <p className="error-message">{error}</p>}

      <button
        onClick={handleSubmit}
        className="find-restaurants-button"
        disabled={loading}
      >
        {loading ? "Finding restaurants..." : "Find Restaurants"}
      </button>
    </div>
  );
}

export default Questions;
