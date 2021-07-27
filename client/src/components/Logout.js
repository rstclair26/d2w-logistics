import React ,{useState, useEffect} from 'react';
import { Link } from '@reach/router';
import {motion} from 'framer-motion';
import { animationOne, transition} from '../animations/Animation';

const Login =(props) =>{


return(
    <div className="container">
               <Link default> {/*   redirect to registration  */}
                <button  type="submit" value="Log out">Log out</button>
                </Link>
    </div>
    )
}



export default Login;

