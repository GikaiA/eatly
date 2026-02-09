import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Profile.css";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //modal info for editing account info
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Edit fields state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            // Pre-fill the edit fields
            setFirstName(data.firstName || "");
            setLastName(data.lastName || "");
            setEmail(data.email || "");
          } else {
            console.log("No user document found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // No user logged in, redirect to login
        navigate("/login");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleRemoveRestaurant = async (restaurant) => {
    const user = auth.currentUser;

    if (!user) return;

    const confirmRemove = window.confirm(
      `Remove ${restaurant.name} from saved restaurants?`,
    );
    if (!confirmRemove) return;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        savedRestaurants: arrayRemove(restaurant),
      });

      // Update local state
      setUserData({
        ...userData,
        savedRestaurants: userData.savedRestaurants.filter(
          (r) => r.id !== restaurant.id,
        ),
      });
    } catch (error) {
      console.error("Error removing restaurant:", error);
      alert("Failed to remove restaurant");
    }
  };

  //updating user info
  const handleUpdateProfile = async () => {
    const user = auth.currentUser;

    if (!user) return;

    try {
      // Update Firestore
      await updateDoc(doc(db, "users", user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      // Update email in Firebase Auth if it changed
      if (email !== userData.email) {
        await updateEmail(user, email);
      }

      // Update local state
      setUserData({
        ...userData,
        firstName,
        lastName,
        email,
      });

      handleClose();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);

      if (error.code === "auth/requires-recent-login") {
        alert("Please log out and log back in before changing your email");
      } else {
        alert("Failed to update profile");
      }
    }
  };

  if (loading) {
    return (
      <div className="profile">
        <p>Loading...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile">
        <p>No user data available</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h2>Profile</h2>
      </div>
      <div className="profile-info">
        <h3>Account Information</h3>
        <div className="info-row">
          <span className="info-label">First Name:</span>
          <span className="value">{userData.firstName}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Last Name:</span>
          <span className="value">{userData.lastName}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Email:</span>
          <span className="value">{userData.email}</span>
        </div>
        <Button variant="primary" onClick={handleShow}>
          Edit Account Info
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Account Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span className="account-info">Update First Name</span>
            <input
              type="text"
              className="account-field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <span className="account-info">Update Last Name</span>
            <input
              type="text"
              className="account-field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
            <span className="account-info">Update Email</span>
            <input
              type="email"
              className="account-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateProfile}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <hr className="divider" />

      <div className="saved-section">
        <h3>Saved Restaurants</h3>

        {userData.savedRestaurants && userData.savedRestaurants.length > 0 ? (
          <div className="saved-restaurants-grid">
            {userData.savedRestaurants.map((restaurant, index) => (
              <div key={index} className="saved-restaurant-card">
                <h4>{restaurant.name}</h4>
                <p className="cuisine">{restaurant.cuisine}</p>
                <p className="price">{"$".repeat(restaurant.priceLevel)}</p>
                <p className="location">📍 {restaurant.location}</p>

                <button
                  onClick={() => handleRemoveRestaurant(restaurant)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-saved">
            <p>No saved restaurants yet</p>
            <button onClick={() => navigate("/questions")} className="find-btn">
              Find Restaurants
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;