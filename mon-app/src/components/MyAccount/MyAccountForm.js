import React, { Component } from 'react';
import API from "../../utils/Api";



class MyAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                avatar: "",
            },
            newFirstName: "",
            newLastName: "",
            newAvatar: "",
            modifying: false,
            modified: false
        };
        this.handleModify = this.handleModify.bind(this);
        this.handleSendModify = this.handleSendModify.bind(this);
    }


    handleModify = (e) => {
        e.preventDefault();
        console.log('lol')
        this.setState({
            modifying: true
        })
    }

    handleSendModify = (e) => {
        e.preventDefault();
        console.log("ok")

        const payload = {
            firstName: this.state.newFirstName,
            lastName: this.state.newLastName
        };

        API.put(`/auth/account/m`, payload)
            .then((res) => {
                this.setState({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName
                });
                this.setState({
                    modified: true
                })

            })
            .catch((error) => { console.log(error) })
    }


    handleUserChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState(
            {
                [name]: value
            }
        )
    }

    componentDidMount() {

        if (!this.state.modifying) {
            API.get(`/auth/home`)
                .then((res) => {
                    this.setState({
                        user: {
                            fullName: res.data.fullName,
                            firstName: res.data.firstName,
                            lastName: res.data.lastName
                        }
                    })
                })
                .catch((error) => { console.log(error) })
        }
    };


    render() {
        return (
            <form className="form col-8 col-md-6" >
                <label htmlFor="firstName">Votre prénom : {this.state.user.firstName}</label>
                {this.state.modifying &&
                    <input type="text" id="firstName" placeholder={this.state.user.firstName} value={this.state.newFirstName} name="newFirstName" onChange={this.handleUserChange}></input>}
                <label htmlFor="lastName">Votre nom : {this.state.user.lastName}</label>
                {this.state.modifying &&
                    <input type="text" id="lastName" placeholder={this.state.user.lastName} value={this.state.newLastName} name="newLastName" onChange={this.handleUserChange}></input>}
                {this.state.modifying ?
                    <button className="btn-lg" onClick={this.handleSendModify}>Envoyer</button>
                    :
                    <button className="btn-lg" onClick={this.handleModify}>Modifier</button>}
            </form>
        )
    }
}

export default MyAccount
