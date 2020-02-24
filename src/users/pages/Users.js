import React from "react";
import UsersList from "./../components/UsersList";

const Users = () => {
  //dummy users --will later fetch from backend
  const USERS = [
    {
      id: "u1",
      name: "John Smith",
      image:
        "https://www.planetware.com/photos-large/MEX/mexico-top-places-cancun-mayan-riviera.jpg",
      places: 3
    },
    {
      id: "u2",
      name: "John Doe",
      image:
        "https://www.planetware.com/photos-large/MEX/mexico-top-places-cancun-mayan-riviera.jpg",
      places: 1
    }
  ];

  return (
    <div>
      <h1>Users page</h1>
      <UsersList items={USERS} />
    </div>
  );
};

export default Users;
