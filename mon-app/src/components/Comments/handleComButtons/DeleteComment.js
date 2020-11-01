import React from 'react'
import Api from '../../../utils/Api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const DeleteComment = (props) => {


  const handleDeleteComment = () => {

    let payloadPost = {
      id: props.commentId
    }

    let payloadPut = {
      operation: "decrement",
      id_post: props.articleId,
      comments_number: props.commentsNb

    }

    Api({
      url: "posts",
      method: "PUT",
      data: payloadPut
    }).then(
      props.handleChange()
    )
      .catch()


    Api({
      url: "posts/comment",
      method: "DELETE",
      data: payloadPost
    }).then(
      props.handleChange()
    )
      .catch()
  }


  return (
    <button onClick={handleDeleteComment} className="iconButton">
      <FontAwesomeIcon icon={faTrashAlt}  />
    </button>
  )
}

export default DeleteComment
