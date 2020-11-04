import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalHeader from "react-bootstrap/ModalHeader";
import API from "../../utils/Api";



const ArticleModifyModal = (props) => {

    const [error, setError] = useState("")

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const [title, setTitle] = useState(props.title)
    const handleTitle = (e) => setTitle(e.target.value)

    const [text, setText] = useState(props.text)
    const handleText = (e) => setText(e.target.value)

    const [media, setMedia] = useState({
        name: props.media,
        file: null
    })
    const handleMedia = (e) => setMedia({ ...media, file: e.target.files })

    const handleSendModifs = () => {
        let mediaInfos = {
            title: title,
            content: text,
            id: props.id
        }
        let formdata = new FormData();
        if (media.file) formdata.append('media', media.file[0]);
        formdata.append('mediaInfos', JSON.stringify(mediaInfos))
        API({
            url: "posts/m",
            method: "PUT",
            data: formdata
        }).then((res) => {
            if (res.status === 200) {
                handleClose();
                props.handleModif()
            };
        }).catch((err) => {
            try {
                if (!err.response) return setError("Connexion avec le serveur perdu. Vérifiez votre accès réseau")
            }
            catch (e) {
                console.log(e)
            }
        }
        )
    }


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <ModalHeader>
                    <ModalTitle>Modifier votre publication</ModalTitle>
                </ModalHeader>
                <ModalBody className="modalBody">
                    <label htmlFor="title">Titre</label>
                    <input type="text" name="title" value={title} onChange={handleTitle} />

                    {media.name &&
                        <>
                            <label htmlFor="media">Media</label>
                            <input type="file" name="media" onChange={handleMedia} />
                        </>}
                    {text &&
                        <>
                            <label htmlFor="text">Texte</label>
                            <textarea type="text" name="text" value={text} onChange={handleText} className="textareaModif" > </textarea>
                        </>}

                </ModalBody>
                <ModalFooter>
                    {error && <div className="errorDiv">{error}</div>}
                    <button onClick={() => props.handleModif()}> Annuler</button>
                    <button onClick={handleSendModifs}>Modifier</button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default ArticleModifyModal