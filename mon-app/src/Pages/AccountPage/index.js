import React, { Component } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer1";
import MyAccountZone from "../../components/MyAccount/MyAccountZone";


class AccountPage extends Component {

   
    

    render () {

        return (
            <>
            <Header/>
        
            <MyAccountZone/>
 
            <Footer/>
            </>
        )
    }

}

export default AccountPage
