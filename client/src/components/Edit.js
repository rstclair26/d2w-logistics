import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
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
        <header className="header">
            <Link to="/">
                <img className="d2w-logo"src="/images/D2W.PNG"  alt="d2w-logo" width="300" height="150"/>
            </Link>
            <Logout/>
        </header>
        <div className="box-dashboard">  
            <h1 className="big-text">Edit Capacity</h1> 
            <form onSubmit={submitHandler}>
            <div>
                    <label className="text"> Departure Date </label>
                    <input type="date"
                    name="departureDate"
                    value={departureDate}
                    onChange={ (e) => setDepartureDate( e.target.value ) }
                    />
                    {
                        errs.departureDate ?
                            <span className="error-text">{errs.departureDate.message}</span>
                            : null
                    }
                </div>
                <div>
                <label className="text"> Departure Port </label>
                    <select  name="departurePort" value={ departurePort }  onChange={ (e) => setDeparturePort( e.target.value ) }>
                                                <option value=""></option>
                                                {
                                                    portArr.map((location) =>(
                                                        <option value={location} key={location}>{location}</option>
                                                    ))
                                                }                               
                        </select>  
                    {
                        errs.departurePort ?
                        <span className="error-text">{errs.departurePort.message}</span>
                            : null
                    }
                </div>
                <div>
                <label className="text"> Destination Port </label>
                    <select  name="destinationPort" value={ destinationPort }  onChange={ (e) => setDestinationPort( e.target.value ) }>
                                                <option value=""></option>
                                                {
                                                    portArr.map((location) =>(
                                                        <option value={location} key={location}>{location}</option>
                                                    ))
                                                }                               
                        </select>  
                    {
                        errs.destinationPort ?
                        <span className="error-text">{errs.destinationPort.message}</span>
                            : null
                    }
                </div>
                <div>
                <label className="text"> Number of FEUs </label>
                    <input type="number"
                    name="numFeuAvailable"
                    min="0"
                    value={numFeuAvailable}
                    onChange={ (e) => setNumFeuAvailable( e.target.value ) }
                    />
                    {
                        errs.numFeuAvailable ?
                        <span className="error-text">{errs.numFeuAvailable.message}</span>
                            : null
                    }
                </div>
                <div>
                <label className="text"> Choose Goods Allowed </label>
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
                <label className="text"> Refrigerated </label>
                <div>
                    <input type="checkbox"
                    name="isRefrigerated"
                    checked={isRefrigerated}
                    onChange={ () => setIsRefrigerated( !isRefrigerated ) }
                    />
                </div>
                <label className="text"> Hazardous </label>
                <div>
                    <input type="checkbox"
                    name="allowHazardous"
                    checked={allowHazardous}
                    onChange={ () => setAllowHazardous( !allowHazardous ) }
                    />           
                </div>
                <div>
                    <button type="submit">Update</button>
                    <button onClick={ () => navigate("/capacities")}>Cancel</button>
                    <DeleteButton _id={ d2wLogisticsDBId }/>
                </div>
            </form>
        </div>
        </div>
    )
};

export default Edit;