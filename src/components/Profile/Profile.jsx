import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  handleEditClick,
  handleSignOut,
}) {
  return (
    <div className="profile">
      <SideBar handleEditClick={handleEditClick} handleSignOut={handleSignOut} />
      <button onClick={handleAddClick} className="profile__add-button">
        Add Item
      </button>
      <ClothesSection clothingItems={clothingItems} onCardClick={onCardClick} />
    </div>
  );
}

export default Profile;