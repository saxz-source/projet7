import React, { useState, useEffect } from 'react';
import API from '../../utils/Api';
import WriteAComment from './WriteAComment';
import DeleteComment from './handleComButtons/DeleteComment';
import ModifyComment from './handleComButtons/ModifyComment';
import HideComment from "./handleComButtons/HideComment";
import CommentToModify from "./CommentToModify";
import Loader from '../Loader';


const Comments = (props) => {

    const [loading, setLoading] = useState(true)

    const [commentsArray, setCommentsArray] = useState([]);

    const [see, setSee] = useState("");

    const [moderate, setModerate] = useState("")

    const [change, setChange] = useState(false)
    const handleChange = () => setChange(!change)

    const [modif, setModif] = useState({
        modif: false,
    })

    const handleModif = (theCommentId) => {
        setModif({
            modif: !modif.modif,
            id: theCommentId
        })
        handleChange();
    }


    useEffect(() => {
        setLoading(true)
        API({
            url: `/posts/comments/${props.articleId}`,
            method: "GET",
        })
            .then((res) => {
                if (res.status === 200) {
                    // console.log(res.data)
                    setCommentsArray(res.data.result)
                    setSee(res.data.userId)
                    setModerate(res.data.role)
                }
            })
            .catch(() => console.log("upload raté"))
            setLoading(false)
    }, [props.articleId, change]);


    return (

        loading ? <Loader/> :
        <section className="col-12 commentSection">
            <WriteAComment articleId={props.articleId} handleChange={handleChange} commentsNb={commentsArray.map((co) => co.comments_number)} />
            {commentsArray.map((com) =>
                <article className="col-11 col-md-8 col-lg-6 commentPiece"
                    key={com.id}
                    style={{
                        display: (com.visibility === 1
                            || see === com.id_commentAuthor
                            || moderate === "mod")
                            ? "block" : "none", background: com.visibility === 2 && "grey"
                    }}
                >
                    <header>
                        <div className="col-12 handleButtons">
                            {(see === com.id_commentAuthor || moderate === "mod") &&
                                <>
                                    <DeleteComment
                                        commentId={com.id}
                                        articleId={props.articleId}
                                        commentsNb={com.comments_number}
                                        handleChange={handleChange}
                                    />
                                    <ModifyComment
                                        commentId={com.id}
                                        handleModif={handleModif}
                                    />
                                </>
                            }
                            {moderate === "mod" &&
                                <HideComment
                                    commentId={com.id}
                                    visibility={com.visibility}
                                    handleChange={handleChange}
                                />
                            }
                        </div>
                        <div className="commentInfos">
                            <p>{com.fullName}</p>
                            <p> {com.date}</p>
                        </div>
                    </header>
                    {
                        modif.modif && modif.id === com.id ?
                            <CommentToModify value={com.comment_content} commentId={com.id} handleModif={handleModif} />
                            :
                            <div className="commentContent">
                                {com.comment_content}
                            </div>
                    }
                </article>
            )}

        </section>
    )
}

export default Comments
