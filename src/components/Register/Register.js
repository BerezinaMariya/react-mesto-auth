import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import RegisterAndAuthPage from '../RegisterAndAuthPage/RegisterAndAuthPage';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import * as auth from '../../utils/Auth.js';
import { RegistrationDataContext } from '../../contexts/RegistrationDataContext';

function Register(props) {
  // Подписка на контекст
  const registrationData = React.useContext(RegistrationDataContext);

  const [message, setMessage] = React.useState('');
  const [isRegistrationSucsess, setRegistrationSucsess] = React.useState(false);
  const history = useHistory();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onInfoTooltip(true);
    console.log(registrationData);
    console.log(registrationData.password);
    console.log(registrationData.email);

    auth.register(registrationData.password, registrationData.email)
    .then((res) => {
      if(res){
        setMessage('Вы успешно зарегистрировались!');
        setRegistrationSucsess(true);
      } 
    }) 
    .then(() => history.push('/signin'))
    .catch((err) => {
        setMessage(err.message || 'Что-то пошло не так! Попробуйте ещё раз.');
    })
  }

  function handleLinkClick(evt) {
    props.onLinkChange(evt.target.pathname);
  }
  
  return (
    <>
      <RegisterAndAuthPage title="Регистрация" submitButtonText="Зарегистрироваться" onSubmit={handleSubmit}>
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?</p>
          <Link to="./signin" onClick={handleLinkClick} className="register__signin-link">Войти</Link>
        </div>
      </RegisterAndAuthPage>
      <InfoTooltip message={message} isOpen={props.isOpen} isClosed={props.isClosed} isRegistrationSucsess={isRegistrationSucsess} onClose={props.onClose} onCloseByOverlay={props.onCloseByOverlay} onCloseByEsc={props.onCloseByEsc} />
    </>
  );
}

export default Register;