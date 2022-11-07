class Card {
    constructor(data, templateSelector, user, handleCardClick, handleCardDelete, handleLikeClick) {
        this._data = data;
        this._title = data.name;
        this._url = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._user = user;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._handleLikeClick = handleLikeClick;
        this._element = this._getTemplate(); // элемент карточки
        this._likeButton = this._element.querySelector('.elements__like-icon');
        this._buttonDelete = this._element.querySelector('.elements__trash-button');
    }

    generateCard () {
        const template = this._createCard(); //создание карточки
        return template;
    }

    isLiked() {    

        const myLike = this._likes.some((item) => {
            return item._id == this._user._id;
        });
        return myLike;
    }

    toggleCardLike () {
        if(this.isLiked()){
            this._likeButton.classList.add('elements__like-icon_active');
        }
        if(!this.isLiked()) {
            this._likeButton.classList.remove('elements__like-icon_active');
        }
        
    }

    changeCardLike (newLikes) {
        this._likeCount.textContent = newLikes.length;
        this._likes = newLikes;
        this.toggleCardLike();
    }

    // Получить селектор template элемента карточки
    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.elements__item').cloneNode(true);
        return cardElement; 
    }

    //Проверка на то, принадлежит ли карточка пользователю
    _showDeleteButton () {
        if(this._ownerId == this._user._id) {
            this._buttonDelete.style.display = 'block';
        }
        if(this._ownerId != this._user._id) {
            this._buttonDelete.style.display = 'none';
        }
    }

    _createCard () {
        this.toggleCardLike();
        //если владелец карточки не я, то убираем кнопку удаления
        this._showDeleteButton();
        //Заполняем карточку данными
        this._element.querySelector('.elements__title').textContent = this._title;
        this._likeCount = this._element.querySelector('.elements__like-count');
        this._image = this._element.querySelector('.elements__image');
        this._likeCount.textContent = this._likes.length;
        this._image.src = this._url;
        this._image.alt = this._title;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners () {
        this._deleteButton = this._element.querySelector('.elements__trash-button');
        this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id));
        this._deleteButton.addEventListener('click', () => {
            this._handleCardDelete(this._id, this._element);
        });
        this._image.addEventListener('click', () => {
            this._handleCardClick(this._title, this._url);
        })
    }
}

export {Card};