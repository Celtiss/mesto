import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        // вне конструктора this._popup = undefiend
        // this._popup = document.querySelector('.popup_type_image'); 
    }
    
    open (name, link) {
        this._popup = document.querySelector('.popup_type_image');
        this._popupImageName = this._popup.querySelector('.popup__image-heading');
        this._popupImageLink = this._popup.querySelector('.popup__image');
        
        this._popupImageName.textContent = name;
        this._popupImageLink.alt = name;
        this._popupImageLink.src = link;

        super.open();
    }
}