const selectors = {
    popup: '.popup',
    popupEdit: '.popup_type_edit-profile',
    popupCards: '.popup_type_add-card',
    popupImage: '.popup_type_image',
    addCardsButton: '.profile__add-button',
    editButton: '.profile__edit-button',
    popupClose: '.popup__close',
    popupOpened: 'popup_is-opened',

    popupForm: '.popup__form',
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

const popups = document.querySelectorAll(selectors.popup);

//Редактирование профиля
const popupElement = document.querySelector(selectors.popupEdit);
const popupOpenButtonElement = document.querySelector(selectors.editButton);
const popupCloseButtonElement = popupElement.querySelector (selectors.popupClose);

//Добавление карточек
const popupAddCard = document.querySelector(selectors.popupCards);
const popupOpenButtonAddCards = document.querySelector(selectors.addCardsButton);
const popupCloseButtonAddCards = popupAddCard.querySelector (selectors.popupClose);
const cardsSection = document.querySelector(selectors.cardsSection);
//Form
const FormCard = document.querySelector(selectors.popupFormAddCard);
const formCardsImg = FormCard.querySelector(selectors.formCardsImg);
const formCardsTitle = FormCard.querySelector(selectors.formCardsTitle);

//Открытие popup с картинкой
const popupImage = document.querySelector(selectors.popupImage);
const popupCloseButtonImage =  popupImage.querySelector(selectors.popupClose);
const popupMainImage = popupImage.querySelector(selectors.popupMainImage);
const popupImageHeading = popupImage.querySelector(selectors.popupImageHeading);

//Профиль
const profile = document.querySelector(selectors.profileInfo);
let profileName = profile.querySelector(selectors.profileName);
let profileJob = profile.querySelector(selectors.profileDescription);

const formElement = popupElement.querySelector(selectors.popupForm);
let nameInput = formElement.querySelector(selectors.popupInputName);
let jobInput = formElement.querySelector(selectors.popupInputJob);


// Заполнение popup_profile
const FillPopupEdit = function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(0);
};

//Открытие popup
const openPopup = function (popupIndex) {
    popups[popupIndex].classList.add(selectors.popupOpened);
};

// Закрытие popup
const closePopup = function (popupIndex) {
    popups[popupIndex].classList.remove(selectors.popupOpened);
};

// Обработчик формы изменения профиля
function formSubmitEditProfile (evt) {
    evt.preventDefault();

    profileName.textContent =nameInput.value;;
    profileJob.textContent =jobInput.value;

    closePopup(0);
};

//Создание карточки
function createCard(elements) {
    const template = document.querySelector(selectors.cardTemplate).content.querySelector(selectors.card).cloneNode(true);
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
        openPopup(2);
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
    FormCard.addEventListener('submit', function(event) {
        event.preventDefault();

        const elements = {
            name: formCardsTitle.value,
            link: formCardsImg.value
        }
        renderCard(elements);
        closePopup(1);
        formCardsTitle.value = '';
        formCardsImg.value = '';
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

popupOpenButtonElement.addEventListener('click', FillPopupEdit);
popupCloseButtonElement.addEventListener('click', () => closePopup(0));
formElement.addEventListener('submit', formSubmitEditProfile); 

popupOpenButtonAddCards.addEventListener('click', () => openPopup(1));
popupCloseButtonAddCards.addEventListener('click', () => closePopup(1));

popupCloseButtonImage.addEventListener('click', () => closePopup(2));