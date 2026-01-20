import React, { useState } from "react";
import "./Register.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
        <p>If you have an account already, click <a href="/login">here</a></p>
      </form>
    </div>
  );
}

export default Register;
