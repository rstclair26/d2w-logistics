import React ,{useState, useEffect} from 'react';
import {navigate} from '@reach/router';
import {motion} from 'framer-motion';
import axios from 'axios';
import { animationOne, transition} from '../animations/Animation';

import Logout from './Logout';

const Create = (props) => {

    const [ departureDate, setDepartureDate ] = useState("");
    const [ departurePort, setDeparturePort ] = useState("");
    const [ destinationPort, setDestinationPort ] = useState("");
    const [ numFeuAvailable, setNumFeuAvailable ] = useState("");
    const [ goodsType, setGoodsType ] = useState("");
    const [ isRefrigerated, setIsRefrigerated ] = useState(false);
    const [ allowHazardous, setAllowHazardous ] = useState(false);
    const [ errs, setErrs ] = useState({});
    const primaryMarketArr = ["Automotive",
    "Clothing Retail",
    "Electronics",
    "Food Production",
    "Industrial"];
    const portArr = ["CAVAN",
    "CNSGH",
    "DEHAM",
    "INBOM",
    "JPTYO",
    "NKHKG",
    "NLRTM",
    "USLAX",
    "USNYC"];

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    const submitHandler = (e) => {
        e.preventDefault(); //bring in the event with 'e' and prevent default refresh of capacity

        axios.post("http://localhost:8000/api/capacities" , { 
            departureDate: departureDate,
            departurePort: departurePort,
            destinationPort: destinationPort,
            numFeuAvailable: numFeuAvailable,
            goodsType: goodsType,
            isRefrigerated: isRefrigerated,
            allowHazardous: allowHazardous,

            })
            .then((res) => {
                if(res.data.errors) {
                    console.log(res.data.errors)
                    setErrs(res.data.errors);
                }
                else {
                    console.log(res.data)
                    navigate("/capacities"); //this takes the :id via props so after editing user is now on the details
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="container">
                <motion.div initial="out" animate="in" exit="out" variants={animationOne} transition={transition}>
                <header className="header">
                <img className="d2w-logo"src="/images/D2W.PNG"  alt="d2w-logo" width="300" height="150"/>
            <Logout/>
        </header>
        <div className="box-dashboard-3">  
            <div className="wrapper2">  
                    <div className="text-wrapper">  
            <h1 className="main-text-details">New Capacity</h1> 
            <form onSubmit={submitHandler}>
                <div className="flex-start">
                    <label className="text3"> Departure Date </label>
                    <input type="date"
                    name="departureDate"
                    value={departureDate}
                    onChange={ (e) => setDepartureDate( e.target.value ) }
                    />       
                </div>
                {
                        errs.departureDate ?
                            <span className="error-text">{errs.departureDate.message}</span>
                            : null
                    }
                <div className="flex-start">
                <label className="text3"> Departure Port </label>
                    <select  name="departurePort" value={ departurePort }  onChange={ (e) => setDeparturePort( e.target.value ) }>
                                                <option value=""></option>
                                                {
                                                    portArr.map((location) =>(
                                                        <option value={location} key={location}>{location}</option>
                                                    ))
                                                }                               
                        </select>  
                 
                </div>
                {
                        errs.departurePort ?
                        <span className="error-text">{errs.departurePort.message}</span>
                            : null
                    }
                <div className="flex-start">
                <label className="text3"> Destination Port </label>
                    <select  name="destinationPort" value={ destinationPort }  onChange={ (e) => setDestinationPort( e.target.value ) }>
                                                <option value=""></option>
                                                {
                                                    portArr.map((location) =>(
                                                        <option value={location} key={location}>{location}</option>
                                                    ))
                                                }                               
                        </select>  
                  
                </div>
                {
                        errs.destinationPort ?
                        <span className="error-text">{errs.destinationPort.message}</span>
                            : null
                    }
                <div className="flex-start">
                <label className="text3"> Number of FEUs </label>
                    <input type="number"
                    name="numFeuAvailable"
                    min="0"
                    value={numFeuAvailable}
                    onChange={ (e) => setNumFeuAvailable( e.target.value ) }
                    />            
                </div>
                {
                        errs.numFeuAvailable ?
                        <span className="error-text">{errs.numFeuAvailable.message}</span>
                            : null
                    }
                <div className="flex-start">
                <label className="text3"> Content Classification </label>
                <select  name="goodsType" value={ goodsType } onChange={(e) => setGoodsType(e.target.value)}>
                                                <option value=""></option>
                                                {
                                                    primaryMarketArr.map((market) =>(
                                                        <option value={market} key={market}>{market}</option>
                                                    ))
                                                }                               
                        </select>  
                   
                </div>
                {
                        errs.goodsType ?
                        <span className="error-text">{errs.goodsType.message}</span>
                            : null
                    }
                <div className="flex-start">
                <label className="text3"> Refrigerated </label>
                    <input type="checkbox"
                    name="isRefrigerated"
                    checked={isRefrigerated}
                    onChange={ () => setIsRefrigerated( !isRefrigerated ) }
                    />
                </div>         
                <div className="flex-start">
                <label className="text3"> Hazardous </label>
                    <input type="checkbox"
                    name="allowHazardous"
                    checked={allowHazardous}
                    onChange={ () => setAllowHazardous( !allowHazardous ) }
                    />
                </div>
                <div >
                    <button type="submit">Save Capacity</button>
                    <button onClick={ () => navigate("/capacities")}>Cancel</button>
                </div>
                <img src="/images/FREIGHT1.png"  alt="story" width="300" height="300" />
            </form>
            </div>
            </div>
            </div>
            </motion.div>
        </div>
    )
};

export default Create;