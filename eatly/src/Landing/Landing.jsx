import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import friends from "../assets/friends-eating.jpg";

function Landing() {
  return (
    <div className="landing">
      <div className="bg-section">
        <div className="hero-section">
          <h1 className="hero-title">Find the perfect meal for your mood</h1>
          <p className="hero-sentence">
            Answer a few questions and discover restaurants that match your vibe
          </p>
          <Link to="/register">
            <button className="hero-btn">Get Started</button>
          </Link>
        </div>
      </div>
      <div className="info-section">
        <h1 className="info-title">What is Eatly?</h1>
        <div className="sub-info-section">
          <img
            src={friends}
            alt="Friends eating together"
            className="info-image"
          />
          <p className="info-sentence">
            Eatly is a platform that helps you find the perfect meal for your
            mood. Answer a few questions about your preferences and discover
            restaurants that match your vibe.
          </p>
        </div>
      </div>
      <div className="how-section">
        <h2 className="how-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Tell us your mood</h3>
            <p>Share how you're feeling right now</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Answer quick questions</h3>
            <p>Budget, time, dining companions</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get recommendations</h3>
            <p>We match restaurants to your vibe</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Discover your meal</h3>
            <p>Find the perfect spot near you</p>
          </div>
        </div>
      </div>
      <div className="get-started-section">
        <h2>Want to find some reccommendations?</h2>
        <p className="mood-sentence">
          Let the mood guide you to the perfect meal.
        </p>
        <button className="get-started-button">Get Started</button>
        <p className="get-started">
          Already have an account? Click{" "}
          <Link to="/login" className="link">
            here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Landing;
