import React, { useState, useEffect, useRef, useCallback } from 'react';
import API from '../../utils/Api';
import ImageFeed from '../Home/ImageFeed'
import CommentView from '../Home/CommentView'
import { Link } from "react-router-dom"
import Loader from "../Loader"
import Error from "../Error/Error404"


const Person = (props) => {

    const [loading, setLoading] = useState(true)
    const [personArray, setPersonArray] = useState([])
    const [see, setSee] = useState("");
    const [moderate, setModerate] = useState("")
    let [pageNumber, setPageNumber] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState("")
    const [serverError, setServerError] = useState("")

    useEffect(() => {
        setLoading(true)
        const displayPersonFeed = () => {
            API({
                url: `/posts/user/${props.userId}`,
                method: "GET",
                params: { page: pageNumber }
            })
                .then((res) => {
                    if (res.status === 200) {
                        setPersonArray(prevPersonArray => {
                            return [...new Set([...prevPersonArray, ...res.data.result])]
                        })
                        setSee(res.data.userId)
                        setModerate(res.data.role)
                        setHasMore(res.data.result.length > 0)
                    }
                })
                .catch((err) => {
                    try {
                        if (!err.response) return setServerError("Connexion avec le serveur perdu. Vérifiez votre accès réseau")
                        if (err.response.status === 404) setError(404)
                    }
                    catch (e) {
                        console.log(e)
                    }
                })
        };
        displayPersonFeed();
        setLoading(false)
    }, [props.userId, pageNumber])

    const observer = useRef()
    const lastPersonRef = useCallback(element => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) setPageNumber(prevPageNumber => prevPageNumber + 1)
        })
        if (element) observer.current.observe(element)
    }, [hasMore])

    console.log(personArray)

    if (error === 404) return <Error />
    return (
        loading ? <Loader /> :
            <section className="col-12 feedSection">
                {serverError && <div className="errorDiv">{error}</div>}
                {personArray.map((elt) =>
                    <article
                        ref={lastPersonRef}
                        key={elt.id}
                        className={`col-11 col-md-8 col-lg-6 posts`}
                        style={
                            { display: (elt.visibility === 1 || see === elt.id_author || moderate === "mod") ? "block" : "none", background: elt.visibility === 2 && "grey" }
                        }>
                        <div className="col-12 postThings" >
                            <div className="col-12 postInfos">
                                <Link to={`/post/${elt.id_author}`}><p>{elt.fullName}</p></Link>
                                <p>{elt.date}</p>
                            </div>
                        </div>
                        <Link to={`/home/${elt.id}`}>
                            <div className="col-12 postBody">
                                <div className="postTitle">
                                    {elt.title}
                                </div>
                                <div className="postContent">
                                    {elt.media !== null &&
                                        <ImageFeed value={elt.media} valueAlt={elt.title} />}
                                    {elt.content !== null &&
                                        elt.content}
                                </div>
                            </div>
                            <CommentView commentsNb={elt.comments_number} />
                        </Link>
                    </article>
                )}
            </section>
    )

}

export default Person
