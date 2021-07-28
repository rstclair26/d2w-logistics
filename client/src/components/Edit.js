import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';

const Edit = (props) => {
    const [ departureDate, setDepartureDate ] = useState("");
    const [ departurePort, setDeparturePort ] = useState("");
    const [ destinationPort, setDestinationPort ] = useState("");
    const [ numFeuAvailable, setNumFeuAvailable ] = useState("");
    const [ isRefrigerated, setIsRefrigerated ] = useState("");
    const [ allowHazardous, setAllowHazardous ] = useState("");
    const [ goodsType, setGoodsType ] = useState("");
    const [ errs, setErrs ] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/capacities/' + props.id) // need to use postman to verify url
            .then((res) => {
                console.log(res.data); 
                let d2wLogisticsDB = res.data;
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
                        errs.departureDate ?
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
                        errs.departurePort ?
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
                        errs.destinationPort ?
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
                        errs.numFeuAvailable ?
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
                        errs.goodsType ?
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
                    <button type="submit">Update Capacity</button>
                    <button onClick={ () => navigate("/capacities")}>Cancel</button>
                    <DeleteButton _id={ d2wLogisticsDB._id }/>
                </div>
            </form>
        </div>
    )
};

export default Edit;