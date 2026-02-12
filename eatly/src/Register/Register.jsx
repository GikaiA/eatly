import React, { useState } from "react";
import "./Register.css";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

function Register() {
  // Remove 'async' here
  const [firstName, setFirstName] = useState(""); // Add these back
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Create auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; // Get user from response

      // Save to Firestore - INSIDE this function
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: new Date(),
      });

      navigate("/questions");
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Split display name for Google users
      const nameParts = user.displayName.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        createdAt: new Date(),
      });

      navigate("/questions");
    } catch (error) {
      console.error("Google sign-in failed: ", error);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleRegister} className="register-form">
        <h2 className="register-title">Register</h2>

        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onTouchStart={(e) => e.stopPropagation()}
          className="register-field"
        />

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onTouchStart={(e) => e.stopPropagation()}
          className="register-field"
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onTouchStart={(e) => e.stopPropagation()}
          className="register-field"
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onTouchStart={(e) => e.stopPropagation()}
          className="register-field"
        />

        <button type="submit" className="register-button">
          Create Account
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <button onClick={handleGoogleSignIn} className="google-button">
          <FaGoogle className="icon" /> Sign In With Google
        </button>

        <p className="register-link">
          If you have an account already, click <Link to="/login">here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
