import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home';
import Create from './components/create/Create'
import Details from './components/details/Details';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path = '/' exact component={LandingPage}/>
        <Route path = '/home' exact component={Home}/>
        <Route path = '/home/pokemon/create' exact component={Create}/>
        <Route path='/home/:id' exact component={Details}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
