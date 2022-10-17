import React from 'react';
import registrationSucsess from '../../images/infoTooltip-registration-sucsess.svg';
import registrationUnsucsess from '../../images/infoTooltip-registration-unsucsess.svg';

function InfoTooltip(props) {
  const popupRef = React.useRef();
  const [registration, setRegistration] = React.useState('');

  React.useEffect(() => {
    props.onCloseByOverlay(popupRef.current);
  }, []);

   React.useEffect(() => {
     if (props.isOpen) {
       // Список действий внутри одного хука
       document.addEventListener('keydown', props.onCloseByEsc);
      // Возвращаем функцию, которая удаляет эффекты
      return () => {
        document.removeEventListener('keydown', props.onCloseByEsc);
      }
    }
  }, [props.isOpen]);

  React.useEffect(() => { 
    if (props.isRegistrationSucsess) {
      setRegistration(registrationSucsess);
    } else {
      setRegistration(registrationUnsucsess);
    }
  }, [props.isRegistrationSucsess]);
  
  return (
    <div className={`popup popup_action_info-tooltip ${props.isOpen ? 'popup_opened' : ''}`} ref={popupRef}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose} aria-label="Закрыть"></button>
        <img className="popup__info-tooltip-image" src={registration} alt={`Статус регистрации (удачная или нет)`} />
        <h3 className="popup__title popup__title_info-tooltip">{props.message}</h3>
      </div>
    </div>
  );
}
      
export default InfoTooltip;