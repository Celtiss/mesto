import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        // this._popupSelector = popupSelector;
    }

    open (name, link) {
        this._popupSelector = document.querySelector('.popup_type_image');
        this._popupImageName = this._popupSelector.querySelector('.popup__image-heading');
        this._popupImageLink = this._popupSelector.querySelector('.popup__image');
        this._popupImageName.textContent = name;
        this._popupImageLink.alt = name;
        this._popupImageLink.src = link;
        super.open();
        // super._handleEscClose();
    }
}