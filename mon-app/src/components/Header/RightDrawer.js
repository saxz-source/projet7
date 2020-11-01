import React from 'react';
import { Link } from "react-router-dom";
import Logout from "./Logout";


const RightDrawer = (props) => {

    return (
        <div className="col-12 drawer" style={
            props.display ? { right: "0vw" } : { right: "-100vw" }
        }>
            <div className="row">
                <div className="col-4 col-md-8 leftSideDrawer" onClick={props.hide}>
                </div>
                <nav className="col-8 col-md-4 rightDrawer">
                    <ul>
                        <li className="sideButton sideButtonCreate">
                            <ul>
                                <li>
                                    <Link to="/post/text"><p>Publier un texte</p></Link>
                                </li>
                                <li>
                                    <Link to="/post/media"><p>Publier un media</p></Link>
                                </li>
                            </ul>
                        </li>
                        <li className="sideButton sideButtonAccount">
                            <ul>
                                <Logout />
                                <li className="sideButton ">
                                    <Link to={`/account`}>
                                        <p className="lowAccountLink">Mon compte</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default RightDrawer
