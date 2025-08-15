import "./ModalWithForm.css";

function ModalWithForm({
  children,
  name,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button onClick={onClose} type="button" className="modal__close">
            ×
          </button>
        </div>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          {buttonText && (
            <button type="submit" className="modal__submit-button">
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
