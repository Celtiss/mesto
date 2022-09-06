import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        //console.log(this._popup); // элемент: <div class="popup popup_type_image"></div>
        // вне конструктора this._popup = undefined
    }
    
    open (name, link) {
        //console.log(this._popup); // undefined
        this._popup = document.querySelector('.popup_type_image');
        this._popupImageName = this._popup.querySelector('.popup__image-heading');
        this._popupImageLink = this._popup.querySelector('.popup__image');
        
        this._popupImageName.textContent = name;
        this._popupImageLink.alt = name;
        this._popupImageLink.src = link;

        super.open();
    }
}