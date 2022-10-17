import React from 'react';
import { useHistory } from 'react-router-dom';
import { RegistrationDataContext } from '../../contexts/RegistrationDataContext';
import headerLogo from '../../images/header-logo.svg';

function Header(props) {
  const registrationData = React.useContext(RegistrationDataContext);
  const history = useHistory();

  const [buttonText, setButtonText] = React.useState('');
  const [email, setEmail] = React.useState(registrationData.email);
  const [menuButtonState, setMenuButtonState] = React.useState('open');
  const [menuState, setMenuState] = React.useState('close');
    
  function setHeaderText() {
    if (props.loggedIn) {
      setEmail(registrationData.email);
      setButtonText('Выйти');
    } else {
      if (props.Link === '/signup') {
      setButtonText('Войти');
      setEmail('');
      } else {
      setButtonText('Регистрация');
      setEmail('');
      } 
    }
  }

  function handleButtonClick() {
      if (props.loggedIn) {
      history.push('/signin');
      localStorage.removeItem('jwt');
      props.handleLogin(false);
    } else {
      if (props.Link === '/signup') {
        history.push('/signin');
      } if (props.Link === '/signin') {
        history.push('./signup');
      } 
    }
    props.onLinkChange(history.location.pathname);
  }

  function handleButtonClick() {
    if (props.loggedIn) {
    history.push('/signin');
    localStorage.removeItem('jwt');
    props.handleLogin(false);
  } else {
    if (props.Link === '/signup') {
      history.push('/signin');
    } if (props.Link === '/signin') {
      history.push('./signup');
    } 
  }
  props.onLinkChange(history.location.pathname);
}

function handleMenuButtonClick() {
  if (menuButtonState === 'open') {
    setMenuButtonState('close');
    setMenuState('open');
  } else {
    setMenuButtonState('open');
    setMenuState('close');
  }
}

  React.useEffect(() => {
    setHeaderText();
  }, [props.loggedIn, props.Link]);

  React.useEffect(() => {
    if (!props.loggedIn) {
      setMenuButtonState('open');
      setMenuState('close');
    }
  }, [props.loggedIn]);

  return (
    <header className={`header ${props.loggedIn ? 'header_logged-in' : ''} : ''}`}>
      <img className="header__logo" src={headerLogo} alt="Логотип проекта Место" />
      <button type="button" onClick={handleMenuButtonClick} className={`${props.loggedIn ? `header__menu-button header__menu-button_type_${menuButtonState}` : 'header__menu-button_hidden'}`}></button>
      <div className={`header__menu ${props.loggedIn ? `header__menu_state_${menuState}` : ''}`}>
        <p className="header__menu-email">{`${email}`}</p>
        <button type="button" onClick={handleButtonClick} className={`header__menu-link ${props.loggedIn ? 'header__menu-link_logged-in' : ''}`}>{`${buttonText}`}</button>
      </div>
    </header>
  );
}
  
export default Header;