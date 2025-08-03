import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  // Hide like button for unauthorized users
  const isAuthorized = !!currentUser?._id;

  const itemLikeButtonClassName = `item-card__like-btn${
    isLiked ? " item-card__like-btn_active" : ""
  }`;

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
      <div className="item-card__info">
        <h3 className="item-card__name">{item.name}</h3>
        {isAuthorized && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            type="button"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            ♥
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
