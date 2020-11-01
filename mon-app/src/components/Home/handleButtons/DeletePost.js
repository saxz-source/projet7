import React from 'react'

const DeletePost = (props) => {

  return (
    <button onClick={(e) => props.handleDelete(props.articleId)}>
      Effacer
    </button>
  )
}

export default DeletePost
