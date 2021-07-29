import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import{motion } from 'framer-motion';
import Logout from '../components/Logout';
import { animationOne, transition} from '../animations/Animation';

const GetAll = (props) => {
    const [ allD2wLogisticsDB, setAllD2wLogisticsDB ] = useState([]); // notes : put in an array, as there is an array of objects expected, see postman which gets back and array of objects
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/capacities") //notes: use the same string that works for a 'get' in postman
            .then((res) => {
                console.log(res.data); //this is just checking that the data returned correctly in the console
                //need state to hold onto the capacity instance data we just called, do this above with const all
                setAllD2wLogisticsDB(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
    <div className="container" >
        <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
        <header className="header">    
            <img className="d2w-logo"src="D2W.PNG"  alt="d2w-logo" width="200" height="200"/>
            <Logout/>
        </header>  
        
            <div className="box-dashboard-2">
            <h1 className="main-text">Up-To-The-Minute Availabilities </h1>
                <table className="table-wrapper">    
                <thead>
                    <th>Departure Date</th>
                    <th>Departure Port</th>
                    <th>Destination Port</th>
                    <th>FEUs</th>
                    <th>Refrigerated</th>
                    <th>Hazardous</th>
                    <th></th>
                </thead>
                <tbody>
                    {
                        allD2wLogisticsDB.map((d2wLogisticsDB, index) => (
                        <tr>
                            <td>
                            <img src="images/date (1).png" alt="date" width="30" height="30"/>
                                <p className="font-mod2">{d2wLogisticsDB.departureDate !== "" ?
                                        ((new Date(d2wLogisticsDB.departureDate)).toLocaleDateString("en-us"))
                                : ""}</p>
                            </td>
                            <td >
                                <img src="images/left-arrow.png" alt="refrig" width="35" height="35"/>
                                <p className="font-mod2">{d2wLogisticsDB.departurePort}</p>
                            </td>
                            <td >
                                <img src="images/right-arrow.png" alt="refrig" width="35" height="35"/>
                                <p className="font-mod2">{d2wLogisticsDB.destinationPort}</p>
                            </td>
                            <td>
                                <p className="font-mod">{d2wLogisticsDB.numFeuAvailable}</p>
                            </td>
                            <td>
                                <p className="font-mod">
                                    { 
                                    d2wLogisticsDB.isRefrigerated ?
                                    <span><img src="images/winter (1).png" alt="refrig" width="50" height="50"/></span>
                                    :<span>No</span> 
                                    }
                                </p>
                            </td>
                            <td>
                                <p className="font-mod">
                                    { 
                                    d2wLogisticsDB.allowHazardous ?
                                    <span><img src="images/caution.png" alt="refrig" width="50" height="50"/></span>
                                    :<span>No</span> 
                                    }
                                </p>
                            </td>
                            <td>
                                <Link to={ `/capacities/${d2wLogisticsDB._id}`}><motion.button whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }} className="inquire-btn">Inquire</motion.button></Link>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
            
            <img src="/images/freight2.svg"  alt="story" width="350" height="350" />
            <motion.button  whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }} className="add-btn" onClick={ () => navigate("/capacities/create")}>Offer Capacity</motion.button> 
            
            </div>
           
            </motion.div>
        </div>
    )
};

export default GetAll;