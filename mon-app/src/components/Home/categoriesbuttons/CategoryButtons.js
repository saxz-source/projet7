import React, { useState, useEffect } from 'react';
import AllCat from './allCat';
import ArticleCat from './articleCat';
import MediaCat from "./mediaCat";
import Feed from "../Feed"

const CategoryButtons = () => {

    const [whatDisplay, setWhatDisplay] = useState({
        all: true,
        articleCat: false,
        mediaCat: false
    });

    const changeDisplayAll = () => {
        setWhatDisplay({
            all: true,
            articleCat: false,
            mediaCat: false
        })
    }

    const changeDisplayMedia = () => {
        setWhatDisplay({
            all: false,
            articleCat: false,
            mediaCat: true
        })
    }

    const changeDisplayArticle = () => {
        setWhatDisplay({
            all: false,
            articleCat: true,
            mediaCat: false
        })
    }

    useEffect(() => {
        if (sessionStorage.readArticle) return setWhatDisplay({
            all: false,
            articleCat: true,
            mediaCat: false
        })
       if (sessionStorage.readMedia) return setWhatDisplay({
            all: false,
            articleCat: false,
            mediaCat: true
        })

    }, [])


    return (
        <main>
            <div className="flexcenter categoryButtons">
                <AllCat display={whatDisplay.all} changeDisplay={changeDisplayAll} />
                <ArticleCat display={whatDisplay.articleCat} changeDisplay={changeDisplayArticle} />
                <MediaCat display={whatDisplay.mediaCat} changeDisplay={changeDisplayMedia} />
            </div>
            <Feed whatDisplay={whatDisplay} />
        </main>
    )
};

export default CategoryButtons
