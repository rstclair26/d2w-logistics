import React from 'react';
import { Link } from '@reach/router';
import {motion } from 'framer-motion';

const Logout =(props) =>{


return(
    <div >
               <Link to ="/"> {/*   redirect to registration  */}
                <motion.button  whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }}  type="submit" value="Logout">Log out</motion.button>
                </Link>
    </div>
    )
}


export default Logout;

