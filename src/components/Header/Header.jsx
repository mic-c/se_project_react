import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  checked,
  onToggle,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = currentUser && currentUser.isOwner;

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__link">
          Home
        </Link>
        <Link to="/profile" className="header__link">
          Profile
        </Link>
      </nav>
      <div className="header__controls">
        <ToggleSwitch checked={checked} onChange={onToggle} />
      </div>
    </header>
  );
}

export default Header;
