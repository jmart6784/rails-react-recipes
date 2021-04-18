import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const User = (props) => {
  const [shUser, setShUser] = useState("");

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

  return (
    <div>
      <h1>
        Email: {shUser.email}, ID: {shUser.id}
      </h1>
    </div>
  );
};

export default User;
