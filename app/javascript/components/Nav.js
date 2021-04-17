import React, { useContext } from "react";
import UserContext from "../components/context/UserContext";

const Index = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <div className="nav-div">
      <div></div>
      <p className="nav-username">
        {user.current_user ? user.current_user.email : "..."}
      </p>
      <a
        className="nav-logout"
        rel="nofollow"
        data-method="delete"
        href="/users/sign_out"
      >
        Logout
      </a>
    </div>
  );
};

export default Index;
