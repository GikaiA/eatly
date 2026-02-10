import React, { useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

async function Login() {
  //variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //Login method
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/questions");
    } catch (error) {
      console.error("Error logging in user: ", error);
    }
  };

  //Google Sign In function through Firebase

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate("/questions");
    } catch (error) {
      setError("Google sign-in failed");
      console.error("Google sign-in failed: ", error);
    }
  };

  return (
    <>
      <div className="split left"></div>
      <div className="split right">
        <div className="login">
          <form onSubmit={handleLogin} className="login-form">
            <h1>Login to Eatly</h1>
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              className="login-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="login-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="sign-in-button">Sign In</button>
            <div className="divider">
              <span>OR</span>
            </div>
            <div className="google-section">
              <button onClick={handleGoogleSignIn} className="google-button">
                {" "}
                <FaGoogle className="icon" />
                Sign In With Google
              </button>
            </div>
            <p className="register-link">
              Don't have an account? Click <Link to="/register">here</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
