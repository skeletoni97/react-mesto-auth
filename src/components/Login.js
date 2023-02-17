import React from "react";

import {useState} from 'react'
function Login (props){
    const [email, setIsEmail] = useState('')
    const [password, setIsPassword] = useState('')
    const [osOpen, setIsOpen] = useState('')

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
        props.onSignin(email, password, (success, err) => {
            if(!success) {
                setIsOpen(true);
            }
        })
        console.log('ddds')
        
    }


return (
    <section className="register">
        <h2 className="register__text">Вход</h2>
        <form className="form form-register" onSubmit={handleSubmit}>
        <input value={email || ''} onChange={handleSetEmail} type="email" placeholder="Email" className="form-register__input"/>
        <input value={password || ''} onChange={handleSetPassword} type="Password" placeholder="Пароль" className=" form-register__input"/>
        <button  type="submit" className="form__button form-register__button">Вход</button>
        </form>
    </section>
)
}

export default Login