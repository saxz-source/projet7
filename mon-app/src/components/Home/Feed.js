import React from 'react';
import MediaFeed from "./MediaFeed"
import ArticleFeed from './ArticleFeed';
import AllFeed from "./AllFeed";
import {Redirect} from "react-router-dom"

const Feed = (props) => {
    if(!document.cookie) return <Redirect to="/"/>
    return (
        <>
            {props.whatDisplay.mediaCat && <MediaFeed />}
            {props.whatDisplay.articleCat && <ArticleFeed />}
            {props.whatDisplay.all && <AllFeed />}
        </>
    )
}

export default Feed
