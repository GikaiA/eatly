import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function NavMenu() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Set user if logged in, null if not
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Navbar className="custom-navbar" expand="lg">
        <Navbar.Brand href="/" className="nav-title">
          Eatly
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {/* <Nav.Link href="/">Home</Nav.Link> */}

            {/* Show these ONLY if user is logged in */}
            {user ? (
              <>
                <Nav.Link href="/questions" className="navbar-button">
                  Find Food
                </Nav.Link>
                <Nav.Link href="/profile" className="navbar-button">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="navbar-button">
                  Logout
                </Nav.Link>
              </>
            ) : (
              // Show these ONLY if user is NOT logged in
              <>
                <Nav.Link href="/login" className="navbar-button">
                  Login
                </Nav.Link>
                <Nav.Link href="/register" className="navbar-button">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavMenu;
