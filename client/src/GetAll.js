import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import DeleteButton from './DeleteButton';

const GetAll = (props) => {
    const [ allCapacity, setAllCapacity ] = useState([]); // notes : put in an array, as there is an array of objects expected, see postman which gets back and array of objects
    
    useEffect(() => {
        axios.get("http://localhost:8000/api/capacity") //notes: use the same string that works for a 'get' in postman
            .then((res) => {
                console.log(res.data); //this is just checking that the data came back correctly in the console
                //need state to hold onto the data we just called, do this above with const all
                setAllCapacity(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <th>Capacity Info</th>
                    <th>TBD</th>
                </thead>
                <tbody>
                    {
                        allCapacity.map((capacity, index) => (
                        <tr>
                            <td>
                                <Link to={ `/capacity/${capacity._id}`} >{capacity.name} </Link>
                            </td>
                            <td>
                            <DeleteButton _id={ capacity._id }/>
                                <Link to={ `/capacity/${capacity._id}/edit`}><button>Edit</button></Link>
                            </td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

export default GetAll;