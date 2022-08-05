// Валидация форм

//Обработчик всех форм
function enableValidation () {
    const formList = Array.from(document.querySelectorAll(selectors.popupForm));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        setEventListeners(formElement);
    })
}

//Обработчик всех полей в форме
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(selectors.popupInput));
    const buttonElement = formElement.querySelector(selectors.buttonSubmit);
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
        buttonElement.classList.add(selectors.buttonSubmitInactive);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(selectors.buttonSubmitInactive);
        buttonElement.removeAttribute('disabled');
    }
}

//Показывать ошибку
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputInvalid);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.inputErrorActive);
}

//Скрыватьошибку
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputInvalid);
    errorElement.classList.remove(selectors.inputErrorActive);
    errorElement.textContent = '';
}

enableValidation(); 