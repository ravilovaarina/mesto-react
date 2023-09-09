import { api } from "../utils/Api";
import React from "react";
import Card from "./Card";
export default function Main (props) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([])
    React.useEffect(()=> {
        api.getInitialData()
        .then((data) => {
            const [userData, cardsData] = data
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
            setCards(cardsData);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    return(
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-group" onClick={props.onEditAvatar}>
                    <img alt="Аватар профиля" src={userAvatar} className="profile__avatar"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    <p className="profile__bio">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                    {cards.map(card => 
                    <Card
                    key = {card._id}
                    card = {card}
                    onCardClick={props.onCardClick}
                    />
                    )}
            </section>
        </main>
    )
}