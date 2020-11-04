import React, { useEffect, useState, useRef, useCallback } from 'react';
import CommentView from "../Home/CommentView";
import ImageFeed from './ImageFeed';
import { Link } from "react-router-dom";
import API from "../../utils/Api"
import Loader from "../Loader"

const ArticleFeed = () => {

    const [feed, setFeed] = useState([]);
    const [see, setSee] = useState("");
    const [moderate, setModerate] = useState("")
    const [loading, setLoading] = useState(true)
    let [pageNumber, setPageNumber] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)

        const allCategoryFeed = () => {
            API({
                url: "/posts",
                method: "GET",
                params: { page: pageNumber }
            })
                .then((res) => {
                    if (res.status === 200) {
                        setFeed(prevFeed => {
                            return [...new Set([...prevFeed, ...res.data.result])]
                        })
                        setSee(res.data.userId)
                        setModerate(res.data.role)
                        setHasMore(res.data.result.length > 0)
                    }
                })
                .catch((err) => {
                    try {
                        if (!err.response) return setError("Connexion avec le serveur perdu. Vérifiez votre accès réseau")
                    }
                    catch (e) {
                        console.log(e)
                    }
                })
        };
        allCategoryFeed()
        setLoading(false)
    }, [pageNumber])


    const observer = useRef()
    const lastAllRef = useCallback(element => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) setPageNumber(prevPageNumber => prevPageNumber + 1)
        })
        if (element) observer.current.observe(element)
    }, [hasMore])


console.log(feed)

    if (loading) return <Loader />

    return (
        <section className="col-12 feedSection">
            {error && <div className="errorDiv">{error}</div>}
            {feed.map((elt) =>
                <article
                    ref={lastAllRef}
                    key={elt.id}
                    value={elt.id}
                    className={`col-12 col-md-9 col-lg-6 posts`}
                    style={
                        { display: (elt.visibility === 1 || see === elt.id_author || moderate === "mod") ? "block" : "none", background: elt.visibility === 2 && "grey" }
                    }>
                    <div className="col-12 postThings" >
                        <div className="col-12 postInfos">
                            <Link to={`/post/${elt.id_author}`}><p className="postAuthor">{elt.fullName}</p></Link>
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
                        <CommentView commentsNb={elt.comments_number} className="commentView" />
                    </Link>
                </article>
            )}
        </section>
    )
}

export default ArticleFeed