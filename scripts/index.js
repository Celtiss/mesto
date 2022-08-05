const selectors = {
    popup: '.popup',
    popupEdit: '.popup_type_edit-profile',
    popupCards: '.popup_type_add-card',
    popupImage: '.popup_type_image',
    addCardsButton: '.profile__add-button',
    editButton: '.profile__edit-button',
    popupClose: '.popup__close',
    popupOpened: 'popup_is-opened',

    popupForm: '.popup__form', //ФОРМА
    popupInput: '.popup__input', //INPUT
    inputInvalid: 'popup__input_invalid',
    buttonSubmit: '.popup__save',
    buttonSubmitInactive: 'popup__save_inactive',
    inputErrorActive: 'popup__input-error_active',
    popupInputName: '.popup__input_value_name',
    popupInputJob: '.popup__input_value_job',
    profileInfo: '.profile__info',
    profileName: '.profile__name',
    profileDescription: '.profile__description',

    popupFormAddCard: '.popup__form_type_add-card',
    formCardsTitle: '.popup__input_value_name',
    formCardsImg: '.popup__input_value_img',

    cardsSection:'.elements__container',
    card: '.elements__item',
    cardTemplate: '.card-template',
    cardTitle: '.elements__title',
    cardImg: '.elements__image',

    deleteButtonCard: '.elements__trash-button',
    likeButtonCard: '.elements__like-icon',
    likeButtonActiveCard: 'elements__like-icon_active',

    popupMainImage: '.popup__image',
    popupImageHeading: '.popup__image-heading'
}

const closeButtons = document.querySelectorAll(selectors.popupClose);
const popups = Array.from(document.querySelectorAll(selectors.popup));

//Редактирование профиля
const popupEditProfile = document.querySelector(selectors.popupEdit);
const popupElement = document.querySelector(selectors.popupEdit);
const popupOpenButtonElement = document.querySelector(selectors.editButton);

//Добавление карточек
const popupCards = document.querySelector(selectors.popupCards);
const popupOpenButtonAddCards = document.querySelector(selectors.addCardsButton);
const cardsSection = document.querySelector(selectors.cardsSection);
const cardTemplate = document.querySelector(selectors.cardTemplate).content;
const card = cardTemplate.querySelector(selectors.card);
//Form
const formCard = document.querySelector(selectors.popupFormAddCard);
const formCardsImg = formCard.querySelector(selectors.formCardsImg);
const formCardsTitle = formCard.querySelector(selectors.formCardsTitle);

//Открытие popup с картинкой
const popupImage = document.querySelector(selectors.popupImage);
const popupMainImage = popupImage.querySelector(selectors.popupMainImage);
const popupImageHeading = popupImage.querySelector(selectors.popupImageHeading);

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
    popup.classList.add(selectors.popupOpened);
    document.addEventListener('keydown', checkEsc);
};

// Проверка закрытия попап на ESC
function checkEsc(event) {
    if(event.key === 'Escape') {
        const popup =document.querySelector(`.${selectors.popupOpened}`);
        closePopup(popup);
    }
}

// Закрытие popup
closeButtons.forEach((button) => {
    const popup = button.closest(selectors.popup);
    button.addEventListener('click', () => closePopup(popup));
  });

const closePopup = function (popup) {
    popup.classList.remove(selectors.popupOpened);
    document.removeEventListener('keydown', checkEsc);
    if(popup===popupEditProfile || popup===popupCards) { //если это попапы с формами, то сбрасываем form и очищаем ошибки
        const form = popup.querySelector(selectors.popupForm);
        form.reset();
        const inputList = Array.from(form.querySelectorAll(selectors.popupInput));
        inputList.forEach((inputElement) => {
            hideInputError(form, inputElement);
        })
    }
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

//Создание карточки
function createCard(elements) {
    const template = card.cloneNode(true);
    const cardTitle = template.querySelector(selectors.cardTitle);
    const cardImg = template.querySelector(selectors.cardImg);
    const likeButtonCard = template.querySelector(selectors.likeButtonCard);
    const deleteButtonCard = template.querySelector(selectors.deleteButtonCard);

    cardTitle.textContent = elements.name;
    cardImg.src = elements.link;
    cardImg.alt = elements.name;

    likeButtonCard.addEventListener('click', (event) =>{event.target.classList.toggle(selectors.likeButtonActiveCard)});
    deleteButtonCard.addEventListener('click', () => {template.remove(); });
    cardImg.addEventListener('click', () => {
        popupMainImage.src = elements.link;
        popupMainImage.alt = elements.name;
        popupImageHeading.textContent = elements.name;
        openPopup(popupImage);
    });

    return template;
}


//Рендеринг карточки
function renderCard(elements) {
    const template = createCard(elements);
    cardsSection.prepend(template);
}

//Обработчик формы карточек
function formSubmitAddCards () {
    formCard.addEventListener('submit', function(event) {
        event.preventDefault();

        const elements = {
            name: formCardsTitle.value,
            link: formCardsImg.value
        }
        renderCard(elements);
        closePopup(popupCards);
        event.target.reset();
    })
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

     initialCards.forEach(element => renderCard(element));
 }

 


formSubmitAddCards();
createInitialCards();

popupOpenButtonElement.addEventListener('click', fillPopupEdit);
formElement.addEventListener('submit', handleProfileFormSubmit); 
popupOpenButtonAddCards.addEventListener('click', () => openPopup(popupCards));
popups.forEach((popupElement) => {
    popupElement.addEventListener('click', closePopupOverlay);
})
