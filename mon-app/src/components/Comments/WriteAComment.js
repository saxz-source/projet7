import API from '../../utils/Api'
import React, { useState } from 'react'

const WriteAComment = (props) => {

    const [comment, setComment] = useState("");
    const handleComment = (e) => setComment(e.target.value);

    const [error, setError] = useState(false)

    const handleSendComment = (e) => {
        e.preventDefault();

        let payloadPost = {
            comment_content: comment,
            id_post: props.articleId,
        }
        let payloadPut = {
            id_post: props.articleId,
            comments_number: props.commentsNb[0],
            operation: "add"
        }

        API({
            url: "/posts",
            method: "PUT",
            data: payloadPut
        })
            .then(() => setComment(""))
            .catch(() => console.log("upload raté"))

        API({
            url: "/posts/comment",
            method: "POST",
            data: payloadPost
        })
            .then(() => props.handleChange())
            .catch((err) => {
                try {
                    if (!err.response) return setError(true)
                }
                catch (e) {
                    console.log(e)
                }
            })
    }


    if (!error) return <section className="col-11 col-md-8 col-lg-6 commentPiece ">
        <form className="col-12 commentForm">
            <label htmlFor="writeComment">Écrire un commentaire</label>
            <textarea type="text" className="col-12" id="writeComment" value={comment} onChange={handleComment}> Votre commentaire </textarea>
            <button onClick={handleSendComment}> Envoyer </button>
        </form>
    </section>

}

export default WriteAComment
