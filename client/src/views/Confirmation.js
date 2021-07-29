import React, { useState, useEffect } from 'react';
import axios from "axios";
import Logout from '../components/Logout'
import {Link, navigate} from '@reach/router';
import {motion } from 'framer-motion';
import { animationOne, transition} from '../animations/Animation';
import Cookies from "js-cookie";
import emailjs from "emailjs-com";

const Confirmation = (props) => {
    const [ capacity, setCapacity ] = useState({});
    const [ userCookie, setUserCookie ] = useState(JSON.parse(Cookies.get("user")));

    useEffect(() => {
        axios.get('http://localhost:8000/api/capacities/' + props.id) // postman verified url
            .then((res) => {
                console.log(res.data);
                setCapacity(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        const emailParams = {
            to_name: userCookie.firstName + " " + userCookie.lastName,
            to_email: userCookie.email,
            departure_port: capacity.departurePort,
            destination_port: capacity.destinationPort,
            departure_date: new Date(capacity.departureDate).toLocaleDateString("en-us")
        };
    
        emailjs.send("service_lllxccd", "template_4rd8n1m", emailParams, "user_73A9Npgmc1ra0LDMwKIwZ")
            .then((res) => {
                console.log("Email sent successfully", res.status, res.text);
            })
            .catch((err) => {
                console.log("Email send failed", err);
            });
        }, [ props.id, userCookie.firstName, userCookie.lastName, userCookie.email, capacity.departurePort, capacity.destinationPort, capacity.departureDate ]);


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
                        <h2  className="">Thank you, { userCookie.firstName }!</h2>
                        <p  className="">Inquiry was successfully confirmed </p>
                        
                        </div>
                        <motion.button  whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }} onClick={ () => navigate("/capacities")}>Back</motion.button>
                        </motion.div>
                </div>
                <img className="d2w-logo"src="/images/business.png"  alt="d2w-logo" width="500"  height="500"/>
            </div>
        </div>
    )

}


export default Confirmation;