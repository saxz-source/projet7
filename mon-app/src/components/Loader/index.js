import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

const Loader = () => {
    return (
        <section className="loadingSection">
            <Spinner animation="border" variant="light" className="spinner">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </section>

    )
}

export default Loader
