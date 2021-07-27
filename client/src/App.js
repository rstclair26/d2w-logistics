import React from 'react';
import './App.css';
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import {Router} from '@reach/router';

function App() {


  return (
    <div className="App">
        <Router>
              <Login default/>
              <RegisterUser path="/signup"/>
        </Router>
          
    </div>
  );
}

export default App;
