
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error'
}

const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
        'Content-Type': "application/json",
        authorization: '92008ab3-754f-431d-a509-e0b0dada1049',
    }
}

export { config, apiConfig }