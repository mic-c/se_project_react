import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function SignUpModal({
  isOpen,
  onClose,
  onSignUp,
  onLogInClick,
  signUpError,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ email, password, name });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="" // Use custom actions below
    >
      <label htmlFor="signup-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="signup-email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="signup-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="signup-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label htmlFor="signup-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="signup-name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      {signUpError && <span className="modal__error">{signUpError}</span>}
      <div className="modal__actions">
        <button
          type="submit"
          className="modal__submit-button"
          disabled={!email || !password || !name}
        >
          Sign Up
        </button>
        <span className="modal__alt-action" onClick={onLogInClick}>
          or Log In
        </span>
      </div>
    </ModalWithForm>
  );
}
