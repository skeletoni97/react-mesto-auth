import React, { useEffect, useDebugValue, useState, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { apiAuth } from "../utils/ApiAuth";
import {
  CurrentUserContext,
  CurrentCardsContext,
} from "../contexts/CurrentUserContext";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { BrowserRouter, Route, Routes, Redirect, useNavigate } from 'react-router-dom'
import Login from './Login';
import Register from "./Register";
import InfpToolTip from './InfpToolTip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setcurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);

  const [linkImg, setLinkImg] = React.useState("");
  const [nameImg, setNameImg] = React.useState("");
  
  const [isLogin, setIsLogin] = useState (false);
  const [isEmail, setIsEmail] = useState ('')
  const navigate = useNavigate();

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {})
      .catch();
    const newCard = cards.filter((newCard) => newCard._id !== card._id);
    setCards(newCard);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    console.log(isLiked);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (isLiked !== true) {
      api.addLike(card._id, !isLiked).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      }).catch();
    } else {
      api.deleteLike(card._id, !isLiked).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      }).catch();
    }
  }

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([res, items]) => {
        setcurrentUser(res);
        setCards(items);
      })
      .catch();
    return () => {};
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(data) {
    setIsImagePopupOpen(true);
    setLinkImg(data.link);
    setNameImg(data.name);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((res) => {
        closeAllPopups();
        setcurrentUser(res);
      })
      .catch();
  }

  function handleUpdateAvatar(data) {
    console.log(data);
    api
      .updateAvatar(data)
      .then((res) => {
        closeAllPopups();
        console.log(res);
        setcurrentUser(res);
      })
      .catch();
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        console.log(data);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch();
  }


  function handleAutorizUser (email, paswsord, callback){
    console.log(email, paswsord);
    apiAuth.authorization(email, paswsord)
    .then((res)=>{
      console.log(res)
        localStorage.setItem(res.token);
        console.log(res);
        setIsLogin(true)
        callback(true);
      })
    .catch((err)=>{
      console.log(err);
      callback(false, err);
    })
  
  }
  
  //Проверяем токен
  
  function handleTokenCheck (){
    console.log('api reg')
  if (localStorage.getItem('token')){
    let jwt = localStorage.getItem('token')
    apiAuth.checkTokenUser(jwt).then ((res)=>{
      if(res){
        setIsEmail(res.data.email)
        console.log(res);
        setIsLogin(true)
        navigate('/')
        console.log('api')
        return true
      } else{
        navigate('/sign-in')
        setIsLogin(false)
      }
    })
  }
  }
  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentCardsContext.Provider value={cards}>
            <Header />
            <Routes>
            <Route  path="/"  element ={<ProtectedRoute loggedIn={isLogin} component={Main}
                element ={<Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onImg={handleCardClick}
                onLike={handleCardLike}
                onDelete={handleCardDelete}
              ></Main>}/>}/>
              <Route path='/sign-up' element ={<Register onRegistr = {handleTokenCheck} />}/>
              <Route path='/sign-in' element={<Login onSignin = {handleAutorizUser}/>}/>
              <Route path='menu' element={<InfpToolTip/>} />
            </Routes>
          
            <EditProfilePopup
              onUpdateUser={handleUpdateUser}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
            />

            <EditAvatarPopup
              onUpdateAvatar={handleUpdateAvatar}
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
            />

            <AddPlacePopup
              onAddPlaceSubmit={handleAddPlaceSubmit}
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
            />

            <ImagePopup
              link={linkImg}
              nameImg={nameImg}
              name="showPhoto"
              isOpen={isImagePopupOpen}
              closeAllPopups={closeAllPopups}
            />

            <Footer />
          </CurrentCardsContext.Provider>
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
