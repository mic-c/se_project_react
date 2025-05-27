import React, { useContext } from "react";
import "./card.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the current user has liked the card
  const isLiked = card.likes.some((userId) => userId === currentUser?._id);

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleLikeClick = () => {
    onCardLike({ id: card._id, isLiked });
  };

  return (
    <div className="card">
      <img
        src={card.imageUrl}
        alt={card.name}
        className="card__image"
        onClick={() => onCardClick(card)}
      />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
          aria-label="Like card"
        >
          Like
        </button>
        <span className="card__like-count">{card.likes.length}</span>
      </div>
    </div>
  );
}

export default Card;
