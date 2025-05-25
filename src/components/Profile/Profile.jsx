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
      <button onClick={handleAddClick} className="profile__add-button">
        Add Item
      </button>
      <button onClick={handleSignOut} className="profile__signout-button">
        Sign Out
      </button>
      {/* Render clothing items or other profile content */}
    </div>
  );
}

export default Profile;
