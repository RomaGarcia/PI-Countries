import './App.css';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import CountryById from './components/CountryById/CountryById';
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={Landing}/>
      <Route path='/home' exact component={Home}/>
      <Route path='/countrie/:id' exact component={CountryById}/>
    </div>
  );
}

export default App;
