import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ weatherData, handleAddClick, onSignInClick, onSignUpClick }) {
  const currentUser = useContext(CurrentUserContext);

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
        {!currentUser ? (
          <div className="header__auth-buttons">
            <button onClick={onSignUpClick} className="header__auth-button">
              Sign Up
            </button>
            <button onClick={onSignInClick} className="header__auth-button">
              Log In
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleAddClick}
              className="header__add-clothes-button"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-info">
                <p className="header__user-name">{currentUser.name}</p>
                {currentUser.avatar && (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__user-avatar"
                  />
                )}
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
