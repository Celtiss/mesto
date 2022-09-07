import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._popupImageName = this._popup.querySelector('.popup__image-heading');
        this._popupImageLink = this._popup.querySelector('.popup__image');
    }
    
    open (name, link) {      
        this._popupImageName.textContent = name;
        this._popupImageLink.alt = name;
        this._popupImageLink.src = link;

        super.open();
    }
}