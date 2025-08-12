import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [form, setForm] = useState({ name: "", avatar: "" });

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile(form);
  }

  return (
    <ModalWithForm
      title="Edit Profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Save"
    >
      <label htmlFor="profile-name" className="modal__label">
        Name
        <input
          id="profile-name"
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="profile-avatar" className="modal__label">
        Avatar URL
        <input
          id="profile-avatar"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={form.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
