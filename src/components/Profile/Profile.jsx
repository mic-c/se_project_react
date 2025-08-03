import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  handleEditProfileClick,
  handleSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
        <button
          className="profile__edit-btn"
          type="button"
          onClick={handleEditProfileClick}
        >
          Edit Profile
        </button>
        <button
          className="profile__signout-btn"
          type="button"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;
