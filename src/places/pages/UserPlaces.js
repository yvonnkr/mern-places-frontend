// import React, { useState, useEffect, useCallback } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
// import axios from "axios";

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
    title: "Emp. State Building",
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

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(p => p.creator === userId);
  return <PlaceList items={loadedPlaces} />;

  // ********//tried to fetc data form backend ********************************
  // const [places, setPlaces] = useState([]);

  // const userId = useParams().userId;
  // const url = `http://localhost:5000/api/places/user/${userId}`;

  // const getUserPlaces = useCallback(async () => {
  //   try {
  //     const response = await axios.get(url);
  //     return response.data.userPlaces;
  //   } catch (error) {
  //     throw error;
  //   }
  // }, [url]);

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const userPlaces = await getUserPlaces();

  //       setPlaces(userPlaces);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
  //   getData();
  // }, [getUserPlaces]);

  // return <PlaceList items={places} />;
};

export default UserPlaces;
