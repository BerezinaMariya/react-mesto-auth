import React from 'react';

function PopupWithForm(props) {
  const submitButtonTextRef = React.useRef();
  const formRef = React.useRef();
  const popupRef = React.useRef();
  const [validationForm, setValidationForm] = React.useState();

  const renderLoading = () => {
    if (!props.isLoading) {
      return submitButtonTextRef.current = props.buttonText;
    } else {
      return submitButtonTextRef.current = 'Сохранение...';
    }
  }

  React.useEffect(() => {
    props.onCloseByOverlay(popupRef.current);

    const formValidation = props.onValidation(formRef.current);
    setValidationForm(formValidation);
    formValidation.enableValidation();
  }, []);
  
  React.useEffect(() => {
    if (props.isOpen) {
      formRef.current.reset();
      validationForm.toggleButtonState();
      validationForm.resetValidationFields();
    
      // Список действий внутри одного хука
      document.addEventListener('keydown', props.onCloseByEsc);
      // Возвращаем функцию, которая удаляет эффекты
      return () => {
        document.removeEventListener('keydown', props.onCloseByEsc);
      }
    }
  }, [props.isOpen]);

  return (
    <div className={`popup popup_action_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} ref={popupRef} >
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть"></button>
        <h3 className="popup__title">{`${props.title}`}</h3>
        <form name={`form_action_${props.name}`} className={`form form_action_${props.name}`} ref={formRef} onSubmit={props.onSubmit} noValidate>
          {props.children}
          <button type="submit" className="form__submit-button" ref={submitButtonTextRef}>{renderLoading()}</button>
        </form>
      </div>
    </div>
  );
}
      
export default PopupWithForm;