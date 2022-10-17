import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterAndAuthPage from '../RegisterAndAuthPage/RegisterAndAuthPage';
import * as auth from '../../utils/Auth.js';
import { RegistrationDataContext } from '../../contexts/RegistrationDataContext';


function Login(props) {
  const registrationData = React.useContext(RegistrationDataContext);
  const history = useHistory();

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!registrationData.password || !registrationData.email) {
      return;
    }
    auth.authorize(registrationData.password, registrationData.email)
    .then((res) => {
      if (res.token){
        localStorage.setItem('jwt', res.token);
      } else {
        return;
      }
    })
    .then(() => {
      props.handleLogin(true);
      history.push('/mesto');
    })    
    .catch((err) => {
      alert(`${err} Что-то пошло не так!`);
    })
  }

  React.useEffect(() => {
    props.onLinkChange(history.location.pathname);
  }, []);

  return (
    <RegisterAndAuthPage title="Вход" submitButtonText="Войти" onSubmit={handleSubmit} />
  );
}

export default Login;