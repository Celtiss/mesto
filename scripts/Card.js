import {openPopup} from './index.js';
export {Card};
class Card {
    constructor(title, url, templateSelector) {
        this._title = title;
        this._url = url;
        this._templateSelector = templateSelector;
    }

    generateCard () {
        const template = this._createCard(); //создание карточки
        return template;
    }

    // Получить селектор template элемента карточки
    _getTemplate() {
        const cardElement = document.querySelector('.card-template').content.querySelector('.elements__item').cloneNode(true);
        return cardElement;  
    }

    _createCard () {
        this._element = this._getTemplate(); // элемент карточки

        //Заполняем карточку данными
        this._element.querySelector('.elements__title').textContent = this._title;
        this._image = this._element.querySelector('.elements__image');
        this._image.src = this._url;
        this._image.alt = this._title;

        this._setEventListeners();
        return this._element;
    }

    _setEventListeners () {
        this._likeButton = this._element.querySelector('.elements__like-icon');
        this._deleteButton = this._element.querySelector('.elements__trash-button');
        this._likeButton.addEventListener('click', (event) => {event.target.classList.toggle('elements__like-icon_active')});
        this._deleteButton.addEventListener('click', () => {this._element.remove();});
        this._image.addEventListener('click', () => {
            this._popup = document.querySelector('.popup_type_image');
            this._popup.querySelector('.popup__image').src= this._url;
            this._popup.querySelector('.popup__image').alt= this._title;
            this._popup.querySelector('.popup__image-heading').textContent= this._title;
            openPopup(this._popup);
        })
    }

}