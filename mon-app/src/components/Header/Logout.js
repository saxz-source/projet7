import React from 'react';
import API from '../../utils/Api';
import {Link} from 'react-router-dom'

const Logout = () => {

    const logoutUser = async () => {
        try {
          await API.get("/auth/logout")

        } catch (err) {
            console.log(err.response)
        }
    }


    return (
        <li onClick={logoutUser} className="sideButton">
           <Link to="/"><p>Me déconnecter</p></Link> 
        </li>
    )
}

export default Logout
