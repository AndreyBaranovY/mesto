import React from "react";

  const Card = (props) => {
    function handleClick() {
      props.onCardClick(props.card)
    }

  return (
    <div className ="card">
      <img src = {props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""}  className ="card__image" onClick = {handleClick}/>
        <button type="button" className ="card__trash-btn"></button>
        <div className ="card__description">
          <p  className ="card__name">{props.card.name}</p>
          <div className ="card__like-container">
            <div className ="card__like-button"></div>
            <p className ="card__counter">{props.card.likes.length}</p>
          </div>
    </div>
</div>
  );
}

export  default Card;
