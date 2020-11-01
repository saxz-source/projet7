import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const ModifyComment = (props) => {





    return (
        <button onClick={()=>props.handleModif(props.commentId)} className="iconButton">
             <FontAwesomeIcon icon={faPen} /> 
        </button>
    )
}

export default ModifyComment
