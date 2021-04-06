import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewRecipe = (props) => {
  const [forms, setForms] = useState({
    name: "",
    ingredients: "",
    instruction: "",
  });

  const stripHtmlEntities = (str) => {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  const onChange = (event) => {
    const { name, value } = event.target;

    setForms({ ...forms, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/recipes/create";
    const { name, ingredients, instruction } = forms;

    if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
      return;

    const body = {
      name,
      ingredients,
      instruction: instruction.replace(/\n/g, "<br> <br>"),
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => props.history.push(`/recipe/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <div>
        <div>
          <h1>Add a new recipe to our awesome recipe collection.</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="recipeName">Recipe name</label>
              <input
                type="text"
                name="name"
                id="recipeName"
                required
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="recipeIngredients">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                required
                onChange={onChange}
              />
              <small id="ingredientsHelp">
                Separate each ingredient with a comma.
              </small>
            </div>
            <label htmlFor="instruction">Preparation Instructions</label>
            <textarea
              id="instruction"
              name="instruction"
              rows="5"
              required
              onChange={onChange}
            />
            <button type="submit">Create Recipe</button>
            <Link to="/recipes">Back to recipes</Link>
          </form>
        </div>
      </div>
      <p>NAME: {forms.name}</p>
      <p>INGREDIENTS: {forms.ingredients}</p>
      <p>INSTRUCTION: {forms.instruction}</p>
    </div>
  );
};

export default NewRecipe;
