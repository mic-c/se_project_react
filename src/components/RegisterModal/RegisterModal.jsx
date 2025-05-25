import React, { useState } from "react";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal__content">
          <button className="modal__close" onClick={onClose}>
            &times;
          </button>
          <h2 className="modal__title">Sign Up</h2>
          <form className="modal__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="modal__submit">
              Register
            </button>
          </form>
        </div>
      </div>
    )
  );
}

export default RegisterModal;
