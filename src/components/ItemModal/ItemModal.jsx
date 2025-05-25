import "./ItemModal.css";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  if (!isOpen || !card) return null;

  const isOwn = card?.owner === currentUser?._id;
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;

  return (
    <div className="modal">
      <div className="modal__content">
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <h2 className="modal__title">{card.name}</h2>
        <button
          className={itemDeleteButtonClassName}
          onClick={onDeleteClick}
          aria-label="Delete item"
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
