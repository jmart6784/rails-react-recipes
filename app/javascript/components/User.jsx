import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const User = (props) => {
  const [shUser, setShUser] = useState("");
  const [recipes, setRecipes] = useState("");

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
      .then((response) => console.log("RES: ", response))
      .catch(() => props.history.push("/recipes"));
  }, []);

  useEffect(() => {
    console.log("EFFECT: ", shUser);
  }, [shUser]);

  return (
    <div className="user-show-container">
      <p>{shUser.username}</p>
      <p>{`${shUser.first_name} ${shUser.last_name}`}</p>
      <Link to="/recipes">Back to recipes</Link>
    </div>
  );
};

export default User;
