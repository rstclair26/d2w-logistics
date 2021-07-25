// This is the Inquiry/reservation page will have the following fields:
//	- Uneditable/display-only capacity information:
//		- Scheduled date of departure
//		- Departure port
//		- Number of 40-foot containers
//		- Refrigerated indicator
//		- Hazardous/government-regulated indicator
//		- Type of goods allowed
//	- Date needed (date picker - see wireframe; include validation that this date has to be before the scheduled departure date)
//	- Destination port (drop-down showing the destination ports defined for the capacity)
//	- Email address for contact (pre-populated with email address in user's profile)

import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import DeleteButton from './DeleteButton';

const Details = (props) => {
    const [ capacity, setCapacity ] = useState({});
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/capacity/' + props.id) // postman verified url
            .then((res) => {
                console.log(res.data); //.then gives response object which is commonly referred to as res
                setCapacity(res.data);
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
                    Scheduled date of depature:
                </td>
                <td>
                    { capacity.departureDate }
                </td>
                </tr>
                <tr>
                <td>
                    Port of departure:
                </td>
                <td>
                    { capacity.departurePort }
                </td>
                </tr>
                <tr>
                <td>
                Number of 40-foot containers:
                </td>
                <td>
                    { capacity.numberOfForties }
                </td>
                </tr>
                <tr>
                <td>
                    Refrigerated:
                </td>
                <td>
                    { 
                        capacity.refrigerated ?
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
                        capacity.hazardous ?
                        <span>Yes</span>
                        :<span>No</span> 
                    }
                </td>
                </tr>
                <tr>
                <td>
                    Type of Goods Allowed:
                </td>
                <td>
                    { capacity.goodsAllowed }
                </td>
                </tr>
                <tr>
                <td>
                    Pickup Date Needed:
                </td>
                <td>
                    { capacity.dateNeeded }
                </td>
                </tr>
                <tr>
                <td>
                    Destination Port Desired:
                </td>
                <td>
                    { capacity.destinationPort }
                </td>
                </tr>
                <tr>
                <td>
                    Contact Email:
                </td>
                <td>
                    { capacity.departureDate }
                </td>
                </tr>
            </table>
            <DeleteButton _id={ capacity._id }/>
        </div>
    )
};

export default Details;