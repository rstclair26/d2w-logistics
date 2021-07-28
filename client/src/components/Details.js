import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import DeleteButton from './DeleteButton';

const Details = (props) => {
    const [ d2wLogisticsDBId, setD2wLogisticsDBId ] = useState({});
    
    useEffect(() => {
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
        <div>
            <h1>Details</h1>
            <table>
                <tr>
                    <td>
                        Scheduled Date of Depature:
                    </td>
                    <td>
                        { d2wLogisticsDBId.departureDate }
                    </td>
                </tr>
                <tr>
                    <td>
                        Port of Departure:
                    </td>
                    <td>
                        { d2wLogisticsDBId.departurePort }
                    </td>
                </tr>
                <tr>
                    <td>
                        Destination Port:
                    </td>
                    <td>
                        { d2wLogisticsDBId.destinationPort }
                    </td>
                </tr>
                <tr>
                    <td>
                        Number of FEUs:
                    </td>
                    <td>
                        { d2wLogisticsDBId.numFeuAvailable }
                    </td>
                </tr>
                <tr>
                    <td>
                        Type of Goods Allowed:
                    </td>
                    <td>
                        { d2wLogisticsDBId.goodsType }
                    </td>
                    </tr>
                <tr>
                    <td>
                        Refrigerated:
                    </td>
                    <td>
                        { 
                        d2wLogisticsDBId.isRefrigerated ?
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
                        d2wLogisticsDBId.allowHazardous ?
                        <span>Yes</span>
                        :<span>No</span> 
                        }
                    </td>
                </tr>
            </table>
            <button onClick={ () => navigate("/capacities")}>Back</button>
            <button onClick={ () => navigate("/capacities/:id/edit")}>Edit</button>
            <DeleteButton _id={ d2wLogisticsDBId._id }/>
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