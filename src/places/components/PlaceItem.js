import React, { useState, useContext } from "react";

import { AuthContext } from "./../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "./../../shared/components/UIElements/Modal/Modal";
import Map from "./../../shared/components/UIElements/Map/Map";
import "./PlaceItem.css";

const PlaceItem = props => {
  const {
    id,
    image,
    title,
    description,
    address,
    // creatorId,
    coordinates
  } = props;

  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => setShowConfirmDeleteModal(true);
  const cancelDeleteHandler = () => setShowConfirmDeleteModal(false);

  const confirmDeleteHandler = e => {
    console.log("Deleted Place ....");
    setShowConfirmDeleteModal(false);
  };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmDeleteModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        headerClass="modal__header-danger"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter!
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && <Button to={`/places/${id}`}> EDIT</Button>}
            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
