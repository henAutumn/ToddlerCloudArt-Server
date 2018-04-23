import React, { Component } from 'react';
// import './App.css';
import SketchFieldDemo from './home/SketchFieldDemo';
import Auth from './auth/Auth';
import Navbar from './home/Navbar';
import Artlog from './home/Artlog';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';



export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      sessionToken:'',

    }
  }
  componentWillMount(){
    const token=localStorage.getItem('token')
    if(token&& !this.state.sessionToken){
      this.setState({sessionToken:token});
    }
  }
  setSessionState=(token) =>{
    localStorage.setItem('token',token);
    this.setState({
      sessionToken:token,
    });
  }
  

  logout=(event)=>{
    this.setState({sessionToken:''});
    localStorage.clear()
    event.preventDefault();
  }

  protectedViews= () => {
    if(this.state.sessionToken=== localStorage.getItem('token')){
      return(
        <Switch>
          <Route path='/' exact>
            <SketchFieldDemo token={this.state.sessionToken}/>
          </Route>
        {/* </Switch>
        <Switch> */}
        <Route path='/artlog' exact >
          <Artlog token={this.state.sessionToken}/>
        </Route>
      </Switch>
      )
    }else{
      return(
        <Route path="/auth">
            <Auth protectedViews={this.protectedViews} setToken={this.setSessionState} />
          </Route>
          
      )
    }
  }

 

  render() {
    return (    
        <Router>
      <div className="App">
      <Navbar  setToken={this.setSessionState} logout={this.logout} />
        {this.protectedViews()} 
      </div>
      </Router>
    );
  }
}



