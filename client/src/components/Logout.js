import React ,{useState, useEffect} from 'react';
import { Link } from '@reach/router';


const Logout =(props) =>{


return(
    <div >
               <Link to ="/"> {/*   redirect to registration  */}
                <button  type="submit" value="Logout">Log out</button>
                </Link>
    </div>
    )
}



export default Logout;

