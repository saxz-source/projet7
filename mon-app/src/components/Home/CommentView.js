import React from 'react';

const CommentView = (props) => {
    return (    
       <div className="commentView">
            Commentaires {props.commentsNb}
        </div>
    )
}

export default CommentView
