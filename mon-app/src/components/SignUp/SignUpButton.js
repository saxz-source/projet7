import React, { Component } from 'react';
import {Link} from "react-router-dom";

class SignUp extends Component {

    render(){

        return (
          <Link to="/signup" className="linkSignup btn-lg">  <button className="buttonSignup btn-lg">Je crée mon compte</button></Link>
        )
    }
}

export default SignUp
