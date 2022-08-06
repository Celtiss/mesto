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
    toggleButtonState(config, inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(config, formElement, inputElement);
            toggleButtonState(config, inputList, buttonElement);
        })
    })
}

// Проверка поля на корректность 
function isValid(config, formElement, inputElement) {
    if(!inputElement.validity.valid) {
        showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(config, formElement, inputElement);
    }
}

// Проверка всех полей на валидность
function hasInvalidInput (inputList) { 
    return inputList.some((inputElement) => { //если вернул true, значит есть хотя бы одно невалидное поле
        return !inputElement.validity.valid;
    })
}

//Вкл/Выкл кнопки 
function toggleButtonState (config, inputList, buttonElement) {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.buttonSubmitInactive);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(config.buttonSubmitInactive);
        buttonElement.removeAttribute('disabled');
    }
}

//Показывать ошибку
function showInputError(config, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputInvalid);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.inputErrorActive);
}

//Скрыватьошибку
function hideInputError(config, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputInvalid);
    errorElement.classList.remove(config.inputErrorActive);
    errorElement.textContent = '';
}

enableValidation(formSettings); 