import React, { useState, useEffect, useRef, useCallback } from 'react';
import API from '../../utils/Api';
import ImageFeed from '../Home/ImageFeed'
import CommentView from '../Home/CommentView'
import { Link } from "react-router-dom"
import Loader from "../Loader"
import Error from "../Error"


const Person = (props) => {

    const [loading, setLoading] = useState(true)
    const [personArray, setPersonArray] = useState([])
    const [see, setSee] = useState("");
    const [moderate, setModerate] = useState("")
    let [pageNumber, setPageNumber] = useState(1)
    const [error, setError] = useState("")


    useEffect(() => {
        setLoading(true)
        const displayPersonFeed = () => {
            API({
                url: `/posts/user/${props.userId}`,
                method: "GET",
                params : {page : pageNumber}
            })
                .then((res) => {
                    if (res.status === 200) {
                        setPersonArray(prevPersonArray => {
                            return [...new Set([...prevPersonArray, ...res.data.result])]
                        })
                        setSee(res.data.userId)
                        setModerate(res.data.role)
                    }
                })
                .catch((err) => err.response.status === 404 && setError(404))
        };    
        displayPersonFeed();
        setLoading(false)
    }, [props.userId, pageNumber])


    const observer = useRef()
    const lastPersonRef = useCallback(element => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) setPageNumber(prevPageNumber => prevPageNumber + 1)
        })
        if (element) observer.current.observe(element)
    }, [])

    if (error === 404) return <Error />

        return (
            loading ? <Loader/> :
            <section className="col-12 feedSection">
                {personArray.map((elt, index) =>
                    <article
                    ref={elt.length !== index + 1 ? lastPersonRef : null}
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
