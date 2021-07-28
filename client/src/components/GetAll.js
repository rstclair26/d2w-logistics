import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import Logout from '../components/Logout';
import DeleteButton from './DeleteButton';

const GetAll = (props) => {
    const [ allD2wLogisticsDB, setAllD2wLogisticsDB ] = useState([]); // notes : put in an array, as there is an array of objects expected, see postman which gets back and array of objects
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/capacities") //notes: use the same string that works for a 'get' in postman
            .then((res) => {
                console.log(res.data); //this is just checking that the data returned correctly in the console
                //need state to hold onto the capacity instance data we just called, do this above with const all
                setAllD2wLogisticsDB(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
    <div className="container" >
        <header className="header">
            <Link to="/">
            <img className="d2w-logo"src="D2W.PNG"  alt="d2w-logo" width="200" height="200"/>
            </Link>
            <Logout/>
        </header>  
        <h1 className="main-text">Dashboard </h1>
            <div className="box-dashboard-2">
                <table className="table-wrapper">    
                <thead>
                    <th>Departure Date</th>
                    <th>Departure Port</th>
                    <th>Destination Port</th>
                    <th>FEUs</th>
                    <th>Ref</th>
                    <th>Haz</th>
                    <th>Inquire</th>
                </thead>
                <tbody>
                    {
                        allD2wLogisticsDB.map((d2wLogisticsDB, index) => (
                        <tr>
                            <td>
                                <p>{d2wLogisticsDB.departureDate !== "" ?
                                        ((new Date(d2wLogisticsDB.departureDate)).toLocaleDateString("en-us"))
                                : ""}</p>
                            </td>
                            <td>
                                <p>{d2wLogisticsDB.departurePort}</p>
                            </td>
                            <td>
                                <p>{d2wLogisticsDB.destinationPort}</p>
                            </td>
                            <td>
                                <p>{d2wLogisticsDB.numFeuAvailable}</p>
                            </td>
                            <td>
                                <p>
                                    { 
                                    d2wLogisticsDB.isRefrigerated ?
                                    <span>Yes</span>
                                    :<span>No</span> 
                                    }
                                </p>
                            </td>
                            <td>
                                <p>
                                    { 
                                    d2wLogisticsDB.allowHazardous ?
                                    <span>Yes</span>
                                    :<span>No</span> 
                                    }
                                </p>
                            </td>
                            <td>
                                <Link to={ `/capacities/${d2wLogisticsDB._id}`}><button>Inquire</button></Link>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
            <button  className="add-btn" onClick={ () => navigate("/capacities/create")}>Add Capacity</button>
            </div>
            <img src="/images/FREIGHT2.PNG"  alt="story" width="350" height="350" />
        </div>
    )
};

export default GetAll;