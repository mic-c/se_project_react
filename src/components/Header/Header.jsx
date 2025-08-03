import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentUser = useContext(CurrentUserContext);

  // Helper for placeholder avatar
  const getInitial = (name) => (name ? name[0].toUpperCase() : "U");
  const avatarSrc = currentUser?.avatar;
  const userName = currentUser?.name || "Guest";

  // Format date
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container-left">
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>
        <p className="header__date-And-Location">
          {currentDate}
          {weatherData && weatherData.city ? `, ${weatherData.city}` : ""}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add Clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-info">
            <p className="header__user-name">{userName}</p>
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt={userName}
                className="header__user-avatar"
              />
            ) : (
              <div className="header__user-avatar-placeholder">
                {getInitial(userName)}
              </div>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
