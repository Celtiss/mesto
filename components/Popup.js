export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open () {
        this._popupSelector.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this._popupSelector.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners () {
        const popups = Array.from(document.querySelectorAll('.popup'));
        popups.forEach((popup) => {
            popup.addEventListener('mousedown', (event) => {
                if (event.target.classList.contains('popup_is-opened')) {
                    this.close(popup);
                }
                if (event.target.classList.contains('popup__close')) { 
                    this.close(popup);
                } 
            })
        })
    }

    _handleEscClose (event) {
        if(event.key === 'Escape') {
            this.close();
        }
    }
}