import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor({popupSelector, handleSubmit}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
    }

    _getElement() {
        const form = this._popup.querySelector('.popup__form_type_card-confirm');
        return form;
    }

    setEventListeners(id, card) {
        super.setEventListeners();
        this._form = this._getElement();
        this._form.addEventListener('submit', (evt) => {
            this._handleSubmit(id, card);
            this.close();
        })
    }
}