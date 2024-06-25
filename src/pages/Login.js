import React from "react"
import "./Login.css"
import logo from "../Logo_Hello_Kitchen.png"

const Login = () => {
    return (
        <div className="login-container">
            <img src={logo} alt="Logo" className="login-logo" />
            <div className="login-box">
                <form>
                    <div className="input-field">
                        <label htmlFor="username">Nom d'utilisateur</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    )
}

export default Login;