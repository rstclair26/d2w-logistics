import './App.css';
import GetAll from './components/GetAll';
import Create from './components/Create';
import Edit from './components/Edit';
import Details from './components/Details';
import { Router } from '@reach/router'; // since router is not exported as default {} are required

function App() {
  return (
    <div className="App">
      <h1>Down To The Wire Logistics</h1>
      <Router>
        <GetAll path="/" />
        <Create path="/d2wLogisticsDBId/create" />
        <Edit path="/d2wLogisticsDBId/:id/edit" />
        <Details path="/d2wLogisticsDBId/:id"/> 
      </Router>
    </div>
  );
}
export default App;