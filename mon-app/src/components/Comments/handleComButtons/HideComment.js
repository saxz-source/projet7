import React from 'react'
import Api from '../../../utils/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


const HideComment = (props) => {


    let visibility = props.visibility;
console.log(visibility)

    const handleHide = (e) => {
        e.preventDefault();
        let payload = {
            visibility: visibility,
            id: props.commentId
        }
        Api({
            url: `posts/comment/mod/${props.commentId}`,
            method: "PUT",
            data: payload
        }).then((res) => {
            if (res.status === 200) props.handleChange()

        })
            .catch()
    }


    return (
        visibility === 1 ?
            <button onClick={handleHide} className="iconButton" aria-label="masquer ce post">
                <FontAwesomeIcon icon={faEyeSlash} />
        </button>
            :
            <button onClick={handleHide} className="iconButton" aria-label="démasquer ce post">
                <FontAwesomeIcon icon={faEye} />
        </button>
    )
}

export default HideComment
