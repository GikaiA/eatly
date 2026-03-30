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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(""); //error state

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

      // Validate email format
      if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Validate other fields
      if (!firstName || !lastName || !password) {
        alert("Please fill in all fields");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }

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

      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered");
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email format");
      } else {
        alert("Registration failed. Please try again.");
      }
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

  //email domain check
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address domain");
    } else {
      setEmailError("");
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
          onChange={handleEmailChange} 
          className={`register-field ${emailError ? "error" : ""}`}
        />
        {emailError && <p className="error-message">{emailError}</p>}

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
