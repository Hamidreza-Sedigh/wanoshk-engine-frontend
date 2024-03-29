import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import {Link } from 'react-router-dom';
import { UserContext } from '../user-context';

const TopNav = (props) => {
  const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false)
  }

  return isLoggedIn ?
    <div>
      {console.log(isLoggedIn)}
      <Navbar color="faded" light>
        <NavbarToggler onClick={toggleNavbar} />
        <Link to="/login" onClick={logoutHandler} >Logout</Link>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
                <Link to="/sources" >sources</Link>
            </NavItem>
            <NavItem>
                <Link to="/addSource" >add source</Link>
            </NavItem>
            <NavItem>
                <Link to="/" >Dashboard</Link>
            </NavItem>
            <NavItem>
                <Link to="/contactus" >Contact Us</Link>
            </NavItem>
            <NavItem>
                <Link to="/myregistrations" >My Registrations</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  : ""
}

export default TopNav;