import React ,{useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import { animationOne, transition} from '../animations/Animation';


const Registration =(props) =>{




return(
    <div className="container">
    <nav>
            <img className="d2w-logo"src="D2W.PNG"  alt="d2w-logo"/>
    </nav>  
    <main>
            <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
                <div className="box-dashboard">
                
                    <h1>Registration</h1>
                    <form>  {/*add some submit handler*/}
                        <p className="text">First Name:  </p>    <input type="text"/> <br/>
                        <p className="text">Last Name:  </p>    <input type="text"/> <br/>
                        <p className="text">Email:  </p>    <input type="email"/> <br/>
                        <p className="text">Phone Number:  </p>    <input type="text"/> <br/>
                        <p className="text">Shipper's Primary Market:  </p>    <input type="text"/> <br/>
                        <p className="text">Password:  </p><input type="password"/> <br/>
                        <p className="text"> Confirm Password:  </p><input type="password"/> <br/>
                        <button type="submit" value="Login">Sign up</button>     
                        <hr/>            
                    </form>
                </div>
            </motion.div>
        </main>
    </div>
    )
}



export default Registration;

