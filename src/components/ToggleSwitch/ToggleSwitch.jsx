import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch({ checked, onChange }) {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        role="switch"
        aria-checked={checked}
      />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;
