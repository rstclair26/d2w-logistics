import React, {useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const DeleteButton = (props) => {
    const [ capacityId, setCapacityId ] = useState (props.id);
    const deleteCapacity = (capacityId) => {
        axios.delete(`http://localhost:8000/api/capacity/${ capacityId }`)
            .then((res) => {
                console.log(res.data);
                // setAllCapacity(allCapacity.filter((capacityElement) => capacityElement._id !== capacityId))
                navigate('/capacity');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <button onClick={ () => deleteCapacity(props._id) }>Delete</button>
    )
}

export default DeleteButton;