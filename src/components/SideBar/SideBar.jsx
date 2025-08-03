import "./SideBar.css";
import avatarDefault from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  const avatarSrc = currentUser?.avatar || avatarDefault;
  const userName = currentUser?.name || "Guest";

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img className="sidebar__avatar" src={avatarSrc} alt="User avatar" />
        <p className="sidebar__username">{userName}</p>
      </div>
    </div>
  );
}

export default SideBar;
