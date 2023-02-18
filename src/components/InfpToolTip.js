import React from "react";
import success from '../image/success.svg'
import fail from '../image/Fail.svg'
function InfpToolTip (props){
    
return (
    <div  className= { props.isSuccess ? "popup popup_opened" : props.isFail ? "popup popup_opened" : "popup" }>
        <div className="popup__container">
            <div className="popup__content">
            <button onClick={props.onClose} type="button" className="popup__close popup__close-profile"/>
            <img className="popup__image" src={props.isSuccess ? success : fail}/>
             <h2 className="popup__inform">{props.isSuccess? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
             </div>
        </div>
    </div>
)
}

export default InfpToolTip