import React, { useState, useContext } from "react";
import axios from "axios";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/components/Utils/validators";
import { AuthContext } from "./../../shared/context/auth-context";
import Card from "./../../shared/components/UIElements/Card/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from "./../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "./../../shared/components/UIElements/LoadingSpinner";
import "./Auth.css";

const Auth = props => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const auth = useContext(AuthContext);

  //custom hook
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false }
    },
    false
  );

  const authSubmitHandler = async e => {
    e.preventDefault();

    //send http request
    setIsLoading(true);
    if (isLoginMode) {
      //signup http request
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:5000/api/users/login",
          data: {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }
        });

        console.log(response.data);

        //once done set isLoading(false) if no errors
        setIsLoading(false);

        //then login
        auth.login();
      } catch (err) {
        // console.log(error.response.data); //axios error
        setError(
          err.response.data.message || "Something went wrong, please try again!"
        );

        setIsLoading(false);
      }
    } else {
      //signup http request
      try {
        const response = await axios({
          method: "POST",
          url: "http://localhost:5000/api/users/signup",
          data: {
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }
        });

        console.log(response.data);

        //once done set isLoading(false) if no errors
        setIsLoading(false);

        //then login
        auth.login();
      } catch (err) {
        // console.log(error.response.data); //axios error
        setError(
          err.response.data.message || "Something went wrong, please try again!"
        );

        setIsLoading(false);
      }
    }
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        {isLoginMode ? <h2>Login Required</h2> : <h2>Sign Up</h2>}
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password at least 5 characters."
            onInput={inputHandler}
          />

          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </>
  );
};

export default Auth;
