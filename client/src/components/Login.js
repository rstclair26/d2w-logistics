import React ,{useState} from 'react';
import { Link , navigate} from '@reach/router';
import {motion} from 'framer-motion';
import axios from 'axios';
import { animationOne, transition} from '../animations/Animation';

const Login =(props) =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = (event) => {
        event.preventDefault();
        axios
        .post(
            "http://localhost:8000/api/users/login",
            {
            email: email,
            password: password,
            },
            {
            withCredentials: true,
            }
        )
        .then((res) => {
            console.log(res.cookie);
            console.log(res);
            console.log(res.data);
            navigate("/capacities");
        })
        .catch((err) => {
            console.log(err.response);
            setErrorMessage(err.response.data.message);
        });
    };

return (
    <div className="container">
        <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
        <header className="header">
            <img className="d2w-logo"src="D2W.PNG"  alt="d2w-logo" width="200"  height="200"/>

        </header> 
        <main>
        <div className="blob"> 
            <img src="/images/business.png" alt="blob" width="600" height="600"/> 
            <h1 className="main-text2">Welcome to D2W Logistics</h1>
        </div>
                <div className="box-dashboard">       
                <img src="/images/ship.png" alt="ship-logo" width="75" height="75"/>                    
                <h1 className="big-text">Sign In</h1>
                    <p className="error-text">{errorMessage ? errorMessage : ""}</p>
                    <form onSubmit={login}>
                        <div>
                        <label className="text">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div>
                        <label className="text">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        </div>
                        <motion.button  whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }}  type="submit">Login</motion.button>
                        <hr/>            
                    </form>
                    <Link to="/signup"> {/*   redirect to registration  */}
                        <motion.button  whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }}   type="submit" value="New Registration">Sign Up</motion.button>
                    </Link>
                    </div>

        </main>

        </motion.div>
    </div>
);
}



export default Login;

