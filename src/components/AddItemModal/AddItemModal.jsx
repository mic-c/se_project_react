import "./AddItemModal.css";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [weather, setWeather] = useState("");

  const handleNamechange = (evt) => {
    setName(e.target.value);
  };

  const handleimagechange = (evt) => {
    setImage(e.target.value);
  };

  const handleWeatherChange = (evt) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItemModalSubmit({ name, image, weather });
    setName("");
    setImage("");
    setWeather("");
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          required
          minLength="1"
          maxLength="30"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
