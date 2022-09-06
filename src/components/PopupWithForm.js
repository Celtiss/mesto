import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor ({popupSelector, handleSubmitForm}) {
        super(popupSelector);
        this._handleSubmitForm = handleSubmitForm;
        this._element = this._getElement();
        this._inputList = this._element.querySelectorAll('.popup__input');
    }

    _getElement () {
        const formElement = this._popup.querySelector('.popup__form');
        return formElement;
    }

    _getInputValues () {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    setEventListeners () {
        super.setEventListeners();
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