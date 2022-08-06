// Валидация форм

const formSettings = {
    form: '.popup__form',
    input: '.popup__input',
    buttonSubmit: '.popup__save',
    buttonSubmitInactive: 'popup__save_inactive',
    inputInvalid: 'popup__input_invalid',
    inputErrorActive: 'popup__input-error_active'
}


//Обработчик всех форм
function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.form));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setEventListeners(config, formElement);
    })
}

//Обработчик всех полей в форме
function setEventListeners(config, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.input));
    const buttonElement = formElement.querySelector(config.buttonSubmit);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

// Проверка поля на корректность 
function isValid(formElement, inputElement) {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

// Проверка всех полей на валидность
function hasInvalidInput (inputList) { 
    return inputList.some((inputElement) => { //если вернул true, значит есть хотя бы одно невалидное поле
        return !inputElement.validity.valid;
    })
}

//Вкл/Выкл кнопки 
function toggleButtonState (inputList, buttonElement) {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(formSettings.buttonSubmitInactive);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(formSettings.buttonSubmitInactive);
        buttonElement.removeAttribute('disabled');
    }
}

//Показывать ошибку
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formSettings.inputInvalid);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formSettings.inputErrorActive);
}

//Скрыватьошибку
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formSettings.inputInvalid);
    errorElement.classList.remove(formSettings.inputErrorActive);
    errorElement.textContent = '';
}

enableValidation(formSettings); 