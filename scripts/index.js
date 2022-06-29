const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector ('.popup__close');

let profile = document.querySelector('.profile__info');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__description');

let formElement = popupElement.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_job');

// Открытие popup
const openPopup = function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupElement.classList.add('popup_is-opened');
};

// Закрытие popup
const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
};

// Обработчик формы
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent =nameInput.value;;
    profileJob.textContent =jobInput.value;

    closePopup();
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 