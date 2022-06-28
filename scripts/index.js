const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector ('.popup__close');

let profile = document.querySelector('.profile__info');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__description');

let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');

// Открытие popup
const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

// Закрытие popup
const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
};

// Закрытие popup при клике вне контейнера
const closePopupByClickOnOverlay = function(event) {
    if(event.target !== event.currentTarget) {
        return;
    }

    closePopup();
};

// Обработчик формы
function formSubmitHandler (evt) {
    evt.preventDefault();

    let name = nameInput.value;
    let job = jobInput.value;

    profileName.textContent =`${name}`;
    profileJob.textContent =`${job}`;

    closePopup();
};


popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);
formElement.addEventListener('submit', formSubmitHandler); 