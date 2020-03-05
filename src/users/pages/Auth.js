import React, { useState, useContext } from "react";

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
import { useHttpClient } from "../../shared/hooks/http-hook";

const Auth = props => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient(); //from custom hook
  const auth = useContext(AuthContext);

  //from custom hook
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
    if (isLoginMode) {
      try {
        //login
        const response = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }
        );

        //then login
        auth.login(response.user.id);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        //signup
        const response = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          {
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }
        );

        //then login
        auth.login(response.user.id);
      } catch (err) {
        console.log(err.message);
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

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password at least 6 characters."
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
