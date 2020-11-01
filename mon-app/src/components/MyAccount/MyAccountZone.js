import React from 'react';
import DeleteAccountButton from './DeleteAccountButton';
import MyAccountForm from "./MyAccountForm"

const MyAccountZone = () => {
    return (
        <main className="flexcenter">
        <section className="col-11 col-md-9 flexcenter accountZone">
        <MyAccountForm/>
        <DeleteAccountButton/>
        </section>
        </main>
    )
}

export default MyAccountZone
