import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onSignInClick,
  registerError,
}) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(form);
  }

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign Up"
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
        <input
          id="register-email"
          name="email"
          type="email"
          placeholder="Email"
          className="modal__input"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          id="register-password"
          name="password"
          type="password"
          placeholder="Password"
          className="modal__input"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name *
        <input
          id="register-name"
          name="name"
          type="text"
          placeholder="Name"
          className="modal__input"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL *
        <input
          id="register-avatar"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          className="modal__input"
          value={form.avatar}
          onChange={handleChange}
          required
        />
      </label>
      {registerError && <p className="modal__error">{registerError}</p>}
      <div className="modal__actions">
        <button type="submit" className="modal__submit-button">
          Sign Up
        </button>
        <span className="modal__alt-action" onClick={onSignInClick}>
          or Log In
        </span>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
