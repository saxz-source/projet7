import React from 'react'

const allCat = (props) => {

    let className = " col-3 col-md-2 m-2 btn btn-primary ";
    if (props.display === true) {
        className += "disabled";
    }

    return (
        <button className={`categoryDisplay ${className}`} onClick={props.changeDisplay}>
            Tout
        </button>
    )
}

export default allCat
