import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // Обработчики изменения инпутов обновляют стейт
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
      
    //Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });

    props.onClose();
  }

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onCloseByOverlay={props.onCloseByOverlay} onCloseByEsc={props.onCloseByEsc} onSubmit={handleSubmit} onValidation={props.onValidation} isLoading={props.isLoading}>
      <input type="text" name="name" id="input-name" className="form__input form__input_data_name" required minLength="2" maxLength="40" value={`${name}`} onChange={handleNameChange} />
      <span className="input-name-error form__input-error"></span>
      <input type="text" name="about" id="input-about" className="form__input form__input_data_about" required minLength="2" maxLength="200" value={`${description}`} onChange={handleDescriptionChange} />
      <span className="input-about-error form__input-error"></span>
    </PopupWithForm>
  );
}
                  
export default EditProfilePopup;