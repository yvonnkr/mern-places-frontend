import React, { useEffect, useState } from "react";

import UsersList from "./../components/UsersList";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "./../../shared/hooks/http-hook";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    try {
      const sendHttpRequest = async () => {
        const data = await sendRequest("http://localhost:5000/api/users");
        setLoadedUsers(data.users);
      };
      sendHttpRequest();
    } catch (err) {
      console.log(err.message);
    }
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
