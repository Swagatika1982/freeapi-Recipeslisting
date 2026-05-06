import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/meals"
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error("Failed to fetch meals");
      }

      setMeals(result.data.data);
    } catch (err) {
      setError("Something went wrong while loading meals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Meals & Recipes</h1>
        <p>Browse delicious meals from around the world</p>
        <button onClick={fetchMeals}>Refresh Meals</button>
      </header>

      {loading && <h2 className="message">Loading meals...</h2>}

      {error && <h2 className="message error">{error}</h2>}

      {!loading && !error && (
        <div className="meal-grid">
          {meals.map((meal) => (
            <div className="meal-card" key={meal.id}>
              <img src={meal.strMealThumb} alt={meal.strMeal} />

              <div className="meal-content">
                <h2>{meal.strMeal}</h2>

                <div className="meal-info">
                  <span>{meal.strCategory}</span>
                  <span>{meal.strArea}</span>
                </div>

                <p>
                  {meal.strInstructions
                    ? meal.strInstructions.slice(0, 140) + "..."
                    : "No instructions available."}
                </p>

                {meal.strYoutube && (
                  <a href={meal.strYoutube} target="_blank">
                    Watch Recipe
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;