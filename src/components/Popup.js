export class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector); //элемент данного попапа
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open () {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners () {
        this._popup.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup_is-opened')) {
                this.close();
            }
            if (event.target.classList.contains('popup__close')) { 
                this.close();
            } 
        })
    }

    _handleEscClose (event) {
        if(event.key === 'Escape') {
            this.close();
        }
    }
}