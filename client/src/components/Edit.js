import React ,{useState, useEffect} from 'react';
import { navigate} from '@reach/router';
import {motion} from 'framer-motion';
import axios from 'axios';
import { animationOne, transition} from '../animations/Animation';
import DeleteButton from './DeleteButton';
import Logout from './Logout';

const Edit = (props) => {
    const [ departureDate, setDepartureDate ] = useState("");
    const [ departurePort, setDeparturePort ] = useState("");
    const [ destinationPort, setDestinationPort ] = useState("");
    const [ numFeuAvailable, setNumFeuAvailable ] = useState("");
    const [ isRefrigerated, setIsRefrigerated ] = useState("");
    const [ allowHazardous, setAllowHazardous ] = useState("");
    const [ goodsType, setGoodsType ] = useState("");
    const [ d2wLogisticsDBId, setD2wLogisticsDBId ] = useState("");
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
          axios.get('http://localhost:8000/api/capacities/' + props.id) // need to use postman to verify url
            .then((res) => {
                console.log(res.data); 
                let d2wLogisticsDB = res.data;
                setD2wLogisticsDBId(d2wLogisticsDB._id);
                setDepartureDate(d2wLogisticsDB.departureDate);
                setDeparturePort(d2wLogisticsDB.departurePort);
                setDestinationPort(d2wLogisticsDB.destinationPort);
                setNumFeuAvailable(d2wLogisticsDB.numFeuAvailable);
                setIsRefrigerated(d2wLogisticsDB.isRefrigerated);
                setAllowHazardous(d2wLogisticsDB.allowHazardous);
                setGoodsType(d2wLogisticsDB.goodsType);
            })
            .catch((err) => {
                console.log(err);
            });
        }, [props.id ]);

    const submitHandler = (e) => {
        e.preventDefault(); //bring in the event with 'e' and prevent default refresh of capacity
        axios.put("http://localhost:8000/api/capacities/" + props.id, {
            departureDate: departureDate,
            departurePort: departurePort,
            destinationPort: destinationPort,
            numFeuAvailable: numFeuAvailable,
            isRefrigerated: isRefrigerated,
            allowHazardous: allowHazardous,
            goodsType: goodsType,

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
        <div className="wrapper">
        <div className="text-wrapper">  
            <h1 className="main-text-details">Edit Capacity</h1> 
            <form onSubmit={submitHandler}>
            <div className="flex-start">
                    <label className="text2"> Departure Date </label>
                    <input type="date"
                    name="departureDate"
                    value={departureDate.substr(0,10) }
                    onChange={ (e) => setDepartureDate( e.target.value ) }
                    />
            </div>
            {
                        errs.departureDate ?
                            <span className="error-text">{errs.departureDate.message}</span>
                            : null
            }
                <div  className="flex-start">
                <label className="text2"> Departure Port </label>
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
                <div  className="flex-start">
                <label className="text2"> Destination Port </label>
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
                <div  className="flex-start">
                <label className="text2"> Number of FEUs </label>
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
                <div  className="flex-start">
                <label className="text2"> Content Classification </label>
                <select  name="goodsType" value={ goodsType } onChange={(e) => setGoodsType(e.target.value)}>
                                                <option value=""></option>
                                                {
                                                    primaryMarketArr.map((market) =>(
                                                        <option value={market} key={market}>{market}</option>
                                                    ))
                                                }                               
                        </select>  
                    {
                        errs.goodsType ?
                        <span className="error-text">{errs.goodsType.message}</span>
                            : null
                    }
                </div>
                
                <div  className="flex-start">
                <label className="text2"> Refrigerated </label>
                    <input type="checkbox"
                    name="isRefrigerated"
                    checked={isRefrigerated}
                    onChange={ () => setIsRefrigerated( !isRefrigerated ) }
                    />
                </div>
             
                <div  className="flex-start">
                <label className="text2"> Hazardous </label>
                    <input type="checkbox"
                    name="allowHazardous"
                    checked={allowHazardous}
                    onChange={ () => setAllowHazardous( !allowHazardous ) }
                    />           
                </div>
                <div className="btn-div">
                    <button type="submit">Update</button>
                    <motion.button onClick={ () => navigate("/capacities")}>Cancel</motion.button>
                    <DeleteButton _id={ d2wLogisticsDBId }/>
                </div>
                <img src="/images/FREIGHT4.png"  alt="story" width="300" height="300" />
            </form>
            </div>
        </div>
        </div>
        </motion.div>
        </div>
    )
};

export default Edit;