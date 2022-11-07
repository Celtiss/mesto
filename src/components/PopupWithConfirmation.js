import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor({popupSelector, handleSubmit}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form_type_card-confirm');
    }

    getCardData(cardId, cardElement) {
        this._cardId = cardId;
        this._cardElement = cardElement;
    }

    _handleDelete() {
        this._handleSubmit(this._cardId, this._cardElement);
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleDelete();
        })
    }

    
}