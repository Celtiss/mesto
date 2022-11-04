import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { formSettings, selectors } from '../utils/constants.js';

//Редактирование профиля
const popupEditProfile = document.querySelector(selectors.popupEdit);
const popupOpenButtonEditProfile = document.querySelector(selectors.editButton);

//Карточки
const popupOpenButtonAddCards = document.querySelector(selectors.addCardsButton);
const cardsSection = document.querySelector(selectors.cardsSection);

//Form
const formCard = document.querySelector(selectors.popupFormAddCard);
const popupLoading = document.querySelector(selectors.popupLoading);

//Профиль
const profile = document.querySelector(selectors.profileInfo);
const profileName = profile.querySelector(selectors.profileName);
const profileJob = profile.querySelector(selectors.profileDescription);
const profileAvatar = profile.querySelector(selectors.profileAvatar);
const editAvatarButton = profile.querySelector(selectors.editAvatarButton);

const profileForm = popupEditProfile.querySelector(selectors.popupForm);
const nameInput = profileForm.querySelector(selectors.popupInputName);
const jobInput = profileForm.querySelector(selectors.popupInputJob);

let initialCards = [];
let user = {};

// Экземпляр класса API
const api = new Api ({
    url: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
        'content-type': 'application/json',
        authorization: '88b8691a-7ac8-4b43-af84-6572693f6425'
    }
});

// Экземплр класса изменения профиля
const userProfie = new UserInfo ({userName:profileName, userInfo:profileJob, userAvatar:profileAvatar});

// Получение данных пользователя с сервера
const userData = api.getUserInfo();
userData.then(data => {
    user = data; //сохранем данные пользователя, чтобы в будущем удалять и лайкать карточки
    userProfie.setUserInfo(data.name, data.about, data.avatar);
})
.catch(err => {
    console.log(err);
})

// Заполнение popup_profile
const fillPopupEdit = function () {
    const userData = userProfie.getUserInfo();
    nameInput.value = userData.name;
    jobInput.value = userData.info;
    popupFormProfile.open();
};


// Получение карточек с сервера
const cardsData = api.getInitialCards();
cardsData.then((data) => {
    data.forEach((item) => {
        initialCards.push(item);
    })
    cardList.renderItems();
})
.catch(err => {
    console.log(err);
})


// Инициализация карточек
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
    const cardElement = createCard(item, selectors.cardTemplate); 
    cardList.setElement(cardElement);
    }
}, cardsSection);

// Попап с увеличенной картинкой
const bigImagePopup = new PopupWithImage(selectors.popupImage);
bigImagePopup.setEventListeners();


// Подтверждение удаления карточки
const popupConfirm = new PopupWithConfirmation({
    popupSelector: selectors.popupConfirm,
    handleSubmit: (id, card) => {
        api.deleteCard(id).then(() => {
            card.remove();
        }).catch(err=>console.log("Error while deleting ", err));
    }
})

popupConfirm.setEventListeners();

// Управление лайками
function handleLikeClick (id) {
    //Удаление лайка
    if(this.isLiked()){
        const cardLikeDelete = api.deleteCardLike(id);
        cardLikeDelete.then((res) => {
            this.deleteCardLike(res.likes);
        })
        .catch(err=>console.log("Error while liking", err));
    }
    //Добавление лайка
    if(!this.isLiked()) {
        const cardLikes = api.setCardLikes(id, user);
        cardLikes.then((res) => {
            this.addCardLike(res.likes);
        })
        .catch(err=>console.log("Error while liking", err));
    }
}

//Создание экземпляра карточки
function createCard (data, cardTemplate) {
    const card = new Card(data, cardTemplate, user, bigImagePopup, popupConfirm, handleLikeClick); 
    const cardElement = card.generateCard();
    return cardElement;
}

//Показывать/Прятать точки при отправке формы на сервер
const showLoading = function () {
    popupLoading.style.display = 'inline';
}

const hideLoading = function () {
    popupLoading.style.display = 'none';
}

//Попап обновления профиля
const popupFormProfile = new PopupWithForm ({
    popupSelector: selectors.popupEdit,
    handleSubmitForm: (formData) => {
        const saveData = api.updateUserInfo(formData.popupName, formData.popupJob);
        saveData.then((data) => {
            userProfie.setUserInfo(data.name, data.about, data.avatar);
        })
        .catch(err => {
            console.log(err);
        })
        hideLoading();
    }, 
}, showLoading);

popupFormProfile.setEventListeners();

// Попап добавления карточки
const popupFormCard = new PopupWithForm ({
    popupSelector: selectors.popupCards,
    handleSubmitForm: (formData) => {
        const saveCard = api.addNewCard(formData);
        saveCard.then((data) => {
            const cardElement = createCard(data, selectors.cardTemplate);
            cardList.setElement(cardElement);
            popupFormCard.close();
        })
        .catch(err=>console.log("Error add card", err));
        hideLoading();
    }
}, showLoading);
popupFormCard.setEventListeners();

//Попап обновления аватара
const popupEditAvatar = new PopupWithForm ({
    popupSelector: selectors.popupAvatar,
    handleSubmitForm: (formData) => {
        const editAvatar = api.editAvatar(formData.popupAvatar);
        editAvatar.then((data) => {
            userProfie.setUserInfo(data.name, data.about, data.avatar);
        })
        .catch(err=>console.log("Error edit avatar", err));
        hideLoading();
        popupEditAvatar.close();
    }
}, showLoading)

popupEditAvatar.setEventListeners();

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

editAvatarButton.addEventListener('click', () => {
    formValidators.popupFormEditAvatar.resetValidation();
    popupEditAvatar.open();
})