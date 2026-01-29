import React, { useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
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

  //google function for logging in user

  

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <label>Username or Email</label>
        <input
          type="text"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="sign-in-button">Sign In</button>
        <hr className="dashed">OR</hr>
        <button> Sign In With Google</button>
        <p>
          If you have an account already, click <a href="/register">here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
