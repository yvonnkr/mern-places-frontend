import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "./../../shared/components/FormElements/Input";
import Button from "./../../shared/components/FormElements/Button";
import { useForm } from "./../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/components/Utils/validators";
import "./PlaceForm.css";

//dummy data
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrappers in the world",
    imageUrl:
      "https://media.gettyimages.com/photos/new-york-skyline-on-a-sunny-day-with-clear-blue-sky-picture-id670885994?s=612x612",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: "u1"
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrappers in the world",
    imageUrl:
      "https://media.gettyimages.com/photos/new-york-skyline-on-a-sunny-day-with-clear-blue-sky-picture-id670885994?s=612x612",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: "u2"
  }
];

const UpdatePlace = props => {
  const [isLoading, setIsLoading] = useState(true);

  //get place id
  const placeId = useParams().placeId;

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

  //custom hook
  const [formState, inputHandler, setFormData] = useForm(initialInputs, false);

  //get place
  const identifiedPlace = DUMMY_PLACES.find(place => place.id === placeId);

  useEffect(() => {
    setFormData(
      {
        title: {
          value: identifiedPlace.title,
          isValid: true
        },
        description: {
          value: identifiedPlace.description,
          isValid: true
        }
      },
      true
    );

    setIsLoading(false);
  }, [setFormData, identifiedPlace, setIsLoading]);

  //form submit handler
  const placeUpdateSubmitHandler = e => {
    e.preventDefault();

    //send to server later
    console.log(formState.inputs);
  };

  //no place found render
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  //Loader
  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading ...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialIsValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description.(min. 5 characters)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialIsValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
