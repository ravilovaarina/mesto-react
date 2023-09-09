import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import '../index.css'
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState('')

    function handleEditProfilePopupOpen(){
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }
    function handleAddPlacePopupOpen(){
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }
    function handleEditAvatarPopupOpen(){
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }

    function handleCardClick(card){
        setSelectedCard(card)
    }
    function closeAllPopups(){
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard('')
    }
    
    return (
        <div className="page">
            <Header />
            <Main 
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen}
            onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm
                name="profile"
                title="Редактировать профиль"
                children={
                    <>
                        <label className="popup__field">
                            <input type="text" name="name" className="popup__input" id="name" placeholder="Имя" required minlength="2" maxlength="40" />
                            <span className="popup__input-error name-error"></span>
                        </label>
                        <label className="popup__field">
                            <input type="text" name="bio" className="popup__input" id="bio" placeholder="Описание" required minlength="2" maxlength="200" />
                            <span className="popup__input-error bio-error"></span>
                        </label>
                    </>
                }
                buttonText='Сохранить'
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                name='add'
                title='Новое место'
                children={
                    <>
                        <label className="popup__field">
                            <input type="text" name="name" className="popup__input" id="place" placeholder="название"
                                required minlength="2" maxlength="30" />
                            <span className="popup__input-error place-error"></span>
                        </label>
                        <label className="popup__field">
                            <input type="url" name="link" className="popup__input" id="url" placeholder="ссылка на картинку"
                                required />
                            <span className="popup__input-error url-error"></span>
                        </label>
                    </>
                }
                buttonText='Создать'
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                name='avatar'
                title='Обновить аватар'
                children={
                    <>
                        <label class="popup__field">
                            <input type="url" name="link" class="popup__input" id="avatarUrl" placeholder="ссылка на картинку"
                                required />
                            <span class="popup__input-error avatarUrl-error"></span>
                        </label>
                    </>
                }
                buttonText='Сохранить'
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            />
            <ImagePopup 
            card={selectedCard}
            onClose={closeAllPopups}
            />
            <PopupWithForm
                name='delete'
                title='Вы уверены?'
                children={
                    <>
                    </>
                }
                buttonText='Да'
            />
        </div>
    );
}

export default App;
