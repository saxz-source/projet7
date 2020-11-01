import API from '../../utils/Api';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

class DeleteAccountButton extends Component {

    state = {
        deleted: false
    }

    handleDelete = (e) => {
        e.preventDefault();
            API.delete(`http://localhost:5000/auth/account/d`)
                .then(() => {
                    localStorage.clear();
                    this.setState({
                        deleted: true
                    })

                })
                .catch()
    }



    render() {

        if (this.state.deleted) {
           return <Redirect to="/" />
        }


        return (
            <button onClick={this.handleDelete}>
                Supprimer mon compte
            </button >
        )


    }

}

export default DeleteAccountButton
