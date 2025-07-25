import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, onDeleteClick }) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} className="modal__close" type="button">
          x
        </button>
        <img
          src={card.imageUrl}
          alt="clothing image"
          className="modal__image"
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            onClick={onDeleteClick}
            className="modal__delete-item-btn"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
