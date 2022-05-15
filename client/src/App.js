import './App.css';
import Landing from './components/Landing/Landing';
import About from './components/About/About';
import Home from './components/Home/Home';
import CountryById from './components/CountryById/CountryById';
import Activity from './components/Activity/Activity';
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={Landing}/>
      <Route path='/about' exact component={About}/>
      <Route path='/home' exact component={Home}/>
      <Route path='/countrie/:id' exact component={CountryById}/>
      <Route path='/activity' exact component={Activity}/>
    </div>
  );
}

export default App;
