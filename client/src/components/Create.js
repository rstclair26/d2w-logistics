import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

const Create = (props) => {

    const [ departureDate, setDepartureDate ] = useState("");
    const [ departurePort, setDeparturePort ] = useState("");
    const [ destinationPort, setDestinationPort ] = useState("");
    const [ numFeuAvailable, setNumFeuAvailable ] = useState("");
    const [ goodsType, setGoodsType ] = useState("");
    const [ isRefrigerated, setIsRefrigerated ] = useState("");
    const [ allowHazardous, setAllowHazardous ] = useState("");
    const [ errs, setErrs ] = useState({});

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
        <div>
            <h1>New Capacity</h1> 
            <form onSubmit={submitHandler}>
                <div>
                    <label> Departure Date </label>
                    <input type="date"
                    name="departureDate"
                    value={departureDate}
                    onChange={ (e) => setDepartureDate( e.target.value ) }
                    />
                    {
                        errs.name ?
                            <span className="error-text">{errs.departureDate.message}</span>
                            : null
                    }
                </div>
                <div>
                    <label> Departure Port </label>
                    <input type="text"
                    name="departurePort"
                    value={departurePort}
                    onChange={ (e) => setDeparturePort( e.target.value ) }
                    />
                    {
                        errs.type ?
                        <span className="error-text">{errs.departurePort.message}</span>
                            : null
                    }
                </div>
                <div>
                    <label> Destination Port </label>
                    <input type="text"
                    name="destinationPort"
                    value={destinationPort}
                    onChange={ (e) => setDestinationPort( e.target.value ) }
                    />
                    {
                        errs.type ?
                        <span className="error-text">{errs.destinationPort.message}</span>
                            : null
                    }
                </div>
                <div>
                    <label> Number of FEUs </label>
                    <input type="number"
                    name="numFeuAvailable"
                    min="0"
                    value={numFeuAvailable}
                    onChange={ (e) => setNumFeuAvailable( e.target.value ) }
                    />
                    {
                        errs.skills ?
                        <span className="error-text">{errs.numFeuAvailable.message}</span>
                            : null
                    }
                </div>
                <div>
                    <label> Types of Goods Allowed </label>
                    <input type="text"
                    name="goodsType"
                    value={goodsType}
                    onChange={ (e) => setGoodsType( e.target.value ) }
                    />
                    {
                        errs.type ?
                        <span className="error-text">{errs.goodsType.message}</span>
                            : null
                    }
                </div>
                <div>
                    <input type="checkbox"
                    name="isRefrigerated"
                    checked={isRefrigerated}
                    onChange={ () => setIsRefrigerated( !isRefrigerated ) }
                    />
                    <label> Refrigerated </label>
                </div>
                <div>
                    <input type="checkbox"
                    name="allowHazardous"
                    checked={allowHazardous}
                    onChange={ () => setAllowHazardous( !allowHazardous ) }
                    />
                    <label> Hazardous </label>
                </div>
                <div>
                    <button type="submit">Add Capacity</button>
                    <button onClick={ () => navigate("/capacities")}>Cancel</button>
                </div>
            </form>
        </div>
    )
};

export default Create;