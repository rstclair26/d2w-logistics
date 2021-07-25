import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

const Edit = (props) => {
    const [ departureDate, setDepartureDate ] = useState("");
    const [ departurePort, setDeparturePort ] = useState("");
    const [ destinationPort, setDestinationPort ] = useState("");
    const [ fortiesAvailable, setFortiesAvailable ] = useState("");
    const [ refrigerated, setRefrigerated ] = useState("");
    const [ hazardous, setHazardous ] = useState("");
    const [ goodsType, setGoodsType ] = useState("");
    const [ errs, setErrs ] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/capacity/' + props.id) // need to use postman to verify url
            .then((res) => {
                console.log(res.data); 
                let capacity = res.data;
                setDepartureDate(capacity.departureDate);
                setDeparturePort(capacity.departurePort);
                setDestinationPort(capacity.destinationPort);
                setFortiesAvailable(capacity.fortiesAvailable);
                setRefrigerated(capacity.refrigerated);
                setHazardous(capacity.hazardous);
                setGoodsType(capacity.goodsType);
            })
            .catch((err) => {
                console.log(err);
            });
        }, [props.id ]);

    const submitHandler = (e) => {
        e.preventDefault(); //bring in the event with 'e' and prevent default refresh of capacity
        axios.put("http://localhost:8000/api/capacity/" + props.id, {
            departureDate: departureDate,
            departurePort: departurePort,
            destinationPort: destinationPort,
            fortiesAvailable: fortiesAvailable,
            refrigerated: refrigerated,
            hazardous: hazardous,
            goodsType: goodsType,

            })
            .then((res) => {
                if(res.data.errors) {
                    console.log(res.data.errors)
                    setErrs(res.data.errors);
                }
                else {
                    console.log(res.data)
                    navigate("/capacity/" + props.id); //this takes the :id via props so after editing user is now on the details
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <h1>Edit Capacity</h1> 
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
                    <label> Number of Forties </label>
                    <input type="number"
                    name="fortiesAvailable"
                    min="0"
                    value={fortiesAvailable}
                    onChange={ (e) => setFortiesAvailable( e.target.value ) }
                    />
                    {
                        errs.skills ?
                        <span className="error-text">{errs.fortiesAvailable.message}</span>
                            : null
                    }
                </div>
                <div>
                    <input type="checkbox"
                    name="refrigerated"
                    checked={refrigerated}
                    onChange={ () => setRefrigerated( !refrigerated ) }
                    />
                    <label> Refrigerated </label>
                </div>
                <div>
                    <input type="checkbox"
                    name="hazardous"
                    checked={hazardous}
                    onChange={ () => setHazardous( !hazardous ) }
                    />
                    <label> Hazardous </label>
                </div>
                <div>
                    <label> Types of Goods Allowed </label>
                    <input type="text"
                    name="goodsType"
                    value={goodsType}
                    onChange={ (e) => setgoodsType( e.target.value ) }
                    />
                    {
                        errs.type ?
                        <span className="error-text">{errs.goodsType.message}</span>
                            : null
                    }
                </div>
                <div>
                    <button type="submit">Update Capacity</button>
                    <button onClick={ () => navigate("/")}>Cancel</button>
                    <DeleteButton _id={ capacity._id }/>
                </div>
            </form>
        </div>
    )
};

export default Edit;