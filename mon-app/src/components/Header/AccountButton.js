import React, { useState } from 'react';
import RightDrawer from "./RightDrawer"


const AccountButton = (props) => {

    const [state, setState] = useState(false);

    const show = () => setState(true)
    const hide = () => setState(false)


    return (
        <>
            <button className="btn-lg accountButton" onClick={show}>
                {props.name}
            </button>
            <RightDrawer display={state} hide={hide} />
        </>
    )
}

export default AccountButton
