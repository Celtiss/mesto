import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
export {openPopup};

const selectors = {
    popup: '.popup',
    popupEdit: '.popup_type_edit-profile',
    popupCards: '.popup_type_add-card',
    addCardsButton: '.profile__add-button',
    editButton: '.profile__edit-button',
    popupClose: '.popup__close',
    popupOpened: 'popup_is-opened',

    popupForm: '.popup__form',
    popupInput: '.popup__input',
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

const buttonsClosed = document.querySelectorAll(selectors.popupClose);
const popups = Array.from(document.querySelectorAll(selectors.popup));

//Редактирование профиля
const popupEditProfile = document.querySelector(selectors.popupEdit);
const popupElement = document.querySelector(selectors.popupEdit);
const popupOpenButtonElement = document.querySelector(selectors.editButton);

//Добавление карточек
const popupCards = document.querySelector(selectors.popupCards);
const popupOpenButtonAddCards = document.querySelector(selectors.addCardsButton);
const cardsSection = document.querySelector(selectors.cardsSection);
const cardTemplate = document.querySelector(selectors.cardTemplate).content; // селектор template

//Form
const formCard = document.querySelector(selectors.popupFormAddCard);
const formCardsImg = formCard.querySelector(selectors.formCardsImg);
const formCardsTitle = formCard.querySelector(selectors.formCardsTitle);

//Профиль
const profile = document.querySelector(selectors.profileInfo);
const profileName = profile.querySelector(selectors.profileName);
const profileJob = profile.querySelector(selectors.profileDescription);

const formElement = popupElement.querySelector(selectors.popupForm);
const nameInput = formElement.querySelector(selectors.popupInputName);
const jobInput = formElement.querySelector(selectors.popupInputJob);


// Заполнение popup_profile
const fillPopupEdit = function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEditProfile);
};

//Открытие popup
const openPopup = function (popup) {
    //если это попапы с формами, то сбрасываем form и очищаем ошибки
    if(popup===popupEditProfile || popup===popupCards) {resetForms(popup);}
    popup.classList.add(selectors.popupOpened);
    document.addEventListener('keydown', checkEsc);
};

// функция очистки полей и ошибок
 function resetForms (popup) {
    const form = popup.querySelector(selectors.popupForm);
    if(popup===popupCards) { //Для формы с картами сбрасывем значения полей и отключаем кнопку
        form.reset();
        const buttonElement = form.querySelector(formSettings.buttonSubmit);
        buttonElement.classList.add(formSettings.buttonSubmitInactive);
        buttonElement.setAttribute('disabled', 'disabled');
    }
    //Очищаем ошибки
    const inputList = Array.from(form.querySelectorAll(selectors.popupInput));
    inputList.forEach((inputElement) => {
        const formClass = new FormValidator(formSettings,form);
        formClass._hideInputError(formSettings, form, inputElement);
    })
 }

// Проверка закрытия попап на ESC
function checkEsc(event) {
    if(event.key === 'Escape') {
        const popup =document.querySelector(`.${selectors.popupOpened}`);
        closePopup(popup);
    }
}

// Закрытие popup
buttonsClosed.forEach((button) => {
    const popup = button.closest(selectors.popup);
    button.addEventListener('click', () => closePopup(popup));
  });

const closePopup = function (popup) {
    popup.classList.remove(selectors.popupOpened);
    document.removeEventListener('keydown', checkEsc);
};

// Закрытие popup нажатием на overlay
function closePopupOverlay (event) {
    if(event.target !== event.currentTarget) {
        return;
    }
    closePopup(event.currentTarget);
}

// Обработчик формы изменения профиля
function handleProfileFormSubmit (event) {
    event.preventDefault();

    profileName.textContent =nameInput.value;;
    profileJob.textContent =jobInput.value;

    closePopup(popupEditProfile);
};

// Метод, который вставляет разметку карточки в html
function renderCard(cardElement) {
    cardsSection.prepend(cardElement);
}

//Обработчик отправки данных для создания карточек
function formSubmitAddCards (event) {
    event.preventDefault();
    // Получим значения полей title, url
    const elements = {
        name: formCardsTitle.value,
        link: formCardsImg.value
    }
    const card = new Card(elements.name, elements.link, cardTemplate) 
    const cardElement = card.generateCard(); // создание карточки
    renderCard(cardElement); // рендеринг карточки
    closePopup(popupCards);
}

//Инициализация 6 начальных карточек
 function createInitialCards() {
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

     initialCards.forEach(element => {
         const card = new Card(element.name, element.link, cardTemplate);
         const cardElement = card.generateCard();
         renderCard(cardElement);
     });
 }

 const formList = Array.from(document.querySelectorAll(formSettings.form));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        const form = new FormValidator(formSettings, formElement);
        form.enableValidation(); 
    })

createInitialCards();

formCard.addEventListener('submit', formSubmitAddCards);
popupOpenButtonElement.addEventListener('click', fillPopupEdit);
formElement.addEventListener('submit', handleProfileFormSubmit); 
popupOpenButtonAddCards.addEventListener('click', () => openPopup(popupCards));
popups.forEach((popupElement) => {
    popupElement.addEventListener('click', closePopupOverlay);
})
