import React, { useContext } from "react";
import UserContext from "../components/context/UserContext";
import { Link } from "react-router-dom";

const Index = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div className="nav-div">
      <Link to="/recipes" className="nav-username">
        Recipes
      </Link>
      <p className="nav-username">
        {user.current_user ? user.current_user.email : "..."}
      </p>

      <div>
        <Link to="/users" className="nav-logout">
          Users Index
        </Link>
        <a className="nav-logout" href="/users/edit">
          Settings
        </a>
        <a
          className="nav-logout"
          rel="nofollow"
          data-method="delete"
          href="/users/sign_out"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default Index;
