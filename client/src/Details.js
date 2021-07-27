import React, { useEffect, useState } from 'react';
//import { Link, navigate } from '@reach/router';
import axios from 'axios';
import DeleteButton from './DeleteButton';

const Details = (props) => {
    const [ d2wLogisticsDBId, setD2wLogisticsDBId ] = useState({});
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/d2wLogisticsDB/' + props.id) // postman verified url
            .then((res) => {
                console.log(res.data); //.then gives response object which is commonly referred to as res
                setD2wLogisticsDBId(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }, [props.id ]);

    return (
        <div>
            <h1>Details</h1>
            <table>
                <tr>
                    <td>
                        Scheduled Date of Depature:
                    </td>
                    <td>
                        { d2wLogisticsDB.departureDate }
                    </td>
                </tr>
                <tr>
                    <td>
                        Port of Departure:
                    </td>
                    <td>
                        { d2wLogisticsDB.departurePort }
                    </td>
                </tr>
                <tr>
                    <td>
                        Destination Port:
                    </td>
                    <td>
                        { capacity.destinationPort }
                    </td>
                </tr>
                <tr>
                    <td>
                        Number of FEUs:
                    </td>
                    <td>
                        { d2wLogisticsDB.numFeuAvailable }
                    </td>
                </tr>
                <tr>
                    <td>
                        Type of Goods Allowed:
                    </td>
                    <td>
                        { d2wLogisticsDB.goodsType }
                    </td>
                    </tr>
                <tr>
                    <td>
                        Refrigerated:
                    </td>
                    <td>
                        { 
                        d2wLogisticsDB.isRefrigerated ?
                        <span>Yes</span>
                        :<span>No</span> 
                        }
                    </td>
                </tr>
                <tr>
                    <td>
                        Hazardous:
                    </td>
                    <td>
                        { 
                        d2wLogisticsDB.allowHazardous ?
                        <span>Yes</span>
                        :<span>No</span> 
                        }
                    </td>
                </tr>
            </table>
            <button onClick={ () => navigate("/")}>Back</button>
            <DeleteButton _id={ d2wLogisticsDB._id }/>
        </div>
    )
};

export default Details;

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