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
    // ... more restaurants
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
    <div>
      <h2>Results</h2>
      <h2>Your Results</h2>
      {/* displaying data from restaurants based on choices */}
      {filteredRestaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h3>{restaurant.name}</h3>
          <p>Price: {"$".repeat(restaurant.priceLevel)}</p>
        </div>
      ))}

      <Link to="/questions">Find New Results</Link>
    </div>
  );
}

export default Results;
