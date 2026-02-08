import React from "react";
import "./Results.css";
import { useLocation, Link } from "react-router-dom";

function Results() {
  const location = useLocation(); //passed from Questions page
  const answers = location.state?.answers; // gets the answer object

  //dummy data for restaurants
  const dummyRestaurants = [
    {
      id: 1,
      name: "Joe's Comfort Diner",
      tags: ["comfort", "cozy", "quick"],
      priceLevel: 2,
    },
    {
      id: 2,
      name: "Sakura Sushi",
      tags: ["upscale", "celebratory"],
      priceLevel: 3,
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

  const filterRestaurants = (restaurants, answers) => {
    // Convert answers to tags
    let requiredTags = [];

    if (answers.mood === "Stressed") requiredTags.push("comfort", "cozy");
    if (answers.mood === "Happy") requiredTags.push("celebratory", "upscale");
    if (answers.mood === "Tired") requiredTags.push("quick", "casual");

    if (answers.time === "Quick") requiredTags.push("quick", "fast");

    // Filter restaurants
    return restaurants.filter((restaurant) => {
      // Does this restaurant have any of the required tags?
      return restaurant.tags.some((tag) => requiredTags.includes(tag));
    });
  };

  const filteredRestaurants = filterRestaurants(dummyRestaurants, answers);

  return (
    <div className="results">
      {" "}
      <h2 className="results-title">Your Results</h2>
      {/* displaying data from restaurants based on choices */}
      {filteredRestaurants.map((restaurant) => (
        <div key={restaurant.id} className="results-section">
          <h3 className="results-name">{restaurant.name}</h3>
          <p className="price">Price: {"$".repeat(restaurant.priceLevel)}</p>
        </div>
      ))}
      <Link to="/questions">Find New Results</Link>
    </div>
  );
}

export default Results;
