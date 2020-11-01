import React from 'react'
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer1"
import Person from "../../components/Person/Person"

const PersonPage = (props) => {



    return (
        <>
        <Header/>
        <main>
        <Person userId={props.match.params.id}/>
        </main>
        <Footer/>
        </>
    )
}

export default PersonPage
