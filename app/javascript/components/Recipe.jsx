import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Recipe = (props) => {
  const [recipe, setRecipe] = useState("");
  const [ingredientList, setIngredientsList] = useState(
    "No ingredients available"
  );

  const [recipeInstruction, setRecipeInstruction] = useState("");

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setRecipe(response))
      .catch(() => props.history.push("/recipes"));
  }, []);

  const addHtmlEntities = (str) => {
    return String(str).replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  useEffect(() => {
    if (recipe !== "") {
      let listAry;

      if (recipe.ingredients.length > 0) {
        listAry = recipe.ingredients.split(",").map((ingredient, index) => (
          <li className="recipe-show-li" key={index}>
            {ingredient}
          </li>
        ));
        setIngredientsList(listAry);
      }

      setRecipeInstruction(addHtmlEntities(recipe.instruction));
    }
  }, [recipe]);

  return (
    <div>
      <div
        className="show-recipe-image"
        style={{ backgroundImage: `url(assets/${recipe.image})` }}
      >
        <h1 className="recipe-show-name">{recipe.name}</h1>
      </div>

      <div>
        <div className="recipe-show-mid-div">
          <div className="recipe-show-ingredients-div">
            <h5 className="recipe-show-ingredients-title">Ingredients</h5>
            <ul className="ingredients-ul">{ingredientList}</ul>
          </div>

          <div>
            <h5 className="recipe-show-prep-title">Preparation Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${recipeInstruction}`,
              }}
            />
          </div>

          <div>
            <button className="recipe-show-del-btn" type="button">
              Delete Recipe
            </button>
          </div>
        </div>

        <Link to="/recipes" className="recipe-show-back-btn">
          Back to recipes
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
