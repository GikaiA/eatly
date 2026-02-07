import React, { useState } from "react";
import "./Register.css";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";


function Register() {
  // state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //navigation hook
  const navigate = useNavigate();
  //variable for register method
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/questions");
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };

  //Google Sign In function through Firebase
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // User is authenticated, just redirect
      navigate("/questions");
    } catch (error) {
      console.error("Google sign-in failed: ", error);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Register</h2>
        {/* <label>First Name</label>
        <input type="text" placeholder="First Name" />
        <label>Last Name</label>
        <input type="text" placeholder="Last Name" /> */}
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-field"
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-field"
        />
        <button type="submit" className="register-button">Create Account</button>
        <div className="divider">
          <span>OR</span>
        </div>
        <button onClick={handleGoogleSignIn} className="google-button"><FaGoogle className="icon"/> Sign In With Google</button>
        <p className="register-link">
          If you have an account already, click <Link to="/login">here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
