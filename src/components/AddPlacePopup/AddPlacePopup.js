import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup(props) {

    const nameRef = React.useRef('');
    const linkRef = React.useRef('');
  
    function handleSubmit(evt) {
      evt.preventDefault();
  
      props.onAddPlace({
          name: nameRef.current.value, 
          link: linkRef.current.value,
      });

      props.onClose();
    } 
  
    return (
      <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose} onCloseByOverlay={props.onCloseByOverlay} onCloseByEsc={props.onCloseByEsc} onSubmit={handleSubmit} onValidation={props.onValidation} isLoading={props.isLoading}>
        <input type="text" name="name" id="input-image-title" ref={nameRef} placeholder="Название" className="form__input form__input_data_image-title" required minLength="2" maxLength="30" />
        <span className="input-image-title-error form__input-error"></span>
        <input type="url" name="link" id="input-image-url" ref={linkRef} placeholder="Ссылка на картинку" className="form__input form__input_data_image-url" required />
        <span className="input-image-url-error form__input-error"></span>
      </PopupWithForm>
    );
  }
                    
  export default AddPlacePopup;