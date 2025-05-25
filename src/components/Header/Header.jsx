import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo">WTWR</div>
      {isLoggedIn ? (
        <div className="header__user-info">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="header__avatar"
            />
          ) : (
            <div className="header__avatar-placeholder">
              {currentUser.name[0].toUpperCase()}
            </div>
          )}
          <span className="header__username">{currentUser.name}</span>
        </div>
      ) : (
        <button
          className="header__login-button"
          onClick={() => handleAddClick("login")}
        >
          Log In
        </button>
      )}
    </header>
  );
}

export default Header;
