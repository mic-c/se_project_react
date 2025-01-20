import "./ModalWithForm.css";

function ModalWithForm({ children, name, buttonText, title, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className={`modal modal_type_${name}
        ${isOpen ? "modal_opened" : ""}`}
    >
      <div className="modal__content modal__content_form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          x
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" onClick={onClose} className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
