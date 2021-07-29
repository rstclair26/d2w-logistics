import React, { useEffect, useState } from 'react';
import {navigate } from '@reach/router';
import Logout from './Logout';
import axios from 'axios';
import DeleteButton from './DeleteButton';
import {motion} from 'framer-motion';
import { animationOne, transition} from '../animations/Animation';

const Details = (props) => {
    const [ d2wLogisticsDBId, setD2wLogisticsDBId ] = useState({});
    
    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get('http://localhost:8000/api/capacities/' + props.id) // postman verified url
            .then((res) => {
                console.log(res.data); //.then gives response object which is commonly referred to as res
                setD2wLogisticsDBId(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }, [props.id ]);

    return (
        <div className="container">
            <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
        <header className="header">
                <img className="d2w-logo"src="/images/D2W.PNG"  alt="d2w-logo" width="200" height="200"/>
            <Logout/>
        </header>
            <div className="box-dashboard-3">
                <div className="wrapper2">
                    <div className="text-wrapper">
                    <h1 className ="main-text-details">Details</h1>
                        <div className="flex-start2" >
                        <img src="/images/date (1).png" alt="date" width="40" height="40"/>
                        <p className="font-mod3">  Scheduled Date of Depature: </p>
                        <p className="font-mod4">
                                            {d2wLogisticsDBId.departureDate !== "" ?
                                                ((new Date(d2wLogisticsDBId.departureDate)).toLocaleDateString("en-us"))
                                        : ""}
                        </p>
                        </div>
                        <div className="flex-start2" >  
                        <img src="/images/left-arrow.png" alt="date" width="50" height="50"/>
                                <p className="font-mod3">Departure Port:</p>
                                <p className="font-mod4"> { d2wLogisticsDBId.departurePort }</p>
                        </div>        
                        <div className="flex-start2" >  
                        <img src="/images/right-arrow.png" alt="date" width="50" height="50"/>
                                <p className="font-mod3">Destination Port: </p> 
                                <p className="font-mod4">
                                        { d2wLogisticsDBId.destinationPort }
                                        </p>
                        </div>    
                        <div className="flex-start2" >  
                        <img src="/images/container.png" alt="date" width="40" height="40"/>
                                <p className="font-mod3">Number of FEUs:</p> 
                                <p className="font-mod4">
                                        { d2wLogisticsDBId.numFeuAvailable } 
                                        </p>
                        </div>  
                        <div className="flex-start2" >   
                        <img src="/images/cargo-protection.png" alt="date" width="40" height="40"/> 
                                <p className="font-mod3">  Content Classification: </p> 
                                <p className="font-mod4">
                                { d2wLogisticsDBId.goodsType }
                                </p>
                        </div>  
                        <div className="flex-start2" >  
                        <img src="/images/winter.png" alt="date" width="40" height="40"/>
                                <p className="font-mod3">  Refrigerated:</p>
                                <p className="font-mod4">
                                { 
                                d2wLogisticsDBId.isRefrigerated ?
                                <span>Yes</span>
                                :<span>No</span> 
                                }
                                </p>
                        </div>    
                        <div className="flex-start2" > 
                        <img src="/images/caution.png" alt="date" width="40" height="40"/> 
                                <p className="font-mod3"> Hazardous:</p>
                                <p className="font-mod4">   
                                { 
                                d2wLogisticsDBId.allowHazardous ?
                                <span>Yes</span>
                                :<span>No</span> 
                                }
                                </p>
                           </div>    
                    </div>
                        <div className="btn-div">
                                <motion.button  whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }} className="circle" onClick={ () => navigate("/capacities")}>   <img src="/images/back (2).png" alt="date" width="90" height="90"/> </motion.button>
                                <motion.button  whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }} className="circle" onClick={ () => navigate("/capacities/"+ d2wLogisticsDBId._id+"/edit")}><img src="/images/edit (2).png" alt="date" width="70" height="70"/> </motion.button>
                                <DeleteButton _id={ d2wLogisticsDBId._id }/>
                                <motion.button  whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.9 }} className="add-btn" onClick={ () => navigate("/success/"+ d2wLogisticsDBId._id)}>Confirm Inquiry</motion.button>
                        </div><img src="/images/FREIGHT1.png"  alt="story" width="300" height="300" />          
                    </div>    
                   
            </div>
            </motion.div>
        </div>
    )
};

export default Details;


//<button onClick={ () => navigate("/capacities/${d2wLogisticsDB._id}/edit")}>Edit</button>
// additional, optional fields
// <tr>
//<td>
//Pickup Date Needed:
// </td>
// <td>
// { capacity.dateNeeded }
// </td>
// </tr>
// <tr>
// <td>
// Contact Email:
// </td>
// <td>
// { capacity.email }
// </td>
// </tr>