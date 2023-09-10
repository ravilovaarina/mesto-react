import React from "react"
function Card(props){
    function handleCardClick(){
        props.onCardClick(props.card)
    }
    return(
        <div className="cards__item">
        <button type="button" className="cards__button-delete"/>
        <img onClick={handleCardClick} alt={props.card.name} className="cards__pic" src={props.card.link}/>
        <div className="cards__info">
            <h2 className="cards__text">{props.card.name}</h2>
            <div className="cards__like-group">
                <button type="button" className="cards__button-like"></button>
                <span className="cards__like-count">{props.card.likes.length}</span>
            </div>
        </div>
    </div>
    )
}
export default Card