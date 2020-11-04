import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import API from "../../utils/Api";
import ArticleModifyModal from "./ArticleModifyModal";
import HidePost from "../Home/handleButtons/HidePost";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader';
import Error from '../Error/Error404';
import Comments from './Comments'

const ArticleWhithComments = (props) => {

    const [loading, setLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false);
    const [articleArray, setArticleArray] = useState([])
    const [see, setSee] = useState("")
    const [moderate, setModerate] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [modif, setModif] = useState(false)
    const [error, setError] = useState("")
    const [errorServer, setErrorServer] = useState("")

    const handleModif = () => {
        setModif(!modif)
        setOpenModal(false)
    }

    const handleDelete = (articleId) => {
        let payload = {
            id: articleId
        };
        API({
            url: '/posts',
            method: "DELETE",
            data: payload
        })
            .then(() => setRedirect(true))
            .catch(() => console.log("ca merde"));
    }

    useEffect(() => {
        setLoading(true)
        API({
            url: `/posts/${props.articleId}`,
            method: "GET",
        })
            .then((res) => {
                if (res.status === 200) {
                    const elt = res.data.result;
                    //console.log(elt)
                    setArticleArray(elt)
                    setSee(res.data.userId)
                    setModerate(res.data.role)
                }
            })
            .catch((err) => {
                try {
                    if (!err.response) return setErrorServer("Connexion avec le serveur perdu. Vérifiez votre accès réseau")
                    if (err.response.status === 404) setError(404)
                }
                catch (e) {
                    console.log(e)
                }
            })
        setLoading(false)
    }, [modif, props.articleId])


    if (error === 404) return <Error />
    if (redirect) return <Redirect to="/home" />

    return (
        <main>
            <section className="col-12 oneArticleSection">
                {loading && <Loader />}
                {articleArray.map((art) =>
                    <div key={"articleAndModal" + art.id} className="feedSection">
                        <article
                            key={art.id}
                            className={`col-12 col-md-9 col-lg-6 posts`}
                            style={{
                                display: (art.visibility === 1
                                    || see === art.id_author
                                    || moderate === "mod")
                                    ? "block" : "none", background: art.visibility === 2 && "grey"
                            }}
                        >
                            <div className="col-12 handleButtons">
                                {(see === art.id_author || moderate === "mod") &&
                                    <>
                                        <button
                                            onClick={() => handleDelete(props.articleId)}
                                            className="iconButton"
                                            aria-label="supprimer ce post">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                        <button
                                            onClick={() => setOpenModal(true)}
                                            className="iconButton"
                                            aria-label="modifier ce post">
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                    </>
                                }
                                {moderate === "mod" &&
                                    <HidePost
                                        articleId={art.id}
                                        visibility={art.visibility}
                                        handleModif={handleModif}
                                    />
                                }
                            </div>
                            <div className="col-12 postInfos postThings" >
                                <Link to={`/post/${art.id_author}`}> <p className="postAuthor">{art.fullName}</p></Link>
                                <p>{art.date}</p>
                            </div>
                            <div className="col-12 postBody">
                                <div className="postTitle">
                                    {art.title}
                                </div>
                                <div className="postContent">
                                    {art.media !== null && <img src={art.media} alt={art.title} />}
                                    {art.content !== null && art.content}
                                </div>
                            </div>
                        </article>
                        {openModal &&
                            <ArticleModifyModal
                                key={"modal" + art.id}
                                media={art.media}
                                text={art.content}
                                title={art.title}
                                id={art.id}
                                handleModif={handleModif}
                            />
                        }
                    </div>
                )}
            </section>
            {errorServer ?
                <div className="errorDiv">{error}</div>
                :
                <Comments articleId={props.articleId} />}
        </main>
    )
}

export default ArticleWhithComments
