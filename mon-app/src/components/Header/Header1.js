import React from 'react';
import SignUp from '../SignUp/SignUpButton';
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';

const Header1 = () => {
    return (
        <header>
            <nav className="navbar">
                <Link to="/" className="linkIcon" aria-label="Logo Groupomania, lien vers l'accueil">
                    <Col xs={12} className="colIcon"></Col>
                </Link>
                <SignUp />
            </nav>
        </header>
    )
}

export default Header1