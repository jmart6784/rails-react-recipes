import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../components/context/UserContext";

const User = (props) => {
  const [shUser, setShUser] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [noRecipes, setNoRecipes] = useState("");

  const loadUser = () => {
    const {
      match: {
        params: { id },
      },
    } = props;

    const url = `/api/v1/user/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setShUser(response))
      .catch(() => props.history.push("/recipes"));
  };

  const loadUserRecipes = () => {
    const {
      match: {
        params: { id },
      },
    } = props;

    const url = `/api/v1/recipes/user_recipes/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setRecipes(response))
      .catch(() => props.history.push("/recipes"));
  };

  // update page when params updates
  useEffect(() => {
    loadUser();
    loadUserRecipes;
  }, [props]);

  const allRecipes = recipes.map((recipe, index) => {
    return (
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
    );
  });

  useEffect(() => {
    if (user.current_user && shUser) {
      if (shUser.id === user.current_user.id) {
        setNoRecipes(
          <div>
            <h4>
              No recipes yet. Why not <Link to="/new_recipe">create one</Link>
            </h4>
          </div>
        );
      } else {
        setNoRecipes(
          <div>
            <h4>{shUser.username} hasn't shared any recipes yet.</h4>
          </div>
        );
      }
    }
  }, [user, shUser]);

  return (
    <div className="user-show-container">
      <div className="user-show-info-div">
        <p>{shUser.username}</p>
        <p>{`${shUser.first_name} ${shUser.last_name}`}</p>
        {shUser.bio ? <p>{shUser.bio}</p> : <p>No bio</p>}
        <p>Recipes: {recipes.length}</p>
      </div>
      <button onClick={() => props.history.goBack()}>Back</button>

      <div className="recipe-index-grid">
        {recipes.length > 0 ? allRecipes : noRecipes}
      </div>
    </div>
  );
};

export default User;
