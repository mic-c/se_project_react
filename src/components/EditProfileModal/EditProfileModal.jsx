import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, currentUser, onEditProfile }) {
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
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="avatar"
        type="url"
        placeholder="Avatar URL"
        value={form.avatar}
        onChange={handleChange}
        required
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
