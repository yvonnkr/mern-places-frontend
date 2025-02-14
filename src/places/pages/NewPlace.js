import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "./../../shared/components/Utils/validators";
import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import { useForm } from "./../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./../../shared/context/auth-context";
import ImageUpload from "./../../shared/components/UIElements/ImageUpload";
import "./PlaceForm.css";

const NewPlace = () => {
  //initial state for useForm() custom hook
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
    },
    image: {
      value: null,
      isValid: false
    }
  };

  const auth = useContext(AuthContext);
  const history = useHistory();
  //custom hooks
  const [formState, inputHandler] = useForm(initialInputs, false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const placeSubmitHandler = async event => {
    event.preventDefault();

    //http request
    try {
      //to be able to accept other content type eg image / not just json --formdata is js buildIn.
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("imageUrl", formState.inputs.image.value);
      // formData.append("creator", auth.userId);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places`,
        "POST",
        formData,
        {
          Authorization: `Bearer ${auth.token}`
        }
      );

      //then redirect
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
