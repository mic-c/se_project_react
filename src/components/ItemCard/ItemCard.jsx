import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  const isLiked = item.likes.some(
    (id) => String(id) === String(currentUser?._id)
  );
  const isAuthorized = !!currentUser?._id;

  const itemLikeButtonClassName = `card__like-button${
    isLiked ? " card__like-button_active" : ""
  }`;

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
      <div className="card__name">{item.name}</div>
      {isAuthorized && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <svg
            className="card__like-icon"
            viewBox="0 0 24 24"
            fill={isLiked ? "#ff3049" : "#fff"}
            stroke="#222"
            strokeWidth="2"
            width="24"
            height="24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      )}
    </li>
  );
}

export default ItemCard;
