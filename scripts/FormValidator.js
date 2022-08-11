// Валидация форм
export {FormValidator};
class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

    enableValidation () {
        this._setEventListeners(this._form);
    }
    
    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._config.input));
        const buttonElement = formElement.querySelector(this._config.buttonSubmit);
        this._toggleButtonState(inputList, buttonElement);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    }

    _isValid(formElement, inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(this._config, formElement, inputElement);
        }
    }

    _hasInvalidInput (inputList) { 
        return inputList.some((inputElement) => { //если вернул true, значит есть хотя бы одно невалидное поле
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState (inputList, buttonElement) {
        if(this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._config.buttonSubmitInactive);
            buttonElement.setAttribute('disabled', 'disabled');
        } else {
            buttonElement.classList.remove(this._config.buttonSubmitInactive);
            buttonElement.removeAttribute('disabled');
        }
    }
    
    //Показывать ошибку
    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputInvalid);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.inputErrorActive);
    }
    
    //Скрыватьошибку
    _hideInputError(config, formElement, inputElement) {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(config.inputInvalid);
        errorElement.classList.remove(config.inputErrorActive);
        errorElement.textContent = '';
    }
}
