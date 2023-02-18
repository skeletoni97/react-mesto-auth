import { Link, useNavigate, useLocation } from 'react-router-dom';

import React from 'react';

function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    props.login(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__logo"></div>
      {props.loggedIn ? (
        <div className="header__nav">
          <p className="header__email">{props.email}</p>
          <Link className="header__button" to="/sign-in" onClick={handleSignOut}>
            Выйти
          </Link>
        </div>
      ) : location.pathname === "/sign-up" ? (
        <Link className="header__button" to="/sign-in" onClick={handleSignOut}>
          Войти
        </Link>
      ) : (
        <Link className="header__button" to="/sign-up" onClick={handleSignOut}>
          Регистрация
        </Link>
      )}
    </header>
  );
}

export default Header;