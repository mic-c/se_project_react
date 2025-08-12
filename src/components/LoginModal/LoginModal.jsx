import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, onSignUpClick }) {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(form);
  }

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          id="login-email"
          name="email"
          type="email"
          placeholder="Email"
          className="modal__input"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Password"
          className="modal__input"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>
      <div className="modal__actions">
        <button type="submit" className="modal__submit-button">
          Log In
        </button>
        <span className="modal__alt-action" onClick={onSignUpClick}>
          or Sign Up
        </span>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
