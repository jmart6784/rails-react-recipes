import React, { useContext } from "react";
import UserContext from "../components/context/UserContext";
import { Link } from "react-router-dom";

const Index = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div className="nav-div">
      <Link to="/recipes" className="nav-text nav-link">
        Recipes
      </Link>
      <p className="nav-text">
        {user.current_user ? user.current_user.email : "..."}
      </p>

      <div className="dropdown-div">
        <Link
          to={`user/${user.current_user ? user.current_user.id : ""}`}
          className="nav-text nav-link"
        >
          Profile
        </Link>

        <div className="nav-dropdown-content">
          <div className="nav-drp-dwn-inner">
            <Link to="/users" className="drop-text nav-link">
              Community
            </Link>
            <a className="drop-text nav-link" href="/users/edit">
              Settings
            </a>
            <a
              className="drop-text nav-link"
              rel="nofollow"
              data-method="delete"
              href="/users/sign_out"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
