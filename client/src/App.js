import React from 'react';
import './App.css';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import GetAll from './components/GetAll';
import Create from './components/Create';
import Edit from './components/Edit';
import Details from './components/Details';
import { Router } from '@reach/router'; // since router is not exported as default {} are required

function App() {


  return (
    <div className="App">
      <Router>
        <Login default/>
        <RegisterUser path="/signup"/>
        <GetAll path="/capacities" />
        <Create path="/capacities/create" />
        <Edit path="/capacities/:id/edit" />
        <Details path="/capacities/:id"/> 
      </Router>
    </div>
  );
}
export default App;