import React, {Component} from 'react'

import Navigation from './components/Navigation/Navigation'
import Login from './components/Login/Login'
import Converter from './components/Converter/Converter'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'



class App extends Component {
  constructor() {
   super();
   this.state = {
     route: 'login'
    };
  }

onRouteChange = (route) => {
  this.setState({route: route});
}


  render () {
    return (
      <div className='App'>
        {this.state.route === "login" 
        ? <Login onRouteChange={this.onRouteChange}/> 
        : <div><Navigation onRouteChange={this.onRouteChange}/>
               <Converter />
          </div>
        }
      </div>
    );
  }
}


export default App
