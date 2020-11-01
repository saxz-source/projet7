import React from 'react';
import Header from "../../components/Header/Header"
import ArticleWithComments from "../../components/Comments/ArticleWithComments"
import Footer from "../../components/Footer1"

const ArticleWithCommentsPage = (props) => {



    return (
        <>
        <Header/>
        <ArticleWithComments articleId={props.match.params.postid} />
        <Footer/>
        </>
    )
}

export default ArticleWithCommentsPage
