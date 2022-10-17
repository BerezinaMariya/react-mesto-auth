import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
    props.onClose();
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onCloseByOverlay={props.onCloseByOverlay} onCloseByEsc={props.onCloseByEsc} onSubmit={handleSubmit} onValidation={props.onValidation} isLoading={props.isLoading}>
      <input type="url" name="avatar" id="input-avatar-url" ref={avatarRef} placeholder="Ссылка на картинку" className="form__input form__input_data_avatar-url" required />
      <span className="input-avatar-url-error form__input-error"></span>
    </PopupWithForm>
  );
}
                  
export default EditAvatarPopup;