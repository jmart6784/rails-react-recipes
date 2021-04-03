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
      <div>
        <img
          src={`assets/${recipe.image}`}
          alt={`${recipe.name} image`}
          height="150"
          width="150"
        />
        <div>
          <h5>{recipe.name}</h5>
          <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
        </div>
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
      <section>
        <div>
          <h1>Recipes for every occasion</h1>
          <p>
            We’ve pulled together our most popular recipes, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to try.
          </p>
        </div>
      </section>
      <div>
        <main>
          <div>
            <Link to="/recipe">Create New Recipe</Link>
          </div>
          <div>{recipes.length > 0 ? allRecipes : noRecipe}</div>
          <Link to="/">Home</Link>
        </main>
      </div>
    </div>
  );
};

export default Recipes;
