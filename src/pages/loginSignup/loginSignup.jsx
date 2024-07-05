import React from 'react'
import './loginSignup.css'

const  LoginSignup = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="text">Registrarse</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src="/assets\user-solid.svg" alt="user" />
                    <input type="text" placeholder='Usuario'  />
                </div>
                <div className="input">
                    <img src="/assets\envelope-solid.svg" alt="email" />
                    <input type="email" placeholder='Email' />
                </div>
                <div className="input">
                    <img src="/assets\key-solid.svg" alt="" />
                    <input type='password' placeholder='Contraseña'/>
                </div>
            </div>
            <div className="forgot-password">¿Olvidó su contraseña? <span>Presiona Aquí</span></div>
            <div className="submit-container">
                <div className="submit">Registrarse</div>
                <div className="submit">Ingresar</div>
            </div>
        </div>
    )
}


export default LoginSignup