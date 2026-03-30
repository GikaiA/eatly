import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import "./Results.css";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, restaurantData } = location.state ?? {};
  const RestaurantData = restaurantData ?? [];
  const [savedIds, setSavedIds] = useState([]);

  useState(() => {
    const checkSaved = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().savedRestaurants) {
          setSavedIds(userDoc.data().savedRestaurants.map((r) => r.id));
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkSaved();
  }, []);

  const handleSave = async (restaurant) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to save restaurants");
      navigate("/login");
      return;
    }
    try {
      await updateDoc(doc(db, "users", user.uid), {
        savedRestaurants: arrayUnion(restaurant),
      });
      setSavedIds((prev) => [...prev, restaurant.id]);
    } catch (e) {
      console.error(e);
      alert("Failed to save restaurant");
    }
  };

  if (!answers) {
    return (
      <div className="results">
        <h2>No Results</h2>
        <p>Please complete the questionnaire first.</p>
        <button onClick={() => navigate("/questions")}>Go to Questions</button>
      </div>
    );
  }

  return (
    <div className="results">
      <div className="results-header">
        <h2>Your Recommendations</h2>
        {answers.location && (
          <p className="results-context">
            {answers.foodType && answers.foodType !== "Anything"
              ? `${answers.foodType} restaurants`
              : "Restaurants"}{" "}
            near <strong>{answers.location}</strong>
            {answers.budget ? ` · ${answers.budget}` : ""}
          </p>
        )}
        <button className="search-again-btn" onClick={() => navigate("/questions")}>
          ← Search Again
        </button>
      </div>

      {RestaurantData.length > 0 ? (
        <div className="restaurant-grid">
          {RestaurantData.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <span className="cuisine-badge">{restaurant.type}</span>
              <h3>{restaurant.name}</h3>
              <p className="price">{"$".repeat(restaurant.price)}</p>
              <p className="location">📍 {restaurant.location}</p>
              <button
                onClick={() => handleSave(restaurant)}
                disabled={savedIds.includes(restaurant.id)}
                className={savedIds.includes(restaurant.id) ? "saved-btn" : "save-btn"}
              >
                {savedIds.includes(restaurant.id) ? "✓ Saved" : "Save Restaurant"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No restaurants found. Try a different location or fewer filters.</p>
          <button onClick={() => navigate("/questions")}>Try Again</button>
        </div>
      )}
    </div>
  );
}

export default Results;
