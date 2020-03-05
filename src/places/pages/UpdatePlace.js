import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/components/Utils/validators";
import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import { useForm } from "./../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card/Card";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./../../shared/context/auth-context";
import "./PlaceForm.css";

const UpdatePlace = props => {
  //initial state
  const initialInputs = {
    title: {
      value: "",
      isValid: false
    },
    description: {
      value: "",
      isValid: false
    }
  };

  const [formState, inputHandler, setFormData] = useForm(initialInputs, false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();
  const { userId } = useContext(AuthContext);

  //fetch place and setform with place data
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );

        setLoadedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true
            },
            description: {
              value: responseData.place.description,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  //form submit handler
  const placeUpdateSubmitHandler = async e => {
    e.preventDefault();

    try {
      //http update request
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }
      );

      //redirect
      history.push(`/${userId}/places`);
      // history.goBack();
    } catch (err) {}
  };

  //Loader if is loading
  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  //no place found
  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialIsValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description.(min. 5 characters)"
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialIsValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
