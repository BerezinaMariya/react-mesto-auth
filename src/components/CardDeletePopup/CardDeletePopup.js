import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function CardDeletePopup(props) {

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onCardDelete(props.card);
    props.onClose();
  } 

  return (
    <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" isOpen={props.isOpen} onClose={props.onClose} onCloseByOverlay={props.onCloseByOverlay} onCloseByEsc={props.onCloseByEsc} onSubmit={handleSubmit} onValidation={props.onValidation} isLoading={props.isLoading}/>
  );
}
                  
export default CardDeletePopup;