import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Nav from './Components/Nav/Nav';
import Home from './Components/Home/Home';
import DogCreate from './Components/DogCreate/DogCreate';
import DogDetails from './Components/DogDetails/DogDetails';

function App() {
  return (
     <div className="App">
        <Route exact path = '/' component = {LandingPage} />
        <Route exact path = '/dogs' component = {Nav} />
        <Route exact path = '/dogs' component = {Home} />
        <Route exact path = '/dogs/' component = {DogCreate} />
        <Route exact path = '/dogs/:id' component = {DogDetails} />
      </div>
  );
};

export default App;
