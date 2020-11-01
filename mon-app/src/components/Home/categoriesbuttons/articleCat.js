import React from 'react'

const articleCat = (props) => {

    let className = " col-3 col-md-2 m-2 btn btn-primary categoryDisplay ";
    if (props.display === true) {
        className += "disabled";
    }


    return (
        <button className={className} onClick={props.changeDisplay}>
            Articles
        </button>
    )
}

export default articleCat
