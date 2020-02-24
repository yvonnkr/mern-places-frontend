import React from "react";
import "./UserItem.css";

const UserItem = props => {
  const { id, name, image, placesCount } = props;
  return (
    <li className="user-item">
      <div className="user-item__content">
        <div className="user-item__image">
          <img src={image} alt={name} />
        </div>
        <div className="user-item__info">
          <h2>{name}</h2>
          <h3>
            {placesCount} {placesCount === 1 ? "Place" : "Places"}
          </h3>
        </div>
      </div>
    </li>
  );
};

export default UserItem;
