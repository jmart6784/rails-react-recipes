import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect((props) => {
    const url = "/api/v1/recipes/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setRecipes(response))
      .catch(() => this.props.history.push("/"));
  }, []);

  const allRecipes = recipes.map((recipe, index) => (
    <div key={index}>
      <div className="recipe-container">
        <img
          src={`assets/${recipe.image}`}
          alt={`${recipe.name} image`}
          height="300"
          width="300"
        />
        <p>{recipe.name}</p>
        <Link to={`/recipe/${recipe.id}`} className="view-recipe-link">
          View Recipe
        </Link>
      </div>
    </div>
  ));

  const noRecipe = (
    <div>
      <h4>
        No recipes yet. Why not <Link to="/new_recipe">create one</Link>
      </h4>
    </div>
  );

  return (
    <div>
      <div className="recipe-index-header">
        <h1 className="recipe-index-title">Recipes for every occasion</h1>
        <p>
          We’ve pulled together our most popular recipes, our latest additions,
          and our editor’s picks, so there’s sure to be something tempting for
          you to try.
        </p>
      </div>

      <div className="bottom-container">
        <div className="new-recipe-link-div">
          <Link to="/recipe" className="recipe-index-new-link">
            Create New Recipe
          </Link>
        </div>
        <div className="recipe-index-grid">
          {recipes.length > 0 ? allRecipes : noRecipe}
        </div>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default Recipes;
