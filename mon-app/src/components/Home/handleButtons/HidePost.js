import React from 'react'
import Api from '../../../utils/Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const HidePost = (props) => {

    let visibility = props.visibility;
    console.log(visibility)

    const handleHide = (e) => {
        e.preventDefault();
        let payload = {
            visibility: visibility,
            id: props.articleId
        }
        Api({
            url: "posts/mod",
            method: "PUT",
            data: payload
        }).then((res) => {
            if (res.status === 200) props.handleModif()
        })
            .catch()
    }


    return (
        visibility === 1 ?
            <button onClick={handleHide} className="iconButton">
                <FontAwesomeIcon icon={faEyeSlash} />
            </button>
            :
            <button onClick={handleHide} className="iconButton">
                <FontAwesomeIcon icon={faEye} />
            </button>
    )
}

export default HidePost
