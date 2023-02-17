import React from "react";
import {useState} from 'react'
function Register (props){
    const [email, setIsEmail] = useState('')
    const [password, setIsPassword] = useState('')

    function handleSetEmail(e) {
        setIsEmail(e.target.value)
        console.log(email);
    }

    function handleSetPassword(e) {
        setIsPassword(e.target.value)
        console.log(password);
    }

    function handleSubmit (e){
        e.preventDefault()
        props.onRegistr(email, password)
        console.log('fff')
        
    }


return (
    <section className="register">
        <h2 className="register__text">Регистрация</h2>
        <form className="form-register" onSubmit={handleSubmit}>
        <input value={email || ''}  onChange={handleSetEmail} type="email" placeholder="Email" className="form-register__input form-register__input_type_email"/>
        <input value={password || ''} onChange={handleSetPassword} type="Password" placeholder="Пароль" className=" form-register__input form-register_input_type_pass"/>
        <button  type="submit" className="form__button form-register__button">Зарегистрироваться</button>
        </form>
        <a type="button" href='/sign-in' >Уже зарегистрированы? Войти</a>
    </section>
)
}

export default Register