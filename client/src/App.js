import './App.css';
import GetAll from './components/GetAll';
import Create from './components/Create';
import Edit from './components/Edit';
import Details from './components/Details';
import { Router } from '@reach/router';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <GetAll path="/" />
        <Create path="/capacity/create" />
        <Edit path="/capacity/:id/edit" />
        <Details path="/capacity/:id"/> 
      </Router>
    </div>
  );
}
export default App;
