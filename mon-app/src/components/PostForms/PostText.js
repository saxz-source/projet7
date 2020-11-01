import API from '../../utils/Api';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Form from "react-bootstrap/Form"

const PostText = () => {

    const [text, setText] = useState({
        title: "",
        content: ""
    });

    const [published, setPublished] = useState(false)

    const handleTitle = (e) => {
        setText({ ...text, title: e.target.value })
    }

    const handleContent = (e) => {
        setText({ ...text, content: e.target.value })
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            handleSendText()
        }
        setValidated(true);
    };


    const handleSendText = (e) => {
        const payload = {
            title: text.title,
            content: text.content,
            category: "textContent"
        };
        API({
            url: "/posts",
            method: "POST",
            data: payload
        })
            .then(res => {
                if (res.status === 201) {
                    setPublished(true)
                }
            })
            .catch(() => { console.log("Envoi non effectué") })
    }


    return (

        published === true ? <Redirect to="/home" /> :

            <main>
                <Form noValidate validated={validated} className="form" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="TitletextToPublish">Titre</Form.Label>
                        <Form.Control type="text" className="col-11 col-md-8" id="TitletextToPublish" name="title" onChange={handleTitle} maxLength="140" required />
                        <Form.Control.Feedback type="invalid">
                            Titre manquant
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="textToPublish">Votre texte </Form.Label>
                        <textarea className="col-11 col-md-8" id="textToPublish" name="content" maxLength="2500" onChange={handleContent} required></textarea>
                        <Form.Control.Feedback type="invalid">
                            Texte manquant
                        </Form.Control.Feedback>
                    </Form.Group>
                    <button type="submit" className="btn-lg">Publier</button>
                </Form>
            </main>
    )
}

export default PostText
