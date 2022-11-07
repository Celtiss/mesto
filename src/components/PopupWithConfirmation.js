import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor({popupSelector, handleSubmit}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form_type_card-confirm');
    }

    // _getElement() {
    //     const form = 
    //     return form;
    // }

    setEventListeners(id, card) {
        super.setEventListeners();
        // this._form = this._getElement();
        console.log(id); // id выводится в единственном экземпляре
        this._form.addEventListener('submit', (evt) => { 
            evt.preventDefault();
            console.log(id);//выводится несколько id. Нынешнее, 
                                    //которое хотим удалить и все предыдущие, 
                                    //которые недавно удалили
            this._handleSubmit(id, card);
        })
    }

    
}