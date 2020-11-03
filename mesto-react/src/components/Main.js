import React, { useState, useEffect } from "react";
import api from "./utils/Api.js";
import Card from "./Card";

const Main = (props) => {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([result, data]) => {
        setUserName(result.name);
        setUserDescription(result.about);
        setUserAvatar(result.avatar);
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
      <main className="main">
        <section className="profile">
          <div className="profile__avatar"  style={{ background: `url('${userAvatar}') 0 0 / 100% 100% no-repeat` }}>
            <div className="profile__avatar-overlay" onClick={props.onEditAvatar}></div>
          </div>
          <div className="profile__info">
            <div className="profile__description">
              <h1 className="profile__name">{userName}</h1>
              <p className="profile__job">{userDescription} </p>
            </div>
            <button onClick={props.onEditProfile} type="button" className="profile__edit-button"></button>
          </div>
          <button onClick={props.onAddPlace} type="button" className="profile__add-button" > </button>
        </section>
        <section className="cards-section">
          {cards.map((card, i) => (
            <Card key={i} card={card} onCardClick={props.onCardClick} />
          ))}
        </section>
      </main>
  );
}

export default Main;




// function handleEditAvatarClick(e) {
//    const popupAvatar = document.querySelector(".popup-avatar");
//    popupAvatar.classList.add("popup_opened");
// }
// function handleEditProfileClick(e) {
//   const popupProfile = document.querySelector(".popup-profile");
//  popupProfile.classList.add("popup_opened");
// }
// function handleAddPlaceClick(e) {
//   const popupAddPlace = document.querySelector(".popup-photo");
//   popupAddPlace.classList.add("popup_opened");
// }
