import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="home-container">
    <div className="home-mid-div">
      <h1 className="home-title">Food Recipes</h1>
      <p>
        A curated list of recipes for the best homemade meal and delicacies.
      </p>
      <Link to="/recipes" className="home-btn-link" role="button">
        View Recipes
      </Link>
    </div>
  </div>
);
