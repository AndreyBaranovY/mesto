import React from "react";

 const ImagePopup = (props) => {
  return (
    <div className = {`popup popup-photo ${props.card ? "popup_opened" : ""}`}>
      <div className ="popup__photo-container">
        <button type ="button" className="popup__close-btn popup__photo-btn" onClick={props.onClose}></button>
        <h3 className ="popup__photo-title">{props.card ? props.card.name : ""}</h3>
        <img src = {props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""} className="popup__photo popup__photo-image" />
      </div>
    </div>

  );
}

export default ImagePopup;
