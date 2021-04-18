import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect((props) => {
    const url = "/api/v1/users/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setUsers(response))
      .catch(() => props.history.push("/"));
  }, []);

  const allUsers = users.map((user, index) => (
    <div key={index}>
      <div>
        <Link to={`/user/${user.id}`}>{user.email}</Link>
      </div>
    </div>
  ));

  const noUsers = (
    <div>
      <h4>No Users yet...</h4>
    </div>
  );

  return (
    <div>
      <h1>User Index</h1>
      <Link to="/recipes">Recipes Index</Link>
      <div>{users.length > 0 ? allUsers : noUsers}</div>
    </div>
  );
};

export default Users;
