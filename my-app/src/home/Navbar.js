import React from 'react';
import Artlog from './Artlog';
 import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
   } from 'reactstrap'; 

  class NavBar extends React.Component{
       
  constructor(props) { 
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  loggedNavbar(){
      if(!localStorage.getItem('token')){
          return(
            <div>
        <Navbar color="dark" dark expand="sm">
          <NavbarBrand href="/">Toddler Cloud Art</NavbarBrand>
        </Navbar>
      </div>

          )
      }
      else{
          return(
            <div>
            <Navbar color="dark" dark expand="sm">
              <NavbarBrand href="/">Toddler Cloud Art</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                <NavLink href="/artlog">ArtLog</NavLink>
                </NavItem>
                <NavItem>
                <NavLink href="#"onClick={this.props.logout}>Logout</NavLink>
                </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
           )}
  }
  render() {
    return (
      <div>
        {this.loggedNavbar()}
       
      </div>
    );
  }
 }
 export default NavBar;