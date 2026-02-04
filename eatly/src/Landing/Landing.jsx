import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import friends from "../assets/friends-eating.jpg";

function Landing() {
  return (
    <div className="landing">
      <div className="bg-section">
        <div className="hero-section">
          <h1 className="landing-title">Find the perfect meal for your mood</h1>
          <p>
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
        <h1 className="how-title">How It Works</h1>

      </div>
    </div>
  );
}

export default Landing;
