import React, {useState} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';

const DeleteButton = (props) => {
    const [ d2wLogisticsDBId, setD2wLogisticsDB ] = useState (props.id);
    const deleteCapacity = (d2wLogisticsDBId) => {
        axios.delete(`http://localhost:8000/api/d2wLogisticsDB/${ d2wLogisticsDBId }`)
            .then((res) => {
                console.log(res.data);
                // setAllCapacity(allCapacity.filter((capacityElement) => capacityElement._id !== capacityId))
                navigate('/');
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