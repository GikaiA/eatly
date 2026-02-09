import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import "./Results.css";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers;
  const [savedIds, setSavedIds] = useState([]);

  // Dummy restaurant data
  const dummyRestaurants = [
    {
      id: 1,
      name: "Joe's Comfort Diner",
      cuisine: "American",
      tags: ["comfort", "cozy", "casual", "quick", "family-friendly"],
      priceLevel: 2,
      location: "Downtown",
    },
    {
      id: 2,
      name: "Sakura Sushi",
      cuisine: "Japanese",
      tags: ["upscale", "celebratory", "adventurous", "quiet"],
      priceLevel: 3,
      location: "Midtown",
    },
    {
      id: 3,
      name: "Quick Bites Cafe",
      cuisine: "Cafe",
      tags: ["quick", "casual", "budget-friendly", "fast"],
      priceLevel: 1,
      location: "Near Campus",
    },
    {
      id: 4,
      name: "The Cozy Corner Bistro",
      cuisine: "French",
      tags: ["comfort", "cozy", "upscale", "romantic", "quiet"],
      priceLevel: 3,
      location: "Old Town",
    },
    {
      id: 5,
      name: "Taco Express",
      cuisine: "Mexican",
      tags: ["quick", "casual", "budget-friendly", "lively", "fast"],
      priceLevel: 1,
      location: "Food Court",
    },
    {
      id: 6,
      name: "The Grand Steakhouse",
      cuisine: "Steakhouse",
      tags: ["celebratory", "upscale", "romantic", "quiet", "formal"],
      priceLevel: 4,
      location: "Financial District",
    },
    {
      id: 7,
      name: "Mama's Italian Kitchen",
      cuisine: "Italian",
      tags: ["comfort", "family-friendly", "cozy", "casual", "lively"],
      priceLevel: 2,
      location: "Little Italy",
    },
    {
      id: 8,
      name: "Zen Garden Asian Fusion",
      cuisine: "Asian Fusion",
      tags: ["adventurous", "upscale", "trendy", "quiet", "exotic"],
      priceLevel: 3,
      location: "Arts District",
    },
    {
      id: 9,
      name: "The Breakfast Spot",
      cuisine: "Breakfast",
      tags: [
        "casual",
        "comfort",
        "quick",
        "family-friendly",
        "budget-friendly",
      ],
      priceLevel: 2,
      location: "Suburbs",
    },
    {
      id: 10,
      name: "Spice Route Indian Cuisine",
      cuisine: "Indian",
      tags: ["adventurous", "exotic", "lively", "flavorful", "moderate"],
      priceLevel: 2,
      location: "University Area",
    },
    {
      id: 11,
      name: "The Burger Joint",
      cuisine: "American",
      tags: ["casual", "comfort", "quick", "budget-friendly", "lively"],
      priceLevel: 1,
      location: "Main Street",
    },
    {
      id: 12,
      name: "Mediterranean Dreams",
      cuisine: "Mediterranean",
      tags: ["healthy", "fresh", "casual", "moderate", "light"],
      priceLevel: 2,
      location: "Beach Area",
    },
    {
      id: 13,
      name: "The Ramen House",
      cuisine: "Japanese",
      tags: ["comfort", "casual", "trendy", "quick", "flavorful"],
      priceLevel: 2,
      location: "Chinatown",
    },
    {
      id: 14,
      name: "Sunset Rooftop Lounge",
      cuisine: "Modern American",
      tags: ["celebratory", "upscale", "romantic", "trendy", "lively"],
      priceLevel: 4,
      location: "Downtown",
    },
    {
      id: 15,
      name: "The Vegan Table",
      cuisine: "Vegan",
      tags: ["healthy", "fresh", "casual", "trendy", "light"],
      priceLevel: 2,
      location: "Hipster District",
    },
    {
      id: 16,
      name: "BBQ Pit Stop",
      cuisine: "BBQ",
      tags: ["casual", "comfort", "lively", "family-friendly", "hearty"],
      priceLevel: 2,
      location: "Outskirts",
    },
    {
      id: 17,
      name: "Dim Sum Palace",
      cuisine: "Chinese",
      tags: [
        "family-friendly",
        "lively",
        "adventurous",
        "group-friendly",
        "moderate",
      ],
      priceLevel: 2,
      location: "Chinatown",
    },
    {
      id: 18,
      name: "The Pizza Box",
      cuisine: "Italian",
      tags: [
        "quick",
        "casual",
        "budget-friendly",
        "family-friendly",
        "takeout",
      ],
      priceLevel: 1,
      location: "Near Campus",
    },
    {
      id: 19,
      name: "Seafood Symphony",
      cuisine: "Seafood",
      tags: ["upscale", "celebratory", "fresh", "romantic", "quiet"],
      priceLevel: 4,
      location: "Waterfront",
    },
    {
      id: 20,
      name: "Street Food Paradise",
      cuisine: "Thai",
      tags: ["adventurous", "casual", "flavorful", "budget-friendly", "exotic"],
      priceLevel: 1,
      location: "Night Market",
    },
  ];

  // Filter restaurants based on answers
  const filterRestaurants = (restaurants, answers) => {
    if (!answers) return [];

    let requiredTags = [];

    // Convert mood to tags
    if (answers.mood === "Stressed") requiredTags.push("comfort", "cozy");
    if (answers.mood === "Happy") requiredTags.push("celebratory", "upscale");
    if (answers.mood === "Tired") requiredTags.push("quick", "casual");
    if (answers.mood === "Adventurous")
      requiredTags.push("adventurous", "exotic");
    if (answers.mood === "Celebratory")
      requiredTags.push("celebratory", "upscale");
    if (answers.mood === "Casual/Relaxed") requiredTags.push("casual", "cozy");

    // Convert time to tags
    if (answers.time === "Quick") requiredTags.push("quick", "fast");
    if (answers.time === "Moderate") requiredTags.push("moderate", "casual");
    if (answers.time === "Leisurely") requiredTags.push("upscale", "quiet");

    // Convert dining companion to tags
    if (answers.dining === "Solo") requiredTags.push("casual", "quiet");
    if (answers.dining === "Partner/Date")
      requiredTags.push("romantic", "quiet");
    if (answers.dining === "Friends") requiredTags.push("lively", "casual");
    if (answers.dining === "Family") requiredTags.push("family-friendly");
    if (answers.dining === "Large group")
      requiredTags.push("group-friendly", "lively");

    // Map budget to price level
    let maxPrice = 4;
    if (answers.budget === "$") maxPrice = 1;
    if (answers.budget === "$$") maxPrice = 2;
    if (answers.budget === "$$$") maxPrice = 3;
    if (answers.budget === "$$$$") maxPrice = 4;

    return restaurants.filter((restaurant) => {
      const hasMatchingTag = restaurant.tags.some((tag) =>
        requiredTags.includes(tag)
      );
      const withinBudget = restaurant.priceLevel <= maxPrice;

      return hasMatchingTag && withinBudget;
    });
  };

  const filteredRestaurants = filterRestaurants(dummyRestaurants, answers);

  // Check which restaurants are already saved
  useState(() => {
    const checkSavedRestaurants = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().savedRestaurants) {
            const saved = userDoc.data().savedRestaurants.map((r) => r.id);
            setSavedIds(saved);
          }
        } catch (error) {
          console.error("Error checking saved restaurants:", error);
        }
      }
    };
    checkSavedRestaurants();
  }, []);

  const handleSaveRestaurant = async (restaurant) => {
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

      setSavedIds([...savedIds, restaurant.id]);
      alert("Restaurant saved!");
    } catch (error) {
      console.error("Error saving restaurant:", error);
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
      <h2>Your Restaurant Recommendations</h2>

      {filteredRestaurants.length > 0 ? (
        <div className="restaurant-grid">
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-card">
              <h3>{restaurant.name}</h3>
              <p className="cuisine">{restaurant.cuisine}</p>
              <p className="price">{"$".repeat(restaurant.priceLevel)}</p>
              <p className="location">📍 {restaurant.location}</p>

              <button
                onClick={() => handleSaveRestaurant(restaurant)}
                disabled={savedIds.includes(restaurant.id)}
                className={
                  savedIds.includes(restaurant.id) ? "saved-btn" : "save-btn"
                }
              >
                {savedIds.includes(restaurant.id)
                  ? "✓ Saved"
                  : "Save Restaurant"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>
            No restaurants match your preferences. Try adjusting your answers!
          </p>
          <button onClick={() => navigate("/questions")}>Try Again</button>
        </div>
      )}
    </div>
  );
}

export default Results;
