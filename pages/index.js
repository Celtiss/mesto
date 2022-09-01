import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';

const selectors = {
    popup: '.popup',
    popupEdit: '.popup_type_edit-profile',
    popupCards: '.popup_type_add-card',
    popupImage: '.popup_type_image',
    popupImageLink: '.popup__image',
    popupImageName: '.popup__image-heading',

    addCardsButton: '.profile__add-button',
    editButton: '.profile__edit-button',
    popupClose: 'popup__close',
    popupOpened: 'popup_is-opened',

    popupForm: '.popup__form',
    popupFormEditProfile: '.popup__form_type_edit-profile',
    popupInputName: '.popup__input_value_name',
    popupInputJob: '.popup__input_value_job',
    profileInfo: '.profile__info',
    profileName: '.profile__name',
    profileDescription: '.profile__description',

    popupFormAddCard: '.popup__form_type_add-card',
    formCardsTitle: '.popup__input_value_name',
    formCardsImg: '.popup__input_value_img',

    cardsSection:'.elements__container',
    cardTemplate: '.card-template'
}

const formSettings = {
    form: '.popup__form',
    input: '.popup__input',
    buttonSubmit: '.popup__save',
    buttonSubmitInactive: 'popup__save_inactive',
    inputInvalid: 'popup__input_invalid',
    inputErrorActive: 'popup__input-error_active'
}

//Редактирование профиля
const popupEditProfile = document.querySelector(selectors.popupEdit);
const popupOpenButtonElement = document.querySelector(selectors.editButton);

//Карточки
const popupCards = document.querySelector(selectors.popupCards);
const popupOpenButtonAddCards = document.querySelector(selectors.addCardsButton);
const cardsSection = document.querySelector(selectors.cardsSection);
const cardTemplate = document.querySelector(selectors.cardTemplate);//.content; // селектор template

//Попап с картинкой
const popupImage = document.querySelector(selectors.popupImage);

//Form
const formCard = document.querySelector(selectors.popupFormAddCard);
const formCardsImg = formCard.querySelector(selectors.formCardsImg);
const formCardsTitle = formCard.querySelector(selectors.formCardsTitle);

//Профиль
const profile = document.querySelector(selectors.profileInfo);
const profileName = profile.querySelector(selectors.profileName);
const profileJob = profile.querySelector(selectors.profileDescription);

const profileForm = popupEditProfile.querySelector(selectors.popupForm);
const nameInput = profileForm.querySelector(selectors.popupInputName);
const jobInput = profileForm.querySelector(selectors.popupInputJob);


// Заполнение popup_profile
const fillPopupEdit = function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    createPopupExemplar(popupEditProfile).open();
};

//Создание экземпляра класса popup
const createPopupExemplar = function (popupItem) {
    const popup = new Popup (popupItem);
    popup.setEventListeners();
    return popup;
};

const createPopupImageExemplar = function () {
    const bigImagePopup = new PopupWithImage(popupImage);
    bigImagePopup.setEventListeners();
    return bigImagePopup;
}

// Обработчик формы изменения профиля
function handleProfileFormSubmit (event) {
    event.preventDefault();

    profileName.textContent =nameInput.value;;
    profileJob.textContent =jobInput.value;

    createPopupExemplar(popupEditProfile).close();
};

//Создание карточки
function createCard (elements, cardTemplate) {
    const card = new Card(elements.name, elements.link, cardTemplate, createPopupImageExemplar().open); 
    const cardElement = card.generateCard();
    return cardElement;
}

//Обработчик отправки данных для создания карточек
function handleFormSubmitCards (event) {
    event.preventDefault();
    // Получим значения полей title, url
    const elements = [{
        name: formCardsTitle.value,
        link: formCardsImg.value
    }];
    const renderCard = new Section ({
        items: elements, 
        renderer: (item) => {
            const cardElement = createCard(item, selectors.cardTemplate); 
            renderCard.setElement(cardElement);
        }
    }, cardsSection);
    renderCard.renderItems();
    createPopupExemplar(popupCards).close();
}

//Инициализация 6 начальных карточек

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    ];

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
    const cardElement = createCard(item, selectors.cardTemplate); 
    cardList.setElement(cardElement);
    }
}, cardsSection);

cardList.renderItems();

const formValidators = {} //Объект для хранения валидаторов

 //Универсальная функция для обработки валидатора форм
 const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.form));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
    });
 };
 
enableValidation(formSettings);

formCard.addEventListener('submit', handleFormSubmitCards);
popupOpenButtonElement.addEventListener('click', () => {
    formValidators.popupFormEditProfile.resetValidation();
    fillPopupEdit();
});
profileForm.addEventListener('submit', handleProfileFormSubmit); 
popupOpenButtonAddCards.addEventListener('click', () => {
    formCard.reset();
    formValidators.popupFormAddCard.resetValidation();
    createPopupExemplar(popupCards).open();
});