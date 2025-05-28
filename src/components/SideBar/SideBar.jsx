import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar({
  username = "Chukwuka Arimah",
  handleEditClick,
  handleSignOut,
}) {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
        <p className="sidebar__username">{username}</p>
        <button className="sidebar__edit-button" onClick={handleEditClick}>
          Edit Profile
        </button>
        <button className="sidebar__signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
