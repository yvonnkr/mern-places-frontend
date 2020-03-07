import React from "react";
import { Link } from "react-router-dom";

import Avatar from "./../../shared/components/UIElements/Avatar/Avatar";
import Card from "./../../shared/components/UIElements/Card/Card";
import "./UserItem.css";

const UserItem = props => {
  const { id, name, image, placesCount } = props;
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar
              className={"img"}
              image={`${process.env.REACT_APP_ASSET_URL}/${image}`}
              alt={name}
            />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placesCount} {placesCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
