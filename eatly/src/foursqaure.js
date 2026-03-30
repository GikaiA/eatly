const FOOD_CATEGORY_MAP = {
  American: "4bf58dd8d48988d14e941735",
  Italian: "4bf58dd8d48988d110941735",
  Mexican: "4bf58dd8d48988d1c1941735",
  Asian: "4bf58dd8d48988d145941735",
  Healthy: "4bf58dd8d48988d112941735",
};

const BUDGET_PRICE_MAP = {
  Cheap: 1,
  Moderate: 2,
  Expensive: 3,
};

export async function searchNearbyRestaurants({ location, foodType, budget, coords }) {
  const clientId = import.meta.env.VITE_FOURSQUARE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_FOURSQUARE_CLIENT_SECRET;

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    v: "20231010",
    categoryId: "4d4b7105d754a06374d81259",
    limit: "10",
  });

  if (coords) {
    params.set("ll", `${coords.lat},${coords.lng}`);
  } else {
    params.set("near", location);
  }

  if (foodType && FOOD_CATEGORY_MAP[foodType]) {
    params.set("categoryId", FOOD_CATEGORY_MAP[foodType]);
  }

   console.log("client_id:", clientId);
  console.log("client_secret:", clientSecret);
  console.log("Full URL:", `https://api.foursquare.com/v2/venues/search?${params}`);

  
  const res = await fetch(
    `https://api.foursquare.com/v2/venues/search?${params}`
  );

  

  if (!res.ok) throw new Error("Foursquare request failed");

  const data = await res.json();
  const venues = data.response?.venues ?? [];

  const maxPrice = budget ? BUDGET_PRICE_MAP[budget] : 4;

  return venues
    .filter((v) => !v.price || v.price.tier <= maxPrice)
    .map((v) => ({
      id: v.id,
      name: v.name,
      type: v.categories?.[0]?.shortName ?? "Restaurant",
      price: v.price?.tier ?? 1,
      location: v.location?.formattedAddress?.join(", ") ?? "Unknown",
    }));
}
