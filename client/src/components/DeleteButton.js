import React from 'react';
import { navigate} from '@reach/router';
import {motion} from 'framer-motion';
import axios from 'axios';

const DeleteButton = (props) => {

    const deleteCapacity = (d2wLogisticsDBId) => {
        axios.delete(`http://localhost:8000/api/capacities/${ d2wLogisticsDBId }`)
            .then((res) => {
                console.log(res.data);
                // setAllCapacity(allCapacity.filter((capacityElement) => capacityElement._id !== capacityId))
                navigate('/capacities');
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <motion.button className="circle" onClick={ () => deleteCapacity(props._id) }><img src="/images/delete (1).png" alt="date" width="90" height="90"/> </motion.button>
    )
}

export default DeleteButton;