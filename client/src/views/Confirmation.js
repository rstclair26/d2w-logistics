import React from 'react';
import Logout from '../components/Logout'
import {Link, navigate} from '@reach/router';
import {motion } from 'framer-motion';
import { animationOne, transition} from '../animations/Animation';

const Confirmation = ( )=>{

    return(
        <div className="container`">
        <header className="header">
            <Link to="/">
            <img className="d2w-logo"src="D2W.PNG"  alt="d2w-logo" width="300" height="300"/>
            </Link>
            <Logout/>
        </header>  
        <div className="box-dashboard-3">  
            <div className="confirmation">  
            
            <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>  
                <img src="/images/available.png" alt="confirmed" width="100" height="100"/>
                        <div className="text-wrapper">  
                        <h1 className="">Confirmation</h1>
                        <h2  className="">Thank you!</h2>
                        <p  className="">Inquiry was successfully confirmed </p>
                        
                        </div>
                        <motion.button  whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }} onClick={ () => navigate("/capacities")}>Back</motion.button>
                        </motion.div>
                </div>
                <img className="d2w-logo"src="/images/FREIGHT4.png"  alt="d2w-logo" width="500"  height="500"/>
            </div>
        </div>
    )

}


export default Confirmation;