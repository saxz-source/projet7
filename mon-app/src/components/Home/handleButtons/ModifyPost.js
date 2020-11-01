import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const ModifyPost = () => {
    return (
        <button>
           <FontAwesomeIcon icon={faPen} className="iconButton"/>
        </button>
    )
}

export default ModifyPost
