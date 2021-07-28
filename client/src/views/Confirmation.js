import React from 'react';
import Logout from '../components/Logout'
import {Link} from '@reach/router';


const Confirmation = ( )=>{

    return(
        <div className="container`">
        <header className="header">
            <Link to="/">
            <img className="d2w-logo"src="D2W.PNG"  alt="d2w-logo" width="300" height="300"/>
            </Link>
            <Logout/>
        </header>  
            <div className="confirmation-dashboard">
            <img src="/images/available.png" alt="confirmed" width="100" height="100"/>
            <h1>Confirmation</h1>
            <h2>Thank you!</h2>
            <p>Inquiry was successfully confirmed </p>
            <p>you will received an confirmation message to email: </p>
            </div>
        </div>
    )

}


export default Confirmation;