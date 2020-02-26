// import React, { useCallback, useReducer } from "react";
import React from "react";

import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import { useForm } from "./../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "./../../shared/components/Utils/validators";
import "./PlaceForm.css";

const NewPlace = () => {
  //initial state
  const initialInputs = {
    title: {
      value: "",
      isValid: false
    },
    description: {
      value: "",
      isValid: false
    },
    address: {
      value: "",
      isValid: false
    }
  };

  //custom hook
  const [formState, inputHandler] = useForm(initialInputs, false);

  const placeSubmitHandler = event => {
    event.preventDefault();
    //later send data to backend/server
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
