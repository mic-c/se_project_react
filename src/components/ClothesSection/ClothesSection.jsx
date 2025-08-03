import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({ clothingItems, onCardClick, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items to only those owned by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="paragraphButton-section">
        <p className="clothing__section-items">Your Items</p>
        <button
          className="clothing__add-btn"
          onClick={handleAddClick}
          type="button"
        >
          Add New +
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.length === 0 ? (
          <li>No items found.</li>
        ) : (
          userItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
