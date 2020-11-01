import React, { useState } from 'react'
import API from "../../utils/Api"
import { Redirect } from "react-router-dom"
import Form from "react-bootstrap/Form"

const SignUpForm = () => {

    const [loggedIn, setLoggedIn] = useState()
    const [errMessage, setErrMessage] = useState([])
    const [validated, setValidated] = useState(false);

    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    })

    const handleEmail = e =>  setUser({...user, email: e.target.value}) 

    const handleFirstName = e =>  setUser({...user, firstName: e.target.value})
    
    const handleLastName = e => setUser({ ...user, lastName: e.target.value })

    const handlePassword = e => setUser({ ...user, password: e.target.value })
    
    const handleConfirmPassword = e => setUser({ ...user, confirmPassword: e.target.value  })

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) {
            handleSendUser()
        }
    };

    const handleSendUser = () => {
        const payload = { ...user }
        API.post("http://localhost:5000/auth/signup", payload)
            .then((res) => {
                if (res.status === 201) {
                    setLoggedIn(true)
                    return <Redirect to="/home" />
                }
            })
            .catch(res =>setErrMessage(res.response.data.message)
            )
    }

    return (

        loggedIn ? <Redirect to="/home" /> :

            <Form noValidate validated={validated} onSubmit={handleSubmit} className="form col-8 col-md-6">
                <Form.Group controlId="validationCustom01">
                    <Form.Label>Votre email</Form.Label>
                    <Form.Control type="email" value={user.email} name="email" onChange={handleEmail} pattern=".+@.+\.[a-z]+" maxLength="50" required />
                    <Form.Control.Feedback type="invalid">
                        Adresse e-mail invalide.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom02">
                    <Form.Label>Votre prénom</Form.Label>
                    <Form.Control type="text" value={user.firstName} name="firstName" onChange={handleFirstName} pattern="[\p{L}' -]+" maxLength="20" required />
                    <Form.Control.Feedback type="invalid">
                        Prénom invalide.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom03">
                    <Form.Label>Votre nom</Form.Label>
                    <Form.Control type="text" value={user.lastName} name="secondName" onChange={handleLastName} pattern="[\p{L}' -]+" maxLength="20" required />
                    <Form.Control.Feedback type="invalid">
                        Nom invalide.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom04">
                    <Form.Label>Votre mot de passe</Form.Label>
                    <Form.Control type="password" value={user.password} name="password" onChange={handlePassword} required />
                    <Form.Control.Feedback type="invalid">
                        Veuillez entrer un mot de passe.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom05">
                    <Form.Label> Confirmez votre mot de passe</Form.Label>
                    <Form.Control type="password" value={user.confirmPassword} name="confirmPassword" onChange={handleConfirmPassword} required />
                    <Form.Control.Feedback type="invalid">
                        Veuillez confirmer votre mot de passe.
                    </Form.Control.Feedback>
                </Form.Group>
                {errMessage && errMessage.map((err, i) =>
                    <p key={i}> {err} </p>
                )}
                <button type="submit" className="btn-lg">Je m'inscris</button>
            </Form>
    )
}

export default SignUpForm
