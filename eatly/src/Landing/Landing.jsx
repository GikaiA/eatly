import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
// import food from '../assets/food.jpg';

function Landing() {
  return (
    <div className="landing">
      <div className="bg-section">
        <div className="hero-section">
          <h1 className="landing-title">This is the landing page.</h1>
         <Link to="/register"><button>Get Started</button></Link>
        </div>
      </div>
      {/* <button>
        <Link to="/login">Login</Link>
      </button>
      <button>
        <Link to="/register">Register</Link>
      </button> */}
    </div>
  );
}

export default Landing;
