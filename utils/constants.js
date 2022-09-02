export const formSettings = {
    form: '.popup__form',
    input: '.popup__input',
    buttonSubmit: '.popup__save',
    buttonSubmitInactive: 'popup__save_inactive',
    inputInvalid: 'popup__input_invalid',
    inputErrorActive: 'popup__input-error_active'
}

export const initialCards = [
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

export const selectors = {
    popupEdit: '.popup_type_edit-profile',
    popupCards: '.popup_type_add-card',
    popupImage: '.popup_type_image',

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

    cardsSection:'.elements__container',
    cardTemplate: '.card-template'
}