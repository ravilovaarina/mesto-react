import React from 'react';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import ImagePopup from './ImagePopup.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import { api } from '../utils/Api.js';
import '../index.css'
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState({})
    const [isImageOpen, setIsImageOpen] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        api.getInfo()
            .then((data) => {
                setCurrentUser(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    function handleEditProfilePopupOpen() {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }
    function handleAddPlacePopupOpen() {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }
    function handleEditAvatarPopupOpen() {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }

    function handleCardClick(card) {
        setIsImageOpen(!isImageOpen)
        setSelectedCard(card)
    }
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsImageOpen(false)
        setSelectedCard({})
    }
    React.useEffect(() => {
        api.getInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err)
            })
    }
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(
                () => {
                    setCards((state) => state.filter((item) => item._id !== card._id)); 
                })
            .catch((err) => {
                console.log(err)
            })
    }
    function handleUpdateUser(data) {
        api.editProfile(data)
            .then(
                (data) => {
                    setCurrentUser(data)
                    closeAllPopups()
                }
            )
            .catch((err) => {
                console.log(err)
            })
    }
    function handleUpdateAvatar(data) {
        api.setUserAvatar(data)
            .then(
                (data) => {
                    setCurrentUser(data);
                    closeAllPopups();
                })
            .catch((err) => {
                console.log(err)
            })
    }
    function handleAddPlaceSubmit(data) {
        api.addNewCard(data)
            .then(
                (newCard) => {
                    setCards([newCard, ...cards]);
                    closeAllPopups();
                })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    cards={cards}
                    onEditProfile={handleEditProfilePopupOpen}
                    onAddPlace={handleAddPlacePopupOpen}
                    onEditAvatar={handleEditAvatarPopupOpen}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                    isOpeped={isImageOpen}
                />
                <PopupWithForm
                    name='delete'
                    title='Вы уверены?'
                    buttonText='Да'
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
