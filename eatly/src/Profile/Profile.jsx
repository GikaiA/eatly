import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));

          if (userDoc.exists()) {
            setUserData(userDoc.data());
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
      `Remove ${restaurant.name} from saved restaurants?`
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
          (r) => r.id !== restaurant.id
        ),
      });
    } catch (error) {
      console.error("Error removing restaurant:", error);
      alert("Failed to remove restaurant");
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
          <span className="label">First Name:</span>
          <span className="value">{userData.firstName}</span>
        </div>
        <div className="info-row">
          <span className="label">Last Name:</span>
          <span className="value">{userData.lastName}</span>
        </div>
        <div className="info-row">
          <span className="label">Email:</span>
          <span className="value">{userData.email}</span>
        </div>
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
