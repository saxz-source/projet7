import React, { useState } from 'react';
import API from "../../utils/Api";
import { Redirect } from "react-router-dom";

const LoginForm = () => {

    const [state, setState] = useState({
        email: "",
        password: "",
    })

    const [loggedIn, setLoggedIn] = useState(false)
    const [message, setMessage] = useState("")

    const handleEmail = e => setState({ ...state, email: e.target.value })
    const handlePassword = e => setState({ ...state, password: e.target.value })

    const handleSendUser = e => {
        e.preventDefault();
        const payload = {
            ...state
        }
        console.log(state)
        API({
            url: "/auth/login",
            method: "POST",
            data: payload
        })
            .then(() => {
                setLoggedIn(true)
            })
            .catch(res => {
                try {
                    if (!res.response) setMessage("Pas de connexion serveur. Vérifiez votre accès au réseau.")
                    setMessage(res.response.data.message)
                }
                catch (e) {
                    console.log(e)
                }
            })
    }

    return (
        loggedIn ? <Redirect to="/home" /> :
            <form noValidate onSubmit={handleSendUser} className="col-12 col-md-8 form" >
                <label htmlFor="email"> Votre identifiant :</label>
                <input type="text" value={state.email} name="email" id="email" placeholder="email" onChange={handleEmail} required />
                <label htmlFor="password"> Votre mot de passe :</label>
                <input type="password" value={state.password} name="password" id="password" placeholder="mot de passe" onChange={handlePassword} required />
                {message && <div> <p>{message}</p> </div>}
                <button className="btn-lg">Se connecter</button>
            </form>
    )
}

export default LoginForm
