// Валидация форм
class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
    }

    enableValidation () {
        this._setEventListeners();
    }
    
    _setEventListeners() {
        this._inputList = Array.from(this._form.querySelectorAll(this._config.input));
        this._buttonElement = this._form.querySelector(this._config.buttonSubmit);
        this._toggleButtonState();
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            })
        })
    }

    _isValid(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput () { 
        return this._inputList.some((inputElement) => { //если вернул true, значит есть хотя бы одно невалидное поле
            return !inputElement.validity.valid;
        })
    }

    resetValidation() {
        this._toggleButtonState();
  
        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
  
      }
  
    _toggleButtonState () {
        if(this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._config.buttonSubmitInactive);
            this._buttonElement.setAttribute('disabled', 'disabled');
        } else {
            this._buttonElement.classList.remove(this._config.buttonSubmitInactive);
            this._buttonElement.removeAttribute('disabled');
        }
    }
    
    //Показывать ошибку
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputInvalid);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.inputErrorActive);
    }
    
    //Скрыватьошибку
    _hideInputError(inputElement) {
        this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputInvalid);
        this._errorElement.classList.remove(this._config.inputErrorActive);
        this._errorElement.textContent = '';
    }
}
export {FormValidator};