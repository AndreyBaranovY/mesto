import React from "react";


const PopupWithForm = (props) => {
  return (
   <>
     <section className={`popup popup-${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
       <div className={"popup__container"}>
         <button type="button" className={`popup__close-btn popup__${props.name}`} onClick={props.onClose}></button>
         <form className={`popup__form popup__form-${props.name}`} name="form-${props.name}" novalidate>
           <h3 className={"popup__title"}>{props.title}</h3>
           {props.children}
           <button type="submit" className="popup__button" disabled>{props.button}</button>
         </form>
       </div>
     </section>
  </>
  );
}

export default PopupWithForm;
