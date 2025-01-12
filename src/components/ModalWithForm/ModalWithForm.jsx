import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpened,
  handleCloseClick,
}) {
  return (
    <div className={`modal ${isOpened}`}>
      <div className="modal__content modal__content_form">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close" />
        <form className="modal__form">
          {children}
          <button
            type="submit"
            onClick={handleCloseClick}
            className="modal__submit"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
