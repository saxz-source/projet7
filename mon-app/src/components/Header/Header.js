import React, { useEffect, useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/Api";
import AccountButton from './AccountButton'
import Col from 'react-bootstrap/Col'

const Header = () => {

    const [loggedIn, setLoggedIn] = useState(true)
    const [fullName, setFullName] = useState("")

    useEffect(() => {
        API.get(`/auth/home`)
            .then((res) => setFullName(res.data.fullName))
            .catch((error) => { if (error.response.status === 401) setLoggedIn(false) })
    }, []);


    return (
        loggedIn === false ? <Redirect to="/" /> :

            <header>
                <nav className="navbar">
                    <Link to="/home" className="linkIcon" aria-label="Logo Groupomania, lien vers l'accueil">
                        <Col xs={12} className="colIcon"></Col>
                    </Link>
                    <AccountButton name={fullName} />
                </nav>
            </header>
    )
}


export default Header
