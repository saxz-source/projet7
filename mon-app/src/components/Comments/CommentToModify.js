import React, { useState } from 'react'
import Api from '../../utils/Api'

const CommentToModify = (props) => {


    const [comment_content, setComment_content] = useState(props.value)
    const handleModifComment = (e) => setComment_content(e.target.value)

    const handleSendNewComment = () => {
        const payload = {
            comment_content: comment_content
        }
        Api({
            url: `/posts/comment/${props.commentId}`,
            method: "PUT",
            data: payload
        }).then(props.handleModif())
            .catch()
    }


    return (
        <>
            <input type="text" value={comment_content} onChange={handleModifComment} className="fullWidthInput"/>
            <button onClick={handleSendNewComment}>OK</button>
        </>
    )
}

export default CommentToModify
