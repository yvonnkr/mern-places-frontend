import React from "react";
import UsersList from "./../components/UsersList";

const Users = () => {
  //dummy users --will later fetch from backend
  const USERS = [
    {
      id: "u1",
      name: "user 1",
      image:
        "https://www.planetware.com/photos-large/MEX/mexico-top-places-cancun-mayan-riviera.jpg",
      places: 3
    },
    {
      id: "u2",
      name: "user 2",
      image:
        "https://www.planetware.com/photos-large/MEX/mexico-top-places-cancun-mayan-riviera.jpg",
      places: 1
    }
  ];

  return (
    <div>
      <UsersList items={USERS} />
    </div>
  );
};

export default Users;
