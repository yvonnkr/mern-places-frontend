import React, { useEffect, useState } from "react";
// import axios from "axios";

import UsersList from "./../components/UsersList";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "./../../shared/hooks/http-hook";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const sendHttpRequest = async () => {
      try {
        const data = await sendRequest("http://localhost:5000/api/users");
        setLoadedUsers(data.users);
      } catch (err) {
        console.log(err);
      }
    };
    sendHttpRequest();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;

// useEffect(() => {
//   const sendRequest = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios({
//         method: "GET",
//         url: "http://localhost:5000/api/users"
//       });
//       setLoadedUsers(response.data.users);
//     } catch (err) {
//       setError(
//         err.response.data.message || "Something went wrong,please try again."
//       );
//     }
//     setIsLoading(false);
//   };

//   sendRequest();
// }, []);

// const errorHandler = () => {
//   setError(null);
// };
