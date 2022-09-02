import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor ({popupSelector, handleSubmitForm}) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
    }

    _getElement () {
        const formElement = this._popupSelector.querySelector('.popup__form');
        return formElement;
    }

    _getInputValues () {
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    setEventListeners () {
        this._element = this._getElement();
        this._element.addEventListener('submit', (event) => {
            event.preventDefault();
            this._getInputValues();
            this._handleSubmitForm(this._formValues);
            this.close();
        })
    }

    close () {
        super.close();
        this._element.reset();
    }
}