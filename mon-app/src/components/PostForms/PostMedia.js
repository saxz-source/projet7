import API from '../../utils/Api'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Form from "react-bootstrap/Form"

const PostMedia = () => {

    const [media, setMedia] = useState({
        title: "",
        file: null,
    })

    const [published, setPublished] = useState(false)


    const handleChangeTitle = (e) => {
        setMedia({
            ...media, title: e.target.value
        })
    }


    const handleChangeMedia = (e) => {
        setMedia({
            ...media, file: e.target.files
        })
    }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        if (form.checkValidity() === true) handleSendMedia()
    };

    const handleSendMedia = (e) => {

        let mediaInfos = {
            title: media.title,
            category: "media"
        }
        let formdata = new FormData();
        formdata.append('media', media.file[0]);
        formdata.append('mediaInfos', JSON.stringify(mediaInfos))
        console.log(media.file)
        API({
            url: "/posts",
            method: "POST",
            data: formdata
        })
            .then((res) => {
                if (res.status === 201) {
                    setPublished(true)
                    console.log("upload réussi")
                }
            })
            .catch(() => console.log("upload raté"))
    }


    return (
        published === true ? <Redirect to="/home" /> :

            <main>
                <Form noValidate className="form" validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="titleMediaToPublish">Titre</Form.Label>
                        <Form.Control className="col-11" id="titleMediaToPublish" type="text" name="title" onChange={handleChangeTitle} maxLength="140" required />
                        <Form.Control.Feedback type="invalid">
                            Titre manquant
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.File>
                        <Form.File.Label htmlFor="mediaToPublish">Votre fichier (.jpeg, .png ou .gif) </Form.File.Label>
                        <Form.File.Input type="file" id="mediaToPublish" name="media" onChange={handleChangeMedia} required />
                        <Form.Control.Feedback type="invalid">
                            Fichier manquant ou invalide (seuls les fichiers .jpeg, .png, .gif sont acceptés).
                        </Form.Control.Feedback>
                    </Form.File>
                    <button type="submit" className="btn-lg">Publier</button>
                </Form>
            </main>
    )
}


export default PostMedia
