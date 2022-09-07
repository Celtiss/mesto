import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { formSettings, initialCards, selectors } from '../utils/constants.js';

//Редактирование профиля
const popupEditProfile = document.querySelector(selectors.popupEdit);
const popupOpenButtonEditProfile = document.querySelector(selectors.editButton);

//Карточки
const popupOpenButtonAddCards = document.querySelector(selectors.addCardsButton);
const cardsSection = document.querySelector(selectors.cardsSection);

//Form
const formCard = document.querySelector(selectors.popupFormAddCard);

//Профиль
const profile = document.querySelector(selectors.profileInfo);
const profileName = profile.querySelector(selectors.profileName);
const profileJob = profile.querySelector(selectors.profileDescription);

const profileForm = popupEditProfile.querySelector(selectors.popupForm);
const nameInput = profileForm.querySelector(selectors.popupInputName);
const jobInput = profileForm.querySelector(selectors.popupInputJob);


// Заполнение popup_profile
const fillPopupEdit = function () {
    const userData = userProfie.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.info;
    popupFormProfile.open();
};

const bigImagePopup = new PopupWithImage(selectors.popupImage);
bigImagePopup.setEventListeners();

const userProfie = new UserInfo ({userName:profileName, userInfo:profileJob});

const popupFormProfile = new PopupWithForm ({
    popupSelector: selectors.popupEdit,
    handleSubmitForm: (formData) => {
        userProfie.setUserInfo(formData);
        popupFormProfile.close();
    }
});

popupFormProfile.setEventListeners();

//Создание экземпляра карточки
function createCard (title, img, cardTemplate) {
    const card = new Card(title, img, cardTemplate, bigImagePopup); 
    const cardElement = card.generateCard();
    return cardElement;
}

const popupFormCard = new PopupWithForm ({
    popupSelector: selectors.popupCards,
    handleSubmitForm: (formData) => {
        const cardElement = createCard(formData.popupName,formData.popupImg, selectors.cardTemplate);
        cardList.setElement(cardElement);
        popupFormCard.clode();
    }
});
popupFormCard.setEventListeners();

//Инициализация 6 начальных карточек
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
    const cardElement = createCard(item.name, item.link, selectors.cardTemplate); 
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

popupOpenButtonEditProfile.addEventListener('click', () => {
    formValidators.popupFormEditProfile.resetValidation();
    fillPopupEdit();
});

popupOpenButtonAddCards.addEventListener('click', () => {
    formCard.reset();
    formValidators.popupFormAddCard.resetValidation();
    popupFormCard.open();
});