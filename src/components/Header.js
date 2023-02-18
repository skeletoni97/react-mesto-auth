// import { useHistory } from 'react-router-dom';
import React from 'react';

function Header(props) {
  // const history = useHistory();
  // const handleSignOut = () => {
  //   localStorage.removeItem('jwt');
  //   history.replace('/');
  // };

  return (
    <header className="header">
      <div className="header__logo"></div>
      <button className='header__button'><a href='/sign-up'>{props.email}</a></button>
      <button  className='header__button'>выход</button>
    </header>
  );
}

export default Header;